const calculatorDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear-btn");

let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;

function sendNumberValue(number) {
  //replace current disp value if first value entered
  if (awaitingNextValue) {
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
  } else {
    //If current dispaly value is zero, replace it else add number
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent =
      displayValue === "0" ? number : displayValue + number;
  }
}
//console.log(inputBtns);

function addDecimal() {
    //if operator pressed, dont add decimal!
    if(awaitingNextValue) return;
  //if no decimal, add one
  if (!calculatorDisplay.textContent.includes(".")) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
}


//obj calc first and second values depending on operator
const calculate={

    '/':(firstNumber, secondNumber)=> firstNumber/secondNumber,
    '*':(firstNumber, secondNumber)=> firstNumber*secondNumber,
    '+':(firstNumber, secondNumber)=> firstNumber+secondNumber,
    '-':(firstNumber, secondNumber)=> firstNumber-secondNumber,
    '=':(firstNumber, secondNumber)=> secondNumber,

};















function useOperator(operator) {


  //take string value from text content and convert into number
  const currentValue = Number(calculatorDisplay.textContent);
  //prevent multiple operators
  if(operatorValue && awaitingNextValue){
    operatorValue=operator;
    return;
  }
  //assign first vlaue if no val
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    console.log('firstValue', firstValue,'operatorValue',operatorValue,'currentValue',currentValue);
    const calculation= calculate[operatorValue](firstValue,currentValue);
    calculatorDisplay.textContent=calculation;
    console.log("calculation",calculation);
    firstValue=calculation;
  }
  //ready for the next value, store operator
  awaitingNextValue = true;
  operatorValue = operator;
//   console.log("firstValue",firstValue);
//   console.log("operator",operatorValue);
}

//add event listners for numbers operators and decimal buttons

inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    //for operators
    inputBtn.addEventListener("click", () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains("operator")) {
    inputBtn.addEventListener("click", () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains("decimal")) {
    inputBtn.addEventListener("click", () => addDecimal());
  }
});

//reset all values and display
function resetAll() {
  calculatorDisplay.textContent = "0";
  firstValue = 0;
  operatorValue = "";
  awaitingNextValue = false;
}
//event lsitners
clearBtn.addEventListener("click", resetAll);
