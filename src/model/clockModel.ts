export type Timezone =
  | "UTC"
  | "America/New_York"
  | "Asia/Jakarta"
  | "Europe/Moscow"
  | "Europe/Oslo";

export class ClockModel {
  private manualAdjustmentTime: number;
  private timezone: Timezone;
  private increaseEnabled: boolean;
  private twentyFourHourFormat?: boolean;
  private mode: number = 0;

  constructor(timezone: Timezone = "UTC") {
    this.manualAdjustmentTime = 0;
    this.timezone = timezone;
    this.increaseEnabled = false;
    this.twentyFourHourFormat = false;
  }

  public toggleMode(modeClickCount?: number): void {
    if (modeClickCount === 0) {
      this.mode = 0;
    } else {
      this.mode = (this.mode + 1) % 3;
      if (this.mode === 1 || this.mode === 2) {
        this.setIncreaseEnabled(true);
      }
    }
  }

  public getMode(): number {
    return this.mode;
  }

  public getTwentyFourHourFormat(): boolean {
    return this.twentyFourHourFormat;
  }

  public setTwentyFourHourFormat(twentyFourHourFormat: boolean): void {
    this.twentyFourHourFormat = twentyFourHourFormat;
  }

  public getIncreaseEnabled(): boolean {
    return this.increaseEnabled;
  }

  public setIncreaseEnabled(increaseEnabled: boolean): void {
    this.increaseEnabled = increaseEnabled;
  }

  public getManualAdjustmentTime(): number {
    return this.manualAdjustmentTime;
  }

  public setManualAdjustmentTime(adjustment: number): void {
    this.manualAdjustmentTime = adjustment;
  }

  public getTimezone(): Timezone {
    return this.timezone;
  }

  public setTimezone(timezone: Timezone): void {
    this.timezone = timezone;
  }
}
