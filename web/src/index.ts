import { createElement } from "react";
import { hydrate } from "react-dom";
import { PageRenderer } from "@valotas/valotas.com-frontent";

window.addEventListener("load", () => {
  const script = document.querySelector("script[type='application/json']");
  if (!script) {
    return;
  }
  const decoded = atob(script.innerHTML);
  const renderProps = JSON.parse(decoded);

  const root = document.getElementById("app");

  hydrate(createElement(PageRenderer, { props: renderProps }), root);
});
