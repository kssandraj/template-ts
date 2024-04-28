import { ClockModel } from "../model/clockModel";
import { ClockView } from "../view/clockView";

export class ClockController {
  private model: ClockModel;
  private view: ClockView;
  private updateInterval: NodeJS.Timer | undefined;

  constructor(model: ClockModel, view: ClockView) {
    this.model = model;
    this.view = view;

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

  public dispose(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }

  public startClock(): void {
    // Update the clock every second
    this.updateInterval = setInterval(
      () => this.updateTime(),
      1000
    ) as NodeJS.Timer;
  }

  private handleReset(): void {
    this.model.setManualAdjustmentTime(0);
    this.model.toggleMode(0);
    this.updateTime();
  }

  private handleFormat(): void {
    this.model.setTwentyFourHourFormat(!this.model.getTwentyFourHourFormat());
  }

  private handleModeChange(): void {
    this.model.toggleMode();
    this.updateTime();
  }

  private handleIncrease(): void {
    const oneHour = 3600000;
    const oneMinute = 60000;

    if (this.model.getIncreaseEnabled()) {
      if (this.model.getMode() === 1) {
        this.model.setManualAdjustmentTime(
          this.model.getManualAdjustmentTime() + oneHour
        );
      } else if (this.model.getMode() === 2) {
        this.model.setManualAdjustmentTime(
          this.model.getManualAdjustmentTime() + oneMinute
        );
      }
      this.updateTime();
    }
  }

  private updateTime(): void {
    // Calculate the current time considering manual adjustments
    const now = new Date(
      new Date().getTime() + this.model.getManualAdjustmentTime()
    );

    const formatter = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: this.model.getTimezone(),
      hour12: !this.model.getTwentyFourHourFormat(),
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
