import GameObject from "../Engine/GameObject";
import { IEntityStore } from "../service/IEntityStore";
import Vector2D from "../Engine/Utils/Vector2D";
import InputManager from "../Engine/InputManager";
import TransformComponent from "../components/TransformComponent";
import { IMapStore } from "../service/IMapStore";
import ObjectManager from "../Engine/ObjectManager";
import { GameEntity, EntityTag } from "../../redux/types";
import ICollectable from "../ICollectable";
import ICanvas from "../Engine/canvas/ICanvas";

class PlayerGO extends GameObject {
  entityStore: IEntityStore;
  mapStore: IMapStore;
  canvas: ICanvas | null;
  deltaTime: number = 0;

  actionCooldownLimit: number = 0.1;
  actionCooldown: number = 0;

  entityCooldownLimit: number = 0.1;
  entityCooldown: number = 0.1;
  entityUpdateQueued: boolean = false;

  constructor(canvas: ICanvas, entityStore: IEntityStore, mapStore: IMapStore) {
    super(new TransformComponent(new Vector2D(52, 52)));
    this.entityStore = entityStore;
    this.mapStore = mapStore;
    this.canvas = ObjectManager.getInstance().canvas;
  }

  start(): void {
    this.entityStore.addEntity({
      objectId: this.id,
      tag: EntityTag.PLAYER,
      mapCoord: new Vector2D(1, 1),
      health: 100,
      strength: 20,
      appearance2D: {
        backgroundColor: "#2C4694",
        textColor: "white",
        character: "@"
      },
      appearance3D: {
        baseColor: "green"
      }
    });

    InputManager.getInstance().subscribeToEvent((e: KeyboardEvent) => {
      this.playerAction(this.getDirectionFromKey(e));
    }, "keydown");
    InputManager.getInstance().subscribeToMouseEvent((e: MouseEvent) => {
      this.playerAction(this.getDirectionFromMouse(e));
    }, "mouseup");

    this.canvas?.getCamera().setFocus(this.transform);
  }

  update(deltaTime: number) {
    this.canvas = ObjectManager.getInstance().canvas;
    this.canvas?.getCamera().setFocus(this.transform);
    this.deltaTime = deltaTime;

    if (this.entityUpdateQueued) {
      this.entityCooldown -= deltaTime;
      if (this.entityCooldown <= 0) {
        ObjectManager.getInstance().updateEntities();
        this.entityCooldown = this.entityCooldownLimit;
        this.entityUpdateQueued = false;
      }
    }
    this.actionCooldown -= deltaTime;
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
    if (this.canvas) {
      if (e.x > this.canvas.getCanvasWidth() / 1.5) {
        return new Vector2D(1, 0);
      } else if (e.x < this.canvas.getCanvasWidth() / 3) {
        return new Vector2D(-1, 0);
      } else if (e.y < this.canvas.getCanvasHeight() / 3) {
        return new Vector2D(0, -1);
      } else if (e.y > this.canvas.getCanvasHeight() / 1.5) {
        return new Vector2D(0, 1);
      }
    }
    return null;
  }

  private playerAction(direction: Vector2D | null) {
    if (this.actionCooldown > 0) {
      return;
    }

    if (direction) {
      let currentMapPos = this.entityStore.getEntity(this.id)?.mapCoord;
      let targetPos = currentMapPos?.clone().add(direction);
      if (targetPos) {
        let entity = this.entityStore.getEntitiesAtLocation(targetPos);
        if (entity) {
          this.interactWithEntity(entity, direction);
        } else {
          this.movePlayer(direction);
        }
        this.actionCooldown = this.actionCooldownLimit;
      }
    }
  }

  private interactWithEntity(entity: GameEntity[], direction: Vector2D) {
    let enemyEnt = entity.find(val => val.tag === EntityTag.ENEMY);
    if (enemyEnt) {
      this.attackEntity(enemyEnt);
      return;
    }

    entity.forEach(element => {
      switch (element.tag) {
        case EntityTag.ENEMY:
          this.attackEntity(element);
          break;
        case EntityTag.ITEM:
          this.collectItem(element.objectId);
          this.movePlayer(direction);
          break;
        default:
          break;
      }
    });
  }

  private collectItem(id: number) {
    let obj = ObjectManager.getInstance().getObjectWithId(id);
    ((obj as unknown) as ICollectable).collect(this.id);
  }

  private attackEntity(entity: GameEntity) {
    entity.health -= this.entityStore.getEntity(this.id)!.strength;
    this.entityStore.updateEntity(entity);
    this.entityUpdateQueued = true;
  }

  private movePlayer(direction: Vector2D | null) {
    let currentMapPos = this.entityStore.getEntity(this.id)?.mapCoord;

    if (currentMapPos && direction) {
      let targetPos = currentMapPos.clone().add(direction);
      let targetTileY = this.mapStore.getEnvironmentOf(new Vector2D(targetPos.y, targetPos.x))
        ?.zLevel;

      if (targetTileY === 0) {
        this.entityStore.updateEntity({
          ...this.entityStore.getEntity(this.id)!,
          mapCoord: targetPos
        });
        this.transform.position.add(direction.multiply(52));

        this.entityUpdateQueued = true;
      }
    }
  }
}

export default PlayerGO;
