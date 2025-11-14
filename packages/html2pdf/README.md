# @valotas/html2pdf

A TypeScript package that converts HTML to PDF using Playwright, with support for metadata extraction.

## Usage

```bash
npm run convert -- path/to/input.html path/to/output.pdf
```

You can check the metadata of a pdf with:

```bash
npm run read-metadata -- path/to/output.pdf
```

### Build

```bash
npm run build
```

### Test

```bash
npm test
```

### Watch Mode

```bash
npm run watch:build
npm run watch:test
```

### Lint

```bash
npm run lint
npm run fix
```

## Notes

- Playwright requires Chromium browser to be installed
- The first PDF generation may take longer as Chromium is downloaded
- Network timeouts and page load strategies are configurable
- PDF/A-1b compliance requires the `pdf-lib` package to be installed

## License

This package is part of the valotas.com project. See the main repository for license information.
