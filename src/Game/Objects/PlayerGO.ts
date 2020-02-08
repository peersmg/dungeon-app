import GameObject from "../Engine/GameObject";
import Canvas from "../Engine/Canvas";
import { IEntityStore } from "../service/IEntityStore";
import Vector2D from "../Engine/Utils/Vector2D";
import InputManager from "../Engine/InputManager";
import Tile2D from "../Engine/Utils/Box2D";
import TransformComponent from "../Engine/components/TransformComponent";
import { IMapStore } from "../service/IMapStore";
import { IPlayerStore } from "../service/IPlayerStore";

class PlayerGO extends GameObject {
  entityStore: IEntityStore;
  mapStore: IMapStore;
  playerStore: IPlayerStore;

  constructor(entityStore: IEntityStore, mapStore: IMapStore, playerStore: IPlayerStore) {
    super(new TransformComponent(new Vector2D(152, 152)));
    this.entityStore = entityStore;
    this.mapStore = mapStore;
    this.playerStore = playerStore;
  }

  start(canvas: Canvas): void {
    this.entityStore.addEntity({
      objectId: this.id,
      mapCoord: new Vector2D(1, 1)
    });

    InputManager.getInstance().subscribeToEvent((e: KeyboardEvent) => {
      this.keyPressed(e);
    }, "keydown");

    canvas.camera.setFocus(this.transform);

    canvas.addBox(
      new Tile2D(this.transform.position, new Vector2D(50, 50), "#2C4694", "green", "@")
    );

    this.playerStore.setHealth(100);
  }

  private keyPressed(e: KeyboardEvent) {
    if (e.key === "d" || e.keyCode === 39) {
      this.movePlayer(new Vector2D(1, 0));
    }

    if (e.key === "a" || e.keyCode === 37) {
      this.movePlayer(new Vector2D(-1, 0));
    }

    if (e.key === "s" || e.keyCode === 40) {
      this.movePlayer(new Vector2D(0, 1));
    }

    if (e.key === "w" || e.keyCode === 38) {
      this.movePlayer(new Vector2D(0, -1));
    }

    if (e.key === "x") {
      console.log("x pressed");
      this.entityStore.removeEntity(this.id);
    }
  }

  private movePlayer(direction: Vector2D) {
    let currentMapPos = this.entityStore.getEntity(this.id)?.mapCoord;

    if (currentMapPos) {
      let targetPos = currentMapPos.clone().add(direction);
      let targetTileY = this.mapStore.getEnvironmentOf(new Vector2D(targetPos.y, targetPos.x))
        ?.yLevel;

      if (targetTileY === 0) {
        this.entityStore.updateEntity({
          objectId: this.id,
          mapCoord: targetPos
        });
        this.transform.position.add(direction.multiply(52));
      }
    }
  }
}

export default PlayerGO;
