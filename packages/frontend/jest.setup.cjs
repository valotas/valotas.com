/* eslint-disable no-undef, @typescript-eslint/no-var-requires */
const { TextEncoder } = require("util");

const { enableFetchMocks } = require("jest-fetch-mock");
const React = require("react");

enableFetchMocks();
global.React = React;
global.TextEncoder = TextEncoder;
//global.TextDecoder = TextDecoder;
//global.ArrayBuffer = ArrayBuffer;
//global.Uint8Array = Uint8Array;
