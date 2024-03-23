import { Player } from "./player.js";
import { GroupOfInvaders } from "./invader.js";
import { createKeyboardListener } from "./keyboard-listener.js";
import {
  renderInitialGameScreen,
  renderGameScreen,
  renderGameOverScreen,
  renderGameWin,
} from "./render.js";
import { Musics } from "./audio.js";

const width = 1180;
const height = 820;
export const globalState = {
  width: 1180,
  height: 820,
  screen: undefined,
  audios: new Musics(),
  score: 0,
  bestScore: 0,
};

export class GameContext {
  constructor(ctx) {
    this.ctx = ctx;

    this.keyboardListener = createKeyboardListener();
    globalState.screen = new InitialGame(this);
  }

  render(ctx) {
    globalState.screen.render(ctx);
  }

  start() {
    this.subscribeListenerKeyboard();
    this.render();
  }

  nextState() {
    globalState.screen = globalState.screen.next();
    globalState.audios.stopAllMusics();
    globalState.screen.startMusic();
    this.subscribeListenerKeyboard();
  }

  subscribeListenerKeyboard() {
    this.keyboardListener.unsubscribeAll();
    this.keyboardListener.subscribe(globalState.screen.handleCommand);
  }
}

class InitialGame {
  constructor(gameCtx) {
    this.gameContext = gameCtx;
    this.name = "INITIAL_GAME";
    this.width = width;
    this.height = height;
  }

  render(ctx) {
    renderInitialGameScreen(ctx, this);
  }

  next() {
    return new Game(this.gameContext);
  }

  startMusic() {
    globalState.audios.playOpening();
  }

  handleCommand = (command) => {
    const acceptedMoves = {
      pressDown: {
        start() {
          this.gameContext.nextState();
        },
      },
      pressUp: {},
    };
    const { typePress, keyPressed } = command;
    const keyFunction = acceptedMoves[typePress][keyPressed];
    if (keyFunction) {
      console.log(this);
      keyFunction.bind(this)();
    }
  };
}

class Game {
  constructor(gameContext) {
    this.gameContext = gameContext;
    this.name = "GAME";
    this.width = width;
    this.height = height;
    globalState.score = 0;

    this.player = new Player(this);
    this.groupOfInvaders = new GroupOfInvaders(this);
    this.groupOfInvaders.createdInvaders();

    this.nextState = new GameOver(this.gameContext);
  }

  next() {
    return this.nextState;
  }

  startMusic = () => {
    globalState.audios.playGameTheme();
  };

  render(ctx) {
    if (this.player.isDead) {
      this.gameContext.nextState();
    }
    renderGameScreen(ctx, this);
  }

  handleCommand = (command) => {
    const acceptedMoves = {
      pressDown: {
        right() {
          this.player.rightPressed = true;
        },
        left() {
          this.player.leftPressed = true;
        },
        space() {
          this.player.shoot();
        },
      },
      pressUp: {
        right() {
          this.player.rightPressed = false;
        },
        left() {
          this.player.leftPressed = false;
        },
      },
    };

    const { typePress, keyPressed } = command;
    const moveFunction = acceptedMoves[typePress][keyPressed];
    if (moveFunction) {
      moveFunction.bind(this)();
    }
  };

  checkCollision() {
    const invaders = this.groupOfInvaders.invaders;
    const deadInvaders = [];
    for (let row = 0; row < invaders.length; row++) {
      for (let col = 0; col < invaders[row].length; col++) {
        const invader = invaders[row][col];

        if (!invader.isAlive) {
          deadInvaders.push(invader);
        }

        if (
          this.player.projectile?.x > invader.x &&
          this.player.projectile?.x < invader.x + invader.width &&
          this.player.projectile?.y > invader.y &&
          this.player.projectile?.y < invader.y + invader.width &&
          invader.isAlive
        ) {
          globalState.score += 1 * this.groupOfInvaders.scoreMultiplier;
          invader.destroy();
          this.player.resetProjectile();
        }
      }
    }

    if (
      deadInvaders.length ===
      this.groupOfInvaders.lines * this.groupOfInvaders.columns
    ) {
      if (globalState.bestScore <= globalState.score) {
        globalState.bestScore = globalState.score;
      }
      this.nextState = new GameWin(this.gameContext);
      this.gameContext.nextState();
    }
  }
}

class GameOver {
  constructor(ctx) {
    this.gameContext = ctx;
    this.name = "GAME_OVER";
    this.width = width;
    this.height = height;
  }

  next() {
    return new Game(this.gameContext);
  }

  render(ctx) {
    renderGameOverScreen(ctx, this);
  }

  startMusic() {
    globalState.audios.playGameOver();
  }

  handleCommand = (command) => {
    const acceptedMoves = {
      pressDown: {
        start() {
          this.gameContext.nextState();
        },
      },
      pressUp: {},
    };
    const { typePress, keyPressed } = command;
    const keyFunction = acceptedMoves[typePress][keyPressed];
    if (keyFunction) {
      keyFunction.bind(this)();
    }
  };
}

class GameWin {
  constructor(gameContext) {
    this.gameContext = gameContext;
    this.name = "GAME_WIN";
    this.width = width;
    this.height = height;
  }

  next() {
    return new Game(this.gameContext);
  }

  render(ctx) {
    renderGameWin(ctx, this);
  }

  startMusic() {
    globalState.audios.playVictory();
  }

  handleCommand = (command) => {
    const acceptedMoves = {
      pressDown: {
        start() {
          this.gameContext.nextState();
        },
      },
      pressUp: {},
    };
    const { typePress, keyPressed } = command;
    const keyFunction = acceptedMoves[typePress][keyPressed];
    if (keyFunction) {
      keyFunction.bind(this)();
    }
  };
}

