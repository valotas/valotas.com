/* eslint-disable no-undef, @typescript-eslint/no-var-requires */
const { enableFetchMocks } = require("jest-fetch-mock");
const React = require("react");

enableFetchMocks();
global.React = React;
