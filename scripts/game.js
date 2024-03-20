import { Player } from "./player.js";
import { GroupOfInvaders } from "./invader.js";
import { createKeyboardListener } from "./keyboard-listener.js";
import {
  renderInitialGameScreen,
  renderGameScreen,
  renderGameOverScreen,
  renderGameWin,
} from "./render.js";

const width = 1180;
const height = 820;

export function GameContext(ctx) {
  const globalState = {
    width: 1180,
    height: 820,
    screen: new InitialGame(),
  };
  const keyboardListener = createKeyboardListener();

  this.start = () => {
    subscribeListenerKeyboard();
    render();
  };

  const subscribeListenerKeyboard = () => {
    keyboardListener.unsubscribeAll();
    keyboardListener.subscribe(globalState.screen.handleCommand);
  };

  const nextState = () => {
    globalState.screen = globalState.screen.next();
    subscribeListenerKeyboard();
  };

  const render = () => {
    globalState.screen.render(ctx);
    window.requestAnimationFrame(render);
  };

  function InitialGame() {
    this.name = "INITIAL_GAME";
    this.width = width;
    this.height = height;

    this.next = function () {
      return new Game();
    };

    this.handleCommand = (command) => {
      const acceptedMoves = {
        pressDown: {
          start() {
            nextState();
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

    this.render = (ctx) => {
      renderInitialGameScreen(ctx, this);
    };
  }

  function Game() {
    this.name = "GAME";
    this.width = width;
    this.height = height;
    this.nextState = new GameOver();

    this.next = function () {
      return this.nextState;
    };

    this.player = new Player(this);
    this.groupOfInvaders = new GroupOfInvaders(this);
    this.groupOfInvaders.createdInvaders();

    this.render = () => {
      renderGameScreen(ctx, this);
      if (this.player.isDead) {
        nextState();
      }
    };

    this.handleCommand = (command) => {
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

    this.checkCollision = () => {
      const invaders = this.groupOfInvaders.invaders;
      for (let row = 0; row < invaders.length; row++) {
        for (let col = 0; col < invaders[row].length; col++) {
          const invader = invaders[row][col];
          if (
            this.player.projectileX > invader.x &&
            this.player.projectileX < invader.x + 50 &&
            this.player.projectileY > invader.y &&
            this.player.projectileY < invader.y + 50 &&
            invader.isAlive
          ) {
            this.player.score += 100;
            invader.destroy();
            this.player.hit();

            if (this.player.score === 1600) {
              this.nextState = new GameWin();
              nextState();
            }
          }
        }
      }
    };
  }

  function GameOver() {
    this.name = "GAME_OVER";
    this.width = width;
    this.height = height;

    this.next = function () {
      return new Game();
    };

    this.handleCommand = (command) => {
      const acceptedMoves = {
        pressDown: {
          start() {
            nextState();
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

    this.render = () => {
      renderGameOverScreen(ctx, this);
    };
  }

  function GameWin() {
    this.name = "GAME_WIN";
    this.width = width;
    this.height = height;
    this.next = function () {
      return new Game();
    };

    this.handleCommand = (command) => {
      const acceptedMoves = {
        pressDown: {
          start() {
            nextState();
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

    this.render = () => {
      renderGameWin(ctx, this);
    };
  }
}

