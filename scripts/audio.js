export function VisualEffects() {
  this.laserSound = new Audio();
  this.laserSound.src = "assets/laser.wav";

  this.explosion = new Audio();
  this.explosion.src = "assets/explosion.wav";
  this.explosion.volume = 0.3;

  this.playLaseSound = () => {
    this.laserSound.play();
  };

  this.playExplosion = () => {
    this.explosion.play();
  };

  this.stopLaseSound = () => {
    this.laserSound.pause();
    this.laserSound.currentTime = 0;
  };

  this.stopExplosion = () => {
    this.explosion.pause();
    this.explosion.currentTime = 0;
  };
}

export function Musics() {
  this.opening = new Audio();
  this.opening.src = "assets/opening.ogg";

  this.gameTheme = new Audio();
  this.gameTheme.src = "assets/the_empire.ogg";

  this.victory = new Audio();
  this.victory.src = "assets/victory.ogg";

  this.gameOver = new Audio();
  this.gameOver.src = "assets/game_over.ogg";

  this.playOpening = () => {
    this.opening.play();
  };

  this.playGameTheme = () => {
    this.gameTheme.play();
  };

  this.playVictory = () => {
    this.victory.play();
  };

  this.playGameOver = () => {
    this.gameOver.play();
  };

  this.stopAllMusics = () => {
    this.opening.pause();
    this.opening.currentTime = 0;

    this.gameTheme.pause();
    this.gameTheme.currentTime = 0;

    this.victory.pause();
    this.victory.currentTime = 0;

    this.gameOver.pause();
    this.gameOver.currentTime = 0;
  };
}

