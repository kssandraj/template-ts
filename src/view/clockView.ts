import "./index.css";

export class ClockView {
  private container: HTMLElement;
  private backgroundColor: string = "darkslategray";
  private textColor: string = "white";

  constructor(containerId: string) {
    const container = (this.container = document.getElementById(containerId));
    if (!container) throw new Error("Clock element not found");
  }

  public createDiv(): string {
    const newClockId = `clock${document.querySelectorAll(".clock").length + 1}`;
    const newClockContainer = document.createElement("div");
    newClockContainer.id = newClockId;
    newClockContainer.classList.add("clock");
    const clocksDisplayed = document.querySelector(".clocksDisplayed");
    if (clocksDisplayed) {
      // Append the new clock container to the clock-box container
      clocksDisplayed.appendChild(newClockContainer);
    } else {
      document.body.appendChild(newClockContainer);
    }

    return newClockId;
  }

  private attachEventListeners(): void {
    this.container.querySelectorAll(".clockBox").forEach((clockBox) => {
      clockBox.querySelector("#modeButton").addEventListener("click", () => {
        this.onModeChangeRequested();
      });

      clockBox
        .querySelector("#increaseButton")
        .addEventListener("click", () => {
          this.onIncreaseRequested();
        });

      clockBox.querySelector("#resetButton").addEventListener("click", () => {
        this.onResetRequested();
      });

      clockBox.querySelector("#formatButton").addEventListener("click", () => {
        this.onFormatRequested();
      });

      clockBox.querySelector("#lightButton").addEventListener("click", () => {
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
                  <span class="time">${time}</span>
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
    const background = this.container.querySelector(".screen") as HTMLElement;
    background.style.backgroundColor = this.backgroundColor;
  }

  private updateTextColor(): void {
    const backgroundText = this.container.querySelector(
      ".screen"
    ) as HTMLElement;
    backgroundText.style.color = this.textColor;
  }

  public updateTime(time: string, mode: number): void {
    this.container.querySelectorAll(".clockBox").forEach((clockBox) => {
      clockBox.querySelector(".time").textContent = time;
    });

    this.container.querySelectorAll(".clockBox").forEach((clockBox) => {
      const increaseButton = clockBox.querySelector(
        "#increaseButton"
      ) as HTMLButtonElement;
      if (mode === 0) {
        increaseButton.disabled = true;
      } else {
        increaseButton.disabled = false;
      }
    });
  }

  // Event hooks that the controller can assign to
  onModeChangeRequested: () => void = () => {};
  onIncreaseRequested: () => void = () => {};
  onResetRequested: () => void = () => {};
  onFormatRequested: () => void = () => {};
}
