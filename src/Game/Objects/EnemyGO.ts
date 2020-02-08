import GameObject from "../Engine/GameObject";
import Canvas from "../Engine/Canvas";
import TransformComponent from "../Engine/components/TransformComponent";
import Vector2D from "../Engine/Utils/Vector2D";
import { IEntityStore } from "../service/IEntityStore";
import Tile2D from "../Engine/Utils/Box2D";
import RandomMovementComponent from "../Engine/components/RandomMovementComponent";

class EnemyGO extends GameObject {
  entityStore: IEntityStore;

  constructor(entityStore: IEntityStore) {
    super(new TransformComponent(new Vector2D(152, 256)));
    this.entityStore = entityStore;
  }

  start(canvas: Canvas): void {
    this.entityStore.addEntity({
      objectId: this.id,
      mapCoord: new Vector2D(1, 3)
    });

    canvas.addBox(
      new Tile2D(this.transform.position, new Vector2D(50, 50), "#2C4694", "orange", ";")
    );

    this.addComponent(canvas, new RandomMovementComponent(this));
  }
}

export default EnemyGO;
