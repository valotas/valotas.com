#!/usr/bin/env node

import { readFileSync } from "fs";
import { resolve } from "path";
import { PDFDocument } from "pdf-lib";

const [pdfFile] = process.argv.slice(2);

if (!pdfFile) {
  console.error("Usage: npx ts-node src/read-metadata.ts <pdf-file>");
  process.exit(1);
}

async function readMetadata() {
  try {
    const pdfPath = resolve(pdfFile);
    const pdfBytes = readFileSync(pdfPath);
    const pdfDoc = await PDFDocument.load(pdfBytes as unknown as ArrayBuffer);

    const title = pdfDoc.getTitle();
    const author = pdfDoc.getAuthor();
    const subject = pdfDoc.getSubject();
    const keywords = pdfDoc.getKeywords();
    const creator = pdfDoc.getCreator();
    const producer = pdfDoc.getProducer();
    const creationDate = pdfDoc.getCreationDate();
    const modificationDate = pdfDoc.getModificationDate();

    console.log("📄 PDF Metadata:");
    console.log("================");
    if (title) console.log(`Title:              ${title}`);
    if (author) console.log(`Author:             ${author}`);
    if (subject) console.log(`Subject:            ${subject}`);
    if (keywords) console.log(`Keywords:           ${keywords}`);
    if (creator) console.log(`Creator:            ${creator}`);
    if (producer) console.log(`Producer:           ${producer}`);
    if (creationDate) console.log(`Creation Date:      ${creationDate}`);
    if (modificationDate)
      console.log(`Modification Date:  ${modificationDate}`);

    const pageCount = pdfDoc.getPageCount();
    console.log(`\nPages:              ${pageCount}`);
  } catch (error) {
    console.error("❌ Error reading PDF metadata:");
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
    process.exit(1);
  }
}

readMetadata();
