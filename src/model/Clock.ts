export type Timezone =
  | "UTC"
  | "America/New_York"
  | "Asia/Jakarta"
  | "Europe/Moscow"
  | "Europe/Oslo";

export class Clock {
  private timezone: Timezone;
  private mode: number = 0;
  private time: number;

  constructor(timezone: Timezone = "UTC") {
    this.timezone = timezone;
    this.time = 0;
  }

  public toggleMode(modeClickCount?: number): void {
    if (modeClickCount === 0) {
      this.mode = 0;
    } else {
      this.mode = (this.mode + 1) % 3;
    }
  }

  public getMode(): number {
    return this.mode;
  }

  public getTime(): number {
    return this.time;
  }

  public resetTime(): void {
    this.toggleMode(0);
    this.time = 0;
  }

  public increase(): void {
    const oneHour = 3600000;
    const oneMinute = 60000;
    if (this.mode === 1) {
      this.time = this.time + oneHour;
    } else if (this.mode === 2) {
      this.time = this.time + oneMinute;
    }
  }

  public getTimezone(): Timezone {
    return this.timezone;
  }

  public setTimezone(timezone: Timezone): void {
    this.timezone = timezone;
  }
}
