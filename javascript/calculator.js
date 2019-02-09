const numbers = document.getElementsByClassName('number');
const answerBox = document.getElementsByClassName("answerBox")[0];
const operator = document.getElementsByClassName("operator");
const operatorArray = ["clear", "+", "-", "*", "/", "="];

let operatorSum = "";
let oldNum = "";
let newNum = "";

let continuousSolution = false; // Flag for if they continue sums with the answer
let continuousOperation = false; // Flag for if they put multiple sums without pressing equals

// Clear function, resolves everything to be able to be used from scratch. Resets everything

function clear() {
  operatorSum = "";
  oldNum = "";
  newNum = "";
  answerBox.textContent = "";
  continuousSolution = false;
  continuousOperation = false;
}

// solves the solution by doing oldNum (operatorSum) newNum

function solution() {
  if (operatorSum == "+") {
    return parseFloat(oldNum) + parseFloat(newNum);
  } if (operatorSum == "-") {
    return parseFloat(oldNum) - parseFloat(newNum);
  } if (operatorSum == "/") {
    return parseFloat(oldNum) / parseFloat(newNum);
  } if (operatorSum == "*") {
    return parseFloat(oldNum) * parseFloat(newNum);
  }
}

// This part makes the numbers buttons come up with numbers
// It stores the number in the newNum variable

for (let i = 0; i < numbers.length; i ++) {
  numbers[i].addEventListener("click", () => {
      if (i == 10) {
      // zero button
      answerBox.textContent += 0;
      console.log(0);
      newNum += "0";
    } else if (i == 0) {
      // answerBox... makes nothing come up. No known bugs
      console.log("nothing");
    } else if (i == 11) {
      // . button
      answerBox.textContent += ".";
      console.log(".");
      newNum += ".";
    } else {
      // Number button
      console.log(i);
      answerBox.textContent += i;
      newNum += i;
    }
  });
}

// This part makes the operator buttons display in the answerbox
// It also deals with what happens when/after a operator is pressed
// Many paths take the newNum and store it in oldNum for operations to occur

for (let i = 0; i <operator.length; i ++) {
  operator[i].addEventListener("click", () => {
    if (i == 5) {
      // = operator
      if ( isNaN(solution())) {
        // Brings up error message if something has gone wrong eg two operators inputted conscectively
        answerBox.textContent = "Error, please clear and try again.";
      } else {
        // = function. Prints the solution to the answerBox, saves solution to oldNum for further use if wanted
        console.log(solution());
        answerBox.textContent = solution();
        oldNum = solution();
        continuousSolution = true; // if the equals has been pressed then the answer is used as oldNum and the sums go on
        continuousOperation = true;
        newNum = "";
        operatorSum = ""; }
  } else if (i == 0) {
      // Clear function
      clear();
  } else if (continuousSolution) {
      // Continues the calculation if the = has been pressed and another sum is entered
        console.log(operatorArray[i]);
        answerBox.textContent = operatorArray[i];
        operatorSum = operatorArray[i];
        // if ( operatorSum.length >= 1 )
        //   oldNum = solution();
        //   newNum = "";
        //   operatorSum = "";
        //   answerBox.style.backgroundColor = "red";
  } else if ( (operatorSum.length >= 1) && (oldNum.length >= 1) || (continuousOperation)) {
      // If 3 or more operations are put in then this path allows the operations to continue
      oldNum = solution();
      newNum = "";
      operatorSum = operatorArray[i];
      answerBox.textContent = operatorArray[i];
      continuousOperation = true;
  } else {
      // Standard path, stores old number and begins creating a new one. Also saves the operation for solution()
      oldNum = newNum;
      console.log(operatorArray[i]);
      answerBox.textContent = operatorArray[i];
      operatorSum += operatorArray[i];
      newNum = "";
    }
  })
}
