const screen = document.getElementById("calculator-screen");
const keys = document.querySelectorAll(".key");

let currentInput = "";
let previousInput = "";
let operator = "";

keys.forEach((key) => {
  key.addEventListener("click", () => {
    const action = key.dataset.action;
    const value = key.textContent;

    if (!action) {
      appendNumber(value);
    } else if (action === "clear") {
      clearScreen();
    } else if (action === "delete") {
      deleteNumber();
    } else if (action === "equals") {
      calculateResult();
    } else if (action === "decimal") {
      addDecimal();
    } else {
      chooseOperator(action, value);
    }
  });
});

function appendNumber(value) {
  if (currentInput === "0") currentInput = "";
  currentInput += value;
  updateScreen();
}

function clearScreen() {
  currentInput = "";
  previousInput = "";
  operator = "";
  updateScreen();
}

function deleteNumber() {
  currentInput = currentInput.slice(0, -1);
  updateScreen();
}

function addDecimal() {
  if (!currentInput.includes(".")) {
    currentInput += ".";
    updateScreen();
  }
}

function chooseOperator(action, value) {
  if (currentInput === "") return;
  if (previousInput !== "") calculateResult();
  operator = value;
  previousInput = currentInput;
  currentInput = "";
}

function calculateResult() {
  if (operator === "" || currentInput === "") return;

  const prev = parseFloat(previousInput);
  const curr = parseFloat(currentInput);

  if (isNaN(prev) || isNaN(curr)) return;

  switch (operator) {
    case "+":
      currentInput = prev + curr;
      break;
    case "-":
      currentInput = prev - curr;
      break;
    case "*":
      currentInput = prev * curr;
      break;
    case "/":
      currentInput = curr === 0 ? "Error" : prev / curr;
      break;
  }

  previousInput = "";
  operator = "";
  updateScreen();
}

function updateScreen() {
  screen.value = currentInput;
}
