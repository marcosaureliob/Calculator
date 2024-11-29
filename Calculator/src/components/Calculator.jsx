import { useState } from "react";
import "./Calculator.css";

function Calculator() {
  const [currentValue, setCurrentValue] = useState("0");
  const [pendingOperation, setPendingOperation] = useState(null);
  const [pendingValue, setPendingValue] = useState(null);
  const [completeOperation, setCompleteOperation] = useState("");

  const keyPadNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const operations = ["+", "-", "*", "/"];

  function handleClick(value) {
    setCurrentValue((prevValue) => {
      if (prevValue === "0") {
        return value;
      } else {
        return prevValue + value;
      }
    });

    setCompleteOperation((prevOperation) => prevOperation + value);
  }

  function handleClear() {
    setCurrentValue("0");
    setPendingOperation(null);
    setPendingValue(null);
    setCompleteOperation("");
  }

  function handleOperation(operation) {
    setCompleteOperation(currentValue + "" + operation);
    setPendingOperation(operation);
    setPendingValue(currentValue);
    setCurrentValue("0");
  }

  function handleCalculate() {
    if (!pendingOperation || !pendingValue) {
      return;
    }

    const num1 = parseFloat(pendingValue);
    const num2 = parseFloat(currentValue);

    let result;

    switch (pendingOperation) {
      case "+":
        result = num1 + num2;
        break;
      case "-":
        result = num1 - num2;
        break;
      case "*":
        result = num1 * num2;
        break;
      case "/":
        if (num2 !== 0) {
          result = num1 / num2;
        } else {
          setCurrentValue("Error");
          setCompleteOperation("Error");
          setPendingOperation(null);
          setPendingValue(null);
          return;
        }
        break;

      default:
        break;
    }

    setCompleteOperation(
      pendingValue +
        " " +
        pendingOperation +
        " " +
        currentValue +
        " = " +
        result
    );
    setCurrentValue(result.toString());
    setPendingOperation(null);
    setPendingValue(null);
  }

  return (
    <div className="calculator">
      <div className="complete-operation">{completeOperation}</div>
      <div className="display">{currentValue}</div>
      <div className="buttons">
        <button onClick={handleClear}>Ac</button>
        {keyPadNumbers.map((num) => (
          <button key={num} onClick={() => handleClick(num)}>
            {" "}
            {num}
          </button>
        ))}
        {operations.map((operation) => (
          <button key={operation} onClick={() => handleOperation(operation)}>
            {operation}
          </button>
        ))}
        <div onClick={handleCalculate}>=</div>
      </div>
    </div>
  );
}

export default Calculator;
