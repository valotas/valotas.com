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

## NGNX configuration
In order to have the old (blogger) urls working, just add the following rewrite rule to nginx:nginx

```
location / {
  rewrite "^/20[0-9]{2}/[0-9]{2}/(.*).html" http://valotas.com/$1/ permanent;
}
```
