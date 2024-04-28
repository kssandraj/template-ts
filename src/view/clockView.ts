import "./index.css";

export class ClockView {
  private container: HTMLElement;
  private screen: HTMLElement;
  private backgroundColor: string = "darkslategray";
  private textColor: string = "white";

  constructor(containerId: string) {
    const container = (this.container = document.getElementById(containerId));
    if (!container) throw new Error("Clock element not found");
    this.screen = container.querySelector(".screen");
  }

  private attachEventListeners(): void {
    this.container.querySelectorAll(".clockBox").forEach((clockBox) => {
      clockBox.querySelector("#modeButton")?.addEventListener("click", () => {
        this.onModeChangeRequested();
      });

      clockBox
        .querySelector("#increaseButton")
        ?.addEventListener("click", () => {
          this.onIncreaseRequested();
        });

      clockBox.querySelector("#resetButton")?.addEventListener("click", () => {
        this.onResetRequested();
      });

      clockBox.querySelector("#formatButton")?.addEventListener("click", () => {
        this.onFormatRequested();
      });

      clockBox.querySelector("#lightButton")?.addEventListener("click", () => {
        this.toggleBackgroundColor();
      });
    });
  }

  public render(time: string, timezone: string, mode: number): void {
    this.container.innerHTML = `
    <div class="clockBox">
        <span class="timezone">Timezone: ${timezone}</span>
          <div class="watch">
              <div class="screen" style="background-color: ${
                this.backgroundColor
              }; color: ${this.textColor}"> 
                  <span>${time}</span>
              </div>
          </div>
          <div>
              <button id="modeButton">Mode</button>
              <button id="increaseButton" ${
                mode === 0 ? "disabled" : ""
              }>Increase</button>
              <button id="resetButton">Reset</button>
              <button id="formatButton">Format</button>
              <button id="lightButton">Light</button>
          </div>
        </div>
      `;

    this.attachEventListeners();
  }

  private toggleBackgroundColor(): void {
    if (
      this.backgroundColor === "darkslategray" ||
      this.textColor === "white"
    ) {
      this.backgroundColor = "white";
      this.textColor = "black";
    } else {
      this.backgroundColor = "darkslategray";
      this.textColor = "white";
    }
    this.updateScreenBackgroundColor();
    this.updateTextColor();
  }

  private updateScreenBackgroundColor(): void {
    this.screen.style.backgroundColor = this.backgroundColor;
  }

  private updateTextColor(): void {
    this.screen.style.color = this.textColor;
  }

  // Event hooks that the controller can assign to
  onModeChangeRequested: () => void = () => {};
  onIncreaseRequested: () => void = () => {};
  onResetRequested: () => void = () => {};
  onFormatRequested: () => void = () => {};
}
