export class Matrix {
  private data: number[][];

  constructor(data: number[][]) {
    if (
      data.length !== 3 ||
      data[0].length !== 3 ||
      data[1].length !== 3 ||
      data[2].length !== 3
    ) {
      throw new Error("Matrix must be a 3x3 array.");
    }
    this.data = data;
  }

  public determinant(): number {
    const [a, b, c] = this.data[0];
    const [d, e, f] = this.data[1];
    const [g, h, i] = this.data[2];
    return a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
  }

  public transpose(matrix: number[][]): number[][] {
    const transposed: number[][] = [];
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (!transposed[j]) {
          transposed[j] = [];
        }
        transposed[j][i] = matrix[i][j];
      }
    }
    return transposed;
  }

  public inverse(): Matrix {
    const det = this.determinant();
    if (det === 0) {
      throw new Error("Matrix is not invertible.");
    }
    const [[a, b, c], [d, e, f], [g, h, i]] = this.data;
    const invDet = 1 / det;
    const newData = [
      [e * i - f * h, (d * i - g * f) * -1, d * h - e * g],
      [(b * i - c * h) * -1, a * i - c * g, (a * h - b * g) * -1],
      [b * f - c * e, (a * f - c * d) * -1, a * e - b * d],
    ];
    const transposedMatrix = this.transpose(newData);

    const inversedData = transposedMatrix.map((row) =>
      row.map((element) => element * invDet)
    );

    return new Matrix(inversedData);
  }

  public multiply(other: Matrix): Matrix {
    const newData: number[][] = [];
    for (let i = 0; i < 3; i++) {
      newData[i] = [];
      for (let j = 0; j < 3; j++) {
        let sum = 0;
        for (let k = 0; k < 3; k++) {
          sum += this.data[i][k] * other.data[k][j];
        }
        newData[i][j] = sum;
      }
    }
    return new Matrix(newData);
  }

  public transformPoint(point: { x: number; y: number }): {
    x: number;
    y: number;
  } {
    const [[a, b, tx], [c, d, ty], [, , _]] = this.data;
    const { x, y } = point;
    return {
      x: a * x + b * y + tx,
      y: c * x + d * y + ty,
    };
  }
}
