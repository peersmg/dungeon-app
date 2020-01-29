import GameObject from "./GameObject";

class ObjectManager {
  objects: Array<GameObject> = new Array();
  private static instance: ObjectManager;

  private constructor() {}

  public static getInstance(): ObjectManager {
    if (!ObjectManager.instance) {
      ObjectManager.instance = new ObjectManager();
    }

    return ObjectManager.instance;
  }

  addObject(newObject: GameObject) {
    if (newObject) {
      newObject.start();
      this.objects.push(newObject);
    }
  }

  updateAll(deltaTime: number) {
    if (this.objects) {
      this.objects.forEach(object => {
        object.update(deltaTime);
      });
    }
  }

  drawAll(canvasContext: CanvasRenderingContext2D) {
    if (this.objects) {
      this.objects.forEach(object => {
        object.draw(canvasContext);
      });
    }
  }
}
export default ObjectManager;
