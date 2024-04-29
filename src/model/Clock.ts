export type Timezone =
  | "UTC"
  | "America/New_York"
  | "Asia/Jakarta"
  | "Europe/Moscow"
  | "Europe/Oslo";

export class Clock {
  private timezone: Timezone;
  private mode: number = 0;
  private time: string;

  constructor(timezone: Timezone = "UTC") {
    this.timezone = timezone;
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

  public increase(): void {
    const oneHour = 3600000;
    const oneMinute = 60000;
    if (this.getMode() === 1) {
      this.time + oneHour;
    } else if (this.getMode() === 2) {
      this.time + oneMinute;
    }
  }

  public getTimezone(): Timezone {
    return this.timezone;
  }

  public setTimezone(timezone: Timezone): void {
    this.timezone = timezone;
  }
}
