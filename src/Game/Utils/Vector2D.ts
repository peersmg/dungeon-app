class Vector2D {
  x: number;
  y: number;

  constructor(params: Vector2D = {} as Vector2D) {
    let { x = 0, y = 0 } = params;

    this.x = x;
    this.y = y;
  }
}

export default Vector2D;
