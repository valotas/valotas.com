import { history, PageRenderer } from "@valotas/valotas-frontend";
import { createElement } from "react";
import { hydrateRoot } from "react-dom/client";

window.addEventListener("load", () => {
  const script = document.querySelector("script[type='application/json']");
  if (!script) {
    return;
  }

  const root = document.getElementById("app");
  if (!root) {
    return;
  }
  const payload = atob(script.innerHTML);

  // push the current state
  history().pushState(payload, document.title);

  hydrateRoot(root, createElement(PageRenderer, { payload }));
});
