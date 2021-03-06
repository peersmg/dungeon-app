import GameObject from "./GameObject";
import { isNullOrUndefined } from "util";
import ICanvas from "./canvas/ICanvas";

class ObjectManager {
  private objects: Map<number, GameObject> = new Map();
  private _canvas: ICanvas | null = null;
  private static instance: ObjectManager | null;

  private entityCallbacks: (() => void)[] = [];

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
      newObject.start();
      this.objects.set(newObject.id, newObject);
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

  public set canvas(newCanvas: ICanvas | null) {
    this._canvas = newCanvas;
  }

  public getObjectWithId(id: number) {
    if (this.objects.has(id)) {
      return this.objects.get(id);
    } else {
      return null;
    }
  }

  public registerEntityUpdate(callback: () => void) {
    this.entityCallbacks.push(callback);
  }

  public updateEntities() {
    this.entityCallbacks.forEach(callback => {
      if (!isNullOrUndefined(callback)) {
        callback();
      }
    });
  }

  public removeObject(id: number) {
    if (this.objects.has(id)) {
      this.objects.get(id)!.destroy();
      this.objects.delete(id);
    }
  }
}
export default ObjectManager;
