const keys = {
  a: "left",
  ArrowLeft: "left",
  d: "right",
  ArrowRight: "right",
};

export function createKeyboardListener(document) {
  const state = {
    observers: [],
  };

  function subscribe(observerFunction) {
    state.observers.push(observerFunction);
  }

  function unsubscribeAll(observerFunction) {
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
    const keyPressed = keys[event.key];

    const command = {
      type: "move-player",
      typePress: "pressDown",
      keyPressed,
    };

    notifyAll(command);
  }

  function handleKeyup(event) {
    const keyPressed = keys[event.key];

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

