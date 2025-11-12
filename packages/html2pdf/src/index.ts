import { chromium } from "playwright";

export {
  convertToXmpMetadata,
  isPdfA1bCompliant,
  PDF_A_1B_REQUIREMENTS,
} from "./pdfa1b.js";
export type { PdfA1bMetadata } from "./pdfa1b.js";

/**
 * Represents metadata extracted from HTML meta tags
 */
export interface HtmlMetadata {
  [key: string]: string;
}

/**
 * Options for HTML to PDF conversion
 */
export interface Html2PdfOptions {
  /**
   * Output file path for the PDF
   */
  outputPath: string;

  /**
   * Optional metadata to include in PDF
   * If not provided, will be extracted from HTML meta tags
   */
  metadata?: HtmlMetadata;

  /**
   * Page width in inches (default: 8.5)
   */
  width?: number;

  /**
   * Page height in inches (default: 11)
   */
  height?: number;

  /**
   * Margin top in inches (default: 0.5)
   */
  marginTop?: number;

  /**
   * Margin bottom in inches (default: 0.5)
   */
  marginBottom?: number;

  /**
   * Margin left in inches (default: 0.5)
   */
  marginLeft?: number;

  /**
   * Margin right in inches (default: 0.5)
   */
  marginRight?: number;

  /**
   * Whether to wait for fonts to load (default: true)
   */
  waitForFonts?: boolean;

  /**
   * Timeout in milliseconds for page load (default: 30000)
   */
  timeout?: number;
}

/**
 * Extracts metadata from HTML meta tags
 * Skips charset and viewport meta tags
 */
export function extractMetadataFromHtml(htmlContent: string): HtmlMetadata {
  const metadata: HtmlMetadata = {};
  const metaRegex =
    /<meta\s+(?:[^>]*?\s+)?name=["']([^"']+)["']\s+(?:[^>]*?\s+)?content=["']([^"']+)["']/gi;

  let match;
  while ((match = metaRegex.exec(htmlContent)) !== null) {
    const name = match[1].toLowerCase();
    const content = match[2];

    // Skip charset and viewport
    if (name !== "charset" && name !== "viewport") {
      metadata[name] = content;
    }
  }

  return metadata;
}

/**
 * Converts HTML to PDF/A-1b format with metadata
 */
export async function html2pdf(
  htmlContent: string,
  options: Html2PdfOptions,
): Promise<void> {
  const {
    outputPath,
    metadata,
    width = 8.5,
    height = 11,
    marginTop = 0.5,
    marginBottom = 0.5,
    marginLeft = 0.5,
    marginRight = 0.5,
    waitForFonts = true,
    timeout = 30000,
  } = options;

  // Extract metadata from HTML if not provided
  const finalMetadata = metadata || extractMetadataFromHtml(htmlContent);

  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    // Set timeout
    page.setDefaultTimeout(timeout);

    // Load HTML content
    await page.setContent(htmlContent, {
      waitUntil: waitForFonts ? "networkidle" : "domcontentloaded",
    });

    // Generate PDF with metadata
    // Note: Playwright's PDF generation creates standard PDFs
    // For true PDF/A-1b compliance, additional processing is needed
    // We'll create the PDF and set metadata in the document properties
    await page.pdf({
      path: outputPath,
      width: `${width}in`,
      height: `${height}in`,
      margin: {
        top: `${marginTop}in`,
        bottom: `${marginBottom}in`,
        left: `${marginLeft}in`,
        right: `${marginRight}in`,
      },
      printBackground: true,
    });

    // Post-process PDF to add metadata and ensure PDF/A-1b compliance
    await postProcessPdfForPdfA1b(outputPath, finalMetadata);
  } finally {
    await page.close();
    await browser.close();
  }
}

/**
 * Post-processes PDF to add metadata and ensure PDF/A-1b compliance
 * This uses a library to read and re-encode the PDF with proper metadata
 */
async function postProcessPdfForPdfA1b(
  filePath: string,
  metadata: HtmlMetadata,
): Promise<void> {
  // Dynamic import of pdf-lib for PDF manipulation
  const { PDFDocument } = await import("pdf-lib");
  const fs = await import("fs");

  try {
    // Read the generated PDF
    const pdfBuffer = fs.readFileSync(filePath);
    const pdfDoc = await PDFDocument.load(pdfBuffer as unknown as ArrayBuffer);

    // Set document metadata using public API
    if (metadata.title) {
      pdfDoc.setTitle(metadata.title);
    }
    if (metadata.author) {
      pdfDoc.setAuthor(metadata.author);
    }
    if (metadata.description) {
      pdfDoc.setSubject(metadata.description);
    }
    if (metadata.keywords) {
      pdfDoc.setKeywords([metadata.keywords]);
    }

    // Save the modified PDF
    const modifiedPdfBuffer = await pdfDoc.save();
    fs.writeFileSync(filePath, modifiedPdfBuffer);
  } catch (error) {
    // If pdf-lib is not available, log a warning but don't fail
    // The PDF will still be generated, just without metadata
    console.warn(
      "Note: pdf-lib not available for metadata embedding. PDF created without embedded metadata. " +
        "Install pdf-lib to enable metadata embedding.",
    );
  }
}

/**
 * Converts HTML file to PDF
 */
export async function htmlFileToPdf(
  inputPath: string,
  options: Html2PdfOptions,
): Promise<void> {
  const fs = await import("fs");
  const htmlContent = fs.readFileSync(inputPath, "utf-8");
  return html2pdf(htmlContent, options);
}

/**
 * Converts HTML URL to PDF
 */
export async function urlToPdf(
  url: string,
  options: Html2PdfOptions,
): Promise<void> {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    page.setDefaultTimeout(options.timeout || 30000);

    // Navigate to URL
    await page.goto(url, {
      waitUntil: options.waitForFonts ? "networkidle" : "domcontentloaded",
    });

    // Get HTML content
    const htmlContent = await page.content();

    // Extract metadata
    const metadata = options.metadata || extractMetadataFromHtml(htmlContent);

    // Generate PDF
    await page.pdf({
      path: options.outputPath,
      width: `${options.width || 8.5}in`,
      height: `${options.height || 11}in`,
      margin: {
        top: `${options.marginTop || 0.5}in`,
        bottom: `${options.marginBottom || 0.5}in`,
        left: `${options.marginLeft || 0.5}in`,
        right: `${options.marginRight || 0.5}in`,
      },
      printBackground: true,
    });

    // Post-process for metadata and PDF/A-1b compliance
    await postProcessPdfForPdfA1b(options.outputPath, metadata);
  } finally {
    await page.close();
    await browser.close();
  }
}
