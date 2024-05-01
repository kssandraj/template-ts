import { Clock, Timezone } from "../model/Clock";
import { ClockView } from "./ClockView";
import { ClockController } from "../controller/ClockController";
import { ClockManager } from "../controller/ClockManager";
import { Matrix } from "../model/Matrix";
import Vector from "../model/Vector";

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
    const manager = new ClockManager();
    const timezoneSelect = document.getElementById(
      "timezoneSelect"
    ) as HTMLSelectElement;
    const selectedTimezone = timezoneSelect.value as Timezone;
    manager.createNewClock(selectedTimezone);
  });
}

main();
