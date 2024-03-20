const keys = {
  KeyA: "left",
  ArrowLeft: "left",
  KeyD: "right",
  ArrowRight: "right",
  Space: "space",
  KeyF: "start",
};

// observer pattern
export function createKeyboardListener() {
  const state = {
    observers: [],
  };

  function subscribe(observerFunction) {
    state.observers.push(observerFunction);
  }

  function unsubscribeAll() {
    state.observers = [];
  }

  function notifyAll(command) {
    for (const observerFunction of state.observers) {
      observerFunction(command);
    }
  }

  document.addEventListener("keydown", handleKeydown);
  document.addEventListener("keyup", handleKeyup);

  function handleKeydown(event) {
    const keyPressed = keys[event.code];

    const command = {
      type: "move-player",
      typePress: "pressDown",
      keyPressed,
    };

    notifyAll(command);
  }

  function handleKeyup(event) {
    const keyPressed = keys[event.code];

    const command = {
      type: "move-player",
      typePress: "pressUp",
      keyPressed,
    };

    notifyAll(command);
  }

  return {
    subscribe,
    unsubscribeAll,
  };
}

