/**
 * Example: Converting HTML to PDF with metadata
 * This file demonstrates the basic usage of the @valotas/html2pdf package
 */

import { html2pdf, extractMetadataFromHtml } from "./index.js";

// Example 1: Basic HTML to PDF conversion
async function example1_basicConversion() {
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="title" content="Sample Document" />
      <meta name="author" content="John Doe" />
      <meta name="description" content="A sample PDF document" />
      <meta name="keywords" content="sample, pdf, example" />
      <title>Sample Document</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; }
        h1 { color: #333; }
        p { color: #666; }
      </style>
    </head>
    <body>
      <h1>Hello, PDF!</h1>
      <p>This is a basic example of HTML to PDF conversion.</p>
      <p>The metadata from the HTML meta tags will be extracted and embedded in the PDF.</p>
    </body>
    </html>
  `;

  await html2pdf(htmlContent, {
    outputPath: "./output/sample.pdf",
  });

  console.log("✓ Basic conversion complete: output/sample.pdf");
}

// Example 2: Custom dimensions and margins
async function example2_customDimensions() {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="title" content="Custom Size Document" />
      <title>Custom Size</title>
      <style>
        body { font-family: Arial; margin: 0; padding: 20px; }
        h1 { margin-top: 0; }
      </style>
    </head>
    <body>
      <h1>Custom Dimensions Example</h1>
      <p>This PDF is 5 inches wide by 7 inches tall.</p>
      <p>It has 1-inch margins on all sides.</p>
    </body>
    </html>
  `;

  await html2pdf(htmlContent, {
    outputPath: "./output/custom-size.pdf",
    width: 5,
    height: 7,
    marginTop: 1,
    marginBottom: 1,
    marginLeft: 1,
    marginRight: 1,
  });

  console.log(
    "✓ Custom dimensions conversion complete: output/custom-size.pdf",
  );
}

// Example 3: Metadata extraction and override
async function example3_metadataHandling() {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="title" content="Original Title" />
      <meta name="author" content="Original Author" />
      <meta name="description" content="Original description" />
    </head>
    <body>
      <h1>Metadata Override Example</h1>
      <p>The metadata below will override the HTML meta tags:</p>
      <ul>
        <li>Title: "New Title"</li>
        <li>Author: "New Author"</li>
      </ul>
    </body>
    </html>
  `;

  // Extract original metadata
  const originalMetadata = extractMetadataFromHtml(htmlContent);
  console.log("Original metadata:", originalMetadata);

  // Override with custom metadata
  await html2pdf(htmlContent, {
    outputPath: "./output/metadata-override.pdf",
    metadata: {
      title: "New Title",
      author: "New Author",
      description: "Custom description",
      keywords: "override, example, test",
    },
  });

  console.log(
    "✓ Metadata override conversion complete: output/metadata-override.pdf",
  );
}

// Example 4: Styled HTML with complex layout
async function example4_styledContent() {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="title" content="Styled Document" />
      <meta name="author" content="Design Team" />
      <title>Styled Document</title>
      <style>
        * { box-sizing: border-box; }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
        }
        header {
          background-color: #007bff;
          color: white;
          padding: 20px;
          margin-bottom: 20px;
        }
        h1 { margin: 0; }
        .content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .card {
          border: 1px solid #ddd;
          padding: 15px;
          border-radius: 5px;
        }
        .card h2 { margin-top: 0; color: #007bff; }
        code {
          background-color: #f4f4f4;
          padding: 2px 6px;
          border-radius: 3px;
          font-family: 'Courier New', monospace;
        }
      </style>
    </head>
    <body>
      <header>
        <h1>Styled HTML Example</h1>
        <p>This example demonstrates complex styling in PDF output</p>
      </header>

      <div class="content">
        <div class="card">
          <h2>Features</h2>
          <ul>
            <li>HTML to PDF conversion</li>
            <li>Metadata extraction</li>
            <li>Custom styling support</li>
            <li>PDF/A-1b compliance</li>
          </ul>
        </div>

        <div class="card">
          <h2>Usage</h2>
          <p>Use the <code>html2pdf</code> function to convert HTML to PDF.</p>
          <p>All CSS styling will be preserved in the output.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await html2pdf(htmlContent, {
    outputPath: "./output/styled.pdf",
  });

  console.log("✓ Styled content conversion complete: output/styled.pdf");
}

// Run all examples
async function runExamples() {
  try {
    console.log("Running @valotas/html2pdf examples...\n");

    await example1_basicConversion();
    await example2_customDimensions();
    await example3_metadataHandling();
    await example4_styledContent();

    console.log("\n✓ All examples completed successfully!");
  } catch (error) {
    console.error("Error running examples:", error);
    process.exit(1);
  }
}

// Export for use as module
export {
  example1_basicConversion,
  example2_customDimensions,
  example3_metadataHandling,
  example4_styledContent,
};

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runExamples();
}
