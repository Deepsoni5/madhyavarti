'use client';

import { useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
    Upload,
    FileText,
    Image as ImageIcon,
    FileCheck,
    Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface DocumentUploaderProps {
    onUpload: (file: File) => void;
    isLoading?: boolean;
    className?: string;
}

export function DocumentUploader({ onUpload, isLoading = false, className }: DocumentUploaderProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const dropZoneRef = useRef<HTMLDivElement>(null);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const file = e.dataTransfer.files[0];
        if (file && isValidFile(file)) {
            onUpload(file);
        }
    }, [onUpload]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && isValidFile(file)) {
            onUpload(file);
        }
    }, [onUpload]);

    const isValidFile = (file: File): boolean => {
        const validTypes = [
            'application/pdf',
            'image/png',
            'image/jpeg',
            'image/jpg',
            'image/webp',
        ];
        return validTypes.includes(file.type);
    };

    const features = [
        { icon: <FileCheck className="w-5 h-5" />, text: 'PDF Documents' },
        { icon: <ImageIcon className="w-5 h-5" />, text: 'PNG, JPG, WebP' },
        { icon: <Sparkles className="w-5 h-5" />, text: 'Instant Processing' },
    ];

    return (
        <motion.div
            className={cn('w-full', className)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div
                ref={dropZoneRef}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className={cn(
                    'relative border-2 border-dashed rounded-2xl transition-all duration-300',
                    'bg-gradient-to-br from-card to-card/50',
                    'hover:border-primary hover:shadow-lg hover:shadow-primary/10',
                    'group cursor-pointer',
                    isLoading && 'pointer-events-none opacity-60'
                )}
                onClick={() => fileInputRef.current?.click()}
            >
                {/* Animated background gradient */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <motion.div
                        className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/5 to-transparent"
                        animate={{
                            x: ['0%', '200%'],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                    />
                </div>

                <div className="relative p-12 flex flex-col items-center gap-6">
                    {/* Upload icon with animation */}
                    <motion.div
                        className="relative"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                    >
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30 group-hover:shadow-primary/50 transition-shadow">
                            <Upload className="w-10 h-10 text-white" />
                        </div>

                        {/* Pulsing rings */}
                        <motion.div
                            className="absolute inset-0 rounded-full border-2 border-primary/50"
                            animate={{
                                scale: [1, 1.5],
                                opacity: [0.5, 0],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: 'easeOut',
                            }}
                        />
                        <motion.div
                            className="absolute inset-0 rounded-full border-2 border-primary/50"
                            animate={{
                                scale: [1, 1.5],
                                opacity: [0.5, 0],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: 'easeOut',
                                delay: 0.5,
                            }}
                        />
                    </motion.div>

                    {/* Text content */}
                    <div className="text-center space-y-2">
                        <h3 className="text-2xl font-bold text-foreground">
                            Drop your document here
                        </h3>
                        <p className="text-muted-foreground">
                            or click to browse from your computer
                        </p>
                    </div>

                    {/* Supported formats */}
                    <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.text}
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 text-muted-foreground"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                {feature.icon}
                                <span className="text-sm font-medium">{feature.text}</span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Browse button */}
                    <Button
                        size="lg"
                        className="mt-4 gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity px-8"
                        onClick={(e) => {
                            e.stopPropagation();
                            fileInputRef.current?.click();
                        }}
                    >
                        <FileText className="w-5 h-5" />
                        Select Document
                    </Button>
                </div>

                {/* Hidden file input */}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg,.webp"
                    onChange={handleFileChange}
                    className="hidden"
                />
            </div>

            {/* Loading overlay */}
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-2xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                            <p className="text-foreground font-medium">Processing document...</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
