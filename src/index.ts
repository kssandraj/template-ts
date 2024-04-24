import { ClockApp } from "./clock-unit";
import { addNewClock } from "./clock-unit/clock-manager";

// IDs of the clock placeholders
const clockIds = ["clock1", "clock2", "clock3"];
const timezones = ["America/New_York", "Europe/London", "Asia/Tokyo"];

// Create a ClockApp instance for each clock placeholder
clockIds.forEach((id, index) => new ClockApp(id, timezones[index]));

// To add a new clock
const addClockButton = document.getElementById("addClockButton");
addClockButton.addEventListener("click", addNewClock);
