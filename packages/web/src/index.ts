import { createElement } from "react";
import { hydrate } from "react-dom";
import { PageRenderer } from "@valotas/valotas.com-frontent";

window.addEventListener("load", () => {
  const script = document.querySelector("script[type='application/json']");
  if (!script) {
    return;
  }

  const root = document.getElementById("app");
  const payload = atob(script.innerHTML);

  // push the current state
  history.pushState(payload, document.title, location.pathname);

  hydrate(createElement(PageRenderer, { payload }), root);
});
