import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { SignatureElement } from '../types';

interface DraggableElementProps {
  element: SignatureElement;
  isSelected: boolean;
  zoom: number;
  onSelect: () => void;
  onUpdate: (updates: Partial<SignatureElement>) => void;
  onDelete: () => void;
  onOpenEditor?: (el: SignatureElement) => void;
}

export function DraggableElement({
  element,
  isSelected,
  zoom,
  onSelect,
  onUpdate,
  onDelete,
  onOpenEditor,
}: DraggableElementProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState<string | null>(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [elementStart, setElementStart] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onSelect();

    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setElementStart({
      x: element.position.x,
      y: element.position.y,
      width: element.size.width,
      height: element.size.height,
    });
  }, [element.position, element.size, onSelect]);

  const handleResizeMouseDown = useCallback((e: React.MouseEvent, handle: string) => {
    e.stopPropagation();
    e.preventDefault();
    onSelect();

    setIsResizing(true);
    setResizeHandle(handle);
    setDragStart({ x: e.clientX, y: e.clientY });
    setElementStart({
      x: element.position.x,
      y: element.position.y,
      width: element.size.width,
      height: element.size.height,
    });
  }, [element.position, element.size, onSelect]);

  useEffect(() => {
    if (!isDragging && !isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      const dx = (e.clientX - dragStart.x) / zoom;
      const dy = (e.clientY - dragStart.y) / zoom;

      if (isDragging) {
        onUpdate({
          position: {
            x: Math.max(0, elementStart.x + dx),
            y: Math.max(0, elementStart.y + dy),
          },
        });
      } else if (isResizing && resizeHandle) {
        let newWidth = elementStart.width;
        let newHeight = elementStart.height;
        let newX = elementStart.x;
        let newY = elementStart.y;

        if (resizeHandle.includes('e')) {
          newWidth = Math.max(40, elementStart.width + dx);
        }
        if (resizeHandle.includes('w')) {
          newWidth = Math.max(40, elementStart.width - dx);
          newX = elementStart.x + dx;
        }
        if (resizeHandle.includes('s')) {
          newHeight = Math.max(20, elementStart.height + dy);
        }
        if (resizeHandle.includes('n')) {
          newHeight = Math.max(20, elementStart.height - dy);
          newY = elementStart.y + dy;
        }

        onUpdate({
          position: { x: Math.max(0, newX), y: Math.max(0, newY) },
          size: { width: newWidth, height: newHeight },
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      setResizeHandle(null);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragStart, elementStart, resizeHandle, zoom, onUpdate]);

  const renderContent = () => {
    switch (element.type) {
      case 'signature':
      case 'initials':
        return (
          <img
            src={element.content}
            alt={element.type}
            className="w-full h-full object-contain pointer-events-none select-none"
            draggable={false}
          />
        );
      case 'text':
      case 'date':
        return (
          <div
            className="w-full h-full flex items-center justify-center overflow-hidden"
            style={{
              fontFamily: element.fontFamily,
              fontSize: `${element.fontSize}px`,
              color: element.color,
            }}
          >
            {element.content}
          </div>
        );
      case 'checkbox':
        return (
          <div
            className={cn(
              'w-full h-full border-2 border-black rounded flex items-center justify-center',
              element.content === 'checked' ? 'bg-primary' : 'bg-white'
            )}
            onClick={(e) => {
              e.stopPropagation();
              onUpdate({
                content: element.content === 'checked' ? 'unchecked' : 'checked'
              });
            }}
          >
            {element.content === 'checked' && (
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  const resizeHandles = ['nw', 'ne', 'sw', 'se'];

  return (
    <motion.div
      ref={elementRef}
      className={cn(
        'absolute cursor-move',
        isSelected && 'z-50',
        isDragging && 'z-[100]'
      )}
      style={{
        left: element.position.x * zoom,
        top: element.position.y * zoom,
        width: element.size.width * zoom,
        height: element.size.height * zoom,
        transform: `rotate(${element.rotation}deg)`,
        transformOrigin: 'center center',
      }}
      onMouseDown={handleMouseDown}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onOpenEditor?.(element);
      }}
      onDoubleClick={() => onOpenEditor?.(element)}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      {/* Element content */}
      <div className="w-full h-full">{renderContent()}</div>

      {/* Original selection UI (border, handles, delete) - appears when selected */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Selection border */}
            <div className="absolute inset-0 border-2 border-primary rounded-sm" />

            {/* Resize handles */}
            {resizeHandles.map((handle) => (
              <div
                key={handle}
                className={cn(
                  'absolute w-3 h-3 bg-primary rounded-full pointer-events-auto',
                  'transform -translate-x-1/2 -translate-y-1/2',
                  'hover:scale-125 transition-transform shadow-md',
                  handle === 'nw' && 'top-0 left-0 cursor-nw-resize',
                  handle === 'ne' && 'top-0 left-full cursor-ne-resize',
                  handle === 'sw' && 'top-full left-0 cursor-sw-resize',
                  handle === 'se' && 'top-full left-full cursor-se-resize'
                )}
                onMouseDown={(e) => handleResizeMouseDown(e, handle)}
              />
            ))}

            {/* Delete button (only visible when selected) */}
            <button
              className="absolute -top-6 right-0 w-6 h-6 bg-destructive rounded-full flex items-center justify-center pointer-events-auto hover:scale-110 transition-transform shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              aria-label="Delete element"
            >
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
