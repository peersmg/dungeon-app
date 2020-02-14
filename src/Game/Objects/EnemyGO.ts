import GameObject from "../Engine/GameObject";
import TransformComponent from "../components/TransformComponent";
import Vector2D from "../Engine/Utils/Vector2D";
import { IEntityStore } from "../service/IEntityStore";
import Tile2D from "../Engine/Utils/Tile2D";
import RandomMovementComponent from "../components/RandomMovementComponent";
import ObjectManager from "../Engine/ObjectManager";
import { EntityTag } from "../../redux/types";
import ICanvas from "../Engine/canvas/ICanvas";

class EnemyGO extends GameObject {
  entityStore: IEntityStore;
  canvas: ICanvas | null = null;
  renderTile: Tile2D | null = null;
  initMapPos: Vector2D;

  constructor(entityStore: IEntityStore, initMapPos: Vector2D) {
    super(new TransformComponent(new Vector2D(initMapPos.x * 52, initMapPos.y * 52)));
    this.entityStore = entityStore;
    this.initMapPos = initMapPos;
  }

  start(): void {
    this.entityStore.addEntity({
      objectId: this.id,
      tag: EntityTag.ENEMY,
      mapCoord: this.initMapPos,
      health: 100,
      strength: 5,
      appearance2D: {
        backgroundColor: "#2C4694",
        textColor: "orange",
        character: ";"
      },
      appearance3D: {
        baseColor: "red"
      }
    });

    this.renderTile = new Tile2D(
      this.transform.position,
      new Vector2D(50, 50),
      1,
      "#2C4694",
      "orange",
      ";"
    );

    this.addComponent(new RandomMovementComponent(this));
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
  }
}

export default EnemyGO;
