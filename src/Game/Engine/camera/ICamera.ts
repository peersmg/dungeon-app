import ICanvas from "../canvas/ICanvas";
import Vector2D from "../Utils/Vector2D";
import TransformComponent from "../../components/TransformComponent";

interface ICamera {
  update(canvas: ICanvas): void;
  getViewPos(): Vector2D;
  setFocus(focusTransform: TransformComponent): void;
}

export default ICamera;
