import GameComponent from "./GameComponent";
import TransformComponent from "./components/TransformComponent";
import Vector2D from "./Utils/Vector2D";
import Canvas from "./Canvas";

abstract class GameObject {
  private static objectCount: number = 0;
  private _id: number;
  private components: GameComponent[] = [];
  transform: TransformComponent;

  constructor(
    transform: TransformComponent = new TransformComponent(new Vector2D(0, 0), new Vector2D(1, 1))
  ) {
    this.transform = transform;
    this._id = GameObject.objectCount;
    GameObject.objectCount++;
  }

  abstract start(canvas: Canvas): void;

  update(deltaTime: number): void {
    this.components.forEach(component => {
      component.update();
    });
  }

  addComponent(canvas: Canvas, newComponent: GameComponent): void {
    newComponent.start(canvas);
    this.components.push(newComponent);
  }

  destroy(): void {}

  public get id() {
    return this._id;
  }
}

export default GameObject;
