import ICamera from "../camera/ICamera";

interface ICanvas {
  render(deltaTime: number): void;
  getCanvasWidth(): number;
  getCanvasHeight(): number;
  getCamera(): ICamera;
  remove(): void;
}

export default ICanvas;
