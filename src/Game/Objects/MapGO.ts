import GameObject from "../Engine/GameObject";
import Vector2D from "../Engine/Utils/Vector2D";
import TransformComponent from "../components/TransformComponent";
import MapRenderComponent from "../components/MapRenderComponent";
import MapLoadComponent from "../components/MapLoadComponent";
import ICanvas from "../Engine/canvas/ICanvas";

class MapGO extends GameObject {
  boxGrid: MapRenderComponent | null = null;

  constructor(startPos: Vector2D = new Vector2D(200, 200)) {
    super(new TransformComponent(startPos));
  }

  start(canvas: ICanvas): void {
    let mapLoadComp = new MapLoadComponent(this);
    this.addComponent(canvas, mapLoadComp);
    mapLoadComp.loadMap();
  }
}

export default MapGO;
