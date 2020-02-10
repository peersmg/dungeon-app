import GameObject from "../Engine/GameObject";
import Canvas from "../Engine/Canvas";
import { IEntityStore } from "../service/IEntityStore";
import Vector2D from "../Engine/Utils/Vector2D";
import InputManager from "../Engine/InputManager";
import Tile2D from "../Engine/Utils/Box2D";
import TransformComponent from "../components/TransformComponent";
import { IMapStore } from "../service/IMapStore";
import ObjectManager from "../Engine/ObjectManager";
import { GameEntity, EntityTag } from "../../redux/types";
import ICollectable from "../ICollectable";

class PlayerGO extends GameObject {
  entityStore: IEntityStore;
  mapStore: IMapStore;
  canvas!: Canvas;

  constructor(entityStore: IEntityStore, mapStore: IMapStore) {
    super(new TransformComponent(new Vector2D(152, 152)));
    this.entityStore = entityStore;
    this.mapStore = mapStore;
  }

  start(canvas: Canvas): void {
    this.entityStore.addEntity({
      objectId: this.id,
      tag: EntityTag.PLAYER,
      mapCoord: new Vector2D(1, 1),
      health: 100,
      strength: 20
    });

    this.canvas = canvas;

    InputManager.getInstance().subscribeToEvent((e: KeyboardEvent) => {
      this.playerAction(this.getDirectionFromKey(e));
    }, "keydown");
    InputManager.getInstance().subscribeToMouseEvent((e: MouseEvent) => {
      this.playerAction(this.getDirectionFromMouse(e));
    }, "mouseup");

    canvas.camera.setFocus(this.transform);

    canvas.addBox(
      new Tile2D(this.transform.position, new Vector2D(50, 50), "#2C4694", "green", "@")
    );
  }

  private getDirectionFromKey(e: KeyboardEvent) {
    if (e.key === "d" || e.keyCode === 39) {
      return new Vector2D(1, 0);
    }

    if (e.key === "a" || e.keyCode === 37) {
      return new Vector2D(-1, 0);
    }

    if (e.key === "s" || e.keyCode === 40) {
      return new Vector2D(0, 1);
    }

    if (e.key === "w" || e.keyCode === 38) {
      return new Vector2D(0, -1);
    }

    return null;
  }

  private getDirectionFromMouse(e: MouseEvent) {
    if (e.x > this.canvas.getCanvasWidth() / 1.5) {
      return new Vector2D(1, 0);
    } else if (e.x < this.canvas.getCanvasWidth() / 3) {
      return new Vector2D(-1, 0);
    } else if (e.y < this.canvas.getCanvasHeight() / 3) {
      return new Vector2D(0, -1);
    } else if (e.y > this.canvas.getCanvasHeight() / 1.5) {
      return new Vector2D(0, 1);
    }
    return null;
  }

  private playerAction(direction: Vector2D | null) {
    if (direction) {
      let currentMapPos = this.entityStore.getEntity(this.id)?.mapCoord;
      let targetPos = currentMapPos?.clone().add(direction);
      if (targetPos) {
        let entity = this.entityStore.getEntityAtLocation(targetPos);
        if (entity) {
          this.interactWithEntity(entity, direction);
        } else {
          this.movePlayer(direction);
        }
      }
    }
  }

  private interactWithEntity(entity: GameEntity, direction: Vector2D) {
    switch (entity.tag) {
      case EntityTag.ENEMY:
        this.attackEntity(entity);
        break;
      case EntityTag.ITEM:
        this.collectItem(entity.objectId);
        this.movePlayer(direction);
        break;
      default:
        break;
    }
  }

  private collectItem(id: number) {
    let obj = ObjectManager.getInstance().getObjectWithId(id);
    ((obj as unknown) as ICollectable).collect(this.id);
  }

  private attackEntity(entity: GameEntity) {
    entity.health -= this.entityStore.getEntity(this.id)!.strength;
    this.entityStore.updateEntity(entity);
    ObjectManager.getInstance().updateEntities();
  }

  private movePlayer(direction: Vector2D | null) {
    let currentMapPos = this.entityStore.getEntity(this.id)?.mapCoord;

    if (currentMapPos && direction) {
      let targetPos = currentMapPos.clone().add(direction);
      let targetTileY = this.mapStore.getEnvironmentOf(new Vector2D(targetPos.y, targetPos.x))
        ?.yLevel;

      if (targetTileY === 0) {
        this.entityStore.updateEntity({
          ...this.entityStore.getEntity(this.id)!,
          mapCoord: targetPos
        });
        this.transform.position.add(direction.multiply(52));

        ObjectManager.getInstance().updateEntities();
      }
    }
  }
}

export default PlayerGO;
