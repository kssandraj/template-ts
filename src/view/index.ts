import { ClockModel, Timezone } from "../model/clockModel";
import { ClockView } from "../view/clockView";
import { ClockController } from "../controller/clockController";
import { createNewClock } from "./clockManager";

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
    const model = new ClockModel(timezones[i]);
    const view = new ClockView(clockContainerIds[i]);
    const controller = new ClockController(model, view);
    controller.initialize();
  }

  document.getElementById("oneMoreButton").addEventListener("click", () => {
    const timezoneSelect = document.getElementById(
      "timezoneSelect"
    ) as HTMLSelectElement;
    const selectedTimezone = timezoneSelect.value as Timezone;
    createNewClock(selectedTimezone);
  });
}

main();
