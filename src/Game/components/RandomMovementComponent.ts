import GameComponent from "../Engine/GameComponent";
import Canvas from "../Engine/Canvas";
import DataStoreService from "../service/DataStoreService";
import { IEntityStore } from "../service/IEntityStore";
import ObjectManager from "../Engine/ObjectManager";
import Vector2D from "../Engine/Utils/Vector2D";
import { IMapStore } from "../service/IMapStore";
import lUtil from "lodash";

class RandomMovementComponent extends GameComponent {
  start(canvas: Canvas): void {
    ObjectManager.getInstance().registerEntityUpdate(() => {
      this.entityUpdate();
    });
  }

  public entityUpdate() {
    let rand = lUtil.random(4, false);

    switch (rand) {
      case 0:
        this.move(new Vector2D(0, 1));
        break;
      case 1:
        this.move(new Vector2D(0, -1));
        break;
      case 2:
        this.move(new Vector2D(1, 0));
        break;
      case 3:
        this.move(new Vector2D(-1, 0));
        break;

      default:
        break;
    }
  }

  private move(dir: Vector2D) {
    let entityStore: IEntityStore = new DataStoreService();
    let mapStore: IMapStore = new DataStoreService();

    if (this.gameObject) {
      let ent = entityStore.getEntity(this.gameObject.id);

      if (ent) {
        let targetPos = ent?.mapCoord.clone().add(dir);
        let targetTileY = mapStore.getEnvironmentOf(new Vector2D(targetPos.y, targetPos.x))?.yLevel;

        if (targetTileY === 0) {
          entityStore.updateEntity({
            ...ent,
            mapCoord: targetPos
          });

          this.gameObject.transform.position.add(dir.multiply(52));
        }
      }
    }
  }
}

export default RandomMovementComponent;
