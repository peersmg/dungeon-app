import GameObject from "../Engine/GameObject";
import Canvas from "../Engine/Canvas";
import TransformComponent from "../Engine/components/TransformComponent";
import Vector2D from "../Engine/Utils/Vector2D";
import { IEntityStore } from "../service/IEntityStore";
import Tile2D from "../Engine/Utils/Box2D";
import RandomMovementComponent from "../Engine/components/RandomMovementComponent";

class EnemyGO extends GameObject {
  entityStore: IEntityStore;
  canvas: Canvas | null = null;
  renderTile: Tile2D | null = null;

  constructor(entityStore: IEntityStore) {
    super(new TransformComponent(new Vector2D(152, 256)));
    this.entityStore = entityStore;
  }

  start(canvas: Canvas): void {
    this.entityStore.addEntity({
      objectId: this.id,
      mapCoord: new Vector2D(1, 3),
      health: 100
    });

    this.canvas = canvas;
    this.renderTile = new Tile2D(
      this.transform.position,
      new Vector2D(50, 50),
      "#2C4694",
      "orange",
      ";"
    );
    this.canvas.addBox(this.renderTile);

    this.addComponent(canvas, new RandomMovementComponent(this));
  }

  destroy() {
    this.canvas?.removeBox(this.renderTile);
  }
}

export default EnemyGO;
