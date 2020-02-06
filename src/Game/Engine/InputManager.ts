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

  private registerEvent(eventType: InputEvent) {
    document.addEventListener(eventType, (e: KeyboardEvent) => {
      this.keyEvent(eventType, e);
    });
  }

  public static destroy() {
    InputManager.instance = null;
  }

  public subscribeToEvent(callback: CallbackType, ...eventType: InputEvent[]) {
    eventType.forEach(evt => {
      if (this.callbackMap.has(evt)) {
        this.callbackMap.set(evt, [...this.callbackMap.get(evt)!, callback]);
      } else {
        this.registerEvent(evt);
        this.callbackMap.set(evt, [callback]);
      }
    });
  }

  private keyEvent(eventType: InputEvent, e: KeyboardEvent) {
    this.callbackMap.get(eventType)?.forEach(callback => {
      callback(e);
    });
  }
}

export default InputManager;
