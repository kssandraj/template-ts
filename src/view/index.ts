import { Clock, Timezone } from "../model/Clock";
import { ClockView } from "./ClockView";
import { ClockController } from "../controller/ClockController";

function main() {
  const clockContainerIds = [
    "clockContainer1",
    "clockContainer2",
    "clockContainer3",
  ];
  const timezones: Timezone[] = [
    "America/New_York",
    "Asia/Jakarta",
    "Europe/Moscow",
  ];

  for (let i = 0; i < clockContainerIds.length; i++) {
    const model = new Clock(timezones[i]);
    const view = new ClockView(clockContainerIds[i]);
    const controller = new ClockController(model, view);
    controller.initialize();
  }

  document.getElementById("oneMoreButton").addEventListener("click", () => {
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
    const timezoneSelect = document.getElementById(
      "timezoneSelect"
    ) as HTMLSelectElement;
    const selectedTimezone = timezoneSelect.value as Timezone;
    const model = new Clock(selectedTimezone);
    const view = new ClockView(newClockId);
    const controller = new ClockController(model, view);
    controller.initialize();
  });
}

main();
