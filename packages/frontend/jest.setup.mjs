/* eslint-disable no-undef */
import { TextEncoder } from "util";
import { createRequire } from "module";
import React from "preact/compat";

const require = createRequire(import.meta.url);
const { enableFetchMocks } = require("jest-fetch-mock");

enableFetchMocks();

global.React = React;
global.TextEncoder = TextEncoder;
