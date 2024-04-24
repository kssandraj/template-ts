import { ClockApp } from "./clock-class";

export function addNewClock(): void {
  const newClockId = `clock${document.querySelectorAll(".clock").length + 1}`;
  const newClockContainer = document.createElement("div");
  newClockContainer.id = newClockId;
  newClockContainer.className = "clock";

  newClockContainer.innerHTML = `
      <div class="watch">
        <div class="screen">
          <span class="hours">00</span>:<span class="minutes">00</span>:<span class="seconds">00</span>
        </div>
      </div>
      <div>
        <button class="modeButton">Mode</button>
        <button class="increaseButton" disabled>Increase</button>
        <button class="resetButton">Reset</button>
        <button class="lightButton">Light</button>
      </div>
    `;

  document.body.appendChild(newClockContainer);

  // Initialize ClockApp for the new clock
  new ClockApp(newClockId);
}

document.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  if (target.classList.contains("modeButton")) {
    // Handle mode button click
  } else if (target.classList.contains("increaseButton")) {
    // Handle increase button click
  } else if (target.classList.contains("resetButton")) {
    // Handle reset button click
  } else if (target.classList.contains("lightButton")) {
    // Handle light button click
  }
});
