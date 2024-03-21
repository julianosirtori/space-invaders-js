import { imageLoader } from "./sprite.js";
import { globalState } from "./game.js";

export async function renderInitialGameScreen(ctx, game) {
  ctx.clearRect(0, 0, game.width, game.height);

  ctx.beginPath();

  ctx.font = "48px Press_start_2p";
  ctx.fillStyle = "#FF517B";
  ctx.shadowColor = "#FF517B";
  ctx.shadowBlur = 10;
  ctx.fillText("SPACE", game.width / 2 - 100, 300);
  ctx.fillStyle = "#ADFF00";
  ctx.shadowColor = "#ADFF00";
  ctx.fillText("INVADERS", game.width / 2 - 170, 360);
  ctx.font = "20px Press_start_2p";
  ctx.fillStyle = "#C0C0C0";
  ctx.shadowColor = "#C0C0C0";
  ctx.fillText("PRESS 'F' TO START THE GAME", game.width / 2 - 250, 500);
  ctx.shadowBlur = 0;

  ctx.font = "12px Press_start_2p";
  ctx.globalAlpha = 0.5;
  imageLoader.leftKey(ctx, 400, game.height - 150);
  imageLoader.rightKey(ctx, 450, game.height - 150);
  ctx.fillText("to move, ", 550, game.height - 85);
  imageLoader.spaceKey(ctx, 620, game.height - 150);
  ctx.fillText("to shoot ", 780, game.height - 85);
  ctx.globalAlpha = 1;

  ctx.closePath();
}

export async function renderGameOverScreen(ctx, game) {
  ctx.clearRect(0, 0, game.width, game.height);

  ctx.beginPath();

  ctx.font = "48px Press_start_2p";
  ctx.fillStyle = "#FF517B";
  ctx.shadowColor = "#FF517B";
  ctx.shadowBlur = 10;
  ctx.fillText("YOU LOSE !", game.width / 2 - 220, 300);
  ctx.fillStyle = "#ADFF00";
  ctx.shadowColor = "#ADFF00";
  ctx.font = "24px Press_start_2p";
  ctx.fillText(
    `SCORE: ${globalState.score} BEST: ${globalState.bestScore}`,
    game.width / 2 - 180,
    360
  );
  ctx.font = "20px Press_start_2p";
  ctx.fillStyle = "#C0C0C0";
  ctx.shadowColor = "#C0C0C0";
  ctx.fillText("PRESS 'F' TO RESTART", game.width / 2 - 180, 500);
  ctx.shadowBlur = 0;

  ctx.closePath();
}

export async function renderGameWin(ctx, game) {
  ctx.clearRect(0, 0, game.width, game.height);

  ctx.beginPath();

  ctx.font = "48px Press_start_2p";
  ctx.fillStyle = "#ADFF00";
  ctx.shadowColor = "#ADFF00";
  ctx.shadowBlur = 10;
  ctx.fillText("Victory!", game.width / 2 - 180, 300);
  ctx.font = "20px Press_start_2p";
  ctx.fillStyle = "#C0C0C0";
  ctx.shadowColor = "#C0C0C0";
  ctx.fillText("PRESS 'F' TO RESTART", game.width / 2 - 200, 500);
  ctx.shadowBlur = 0;

  ctx.closePath();
}

export async function renderGameScreen(ctx, game) {
  ctx.clearRect(0, 0, game.width, game.height);

  renderScore(ctx, game);
  game.checkCollision();
  renderPlayer(ctx, game);
  renderGroupOfInvaders(ctx, game);
  game.groupOfInvaders.checkCollision();
}

function renderScore(ctx, game) {
  ctx.beginPath();
  ctx.fillStyle = "#C0C0C0";
  ctx.font = " 20px Press_start_2p";
  ctx.fillText("SCORE:", game.width / 2 - 100, 70);
  ctx.fillText(globalState.score, game.width / 2 + 20, 70);
  ctx.closePath();
}

function renderPlayer(ctx, game) {
  if (game.player.rightPressed) {
    game.player.playerToRight();
  }
  if (game.player.leftPressed) {
    game.player.playerToLeft();
  }

  renderProjectilePlayer(ctx, game);

  imageLoader.player(ctx, game.player.x - 30, game.player.y);
}

function renderProjectilePlayer(ctx, game) {
  if (!game.player.projectile) {
    return;
  }

  if (game.player.projectile.y <= 0) {
    game.player.resetProjectile();
  }

  if (game.player.isShooting()) {
    game.player.projectile.y -= 15;
    imageLoader.projectilePlayer(
      ctx,
      game.player.projectile.x,
      game.player.projectile.y
    );
  }
}

function renderGroupOfInvaders(ctx, game) {
  game.groupOfInvaders.findDirection();

  const groupOfInvaders = game.groupOfInvaders;
  const typesPerLine = {
    0: "pink",
    1: "lemon",
  };
  for (let line = 0; line < groupOfInvaders.lines; line++) {
    const type = typesPerLine[line];
    for (let col = 0; col < groupOfInvaders.columns; col++) {
      groupOfInvaders.invaders[line][col].x =
        groupOfInvaders.x + groupOfInvaders.invaderWidth * col;
      groupOfInvaders.invaders[line][col].y = groupOfInvaders.y + 70 * line;
      groupOfInvaders.invaders[line][col].type = type;

      renderInvader(ctx, groupOfInvaders.invaders[line][col]);
    }
  }

  game.groupOfInvaders.moveGroup();
  game.groupOfInvaders.prepareToShoot();

  renderInvaderProjectiles(ctx, game);
}

const types = {
  pink: imageLoader.invasorPink,
  lemon: imageLoader.invasorLemon,
};

function renderInvader(ctx, invader) {
  if (!invader.isAlive) {
    return;
  }

  types[invader.type](ctx, invader.x, invader.y);
}

function renderInvaderProjectiles(ctx, game) {
  for (
    let index = 0;
    index < game.groupOfInvaders.projectiles.length;
    index++
  ) {
    const projectile = game.groupOfInvaders.projectiles[index];
    projectile.y += 7;
    imageLoader.projectileInvader(ctx, projectile.x, projectile.y);
  }
}

