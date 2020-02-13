import Tile2D from "../Utils/Box2D";
import Vector2D from "../Utils/Vector2D";
import Camera2D from "../Utils/Camera2D";

interface ICanvas {
  render(): void;
  addTile(newBox: Tile2D | null): void;
  removeTile(tileToRemove: Tile2D | null): void;
  getCanvasWidth(): number;
  getCanvasHeight(): number;
  getCamera(): Camera2D;
}

export default ICanvas;
