export const TILE_SIZE = 64;

export const layout = Array(7).fill().map(() => Array(22).fill("0"));

export const initialState = {
  thiefPos: { x: 7, y: 0 },
  guardPos: { x: 7, y: 6 },
  plantPos: { x: 1.25, y: 0.9 },
  balconyPos: { x: 7, y: 0 },
  handPath: [ { x: 7, y: 0 } ],
  retrievalComplete: false,
  movementLocked: false
};

export function movePlant(thiefPos) {
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

export function loadAssets(names, callback) {
  const assets = {};
  let loaded = 0;
  names.forEach(name => {
    const img = new Image();
    img.src = `assets/${name}.png`;
    img.onload = () => {
      assets[name] = img;
      loaded++;
      if (loaded === names.length) callback(assets);
    };
  });
}
