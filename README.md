# valotas.com website
Just my personal website

## Quickstart
Assuming that you have `nodejs` and `npm` installed, just do the following:

```bash
npm install
```

To build everything just

```bash
npm run build
```

To have a storybook running with the frontend stuff

```bash
npm run sb
```

### Local serve

After building you can

```bash
npm run serve
```

in order to see the bundled distribution

## Deploy
Deployment is done as part of the versioning when on the `master` branch. Just

```bash
npm run bump [patch|minor|major]
```
