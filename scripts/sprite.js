class ImageLoader {
  constructor() {
    this.image = new Image();
    this.image.src = "assets/sprites.png";
  }

  player(ctx, x, y) {
    drawSprite(ctx, 154, 148, 136, 90, x, y, 136, 90);
  }

  invasorPink(ctx, x, y) {
    drawSprite(ctx, 362, 10, 80, 104, x, y, 80, 104);
  }

  invasorLemon(ctx, x, y) {
    drawSprite(ctx, 362, 134, 80, 102, x, y, 80, 102);
  }

  spaceKey(ctx, x, y) {
    drawSprite(ctx, 10, 10, 188, 118, x, y, 188, 118);
  }

  leftKey(ctx, x, y) {
    drawSprite(ctx, 220, 10, 124, 118, x, y, 124, 118);
  }

  rightKey(ctx, x, y) {
    drawSprite(ctx, 10, 148, 124, 118, x, y, 124, 118);
  }

  projectilePlayer(ctx, x, y) {
    drawSprite(ctx, 515, 164, 23, 48, x, y, 23, 48);
  }

  projectileInvader(ctx, x, y) {
    drawSprite(ctx, 510, 44, 31, 40, x, y, 31, 40);
  }
}

function drawSprite(
  ctx,
  sourceX,
  sourceY,
  width,
  height,
  destinationX,
  destinationY
) {
  ctx.drawImage(
    imageLoader.image,
    sourceX,
    sourceY,
    width,
    height,
    destinationX,
    destinationY,
    width,
    height
  );
}

export const imageLoader = new ImageLoader();

