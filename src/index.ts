import "./index.css";

const hoursElement = document.getElementById("hours")!;
const minutesElement = document.getElementById("minutes")!;
const secondsElement = document.getElementById("seconds")!;
const modeButton = document.getElementById("modeButton")!;
const increaseButton = document.getElementById(
  "increaseButton"
) as HTMLButtonElement;
const resetButton = document.getElementById("resetButton")!;
const lightButton = document.getElementById("lightButton")!;
const screen = document.querySelector(".screen") as HTMLElement | null;

let increaseEnabled: boolean = false;
let displayedTime = new Date(); // Initialize with current time
let modeClickCount: number = 0; // Track the number of times the mode button is clicked
let increaseHoursCount: number = 0; // Track the number of times the hours are increasing
let increaseMinutesCount: number = 0; // Track the number of times the minutes are increasing

function updateTime() {
  const now = new Date();

  let hours = String(now.getHours()).padStart(2, "0");
  let minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  if (increaseHoursCount > 0) {
    hours = String(displayedTime.getHours()).padStart(2, "0");
  }

  if (increaseMinutesCount > 0) {
    minutes = String(displayedTime.getMinutes()).padStart(2, "0");
  }

  hoursElement.textContent = hours;
  minutesElement.textContent = minutes;
  secondsElement.textContent = seconds;
}

function toggleMode() {
  increaseEnabled = false;
  modeClickCount++;
  if (modeClickCount === 1 || modeClickCount === 2) {
    increaseButton.disabled = false;
    increaseEnabled = true;
    // Enable the "increase" button when it is clicked once and allowing it to add 1 hour by one hour
  } else if (modeClickCount === 3) {
    // Disable the "Increase" button after the mode button is clicked three times
    increaseButton.disabled = true;
    increaseEnabled = false;
    modeClickCount = 0; // Reset mode click count
  }
  console.log(modeClickCount);
}

function increaseTime() {
  if (increaseEnabled) {
    if (modeClickCount === 1) {
      displayedTime.setHours(displayedTime.getHours() + 1);
      increaseHoursCount++;
      console.log("Increase hours count", increaseHoursCount);
    } else if (modeClickCount === 2) {
      displayedTime.setMinutes(displayedTime.getMinutes() + 1);
      increaseMinutesCount++;
      console.log("Increase minutes count", increaseMinutesCount);
    }
    updateTime(); // Update displayed time immediately after increasing
  }
}

function resetTime() {
  displayedTime = new Date(); // Reset displayed time to current time
  updateTime(); // Update displayed time
}

function turnScreenWhite() {
  if (screen) {
    screen.style.backgroundColor = "white";
    screen.style.color = "black"; // Change background color to white
  }
}

modeButton.addEventListener("click", toggleMode);
increaseButton.addEventListener("click", increaseTime);
resetButton.addEventListener("click", resetTime);
lightButton.addEventListener("click", turnScreenWhite);

setInterval(updateTime, 1000);

updateTime();
