'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import {
    MousePointer2,
    Pen,
    Type,
    Calendar,
    Hash,
    CheckSquare,
    ZoomIn,
    ZoomOut,
    Download,
    Trash2,
    ChevronLeft,
    ChevronRight,
    Maximize2,
    Menu,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ESignState } from '../types';

interface ToolbarProps {
    mode: ESignState['mode'];
    zoom: number;
    currentPage: number;
    totalPages: number;
    hasElements: boolean;
    onModeChange: (mode: ESignState['mode']) => void;
    onZoomChange: (zoom: number) => void;
    onPageChange: (page: number) => void;
    onClearAll: () => void;
    onDownload: () => void;
    isDownloading?: boolean;
}

interface ToolButtonProps {
    icon: React.ReactNode;
    label: string;
    isActive?: boolean;
    onClick: () => void;
    disabled?: boolean;
    variant?: 'default' | 'destructive';
    showLabel?: boolean;
}

function ToolButton({ icon, label, isActive, onClick, disabled, variant = 'default', showLabel = false }: ToolButtonProps) {
    const button = (
        <Button
            variant={isActive ? 'default' : 'ghost'}
            size={showLabel ? 'default' : 'icon'}
            onClick={onClick}
            disabled={disabled}
            className={cn(
                'transition-all',
                !showLabel && 'w-9 h-9 sm:w-10 sm:h-10',
                showLabel && 'justify-start gap-3 w-full',
                isActive && 'bg-primary text-primary-foreground shadow-lg',
                variant === 'destructive' && 'hover:bg-destructive hover:text-destructive-foreground'
            )}
        >
            {icon}
            {showLabel && <span>{label}</span>}
        </Button>
    );

    if (showLabel) {
        return button;
    }

    return (
        <TooltipProvider delayDuration={300}>
            <Tooltip>
                <TooltipTrigger asChild>
                    {button}
                </TooltipTrigger>
                <TooltipContent side="bottom" className="font-medium">
                    {label}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

export function Toolbar({
    mode,
    zoom,
    currentPage,
    totalPages,
    hasElements,
    onModeChange,
    onZoomChange,
    onPageChange,
    onClearAll,
    onDownload,
    isDownloading = false,
}: ToolbarProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const tools: { mode: ESignState['mode']; icon: React.ReactNode; label: string }[] = [
        { mode: 'select', icon: <MousePointer2 className="w-4 h-4 sm:w-5 sm:h-5" />, label: 'Select' },
        { mode: 'signature', icon: <Pen className="w-4 h-4 sm:w-5 sm:h-5" />, label: 'Signature' },
        { mode: 'initials', icon: <Hash className="w-4 h-4 sm:w-5 sm:h-5" />, label: 'Initials' },
        { mode: 'text', icon: <Type className="w-4 h-4 sm:w-5 sm:h-5" />, label: 'Text' },
        { mode: 'date', icon: <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />, label: 'Date' },
        { mode: 'checkbox', icon: <CheckSquare className="w-4 h-4 sm:w-5 sm:h-5" />, label: 'Checkbox' },
    ];

    const zoomLevels = [0.5, 0.75, 1, 1.25, 1.5, 2];

    return (
        <div className="flex items-center justify-between px-2 sm:px-4 py-2 sm:py-3 bg-card border-b border-border gap-1 sm:gap-4">
            {/* Mobile Menu Button */}
            <div className="flex md:hidden">
                <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="w-9 h-9">
                            <Menu className="w-5 h-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-72 max-h-[90vh] overflow-y-auto">
                        <SheetHeader>
                            <SheetTitle>Tools</SheetTitle>
                        </SheetHeader>
                        <div className="mt-6 space-y-2">
                            {tools.map((tool) => (
                                <ToolButton
                                    key={tool.mode}
                                    icon={tool.icon}
                                    label={tool.label}
                                    isActive={mode === tool.mode}
                                    onClick={() => {
                                        onModeChange(tool.mode);
                                        setMobileMenuOpen(false);
                                    }}
                                    showLabel
                                />
                            ))}

                            <Separator className="my-4" />

                            {/* Mobile zoom controls */}
                            <div className="flex items-center gap-2 px-2 py-3 bg-muted/50 rounded-lg">
                                <ToolButton
                                    icon={<ZoomOut className="w-4 h-4" />}
                                    label="Zoom Out"
                                    onClick={() => onZoomChange(Math.max(0.25, zoom - 0.25))}
                                    showLabel={false}
                                />
                                <span className="text-sm font-medium text-foreground min-w-[50px] text-center">
                                    {Math.round(zoom * 100)}%
                                </span>
                                <ToolButton
                                    icon={<ZoomIn className="w-4 h-4" />}
                                    label="Zoom In"
                                    onClick={() => onZoomChange(Math.min(3, zoom + 0.25))}
                                    showLabel={false}
                                />
                            </div>

                            <Separator className="my-4" />

                            <ToolButton
                                icon={<Trash2 className="w-5 h-5" />}
                                label="Clear All"
                                onClick={() => {
                                    onClearAll();
                                    setMobileMenuOpen(false);
                                }}
                                disabled={!hasElements}
                                variant="destructive"
                                showLabel
                            />
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

            {/* Desktop Tools */}
            <div className="hidden md:flex items-center gap-8">
                {tools.map((tool) => (
                    <ToolButton
                        key={tool.mode}
                        icon={tool.icon}
                        label={tool.label}
                        isActive={mode === tool.mode}
                        onClick={() => onModeChange(tool.mode)}
                    />
                ))}

                <Separator orientation="vertical" className="h-8 mx-2" />

                <ToolButton
                    icon={<Trash2 className="w-5 h-5" />}
                    label="Clear All"
                    onClick={onClearAll}
                    disabled={!hasElements}
                    variant="destructive"
                />
            </div>

            {/* Mobile: Show active tool indicator */}
            <div className="flex md:hidden items-center gap-2">
                <div className="flex items-center gap-1 px-2 py-1.5 rounded-md bg-primary/10 text-primary border border-primary/20">
                    {tools.find(t => t.mode === mode)?.icon}
                    <span className="text-xs font-medium capitalize">{mode}</span>
                </div>
            </div>

            {/* Center - Page navigation (shown on all screens when multi-page) */}
            {totalPages > 1 && (
                <div className="flex items-center gap-1 sm:gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage <= 1}
                        className="w-7 h-7 sm:w-10 sm:h-10"
                    >
                        <ChevronLeft className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                    </Button>

                    <span className="text-xs sm:text-sm font-medium text-foreground min-w-[50px] sm:min-w-[80px] text-center">
                        {currentPage}/{totalPages}
                    </span>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage >= totalPages}
                        className="w-7 h-7 sm:w-10 sm:h-10"
                    >
                        <ChevronRight className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                    </Button>
                </div>
            )}

            {/* Right side - Zoom & Actions */}
            <div className="flex items-center gap-1">
                {/* Zoom controls - hidden on very small screens */}
                <div className="hidden sm:flex items-center gap-1">
                    <ToolButton
                        icon={<ZoomOut className="w-5 h-5" />}
                        label="Zoom Out"
                        onClick={() => onZoomChange(Math.max(0.25, zoom - 0.25))}
                    />

                    <div className="relative hidden lg:block">
                        <select
                            value={zoom}
                            onChange={(e) => onZoomChange(parseFloat(e.target.value))}
                            className="appearance-none bg-muted text-foreground text-sm font-medium px-3 py-2 rounded-md cursor-pointer hover:bg-muted/80 transition-colors min-w-[70px] text-center"
                        >
                            {zoomLevels.map((level) => (
                                <option key={level} value={level}>
                                    {Math.round(level * 100)}%
                                </option>
                            ))}
                        </select>
                    </div>

                    <ToolButton
                        icon={<ZoomIn className="w-5 h-5" />}
                        label="Zoom In"
                        onClick={() => onZoomChange(Math.min(3, zoom + 0.25))}
                    />

                    <ToolButton
                        icon={<Maximize2 className="w-5 h-5" />}
                        label="Fit to Screen"
                        onClick={() => onZoomChange(1)}
                    />

                    <Separator orientation="vertical" className="h-8 mx-2" />
                </div>

                {/* Download button - always visible */}
                <Button
                    onClick={onDownload}
                    disabled={isDownloading}
                    size="sm"
                    className="gap-1 sm:gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-xs sm:text-sm px-2 sm:px-4"
                >
                    {isDownloading ? (
                        <>
                            <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span className="hidden sm:inline">Processing...</span>
                        </>
                    ) : (
                        <>
                            <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="hidden xs:inline">Download</span>
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
}
