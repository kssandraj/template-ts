export default class Vector {
  public readonly x: number;
  public readonly y: number;

  // Cached computed values, so we only need expensive calculations once.
  private cachedLength: number = null;
  private cachedAngle: number = null;

  public constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  public static fromSizeAndAngle(size: number, angle: number): Vector {
    const x = size * Math.cos(angle);
    const y = size * Math.sin(angle);
    return new Vector(x, y);
  }

  public get length(): number {
    if (!this.cachedLength) {
      this.cachedLength = Math.sqrt(this.x ** 2 + this.y ** 2);
    }
    return this.cachedLength;
  }

  public get angle(): number {
    if (!this.cachedAngle) {
      this.cachedAngle = Math.atan2(this.y, this.x);
    }
    return this.cachedAngle;
  }

  public add(input: Vector): Vector {
    return new Vector(this.x + input.x, this.y + input.y);
  }

  public subtract(input: Vector): Vector {
    return new Vector(this.x - input.x, this.y - input.y);
  }

  public scale(scalar: number): Vector {
    return new Vector(this.x * scalar, this.y * scalar);
  }

  public dotProduct(input: Vector): number {
    return this.length * input.length * Math.cos(this.angle - input.angle);
  }
}
