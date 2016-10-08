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

After that you can just `npm run deploy` in order to deploy the site assuming that you have the right keys at the right path in order to connent to the server passwordless.

## AWS deploy
Among the available npm scripts the `deploy` is available that should handle the creation of the website locally and the deployment
to AWS. In order to do that the [aws cli](http://docs.aws.amazon.com/cli/latest/userguide/installing.html) should be installed. If
that is the case, the following should be all you need:

```bash
npm run deploy
```
