import { ClockApp, Timezone } from "./clock-class";

export function addNewClock(): void {
  const newClockId = `clock${document.querySelectorAll(".clock").length + 1}`;
  const newClockContainer = document.createElement("div");
  newClockContainer.id = newClockId;
  newClockContainer.className = "clock";

  newClockContainer.innerHTML = `
      <div class="watch">
        <div class="screen">
          <span id="hours">00</span>:<span id="minutes">00</span>:<span id="seconds">00</span>
        </div>
      </div>
      <div>
        <button id="modeButton">Mode</button>
        <button id="increaseButton" disabled>Increase</button>
        <button id="resetButton">Reset</button>
        <button id="lightButton">Light</button>
      </div>
    `;

  const clockBoxContainer = document.querySelector(".clock-box");
  if (clockBoxContainer) {
    // Append the new clock container to the clock-box container
    clockBoxContainer.appendChild(newClockContainer);
  } else {
    document.body.appendChild(newClockContainer);
  }

  const timezoneSelector = document.getElementById(
    "timezoneSelector"
  ) as HTMLSelectElement;
  const selectedTimezone = timezoneSelector.value as Timezone;

  // Initialize ClockApp for the new clock
  new ClockApp(newClockId, selectedTimezone);
}

document.addEventListener("click", (event) => {
  // Handling the buttons
  const target = event.target as HTMLElement;
  if (target.querySelector("#modeButton")) {
  } else if (target.querySelector("#increaseButton")) {
  } else if (target.querySelector("#resetButton")) {
  } else if (target.querySelector("#lightButton")) {
  }
});
