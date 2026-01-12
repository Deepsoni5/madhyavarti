import { useRef, useEffect, useState, useCallback } from 'react';
import SignaturePadLib from 'signature_pad';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
    Pen,
    Type,
    Upload,
    Trash2,
    Check,
    Undo2,
} from 'lucide-react';
import { SIGNATURE_FONTS, type SignatureStyle } from '../types';
import { cn } from '@/lib/utils';

interface SignaturePadProps {
    onSave: (signatureDataUrl: string) => void;
    onCancel: () => void;
    initialSignature?: string;
    defaultTab?: 'draw' | 'type' | 'upload';
    onTabChange?: (tab: 'draw' | 'type' | 'upload') => void;
}

export function SignaturePad({ onSave, onCancel, initialSignature, defaultTab = 'type', onTabChange }: SignaturePadProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const signaturePadRef = useRef<SignaturePadLib | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [activeTab, setActiveTab] = useState(defaultTab);
    const [typedText, setTypedText] = useState('');
    const [selectedFont, setSelectedFont] = useState<SignatureStyle>(SIGNATURE_FONTS[0]);
    const [penColor, setPenColor] = useState('#000000');
    const [penWidth, setPenWidth] = useState(2);
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);

    useEffect(() => {
        if (canvasRef.current && activeTab === 'draw') {
            const canvas = canvasRef.current;
            const ratio = Math.max(window.devicePixelRatio || 1, 1);

            canvas.width = canvas.offsetWidth * ratio;
            canvas.height = canvas.offsetHeight * ratio;
            canvas.getContext('2d')?.scale(ratio, ratio);

            signaturePadRef.current = new SignaturePadLib(canvas, {
                backgroundColor: 'rgba(255, 255, 255, 0)',
                penColor: penColor,
                minWidth: penWidth * 0.5,
                maxWidth: penWidth * 1.5,
            });

            return () => {
                signaturePadRef.current?.off();
            };
        }
    }, [activeTab, penColor, penWidth]);

    useEffect(() => {
        if (signaturePadRef.current) {
            signaturePadRef.current.penColor = penColor;
            signaturePadRef.current.minWidth = penWidth * 0.5;
            signaturePadRef.current.maxWidth = penWidth * 1.5;
        }
    }, [penColor, penWidth]);

    const handleClear = () => {
        if (activeTab === 'draw' && signaturePadRef.current) {
            signaturePadRef.current.clear();
        } else if (activeTab === 'type') {
            setTypedText('');
        } else if (activeTab === 'upload') {
            setUploadedImage(null);
        }
    };

    const handleUndo = () => {
        if (activeTab === 'draw' && signaturePadRef.current) {
            const data = signaturePadRef.current.toData();
            if (data.length > 0) {
                data.pop();
                signaturePadRef.current.fromData(data);
            }
        }
    };

    const handleSave = useCallback(() => {
        let dataUrl = '';

        if (activeTab === 'draw' && signaturePadRef.current) {
            if (signaturePadRef.current.isEmpty()) {
                return;
            }
            dataUrl = signaturePadRef.current.toDataURL('image/png');
        } else if (activeTab === 'type' && typedText.trim()) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            canvas.width = 400;
            canvas.height = 150;

            ctx.fillStyle = 'transparent';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = `48px ${selectedFont.fontFamily}`;
            ctx.fillStyle = penColor;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(typedText, canvas.width / 2, canvas.height / 2);

            dataUrl = canvas.toDataURL('image/png');
        } else if (activeTab === 'upload' && uploadedImage) {
            dataUrl = uploadedImage;
        }

        if (dataUrl) {
            onSave(dataUrl);
        }
    }, [activeTab, selectedFont, penColor, typedText, uploadedImage, onSave]);

    const handleTabChange = (tab: string) => {
        setActiveTab(tab as 'draw' | 'type' | 'upload');
        onTabChange?.(tab as 'draw' | 'type' | 'upload');
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setUploadedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const colorOptions = [
        '#000000', '#1e3a5f', '#2563eb', '#7c3aed', '#dc2626'
    ];

    return (
        <div className="bg-card border border-border rounded-xl p-6 shadow-2xl w-full max-w-lg">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Create Your Signature</h3>
                <Button variant="ghost" size="sm" onClick={onCancel}>
                    Cancel
                </Button>
            </div>

            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-4">
                    <TabsTrigger value="type" className="flex items-center gap-2">
                        <Type className="w-4 h-4" />
                        Type
                    </TabsTrigger>
                    <TabsTrigger value="draw" className="flex items-center gap-2">
                        <Pen className="w-4 h-4" />
                        Draw
                    </TabsTrigger>
                    <TabsTrigger value="upload" className="flex items-center gap-2">
                        <Upload className="w-4 h-4" />
                        Upload
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="type" className="space-y-4">
                    <Input
                        value={typedText}
                        onChange={(e) => setTypedText(e.target.value)}
                        placeholder="Type your signature..."
                        className="text-2xl h-14"
                    />

                    <div
                        className="border-2 border-dashed border-border rounded-lg p-8 bg-white dark:bg-gray-900 flex items-center justify-center min-h-[120px]"
                    >
                        <span
                            style={{
                                fontFamily: selectedFont.fontFamily,
                                fontSize: '48px',
                                color: penColor,
                            }}
                        >
                            {typedText || 'Your Signature'}
                        </span>
                    </div>

                    <div>
                        <Label className="text-sm text-muted-foreground mb-2 block">Font Style</Label>
                        <div className="grid grid-cols-2 gap-2">
                            {SIGNATURE_FONTS.map((font) => (
                                <button
                                    key={font.id}
                                    onClick={() => setSelectedFont(font)}
                                    className={cn(
                                        'p-3 rounded-lg border-2 transition-all text-left',
                                        selectedFont.id === font.id
                                            ? 'border-primary bg-primary/10'
                                            : 'border-border hover:border-primary/50'
                                    )}
                                >
                                    <span
                                        style={{ fontFamily: font.fontFamily }}
                                        className="text-lg text-foreground"
                                    >
                                        {font.name}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <Label className="text-sm text-muted-foreground mb-2 block">Signature Color</Label>
                        <div className="flex gap-2">
                            {colorOptions.map((color) => (
                                <button
                                    key={color}
                                    onClick={() => setPenColor(color)}
                                    className={cn(
                                        'w-8 h-8 rounded-full border-2 transition-all',
                                        penColor === color ? 'border-primary scale-110' : 'border-transparent'
                                    )}
                                    style={{ backgroundColor: color }}
                                />
                            ))}
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="draw" className="space-y-4">
                    <div
                        className="border-2 border-dashed border-border rounded-lg overflow-hidden bg-white dark:bg-gray-900"
                        style={{ touchAction: 'none' }}
                    >
                        <canvas
                            ref={canvasRef}
                            className="w-full cursor-crosshair"
                            style={{ height: '200px', display: 'block' }}
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex-1">
                            <Label className="text-sm text-muted-foreground mb-2 block">Pen Color</Label>
                            <div className="flex gap-2">
                                {colorOptions.map((color) => (
                                    <button
                                        key={color}
                                        onClick={() => setPenColor(color)}
                                        className={cn(
                                            'w-8 h-8 rounded-full border-2 transition-all',
                                            penColor === color ? 'border-primary scale-110' : 'border-transparent'
                                        )}
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="flex-1">
                            <Label className="text-sm text-muted-foreground mb-2 block">
                                Pen Width: {penWidth}px
                            </Label>
                            <Slider
                                value={[penWidth]}
                                onValueChange={([value]) => setPenWidth(value)}
                                min={1}
                                max={5}
                                step={0.5}
                                className="w-full"
                            />
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={handleUndo} className="flex-1">
                            <Undo2 className="w-4 h-4 mr-2" />
                            Undo
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleClear} className="flex-1">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Clear
                        </Button>
                    </div>
                </TabsContent>

                <TabsContent value="upload" className="space-y-4">
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                    />

                    {uploadedImage ? (
                        <div className="border-2 border-dashed border-border rounded-lg p-4 bg-white dark:bg-gray-900">
                            <img
                                src={uploadedImage}
                                alt="Uploaded signature"
                                className="max-h-[200px] mx-auto object-contain"
                            />
                        </div>
                    ) : (
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full border-2 border-dashed border-border rounded-lg p-8 hover:border-primary hover:bg-primary/5 transition-all flex flex-col items-center gap-3"
                        >
                            <Upload className="w-12 h-12 text-muted-foreground" />
                            <div className="text-center">
                                <p className="text-foreground font-medium">Click to upload signature</p>
                                <p className="text-sm text-muted-foreground">PNG, JPG up to 5MB</p>
                            </div>
                        </button>
                    )}

                    {uploadedImage && (
                        <Button variant="outline" size="sm" onClick={handleClear} className="w-full">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Remove Image
                        </Button>
                    )}
                </TabsContent>
            </Tabs>

            <div className="mt-6 pt-4 border-t border-border">
                <Button onClick={handleSave} className="w-full" size="lg">
                    <Check className="w-5 h-5 mr-2" />
                    Apply Signature
                </Button>
            </div>

            {/* Google Fonts for signature styles */}
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Great+Vibes&family=Pacifico&family=Sacramento&family=Homemade+Apple&display=swap');
            `}</style>
        </div>
    );
}