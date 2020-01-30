import GameComponent from "./GameComponent";
import TransformComponent from "./components/TransformComponent";
import Vector2D from "./Utils/Vector2D";

abstract class GameObject {
  components: GameComponent[] = [];
  transform: TransformComponent;

  constructor(
    transform: TransformComponent = new TransformComponent(
      null,
      new Vector2D(0, 0),
      new Vector2D(1, 1)
    )
  ) {
    this.transform = transform;
  }

  abstract start(): void;

  update(deltaTime: number): void {
    this.components.forEach(component => {
      component.update();
    });
  }

  addComponent(newComponent: GameComponent): void {
    this.components.push(newComponent);
  }

  draw(renderContext: CanvasRenderingContext2D): void {
    this.components.forEach(component => {
      component.draw(renderContext);
    });
  }
}

export default GameObject;
