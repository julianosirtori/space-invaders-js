import { loadAllFonts } from "./fonts.js";
import { Game } from "./game.js";
import { createKeyboardListener } from "./keyboard-listener.js";

async function main() {
  await loadAllFonts();

  const game = new Game();

  const canvas = document.querySelector("#canvas-painel");
  canvas.setAttribute("width", game.width);
  canvas.setAttribute("height", game.height);

  const ctx = canvas.getContext("2d");
  const keyboardListener = createKeyboardListener(document);
  keyboardListener.subscribe(game.movePlayer);

  function render() {
    game.render(ctx);
    window.requestAnimationFrame(render);
  }
  render();
}
main();

