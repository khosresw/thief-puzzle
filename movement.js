import { movePlant } from "./ritual.js";
import { drawScene } from "./draw.js";

export function handleKeyPress(e, state, ctx, assets) {
  if (state.movementLocked || state.retrievalComplete) return;

  let dx = 0, dy = 0;
  const key = e.key.toLowerCase();

  if (key === "arrowup" || key === "w") dy = -1;
  if (key === "arrowdown" || key === "s") dy = 1;
  if (key === "arrowleft" || key === "a") dx = -1;
  if (key === "arrowright" || key === "d") dx = 1;

  if (dx === 0 && dy === 0) return;

  const last = state.handPath[state.handPath.length - 1];
  const nx = last.x + dx;
  const ny = last.y + dy;

  if (nx >= 0 && nx < 22 && ny >= 0 && ny < 7) {
    const alreadyVisited = state.handPath.some(p => p.x === nx && p.y === ny);
    if (!alreadyVisited) {
      state.handPath.push({ x: nx, y: ny });

      if (nx === state.guardPos.x && ny === state.guardPos.y) {
        state.movementLocked = true;
        alert("🚨 Alarm triggered! The guard has spotted the thief.");
      }

      if (nx === 3 && ny === 2) {
        state.retrievalComplete = true;
        state.plantPos = movePlant({ x: nx, y: ny });
      }

      drawScene(ctx, assets, state);
    }
  }
}
