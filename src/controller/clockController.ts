import { Clock } from "../model/Clock";
import { ClockView } from "../view/ClockView";

export class ClockController {
  private model: Clock;
  private view: ClockView;

  private updateInterval: NodeJS.Timer | undefined;
  private increaseEnabled: boolean;
  private twentyFourHourFormat?: boolean;

  constructor(model: Clock, view: ClockView) {
    this.model = model;
    this.view = view;

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

  private startClock(): void {
    // Update the clock every second
    this.updateInterval = setInterval(
      () => this.updateTime(),
      1000
    ) as NodeJS.Timer;
  }

  private handleReset(): void {
    this.model.resetTime();
    this.updateTime();
  }

  private handleFormat(): void {
    this.twentyFourHourFormat = !this.twentyFourHourFormat;
  }

  private handleModeChange(): void {
    this.model.toggleMode();
    if (this.model.getMode() === 1 || this.model.getMode() === 2) {
      this.increaseEnabled = true;
    }
    this.updateTime();
  }

  private handleIncrease(): void {
    if (this.increaseEnabled) {
      this.model.increase();
      this.updateTime();
    }
  }

  private updateTime(): void {
    // Calculate the current time considering manual adjustments
    const now = new Date(new Date().getTime() + this.model.getTime());

    const formatter = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: this.model.getTimezone(),
      hour12: !this.twentyFourHourFormat,
    });

    const formattedTime = formatter.format(now);
    this.view.updateTime(formattedTime, this.model.getMode());
  }

  private renderView(): void {
    const currentTime = new Date();
    const time = currentTime.toLocaleTimeString("en-US", {
      timeZone: this.model.getTimezone(),
    });
    this.view.render(time, this.model.getTimezone(), this.model.getMode());
  }
}
