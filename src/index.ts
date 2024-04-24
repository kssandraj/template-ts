import { ClockApp, Timezone } from "./clock-unit";
import { addNewClock } from "./clock-unit/clock-manager";

// IDs of the clock placeholders
const clockIds = ["clock1", "clock2", "clock3"];
const timezones = ["America/New_York", "Europe/London", "Asia/Tokyo"];

// Create a ClockApp instance for each clock placeholder
clockIds.forEach((id, index) => new ClockApp(id, timezones[index] as Timezone));

// To add a new clock
const addClockButton = document.getElementById("addClockButton");
addClockButton.addEventListener("click", addNewClock);

// To change the format diplayed
const formatButton = document.getElementById("formatButton");
formatButton.addEventListener("click", toggleTimeFormat);

function toggleTimeFormat() {
  console.log("coucou");
  // Toggle the time format for all clocks
  clockIds.forEach((id) => {
    const clockElement = document.getElementById(id);
    if (clockElement) {
      const clock = clockElement.querySelector(".screen");
      if (clock) {
        clock.classList.toggle("twenty-four-hour");
      }
    }
  });
}
