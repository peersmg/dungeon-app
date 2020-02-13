import ICanvas from "./ICanvas";
import Tile2D from "../Utils/Tile2D";
import ICamera from "../camera/ICamera";

class Canvas3D implements ICanvas {
  render(): void {
    throw new Error("Method not implemented.");
  }
  addTile(newBox: Tile2D | null): void {
    throw new Error("Method not implemented.");
  }
  removeTile(tileToRemove: Tile2D | null): void {
    throw new Error("Method not implemented.");
  }
  getCanvasWidth(): number {
    throw new Error("Method not implemented.");
  }
  getCanvasHeight(): number {
    throw new Error("Method not implemented.");
  }
  getCamera(): ICamera {
    throw new Error("Method not implemented.");
  }
}
