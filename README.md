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
To deploy make sure that you bump the version and deploy:

```bash
npm run bump [patch|minor|major]
fly deploy
```

