import GameObject from "../Engine/GameObject";
import { IEntityStore } from "../service/IEntityStore";
import TransformComponent from "../components/TransformComponent";
import Vector2D from "../Engine/Utils/Vector2D";
import { EntityTag } from "../../redux/types";
import Tile2D from "../Engine/Utils/Tile2D";
import ICollectable from "../ICollectable";
import ObjectManager from "../Engine/ObjectManager";

class ItemGO extends GameObject implements ICollectable {
  entityStore: IEntityStore;
  renderTile: Tile2D | null = null;

  constructor(entityStore: IEntityStore) {
    super(new TransformComponent(new Vector2D(104, 156)));
    this.entityStore = entityStore;
  }

  start(): void {
    this.entityStore.addEntity({
      objectId: this.id,
      tag: EntityTag.ITEM,
      mapCoord: new Vector2D(2, 3),
      health: 100,
      strength: 5,
      appearance: {
        backgroundColor: "#1a0000",
        textColor: "red",
        character: "♥"
      }
    });
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
  }
}

export default ItemGO;
