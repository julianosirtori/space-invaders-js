export class VisualEffects {
  constructor() {
    this.laserSound = new Audio();
    this.laserSound.src = "assets/laser.wav";

    this.explosion = new Audio();
    this.explosion.src = "assets/explosion.wav";
    this.explosion.volume = 0.3;
  }

  playLaseSound() {
    this.laserSound.play();
  }

  playExplosion() {
    this.explosion.play();
  }

  stopLaseSound() {
    this.laserSound.pause();
    this.laserSound.currentTime = 0;
  }

  stopExplosion() {
    this.explosion.pause();
    this.explosion.currentTime = 0;
  }
}

export class Musics {
  constructor() {
    this.opening = new Audio();
    this.opening.src = "assets/opening.ogg";

    this.gameTheme = new Audio();
    this.gameTheme.src = "assets/the_empire.ogg";

    this.victory = new Audio();
    this.victory.src = "assets/victory.ogg";

    this.gameOver = new Audio();
    this.gameOver.src = "assets/game_over.ogg";
  }

  playOpening() {
    this.opening.play();
  }

  playGameTheme() {
    this.gameTheme.play();
  }

  playVictory() {
    this.victory.play();
  }

  playGameOver() {
    this.gameOver.play();
  }

  stopAllMusics() {
    this.opening.pause();
    this.opening.currentTime = 0;

    this.gameTheme.pause();
    this.gameTheme.currentTime = 0;

    this.victory.pause();
    this.victory.currentTime = 0;

    this.gameOver.pause();
    this.gameOver.currentTime = 0;
  }
}

