export const imageLoader = new ImageLoader();

function ImageLoader() {
  this.image = new Image();
  this.image.src = "assets/sprite.png";

  this.player = (ctx, x, y) => {
    drawSprite(ctx, 10, 10, 60, 30, x, y, 60, 30);
  };

  this.invasorRed = (ctx, x, y) => {
    drawSprite(ctx, 90, 10, 40, 32, x, y, 40, 32);
  };

  this.invasorGreen = (ctx, x, y) => {
    drawSprite(ctx, 10, 60, 40, 32, x, y, 40, 32);
  };

  this.invasorYellow = (ctx, x, y) => {
    drawSprite(ctx, 150, 10, 40, 32, x, y, 40, 32);
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

