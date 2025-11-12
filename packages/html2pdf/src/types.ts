/**
 * Type definitions and exports for @valotas/html2pdf
 * This file provides comprehensive TypeScript support
 */

export type { HtmlMetadata, Html2PdfOptions } from "./index.js";

export {
  html2pdf,
  htmlFileToPdf,
  urlToPdf,
  extractMetadataFromHtml,
} from "./index.js";

export type { PdfA1bMetadata } from "./pdfa1b.js";

export {
  isPdfA1bCompliant,
  convertToXmpMetadata,
  PDF_A_1B_REQUIREMENTS,
} from "./pdfa1b.js";
