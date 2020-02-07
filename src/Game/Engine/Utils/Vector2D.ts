class Vector2D {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public add(other: Vector2D) {
    this.x += other.x;
    this.y += other.y;
    return this;
  }

  public subtract(other: Vector2D) {
    this.x -= other.x;
    this.y -= other.y;
    return this;
  }

  public multiply(other: number) {
    this.x *= other;
    this.y *= other;
    return this;
  }

  public divide(other: number) {
    if (other !== 0) {
      this.x /= other;
      this.y /= other;
    }

    return this;
  }

  public equals(other: Vector2D) {
    if (this.x === other.x && this.y === other.y) {
      return true;
    } else {
      return false;
    }
  }

  public clone() {
    return new Vector2D(this.x, this.y);
  }

  public normalize() {
    this.divide(this.magnitude());
    return this;
  }

  public magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  public static null: Vector2D = new Vector2D(0, 0);
  public static unit: Vector2D = new Vector2D(1, 1);
}

export default Vector2D;
