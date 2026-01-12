'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface DocumentCanvasProps {
    document: {
        data: ArrayBuffer;
        type: 'pdf' | 'image';
        numPages: number;
    };
    currentPage: number;
    zoom: number;
    onCanvasReady?: (width: number, height: number) => void;
    children?: React.ReactNode;
    onClick?: (e: React.MouseEvent) => void;
}

export function DocumentCanvas({
    document,
    currentPage,
    zoom,
    onCanvasReady,
    children,
    onClick,
}: DocumentCanvasProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const renderTaskRef = useRef<any>(null);
    const abortControllerRef = useRef<AbortController | null>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const renderDocument = useCallback(async () => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Cancel previous render and abort controller
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        abortControllerRef.current = new AbortController();
        const signal = abortControllerRef.current.signal;

        // Cancel any ongoing PDF render task
        if (renderTaskRef.current) {
            try {
                await renderTaskRef.current.cancel();
            } catch (err) {
                // Ignore cancellation errors
            }
            renderTaskRef.current = null;
        }

        // Check if aborted before continuing
        if (signal.aborted) return;

        setIsLoading(true);
        setError(null);

        try {
            if (document.type === 'pdf') {
                // Dynamically import pdfjs-dist
                const pdfjsLib = await import('pdfjs-dist');

                if (signal.aborted) return;

                // Set worker source from CDN
                pdfjsLib.GlobalWorkerOptions.workerSrc =
                    `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

                // Clone the ArrayBuffer to prevent detachment issues
                const clonedData = document.data.slice(0);

                if (signal.aborted) return;

                // Load the PDF document with the cloned data
                const loadingTask = pdfjsLib.getDocument({
                    data: clonedData
                });

                const pdf = await loadingTask.promise;

                if (signal.aborted) return;

                const page = await pdf.getPage(currentPage);

                if (signal.aborted) return;

                // Get viewport with desired scale
                const viewport = page.getViewport({ scale: 1 });

                // Clear the canvas before setting new dimensions
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Set canvas dimensions
                canvas.width = viewport.width;
                canvas.height = viewport.height;

                setDimensions({ width: viewport.width, height: viewport.height });
                onCanvasReady?.(viewport.width, viewport.height);

                if (signal.aborted) return;

                // Render the page and store the render task
                const renderTask = page.render({
                    canvasContext: ctx,
                    viewport,
                });

                renderTaskRef.current = renderTask;
                await renderTask.promise;

                if (signal.aborted) return;

                renderTaskRef.current = null;
            } else {
                // Handle image rendering
                const blob = new Blob([document.data]);
                const url = URL.createObjectURL(blob);

                const img = new Image();
                await new Promise<void>((resolve, reject) => {
                    img.onload = () => {
                        canvas.width = img.width;
                        canvas.height = img.height;

                        setDimensions({ width: img.width, height: img.height });
                        onCanvasReady?.(img.width, img.height);

                        ctx.drawImage(img, 0, 0);
                        URL.revokeObjectURL(url);
                        resolve();
                    };
                    img.onerror = () => {
                        URL.revokeObjectURL(url);
                        reject(new Error('Failed to load image'));
                    };
                    img.src = url;
                });
            }
        } catch (err) {
            // Ignore abort errors
            if (signal.aborted) return;

            console.error('Error rendering document:', err);
            // Only show error if it's not a cancellation error
            if (err instanceof Error && !err.message.includes('cancel')) {
                setError('Failed to render document');
            }
        } finally {
            if (!signal.aborted) {
                setIsLoading(false);
            }
        }
    }, [document, currentPage, onCanvasReady]);

    useEffect(() => {
        renderDocument();

        // Cleanup: abort and cancel any ongoing render when deps change or unmount
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
                abortControllerRef.current = null;
            }
            if (renderTaskRef.current) {
                renderTaskRef.current.cancel().catch(() => {
                    // Ignore cancellation errors
                });
                renderTaskRef.current = null;
            }
        };
    }, [renderDocument]);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full bg-muted/20 overflow-auto"
            onClick={onClick}
        >
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/90 backdrop-blur-sm z-50">
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                        <p className="text-sm text-muted-foreground">Loading document...</p>
                    </div>
                </div>
            )}

            {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-destructive/10 z-50">
                    <p className="text-destructive font-medium">{error}</p>
                </div>
            )}

            <div className="w-full flex justify-start md:justify-center p-2 sm:p-4">
                <div className="relative bg-white shadow-2xl rounded-lg border border-border max-w-full md:max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        style={{
                            transform: `scale(${zoom})`,
                            transformOrigin: 'top left',
                        }}
                    >
                        <canvas
                            ref={canvasRef}
                            className="block w-full h-full"
                        />

                        <div
                            className="absolute inset-0"
                            style={{
                                pointerEvents: 'none',
                            }}
                        >
                            <div style={{ pointerEvents: 'auto' }}>
                                {children}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}