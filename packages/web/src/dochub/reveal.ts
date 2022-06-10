import Reveal from "reveal.js";
import RealNotes from "reveal.js/plugin/notes/notes";
import Hightlight from "reveal.js/plugin/highlight/highlight";

function onLoad(fn: () => void) {
  if (["complete", "interactive"].indexOf(document.readyState) >= 0) {
    fn();
  } else {
    document.addEventListener("load", fn);
  }
}

onLoad(() => {
  const deck = new Reveal({
    hash: true,
    plugins: [RealNotes, Hightlight],
  });
  deck.initialize();
});
