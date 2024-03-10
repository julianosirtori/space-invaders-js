import { loadAllFonts } from "./fonts.js";
import { Game } from "./game.js";
import { createKeyboardListener } from "./keyboard-listener.js";

async function main() {
  await loadAllFonts();
  const canvas = document.querySelector("#canvas-painel");
  canvas.setAttribute("width", 1180);
  canvas.setAttribute("height", 820);

  const ctx = canvas.getContext("2d");

  const game = new Game(ctx);

  const keyboardListener = createKeyboardListener(document);
  keyboardListener.subscribe(game.movePlayer);

  function render() {
    game.render();
    window.requestAnimationFrame(render);
  }
  render();
}
main();

