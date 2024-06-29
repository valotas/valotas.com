import "../src/assets.css";
import "prismjs/themes/prism-okaidia.css";
import { domSheet } from "twind/sheets";
import { setup } from "../src/twind.js";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => {
    setup({ sheet: domSheet() });
    return <Story />;
  },
];
