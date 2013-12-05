declare module "less-middleware" {
  import express = require('express');

  function l(config: any): express.Handler;

  export = l
}
