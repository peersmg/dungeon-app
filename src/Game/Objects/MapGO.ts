import GameObject from "../Engine/GameObject";
import Vector2D from "../Engine/Utils/Vector2D";
import TransformComponent from "../components/TransformComponent";
import MapLoadComponent from "../components/MapLoadComponent";

class MapGO extends GameObject {
  constructor(startPos: Vector2D = new Vector2D(200, 200)) {
    super(new TransformComponent(startPos));
  }

  start(): void {
    let mapLoadComp = new MapLoadComponent(this);
    this.addComponent(mapLoadComp);
    mapLoadComp.loadMap();
  }
}

export default MapGO;
