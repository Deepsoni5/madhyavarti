import type { Metadata } from 'next';
import { ESignPage } from './esign-page';

export const metadata: Metadata = {
    title: 'E-Sign Documents | Madhyavarti Solutions',
    description: 'Sign your documents electronically. Upload PDF or image files, add your signature, and download instantly. Secure, fast, and professional e-signature solution.',
    keywords: ['e-sign', 'electronic signature', 'digital signature', 'sign documents online', 'PDF signature'],
    openGraph: {
        title: 'E-Sign Documents | Madhyavarti Solutions',
        description: 'Sign your documents electronically. Upload PDF or image files, add your signature, and download instantly.',
        type: 'website',
    },
};

export default function Page() {
    return <ESignPage />;
}
