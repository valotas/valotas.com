/**
 * Utilities for PDF/A-1b compliance
 * PDF/A-1b is an ISO standard for long-term archival of PDF documents
 */

/**
 * Validates if a PDF is compliant with PDF/A-1b standard
 * Note: This is a helper function. Full validation requires additional tools.
 * For true PDF/A-1b validation, consider using dedicated validators like verapdf
 */
export function isPdfA1bCompliant(_pdfPath: string): boolean {
  // This is a placeholder for actual PDF/A-1b validation
  // In a real implementation, this would use a library like verapdf
  // or other PDF validation tools
  console.warn(
    "PDF/A-1b compliance validation is a placeholder. " +
      "For full validation, use dedicated tools like veraPDF",
  );
  return true;
}

/**
 * PDF/A-1b compliance requirements:
 * 1. All fonts must be embedded in the PDF
 * 2. No external links or references
 * 3. All images must be embedded
 * 4. Document must have proper metadata (XMP)
 * 5. No encryption or password protection
 * 6. Color space must be RGB, CMYK, or Gray
 * 7. No optional content (layers)
 * 8. No annotations with external references
 * 9. All text must have Unicode mapping
 * 10. Transparency is limited
 */

export const PDF_A_1B_REQUIREMENTS = {
  embedFonts: true,
  noExternalReferences: true,
  embedImages: true,
  requireMetadata: true,
  noEncryption: true,
  colorSpaces: ["RGB", "CMYK", "Gray"],
  noOptionalContent: true,
  noExternalAnnotations: true,
  unicodeMapping: true,
  limitedTransparency: true,
};

/**
 * PDF/A-1b metadata format (XMP)
 * These are the standard metadata fields for PDF/A-1b documents
 */
export interface PdfA1bMetadata {
  title?: string;
  author?: string;
  subject?: string;
  keywords?: string;
  creator?: string;
  producer?: string;
  creationDate?: Date;
  modificationDate?: Date;
  language?: string;
}

/**
 * Converts standard metadata to PDF/A-1b XMP format
 */
export function convertToXmpMetadata(
  metadata: Record<string, string>,
): PdfA1bMetadata {
  return {
    title: metadata.title,
    author: metadata.author,
    subject: metadata.description,
    keywords: metadata.keywords,
    creator: metadata.creator || "html2pdf",
    producer: "html2pdf with Playwright",
    language: metadata.language || "en",
  };
}
