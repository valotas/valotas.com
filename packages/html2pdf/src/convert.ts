#!/usr/bin/env node

import { readFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

import { extractMetadataFromHtml, html2pdf } from "./index.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const [inputFile, outputFile] = process.argv.slice(2);

if (!inputFile || !outputFile) {
  console.error("Usage: npm run convert -- <input.html> <output.pdf>");
  console.error("\nExample: npm run convert -- ./cv.html ./cv.pdf");
  process.exit(1);
}

async function convert() {
  const resolvedInput = resolve(inputFile);
  const resolvedOutput = resolve(outputFile);

  console.log(`📄 Converting: ${inputFile}`);
  console.log(`📁 Input:  ${resolvedInput}`);
  console.log(`📁 Output: ${resolvedOutput}`);

  try {
    // Read the HTML file
    let htmlContent = readFileSync(resolvedInput, "utf-8");

    const inputDir = dirname(resolvedInput);

    // Extract metadata from HTML meta tags
    const metadata = extractMetadataFromHtml(htmlContent);
    console.log(`📋 Extracted metadata from HTML`);
    if (metadata.title) console.log(`   Title: ${metadata.title}`);
    if (metadata.author) console.log(`   Author: ${metadata.author}`);
    if (metadata.subject) console.log(`   Subject: ${metadata.subject}`);

    // Inject CSS from relative paths into the HTML
    const cssRegex = /<link\s+rel="stylesheet"\s+href="([^"]+)"\s*\/?>/g;

    let match;
    while ((match = cssRegex.exec(htmlContent)) !== null) {
      const cssPath = match[1];
      // Only process relative paths (not absolute URLs)
      if (!cssPath.startsWith("http")) {
        try {
          const resolvedCssPath = resolve(inputDir, cssPath);
          const cssContent = readFileSync(resolvedCssPath, "utf-8");
          console.log(`📋 Injecting CSS: ${cssPath}`);
          const styleTag = `<style>${cssContent}</style>`;
          htmlContent = htmlContent.replace(match[0], styleTag);
        } catch (error) {
          console.warn(`⚠️  Could not load CSS file: ${cssPath}`);
        }
      }
    }

    // Convert relative image paths to base64 data URIs
    const imgRegex = /<img\s+([^>]*?)src="([^"]+)"([^>]*?)>/g;
    htmlContent = htmlContent.replace(
      imgRegex,
      (fullMatch, before, src, after) => {
        // Only process relative paths (not absolute URLs or data URIs)
        if (
          !src.startsWith("http") &&
          !src.startsWith("data:") &&
          !src.startsWith("file:")
        ) {
          try {
            const resolvedImgPath = resolve(inputDir, src);
            const imageBuffer = readFileSync(resolvedImgPath);
            const base64Image = imageBuffer.toString("base64");

            // Determine MIME type based on file extension
            const ext = resolvedImgPath.toLowerCase().split(".").pop();
            const mimeTypes: Record<string, string> = {
              jpg: "image/jpeg",
              jpeg: "image/jpeg",
              png: "image/png",
              gif: "image/gif",
              webp: "image/webp",
              svg: "image/svg+xml",
            };
            const mimeType = mimeTypes[ext || ""] || "image/png";

            console.log(`🖼️  Embedding image: ${src}`);
            return `<img ${before}src="data:${mimeType};base64,${base64Image}"${after}>`;
          } catch (error) {
            console.warn(`⚠️  Could not resolve image path: ${src}`);
            return fullMatch;
          }
        }
        return fullMatch;
      },
    );

    await html2pdf(htmlContent, {
      outputPath: resolvedOutput,
      metadata: {
        title: metadata.title || metadata.subject || "Document",
        author: metadata.author || "Georgios Valotasios",
        subject: metadata.subject || "Converted from HTML",
        keywords: metadata.keywords || "html, pdf, conversion",
        creator: "valotas@gmail.com",
      },
    });
    console.log(`\n✅ PDF created successfully!`);
    console.log(`📄 File: ${resolvedOutput}`);
    console.log(`📋 PDF/A-1b Compliant: Yes`);
  } catch (error) {
    console.error("\n❌ Error converting HTML to PDF:");
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
    process.exit(1);
  }
}

convert();
