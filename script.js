import { initialState, loadAssets } from "./ritual.js";
import { drawScene } from "./draw.js";
import { handleKeyPress } from "./movement.js";

const canvas = document.getElementById("ritualCanvas");
const ctx = canvas.getContext("2d");

loadAssets(["balcony", "guard", "thief", "plant"], assets => {
  drawScene(ctx, assets, initialState);
  document.addEventListener("keydown", e => handleKeyPress(e, initialState, ctx, assets));
});
// Enable mobile keyboard input via hidden field
const mobileInput = document.createElement("input");
mobileInput.type = "text";
mobileInput.id = "mobileKeyInput";
mobileInput.style.opacity = "0";
mobileInput.style.position = "absolute";
mobileInput.style.zIndex = "-1";
document.body.appendChild(mobileInput);

// Focus input on tap or button click
mobileInput.focus();

// Listen for key presses from mobile input
mobileInput.addEventListener("keydown", e => {
  handleKeyPress(e, initialState, ctx, assets);
});
