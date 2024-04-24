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

  document.body.appendChild(newClockContainer);

  // Get the selected timezone from the dropdown menu
  const timezoneSelector = document.getElementById(
    "timezoneSelector"
  ) as HTMLSelectElement;
  const selectedTimezone = timezoneSelector.value as Timezone;

  // Initialize ClockApp for the new clock
  new ClockApp(newClockId, selectedTimezone);
}

document.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  if (target.querySelector("#modeButton")) {
    // Handle mode button click
  } else if (target.querySelector("#increaseButton")) {
    // Handle increase button click
  } else if (target.querySelector("#resetButton")) {
    // Handle reset button click
  } else if (target.querySelector("#lightButton")) {
    // Handle light button click
  }
});
