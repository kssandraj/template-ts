import { ClockModel, Timezone } from "../model/clockModel";
import { ClockView } from "./clockView";
import { ClockController } from "../controller/clockController";

export function createNewClock(timezone: Timezone): void {
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

  const model = new ClockModel();
  model.setTimezone(timezone);

  const view = new ClockView(newClockId);
  const controller = new ClockController(model, view);

  controller.initialize();
}
