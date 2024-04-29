import { Clock } from "../model/Clock";
import { ClockView } from "../view/ClockView";

export class ClockController {
  private model: Clock;
  private view: ClockView;

  private updateInterval: NodeJS.Timer | undefined;
  private increaseEnabled: boolean;
  private twentyFourHourFormat?: boolean;
  private manualAdjustmentTime: number;

  constructor(model: Clock, view: ClockView) {
    this.model = model;
    this.view = view;

    this.manualAdjustmentTime = 0;
    this.increaseEnabled = false;
    this.twentyFourHourFormat = false;

    // Attach event handlers
    this.view.onModeChangeRequested = this.handleModeChange.bind(this);
    this.view.onIncreaseRequested = this.handleIncrease.bind(this);
    this.view.onResetRequested = this.handleReset.bind(this);
    this.view.onFormatRequested = this.handleFormat.bind(this);
  }

  public initialize(): void {
    this.renderView();
    this.startClock();
  }

  public setIncreaseEnabled(increaseEnabled: boolean): void {
    this.increaseEnabled = increaseEnabled;
  }

  public startClock(): void {
    // Update the clock every second
    this.updateInterval = setInterval(
      () => this.updateTime(),
      1000
    ) as NodeJS.Timer;
  }

  private handleReset(): void {
    this.manualAdjustmentTime = 0;
    this.model.toggleMode(0);
    this.updateTime();
  }

  private handleFormat(): void {
    this.twentyFourHourFormat = !this.twentyFourHourFormat;
  }

  private handleModeChange(): void {
    this.model.toggleMode();
    if (this.model.getMode() === 1 || this.model.getMode() === 2) {
      this.setIncreaseEnabled(true);
    }
    this.updateTime();
  }

  private handleIncrease(): void {
    const oneHour = 3600000;
    const oneMinute = 60000;

    if (this.increaseEnabled) {
      this.model.increase();
      if (this.model.getMode() === 1) {
        this.manualAdjustmentTime = this.manualAdjustmentTime + oneHour;
      } else if (this.model.getMode() === 2) {
        this.manualAdjustmentTime = this.manualAdjustmentTime + oneMinute;
      }
      this.updateTime();
    }
  }

  private updateTime(): void {
    // Calculate the current time considering manual adjustments
    const now = new Date(new Date().getTime() + this.manualAdjustmentTime);

    const formatter = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: this.model.getTimezone(),
      hour12: !this.twentyFourHourFormat,
    });

    const formattedTime = formatter.format(now);
    this.view.render(
      formattedTime,
      this.model.getTimezone(),
      this.model.getMode()
    );
  }

  private renderView(): void {
    const currentTime = new Date();
    const time = currentTime.toLocaleTimeString("en-US", {
      timeZone: this.model.getTimezone(),
    });
    this.view.render(time, this.model.getTimezone(), this.model.getMode());
  }
}
