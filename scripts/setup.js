import { GameContext } from "./game.js";
import { loadAllFonts } from "./fonts.js";

async function main() {
  await loadAllFonts();
  const canvas = document.querySelector("#canvas-painel");
  canvas.setAttribute("width", 1180);
  canvas.setAttribute("height", 820);

  const ctx = canvas.getContext("2d");

  const gameContext = new GameContext();
  gameContext.start();

  function render() {
    gameContext.render(ctx);
    window.requestAnimationFrame(render);
  }
  render();
}
main();

