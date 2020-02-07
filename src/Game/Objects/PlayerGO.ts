import GameObject from "../Engine/GameObject";
import Canvas from "../Engine/Canvas";
import { IEntityStore } from "../service/IEntityStore";
import Vector2D from "../Engine/Utils/Vector2D";
import InputManager from "../Engine/InputManager";
import Tile2D from "../Engine/Utils/Box2D";
import TransformComponent from "../Engine/components/TransformComponent";

class PlayerGO extends GameObject {
  entityStore: IEntityStore;

  constructor(entityStore: IEntityStore) {
    super(new TransformComponent(new Vector2D(152, 152)));
    this.entityStore = entityStore;
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

    canvas.addBox(new Tile2D(this.transform.position, new Vector2D(50, 50), "grey", "green", "@"));
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
      this.entityStore.updateEntity({
        objectId: this.id,
        mapCoord: currentMapPos.add(direction)
      });
    }

    this.transform.position.add(direction.multiply(52));
  }
}

export default PlayerGO;
