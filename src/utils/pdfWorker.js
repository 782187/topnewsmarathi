import { pdfjs } from 'react-pdf';

// Self-host the pdf.js worker via Vite's asset pipeline instead of pointing at a
// CDN — keeps the reader working offline/behind restrictive CSPs in production.
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();
