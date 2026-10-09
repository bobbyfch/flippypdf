import { useEffect, useRef } from 'react';
import Flippy, { type FlippyMode } from 'flippypdf';

export function PdfButton({ url, mode = 'book', onError = console.error }: {
  url: string; mode?: FlippyMode; onError?: (error: Error) => void;
}) {
  const viewer = useRef<Flippy | null>(null);
  useEffect(() => {
    const instance = new Flippy({ pdfUrl: url, mode, soundEnabled: false });
    viewer.current = instance;
    return () => { instance.destroy(); viewer.current = null; };
  }, [url, mode]);
  return <button type="button" onClick={() => {
    viewer.current?.open().catch(error => { if (error.name !== 'AbortError') onError(error); });
  }}>Read PDF</button>;
}
