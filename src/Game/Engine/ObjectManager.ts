import GameObject from "./GameObject";
import Canvas from "./Canvas";

class ObjectManager {
  private objects: GameObject[] = [];
  private _canvas: Canvas | null = null;
  private static instance: ObjectManager | null;

  private constructor() {}

  public static getInstance(): ObjectManager {
    if (!ObjectManager.instance) {
      ObjectManager.instance = new ObjectManager();
    }

    return ObjectManager.instance;
  }

  public static destroy() {
    ObjectManager.instance = null;
  }

  public addObject(newObject: GameObject) {
    if (newObject && this.canvas) {
      newObject.start(this.canvas);
      this.objects.push(newObject);
    }
  }

  public updateAll(deltaTime: number) {
    if (this.objects) {
      this.objects.forEach(object => {
        object.update(deltaTime);
      });
    }
  }

  public get canvas() {
    return this._canvas;
  }

  public set canvas(newCanvas: Canvas | null) {
    this._canvas = newCanvas;
  }
}
export default ObjectManager;
