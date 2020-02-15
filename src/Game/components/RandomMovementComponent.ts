import GameComponent from "../Engine/GameComponent";
import DataStoreService from "../service/DataStoreService";
import { IEntityStore } from "../service/IEntityStore";
import ObjectManager from "../Engine/ObjectManager";
import Vector2D from "../Engine/Utils/Vector2D";
import { IMapStore } from "../service/IMapStore";
import lUtil from "lodash";
import { GameEntity, EntityTag } from "../../redux/types";

class RandomMovementComponent extends GameComponent {
  entity: GameEntity | null = null;
  entityStore: IEntityStore = new DataStoreService();
  start(): void {
    ObjectManager.getInstance().registerEntityUpdate(() => {
      this.entityUpdate();
    });

    this.entityStore = new DataStoreService();
    if (this.gameObject) {
      this.entity = this.entityStore.getEntity(this.gameObject.id);
    }
  }

  public entityUpdate() {
    this.entity = this.entityStore.getEntity(this.gameObject ? this.gameObject.id : null);
    if (this.gameObject && this.entity) {
      let playerEnt = this.entityStore
        .getAdjacentEntities(this.entity.mapCoord)
        ?.find(val => val.tag === EntityTag.PLAYER);
      if (playerEnt) {
        this.attack(playerEnt);
      } else {
        this.randMove();
      }
    }
  }

  private attack(entity: GameEntity) {
    entity.health -= this.entity!.strength;
    this.entityStore.updateEntity(entity);
  }

  private randMove() {
    let rand = lUtil.random(3, false);

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
        let targetTileZ = mapStore.getEnvironmentOf(new Vector2D(targetPos.y, targetPos.x))?.zLevel;

        if (targetTileZ === 0) {
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
