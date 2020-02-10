import GameObject from "../Engine/GameObject";
import Canvas from "../Engine/Canvas";
import { IEntityStore } from "../service/IEntityStore";
import TransformComponent from "../components/TransformComponent";
import Vector2D from "../Engine/Utils/Vector2D";
import { EntityTag } from "../../redux/types";
import Tile2D from "../Engine/Utils/Box2D";
import ICollectable from "../ICollectable";
import ObjectManager from "../Engine/ObjectManager";

class ItemGO extends GameObject implements ICollectable {
  entityStore: IEntityStore;
  renderTile: Tile2D | null = null;
  canvas: Canvas | null = null;

  constructor(entityStore: IEntityStore) {
    super(new TransformComponent(new Vector2D(204, 256)));
    this.entityStore = entityStore;
  }

  start(canvas: Canvas): void {
    this.canvas = canvas;

    this.entityStore.addEntity({
      objectId: this.id,
      tag: EntityTag.ITEM,
      mapCoord: new Vector2D(2, 3),
      health: 100,
      strength: 5
    });

    this.renderTile = new Tile2D(
      this.transform.position,
      new Vector2D(50, 50),
      "#1a0000",
      "red",
      "♥"
    );
    canvas.addBox(this.renderTile);
  }

  collect(collectorId: number) {
    let ent = this.entityStore.getEntity(collectorId);
    if (ent) {
      this.entityStore.updateEntity({ ...ent, health: ent.health + 50 });
    }

    let thisEnt = this.entityStore.getEntity(this.id);
    if (thisEnt) {
      this.entityStore.removeEntity(thisEnt.objectId);
      ObjectManager.getInstance().removeObject(this.id);
    }
  }

  destroy() {
    super.destroy();
    this.canvas?.removeBox(this.renderTile);
  }
}

export default ItemGO;
