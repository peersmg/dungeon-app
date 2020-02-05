import GameObject from "../Engine/GameObject";
import Vector2D from "../Engine/Utils/Vector2D";
import TransformComponent from "../Engine/components/TransformComponent";
import MapRenderComponent from "../Engine/components/MapRenderComponent";
import Canvas from "../Engine/Canvas";
import MapLoadComponent from "../Engine/components/MapLoadComponent";

class MapGO extends GameObject {
  boxGrid: MapRenderComponent | null = null;

  constructor(startPos: Vector2D = new Vector2D(200, 200)) {
    super(new TransformComponent(startPos));
  }

  start(canvas: Canvas): void {
    let mapLoadComp = new MapLoadComponent(this);
    this.addComponent(canvas, mapLoadComp);
    mapLoadComp.loadMap();

    this.boxGrid = new MapRenderComponent(this);
    this.addComponent(canvas, this.boxGrid);
  }
}

export default MapGO;
