type KeyEventTypes = "keydown" | "keyup" | "keypress";
type MouseEventTypes = "mouseup";
type KeyCallbackType = (e: KeyboardEvent) => void;
type MouseCallbackType = (e: MouseEvent) => void;

class InputManager {
  private static instance: InputManager | null;

  private keyCallbackMap: Map<KeyEventTypes, KeyCallbackType[]> = new Map();
  private mouseCallbackMap: Map<MouseEventTypes, MouseCallbackType[]> = new Map();

  private constructor() {}

  public static getInstance(): InputManager {
    if (!InputManager.instance) {
      InputManager.instance = new InputManager();
    }

    return InputManager.instance;
  }

  private registerKeyEvent(eventType: KeyEventTypes) {
    document.addEventListener(eventType, (e: KeyboardEvent) => {
      this.keyEvent(eventType, e);
    });
  }

  private registerMouseEvent(eventType: MouseEventTypes) {
    document.addEventListener(eventType, (e: MouseEvent) => {
      this.mouseEvent(eventType, e);
    });
  }

  public static destroy() {
    InputManager.instance = null;
  }

  public subscribeToEvent(callback: KeyCallbackType, ...eventType: KeyEventTypes[]) {
    eventType.forEach(evt => {
      if (this.keyCallbackMap.has(evt)) {
        this.keyCallbackMap.set(evt, [...this.keyCallbackMap.get(evt)!, callback]);
      } else {
        this.registerKeyEvent(evt);
        this.keyCallbackMap.set(evt, [callback]);
      }
    });
  }

  public subscribeToMouseEvent(callback: MouseCallbackType, ...eventType: MouseEventTypes[]) {
    eventType.forEach(evt => {
      if (this.mouseCallbackMap.has(evt)) {
        this.mouseCallbackMap.set(evt, [...this.mouseCallbackMap.get(evt)!, callback]);
      } else {
        this.registerMouseEvent(evt);
        this.mouseCallbackMap.set(evt, [callback]);
      }
    });
  }

  private keyEvent(eventType: KeyEventTypes, e: KeyboardEvent) {
    this.keyCallbackMap.get(eventType)?.forEach(callback => {
      callback(e);
    });
  }

  private mouseEvent(eventType: MouseEventTypes, e: MouseEvent) {
    this.mouseCallbackMap.get(eventType)?.forEach(callback => {
      callback(e);
    });
  }
}

export default InputManager;
