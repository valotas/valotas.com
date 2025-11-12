import { existsSync, mkdirSync, rmSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import { describe, it, expect, beforeAll, afterAll } from "@jest/globals";

import { extractMetadataFromHtml, html2pdf, Html2PdfOptions } from "./index.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const outputDir = join(__dirname, "..", "..", "test-output");

describe("html2pdf", () => {
  beforeAll(() => {
    // Create output directory if it doesn't exist
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }
  });

  afterAll(() => {
    // Clean up test files
    if (existsSync(outputDir)) {
      rmSync(outputDir, { recursive: true });
    }
  });

  describe("extractMetadataFromHtml", () => {
    it("should extract metadata from HTML meta tags", () => {
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta name="title" content="Test Document" />
          <meta name="author" content="John Doe" />
          <meta name="description" content="A test document" />
          <meta name="keywords" content="test, document, pdf" />
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width" />
        </head>
        <body>Test</body>
        </html>
      `;

      const metadata = extractMetadataFromHtml(html);

      expect(metadata.title).toBe("Test Document");
      expect(metadata.author).toBe("John Doe");
      expect(metadata.description).toBe("A test document");
      expect(metadata.keywords).toBe("test, document, pdf");
      expect(metadata.charset).toBeUndefined();
      expect(metadata.viewport).toBeUndefined();
    });

    it("should handle missing metadata gracefully", () => {
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Test</title>
        </head>
        <body>Test</body>
        </html>
      `;

      const metadata = extractMetadataFromHtml(html);

      expect(metadata).toEqual({});
    });

    it("should skip charset and viewport meta tags", () => {
      const html = `
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Test Author" />
      `;

      const metadata = extractMetadataFromHtml(html);

      expect(metadata.charset).toBeUndefined();
      expect(metadata.viewport).toBeUndefined();
      expect(metadata.author).toBe("Test Author");
    });

    it("should handle case-insensitive meta names", () => {
      const html = `
        <meta name="Title" content="Test Document" />
        <meta name="AUTHOR" content="John Doe" />
      `;

      const metadata = extractMetadataFromHtml(html);

      expect(metadata.title).toBe("Test Document");
      expect(metadata.author).toBe("John Doe");
    });
  });

  describe("html2pdf", () => {
    it("should create a PDF file from HTML content", async () => {
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta name="title" content="Test PDF" />
          <meta name="author" content="Test Author" />
          <title>Test PDF</title>
        </head>
        <body>
          <h1>Hello, PDF!</h1>
          <p>This is a test PDF generated from HTML.</p>
        </body>
        </html>
      `;

      const outputPath = join(outputDir, "test-output.pdf");
      const options: Html2PdfOptions = {
        outputPath,
      };

      await html2pdf(htmlContent, options);

      expect(existsSync(outputPath)).toBe(true);
    });

    it("should create a PDF with custom dimensions", async () => {
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head><title>Custom Size PDF</title></head>
        <body>
          <h1>Custom Size</h1>
          <p>This PDF should be 5x7 inches.</p>
        </body>
        </html>
      `;

      const outputPath = join(outputDir, "custom-size.pdf");
      const options: Html2PdfOptions = {
        outputPath,
        width: 5,
        height: 7,
      };

      await html2pdf(htmlContent, options);

      expect(existsSync(outputPath)).toBe(true);
    });

    it("should create a PDF with custom margins", async () => {
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head><title>Custom Margins PDF</title></head>
        <body>
          <h1>Custom Margins</h1>
          <p>This PDF should have 1-inch margins.</p>
        </body>
        </html>
      `;

      const outputPath = join(outputDir, "custom-margins.pdf");
      const options: Html2PdfOptions = {
        outputPath,
        marginTop: 1,
        marginBottom: 1,
        marginLeft: 1,
        marginRight: 1,
      };

      await html2pdf(htmlContent, options);

      expect(existsSync(outputPath)).toBe(true);
    });

    it("should extract and include metadata from HTML", async () => {
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta name="title" content="Metadata Test" />
          <meta name="author" content="Jane Smith" />
          <meta name="description" content="Testing metadata extraction" />
          <title>Metadata Test</title>
        </head>
        <body>
          <h1>Metadata Test</h1>
          <p>This PDF should include metadata.</p>
        </body>
        </html>
      `;

      const outputPath = join(outputDir, "with-metadata.pdf");
      const options: Html2PdfOptions = {
        outputPath,
      };

      await html2pdf(htmlContent, options);

      expect(existsSync(outputPath)).toBe(true);
    });

    it("should allow overriding extracted metadata", async () => {
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta name="title" content="Original Title" />
          <meta name="author" content="Original Author" />
        </head>
        <body>
          <h1>Metadata Override Test</h1>
        </body>
        </html>
      `;

      const outputPath = join(outputDir, "metadata-override.pdf");
      const options: Html2PdfOptions = {
        outputPath,
        metadata: {
          title: "Overridden Title",
          author: "Overridden Author",
          keywords: "test, override",
        },
      };

      await html2pdf(htmlContent, options);

      expect(existsSync(outputPath)).toBe(true);
    });

    it("should handle styled HTML content", async () => {
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; }
            h1 { color: #333; }
            p { line-height: 1.6; }
          </style>
        </head>
        <body>
          <h1>Styled Content</h1>
          <p>This paragraph has custom styling.</p>
          <p><strong>Bold text</strong> and <em>italic text</em>.</p>
        </body>
        </html>
      `;

      const outputPath = join(outputDir, "styled.pdf");
      const options: Html2PdfOptions = {
        outputPath,
      };

      await html2pdf(htmlContent, options);

      expect(existsSync(outputPath)).toBe(true);
    });
  });
});
