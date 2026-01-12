// E-Sign Module Types
export type DocumentType = 'pdf' | 'image';

export interface Position {
    x: number;
    y: number;
}

export interface Size {
    width: number;
    height: number;
}

export interface SignatureElement {
    id: string;
    type: 'signature' | 'text' | 'date' | 'initials' | 'checkbox';
    position: Position;
    size: Size;
    page: number;
    content: string; // Base64 for signature, text for text/date
    rotation: number;
    fontFamily?: string;
    fontSize?: number;
    color?: string;
    createdAt: Date;
}

export interface UploadedDocument {
    id: string;
    name: string;
    type: DocumentType;
    data: ArrayBuffer;
    numPages: number;
    thumbnail?: string;
}

export interface SignatureStyle {
    id: string;
    name: string;
    fontFamily: string;
    preview?: string;
}

export interface ESignState {
    document: UploadedDocument | null;
    elements: SignatureElement[];
    currentPage: number;
    zoom: number;
    selectedElement: string | null;
    isDrawing: boolean;
    mode: 'select' | 'signature' | 'text' | 'date' | 'initials' | 'checkbox';
    signatureImage: string | null;
}

export const SIGNATURE_FONTS: SignatureStyle[] = [
    { id: 'dancing', name: 'Elegant', fontFamily: '"Dancing Script", cursive' },
    { id: 'great-vibes', name: 'Classic', fontFamily: '"Great Vibes", cursive' },
    { id: 'pacifico', name: 'Modern', fontFamily: '"Pacifico", cursive' },
    { id: 'sacramento', name: 'Formal', fontFamily: '"Sacramento", cursive' },
    { id: 'homemade', name: 'Handwritten', fontFamily: '"Homemade Apple", cursive' },
];

export interface ESignEditorProps {
    onComplete?: (signedDocument: Blob, fileName: string) => void;
    onCancel?: () => void;
    className?: string;
    initialDocument?: File;
    compact?: boolean;
}
