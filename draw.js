export function drawHandPath(ctx, path, color = "#7b4a2b") {
  ctx.fillStyle = color;
  path.forEach(pos => {
    ctx.fillRect(pos.x * 64 + 24, pos.y * 64 + 24, 16, 16);
  });
}

export function drawScene(ctx, assets, state) {
  const { thiefPos, guardPos, plantPos, balconyPos, handPath, retrievalComplete } = state;

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  drawHandPath(ctx, handPath);

  ctx.drawImage(assets.balcony, balconyPos.x * 64, balconyPos.y * 64, 96, 96);
  ctx.drawImage(assets.guard, guardPos.x * 64, guardPos.y * 64, 64, 64);
  ctx.drawImage(assets.thief, thiefPos.x * 64, thiefPos.y * 64, 32, 32);

  let px = plantPos.x, py = plantPos.y;
  if (px === 4 && py === 2) {
    px = 3; py = 0.9;
  }
  ctx.drawImage(assets.plant, px * 64, py * 64, 32, 32);

  document.getElementById("caption").textContent = retrievalComplete
    ? "🌱 Retrieval complete."
    : "";
}
