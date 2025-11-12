#!/usr/bin/env node

import { resolve } from "path";
import { fileURLToPath } from "url";

import { htmlFileToPdf } from "./dist/index.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const [inputFile, outputFile] = process.argv.slice(2);

if (!inputFile || !outputFile) {
  console.error("Usage: npm run convert -- <input.html> <output.pdf>");
  console.error("\nExample: npm run convert -- ./cv.html ./cv.pdf");
  process.exit(1);
}

const resolvedInput = resolve(inputFile);
const resolvedOutput = resolve(outputFile);

console.log(`📄 Converting: ${inputFile}`);
console.log(`📁 Input:  ${resolvedInput}`);
console.log(`📁 Output: ${resolvedOutput}`);

try {
  await htmlFileToPdf(resolvedInput, {
    outputPath: resolvedOutput,
    metadata: {
      title: "Document",
      author: "Georgios Valotasios",
      subject: "Converted from HTML",
      keywords: "html, pdf, conversion",
    },
  });
  console.log(`\n✅ PDF created successfully!`);
  console.log(`📄 File: ${resolvedOutput}`);
} catch (error) {
  console.error("\n❌ Error converting HTML to PDF:");
  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error(error);
  }
  process.exit(1);
}
