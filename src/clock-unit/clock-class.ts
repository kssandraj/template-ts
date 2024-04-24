import "../style/index.css";

export type Timezone =
  | "UTC"
  | "America/New_York"
  | "Asia/Jakarta"
  | "Europe/Moscow"
  | "Europe/Oslo";

export class ClockApp {
  private hoursElement: HTMLElement;
  private minutesElement: HTMLElement;
  private secondsElement: HTMLElement;
  private modeButton: HTMLElement;
  private increaseButton: HTMLButtonElement;
  private resetButton: HTMLElement;
  private lightButton: HTMLElement;
  private screen: HTMLElement | null;
  private increaseEnabled: boolean;
  private manualAdjustmentTime: number; // Storing manual adjustments in milliseconds
  private timezone: Timezone;
  private modeClickCount: number;

  constructor(clockId: string, timezone: Timezone = "UTC") {
    const clockElement = document.getElementById(clockId);
    if (!clockElement) throw new Error("Clock element not found");

    this.hoursElement = clockElement.querySelector("#hours") as HTMLElement;
    this.minutesElement = clockElement.querySelector("#minutes") as HTMLElement;
    this.secondsElement = clockElement.querySelector("#seconds") as HTMLElement;
    this.modeButton = clockElement.querySelector("#modeButton") as HTMLElement;
    this.increaseButton = clockElement.querySelector(
      "#increaseButton"
    ) as HTMLButtonElement;
    this.resetButton = clockElement.querySelector(
      "#resetButton"
    ) as HTMLElement;
    this.lightButton = clockElement.querySelector(
      "#lightButton"
    ) as HTMLElement;
    this.screen = clockElement.querySelector(".screen");
    this.increaseEnabled = false;
    this.manualAdjustmentTime = 0; // Initial manual adjustment is zero
    this.timezone = timezone;
    this.modeClickCount = 0;

    this.setupEventListeners();
    this.startClock();
  }

  private updateTime(): void {
    // Calculate the current time considering manual adjustments
    const now = new Date(new Date().getTime() + this.manualAdjustmentTime);

    const formatter = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: this.timezone,
      hour12: false,
    });

    const formattedTime = formatter.format(now);
    const [hours, minutes, seconds] = formattedTime.split(":");
    this.hoursElement.textContent = hours;
    this.minutesElement.textContent = minutes;
    this.secondsElement.textContent = seconds;
  }

  private toggleMode(): void {
    this.modeClickCount = (this.modeClickCount + 1) % 3;
    console.log("toggle Mode", this.modeClickCount);
    this.increaseEnabled = this.modeClickCount !== 0;
    this.increaseButton.disabled = !this.increaseEnabled;
  }

  private increaseTime(): void {
    console.log("Mode click count in increase time", this.modeClickCount);
    if (!this.increaseEnabled) return;

    if (this.modeClickCount === 1) {
      this.manualAdjustmentTime += 3600000; // Adds one hour in milliseconds
    } else if (this.modeClickCount === 2) {
      this.manualAdjustmentTime += 60000; // Adds one minute in milliseconds
    }
    this.updateTime();
  }

  private resetTime(): void {
    this.manualAdjustmentTime = 0; // Reset manual adjustments
    this.updateTime();
  }

  private turnScreenWhite(): void {
    if (this.screen) {
      this.screen.style.backgroundColor = "white";
      this.screen.style.color = "black";
    }
  }

  private setupEventListeners(): void {
    this.modeButton.addEventListener("click", () => this.toggleMode());
    this.increaseButton.addEventListener("click", () => this.increaseTime());
    this.resetButton.addEventListener("click", () => this.resetTime());
    this.lightButton.addEventListener("click", () => this.turnScreenWhite());
  }

  private startClock(): void {
    setInterval(() => this.updateTime(), 1000);
  }
}
