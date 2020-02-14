import ICamera from "../camera/ICamera";

interface ICanvas {
  render(): void;
  getCanvasWidth(): number;
  getCanvasHeight(): number;
  getCamera(): ICamera;
}

export default ICanvas;
