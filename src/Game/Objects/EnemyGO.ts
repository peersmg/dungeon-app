import GameObject from "../Engine/GameObject";
import Canvas from "../Engine/Canvas";
import TransformComponent from "../components/TransformComponent";
import Vector2D from "../Engine/Utils/Vector2D";
import { IEntityStore } from "../service/IEntityStore";
import Tile2D from "../Engine/Utils/Box2D";
import RandomMovementComponent from "../components/RandomMovementComponent";
import ObjectManager from "../Engine/ObjectManager";
import { EntityTag } from "../../redux/types";

class EnemyGO extends GameObject {
  entityStore: IEntityStore;
  canvas: Canvas | null = null;
  renderTile: Tile2D | null = null;
  initMapPos: Vector2D;

  constructor(entityStore: IEntityStore, initMapPos: Vector2D) {
    super(new TransformComponent(new Vector2D(100 + initMapPos.x * 52, 100 + initMapPos.y * 52)));
    this.entityStore = entityStore;
    this.initMapPos = initMapPos;
  }

  start(canvas: Canvas): void {
    this.entityStore.addEntity({
      objectId: this.id,
      tag: EntityTag.ENEMY,
      mapCoord: this.initMapPos,
      health: 100,
      strength: 5
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

  update() {
    let ent = this.entityStore.getEntity(this.id);
    if (ent && ent.health <= 0) {
      this.entityStore.removeEntity(ent.objectId);
      ObjectManager.getInstance().removeObject(this.id);
    }
  }

  destroy() {
    super.destroy();
    this.canvas?.removeBox(this.renderTile);
  }
}

export default EnemyGO;
