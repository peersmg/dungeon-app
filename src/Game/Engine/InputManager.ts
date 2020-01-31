type InputEvents = "keydown" | "keyup";
type CallbackType = (e: KeyboardEvent) => void;

class InputManager {
  private static instance: InputManager | null;

  private callbackMap: Map<InputEvents, CallbackType[]> = new Map();

  private constructor() {}

  public static getInstance(): InputManager {
    if (!InputManager.instance) {
      InputManager.instance = new InputManager();
    }

    return InputManager.instance;
  }

  public registerEvents() {
    document.addEventListener("keydown", (e: KeyboardEvent) => {
      this.keyDown(e);
    });

    document.addEventListener("keyup", (e: KeyboardEvent) => {
      this.keyUp(e);
    });
  }

  public static destroy() {
    InputManager.instance = null;
  }

  public subscribeToEvent(event: "keydown" | "keyup", callback: CallbackType) {
    if (this.callbackMap.has(event)) {
      this.callbackMap.set(event, [...this.callbackMap.get(event)!, callback]);
    } else {
      this.callbackMap.set(event, [callback]);
    }
  }

  private keyDown(e: KeyboardEvent) {
    this.callbackMap.get("keydown")?.forEach(callback => {
      callback(e);
    });
  }
  private keyUp(e: KeyboardEvent) {}
}

export default InputManager;
