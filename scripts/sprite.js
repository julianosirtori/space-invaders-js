export const imageLoader = new ImageLoader();

function ImageLoader() {
  this.image = new Image();
  this.image.src = "assets/sprites.png";

  this.player = (ctx, x, y) => {
    drawSprite(ctx, 154, 148, 136, 90, x, y, 136, 90);
  };

  this.invasorPink = (ctx, x, y) => {
    drawSprite(ctx, 362, 10, 80, 104, x, y, 80, 104);
  };

  this.invasorLemon = (ctx, x, y) => {
    drawSprite(ctx, 362, 134, 80, 102, x, y, 80, 102);
  };

  this.spaceKey = (ctx, x, y) => {
    drawSprite(ctx, 10, 10, 188, 118, x, y, 188, 118);
  };

  this.leftKey = (ctx, x, y) => {
    drawSprite(ctx, 220, 10, 124, 118, x, y, 124, 118);
  };

  this.rightKey = (ctx, x, y) => {
    drawSprite(ctx, 10, 148, 124, 118, x, y, 124, 118);
  };

  this.projectilePlayer = (ctx, x, y) => {
    drawSprite(ctx, 515, 164, 23, 48, x, y, 23, 48);
  };

  this.projectileInvader = (ctx, x, y) => {
    drawSprite(ctx, 510, 44, 31, 40, x, y, 31, 40);
  };

  return this;
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

