const canvas = document.getElementById("ritualCanvas");
const ctx = canvas.getContext("2d");

const TILE_SIZE = 64;
const layout = Array(7).fill().map(() => Array(22).fill("0"));

const thiefPos = { x: 7, y: 0 };
const guardPos = { x: 7, y: 6 };
const plantStart = { x: 1.25, y: 0.9 };
let plantPos = { ...plantStart };
const balconyPos = { x: 7, y: 0 };

let handPath = [ { x: thiefPos.x, y: thiefPos.y } ];
let retrievalComplete = false;
let movementLocked = false;

const assets = {};
const assetNames = ["balcony", "guard", "thief", "plant"];
let loadedCount = 0;

function loadAssets() {
  assetNames.forEach(name => {
    const img = new Image();
    img.src = `assets/${name}.png`;
    img.onload = () => {
      assets[name] = img;
      loadedCount++;
      if (loadedCount === assetNames.length) drawScene();
    };
  });
}

function drawScene() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw grid background
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw hand path
  ctx.fillStyle = "#7b4a2b";
  handPath.forEach(pos => {
    ctx.fillRect(pos.x * TILE_SIZE + 24, pos.y * TILE_SIZE + 24, 16, 16);
  });

  // Draw balcony
  ctx.drawImage(assets.balcony, balconyPos.x * TILE_SIZE, balconyPos.y * TILE_SIZE, TILE_SIZE * 1.5, TILE_SIZE * 1.5);

  // Draw guard
  ctx.drawImage(assets.guard, guardPos.x * TILE_SIZE, guardPos.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);

  // Draw thief
  ctx.drawImage(assets.thief, thiefPos.x * TILE_SIZE, thiefPos.y * TILE_SIZE, TILE_SIZE * 0.5, TILE_SIZE * 0.5);

  // Draw plant
  let px = plantPos.x;
  let py = plantPos.y;
  if (px === 4 && py === 2) {
    px = 3;
    py = 0.9;
  }
  ctx.drawImage(assets.plant, px * TILE_SIZE, py * TILE_SIZE, TILE_SIZE * 0.5, TILE_SIZE * 0.5);

  // Ritual caption
  const caption = document.getElementById("caption");
  caption.textContent = retrievalComplete ? "🌱 Retrieval complete. The plant bows in silence." : "";
}

function movePlant(thiefPos) {
  const directions = [ [1,0], [-1,0], [0,1], [0,-1] ];
  for (let [dx, dy] of directions) {
    const nx = thiefPos.x + dx;
    const ny = thiefPos.y + dy;
    if (ny >= 0 && ny < layout.length && nx >= 0 && nx < layout[0].length) {
      return { x: nx, y: ny };
    }
  }
  return thiefPos;
}

document.addEventListener("keydown", e => {
  if (movementLocked || retrievalComplete) return;

  let dx = 0, dy = 0;
  if (e.key === "ArrowUp") dy = -1;
  if (e.key === "ArrowDown") dy = 1;
  if (e.key === "ArrowLeft") dx = -1;
  if (e.key === "ArrowRight") dx = 1;

  const last = handPath[handPath.length - 1];
  const nx = last.x + dx;
  const ny = last.y + dy;

  if (nx >= 0 && nx < layout[0].length && ny >= 0 && ny < layout.length) {
    const alreadyVisited = handPath.some(p => p.x === nx && p.y === ny);
    if (!alreadyVisited) {
      handPath.push({ x: nx, y: ny });

      if (nx === guardPos.x && ny === guardPos.y) {
        movementLocked = true;
        alert("🚨 Alarm triggered! The guard has spotted the thief.");
      }

      if (nx === 3 && ny === 2) {
        retrievalComplete = true;
        plantPos = movePlant({ x: nx, y: ny });
      }

      drawScene();
    }
  }
});

loadAssets();
