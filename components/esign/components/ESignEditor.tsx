'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { saveAs } from 'file-saver';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import {
    X,
    ArrowLeft,
    Check,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useESign } from '../hooks/useESign';
import { DocumentUploader } from './DocumentUploader';
import { DocumentCanvas } from './DocumentCanvas';
import { DraggableElement } from './DraggableElement';
import { Toolbar } from './Toolbar';
import { SignaturePad } from './SignaturePad';
import type { ESignEditorProps, SignatureElement } from '../types';

export function ESignEditor({
    onComplete,
    onCancel,
    className,
    initialDocument,
    compact = false,
}: ESignEditorProps) {
    const {
        state,
        loadDocument,
        addElement,
        updateElement,
        removeElement,
        selectElement,
        setCurrentPage,
        setZoom,
        setMode,
        setSignatureImage,
        generateSignedDocument,
        clearAll,
        reset,
    } = useESign();

    const [isLoading, setIsLoading] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [showSignaturePad, setShowSignaturePad] = useState(false);
    const [showTextInput, setShowTextInput] = useState(false);
    const [textInputValue, setTextInputValue] = useState('');
    const [pendingElementType, setPendingElementType] = useState<SignatureElement['type'] | null>(null);
    const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });

    // Track which mode was last used for signature pad (draw vs upload vs type)
    const [signaturePadMode, setSignaturePadMode] = useState<'draw' | 'type' | 'upload'>('draw');

    // Open dialogs immediately when mode changes
    useEffect(() => {
        if (state.mode === 'signature' || state.mode === 'initials') {
            setPendingElementType(state.mode);
            setShowSignaturePad(true);
            // Default position for signatures opened from toolbar button
            setClickPosition({ x: 100, y: 100 });
        } else if (state.mode === 'text') {
            setTextInputValue('');
            setShowTextInput(true);
            setPendingElementType('text');
            setClickPosition({ x: 100, y: 100 });
        }
        // Date and checkbox use canvas click for positioning
    }, [state.mode]);

    // Handle initial document
    useEffect(() => {
        if (initialDocument) {
            handleDocumentUpload(initialDocument);
        }
    }, [initialDocument]);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
                return;
            }

            switch (e.key.toLowerCase()) {
                case 'v':
                    setMode('select');
                    break;
                case 's':
                    setMode('signature');
                    break;
                case 'i':
                    setMode('initials');
                    break;
                case 't':
                    setMode('text');
                    break;
                case 'd':
                    setMode('date');
                    break;
                case 'c':
                    setMode('checkbox');
                    break;
                case 'delete':
                case 'backspace':
                    if (state.selectedElement) {
                        removeElement(state.selectedElement);
                    }
                    break;
                case 'escape':
                    selectElement(null);
                    setMode('select');
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [state.selectedElement, setMode, selectElement, removeElement]);

    const handleDocumentUpload = async (file: File) => {
        setIsLoading(true);
        try {
            await loadDocument(file);
            toast.success('Document loaded successfully!');
        } catch (error) {
            console.error('Error loading document:', error);
            toast.error('Failed to load document. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCanvasClick = useCallback((e: React.MouseEvent) => {
        if (state.mode === 'select') {
            selectElement(null);
            return;
        }

        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / state.zoom;
        const y = (e.clientY - rect.top) / state.zoom;

        switch (state.mode) {
            case 'signature':
            case 'initials':
                // Open signature dialog, position will be used when saving
                setClickPosition({ x, y });
                setPendingElementType(state.mode);
                setShowSignaturePad(true);
                break;
            case 'text':
                // Open text dialog, position will be used when saving
                setClickPosition({ x, y });
                setPendingElementType('text');
                setTextInputValue('');
                setShowTextInput(true);
                break;
            case 'date':
                const today = new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                });
                addElement('date', today, { x, y });
                break;
            case 'checkbox':
                addElement('checkbox', 'unchecked', { x, y }, { width: 24, height: 24 });
                break;
        }
    }, [state.mode, state.zoom, addElement, selectElement]);

    const handleSignatureSave = useCallback((signatureDataUrl: string) => {
        setSignatureImage(signatureDataUrl);
        if (pendingElementType === 'signature' || pendingElementType === 'initials') {
            addElement(pendingElementType, signatureDataUrl, clickPosition);
        }
        setShowSignaturePad(false);
        setPendingElementType(null);
    }, [pendingElementType, clickPosition, addElement, setSignatureImage]);

    const handleTextSave = useCallback(() => {
        if (textInputValue.trim()) {
            addElement('text', textInputValue, clickPosition);
        }
        setShowTextInput(false);
        setTextInputValue('');
        setPendingElementType(null);
    }, [textInputValue, clickPosition, addElement]);

    const handleDownload = async () => {
        if (state.elements.length === 0) {
            toast.warning('Please add at least one signature or element before downloading.');
            return;
        }

        setIsDownloading(true);
        try {
            const blob = await generateSignedDocument();
            const fileName = `signed_${state.document?.name || 'document'}`;
            saveAs(blob, fileName);
            toast.success('Document downloaded successfully!');
            onComplete?.(blob, fileName);
        } catch (error) {
            console.error('Error generating document:', error);
            toast.error('Failed to generate signed document. Please try again.');
        } finally {
            setIsDownloading(false);
        }
    };

    const handleClose = () => {
        reset();
        onCancel?.();
    };

    const currentPageElements = state.elements.filter(el => el.page === state.currentPage);

    return (
        <div className={cn('flex flex-col h-full bg-background', className)}>
            <AnimatePresence mode="wait">
                {!state.document ? (
                    /* Document upload screen */
                    <motion.div
                        key="uploader"
                        className="flex-1 flex items-center justify-center p-8"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                    >
                        <div className="w-full max-w-2xl">
                            {/* Header */}
                            <div className="text-center mb-8">
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-3">
                                        E-Sign Documents
                                    </h1>
                                    <p className="text-lg text-muted-foreground">
                                        Upload a document, add your signature, and download instantly
                                    </p>
                                </motion.div>
                            </div>

                            <DocumentUploader
                                onUpload={handleDocumentUpload}
                                isLoading={isLoading}
                            />

                            {onCancel && (
                                <motion.div
                                    className="mt-6 text-center"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <Button variant="ghost" onClick={handleClose}>
                                        <ArrowLeft className="w-4 h-4 mr-2" />
                                        Go Back
                                    </Button>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                ) : (
                    /* Editor screen */
                    <motion.div
                        key="editor"
                        className="flex-1 flex flex-col overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* Toolbar */}
                        <Toolbar
                            mode={state.mode}
                            zoom={state.zoom}
                            currentPage={state.currentPage}
                            totalPages={state.document.numPages}
                            hasElements={state.elements.length > 0}
                            onModeChange={setMode}
                            onZoomChange={setZoom}
                            onPageChange={setCurrentPage}
                            onClearAll={clearAll}
                            onDownload={handleDownload}
                            isDownloading={isDownloading}
                        />

                        {/* Document area */}
                        <div className="flex-1 overflow-auto bg-muted/20">
                            <DocumentCanvas
                                document={state.document}
                                currentPage={state.currentPage}
                                zoom={state.zoom}
                                onClick={handleCanvasClick}
                            >
                                {currentPageElements.map((element) => (
                                    <DraggableElement
                                        key={element.id}
                                        element={element}
                                        isSelected={state.selectedElement === element.id}
                                        zoom={state.zoom}
                                        onSelect={() => selectElement(element.id)}
                                        onUpdate={(updates) => updateElement(element.id, updates)}
                                        onDelete={() => removeElement(element.id)}
                                    />
                                ))}
                            </DocumentCanvas>
                        </div>

                        {/* Back button */}
                        <div className="absolute top-16 left-4 z-10">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => reset()}
                                className="gap-2"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Upload New
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Signature Pad Dialog */}
            <Dialog open={showSignaturePad} onOpenChange={setShowSignaturePad}>
                <DialogContent className="sm:max-w-lg p-0 overflow-hidden bg-transparent border-0">
                    <SignaturePad
                        initialSignature={undefined}
                        onSave={handleSignatureSave}
                        onCancel={() => setShowSignaturePad(false)}
                    />
                </DialogContent>
            </Dialog>

            {/* Text Input Dialog */}
            <Dialog open={showTextInput} onOpenChange={setShowTextInput}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Add Text</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="text-content">Text Content</Label>
                            <Input
                                id="text-content"
                                value={textInputValue}
                                onChange={(e) => setTextInputValue(e.target.value)}
                                placeholder="Enter your text..."
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleTextSave();
                                    }
                                }}
                                autoFocus
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setShowTextInput(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleTextSave}>
                                <Check className="w-4 h-4 mr-2" />
                                Add Text
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
