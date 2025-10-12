import { initialState, loadAssets } from "./ritual.js";
import { drawScene } from "./draw.js";
import { handleKeyPress } from "./movement.js";

const canvas = document.getElementById("ritualCanvas");
const ctx = canvas.getContext("2d");

loadAssets(["balcony", "guard", "thief", "plant"], assets => {
  drawScene(ctx, assets, initialState);
  document.addEventListener("keydown", e => handleKeyPress(e, initialState, ctx, assets));
});
