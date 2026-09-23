/**
 * Type definitions and exports for @valotas/html2pdf
 * This file provides comprehensive TypeScript support
 */

export type { Html2PdfOptions, HtmlMetadata } from "./index.js";

export {
  extractMetadataFromHtml,
  html2pdf,
  htmlFileToPdf,
  urlToPdf,
} from "./index.js";

export type { PdfA1bMetadata } from "./pdfa1b.js";

export {
  convertToXmpMetadata,
  isPdfA1bCompliant,
  PDF_A_1B_REQUIREMENTS,
} from "./pdfa1b.js";
