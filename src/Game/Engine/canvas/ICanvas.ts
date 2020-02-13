import Tile2D from "../Utils/Tile2D";
import ICamera from "../camera/ICamera";

interface ICanvas {
  render(): void;
  addTile(newBox: Tile2D | null): void;
  removeTile(tileToRemove: Tile2D | null): void;
  getCanvasWidth(): number;
  getCanvasHeight(): number;
  getCamera(): ICamera;
}

export default ICanvas;
