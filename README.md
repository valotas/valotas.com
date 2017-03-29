# valotas.com website
Just my personal website

## Quickstart
Assuming that you have `nodejs` and `npm` installed, just do the following:

```bash
npm install
```

To compile typescript files:

```bash
npm run tsc
```

To have an intermediate development site:

```bash
gulp play
```

## Deploy
Among the available npm scripts the `deploy` is available that should handle the creation of the website locally and the deployment
to AWS.

### Requirements

In order to do that the [aws cli](http://docs.aws.amazon.com/cli/latest/userguide/installing.html) should be installed. If
that is the case, the following should be all you need:

### Deployment

For a patch release all you need is

```bash
npm run deploy
```

This script is actually an alias to `npm version patch`. If you need to do a minor or major release you have to manually run
the following

```bash
npm version minor -m "Release v%s"
```

adjusting minor appropriatelly.
