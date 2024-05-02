import { Clock, Timezone } from "../model/Clock";
import { ClockView } from "./ClockView";
import { ClockController } from "../controller/ClockController";

function main() {
  const timezones: Timezone[] = [
    "America/New_York",
    "Asia/Jakarta",
    "Europe/Moscow",
  ];

  timezones.forEach((timezone) => {
    const model = new Clock(timezone);
    const view = new ClockView();
    const controller = new ClockController(model, view);
    controller.initialize();
  });

  document.getElementById("oneMoreButton").addEventListener("click", () => {
    const timezoneSelect = document.getElementById(
      "timezoneSelect"
    ) as HTMLSelectElement;
    const selectedTimezone = timezoneSelect.value as Timezone;
    const model = new Clock(selectedTimezone);
    const view = new ClockView();
    const controller = new ClockController(model, view);
    controller.initialize();
  });
}

main();
