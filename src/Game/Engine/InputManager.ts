type InputEvent = "keydown" | "keyup" | "keypress";
type CallbackType = (e: KeyboardEvent) => void;

class InputManager {
  private static instance: InputManager | null;

  private callbackMap: Map<InputEvent, CallbackType[]> = new Map();

  private constructor() {}

  public static getInstance(): InputManager {
    if (!InputManager.instance) {
      InputManager.instance = new InputManager();
    }

    return InputManager.instance;
  }

  public registerEvent(eventType: InputEvent) {
    document.addEventListener(eventType, (e: KeyboardEvent) => {
      this.keyEvent(eventType, e);
    });
  }

  public static destroy() {
    InputManager.instance = null;
  }

  public subscribeToEvent(eventType: InputEvent, callback: CallbackType) {
    if (this.callbackMap.has(eventType)) {
      this.callbackMap.set(eventType, [...this.callbackMap.get(eventType)!, callback]);
    } else {
      this.registerEvent(eventType);
      this.callbackMap.set(eventType, [callback]);
    }
  }

  private keyEvent(eventType: InputEvent, e: KeyboardEvent) {
    this.callbackMap.get(eventType)?.forEach(callback => {
      callback(e);
    });
  }
}

export default InputManager;
