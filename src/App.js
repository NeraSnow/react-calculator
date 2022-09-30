import React from 'react';
import { useState } from 'react';


const initial_state = {first_operand: "",
    operator: "",
    second_operand: "",
    }

function print(state, answer) {
  const baseDisplay = `${state.first_operand} ${state.operator} ${state.second_operand}`;
  if (answer)
    return `${baseDisplay} = ${answer}`;
  else 
    return baseDisplay;
}

const TransactionType = {
	Number: 0,
	Operator: 1,
}


function App() {



  const [previous_line, setPrevious_line] = useState(initial_state);
  const [current_line, setCurrent_line] = useState(initial_state);
  const [currentResult, setCurrentResult] = useState("");
  const [previousResult, setPreviousResult] = useState("");

  function clear() {
    setPrevious_line(initial_state);
    setCurrent_line(initial_state);
    setCurrentResult("");
    setPreviousResult("");
  }

  function del() {
    if (current_line.first_operand && 
        current_line.operator && 
        current_line.second_operand) {
          setCurrent_line({
            ...current_line,
            second_operand : current_line.second_operand.slice(0, -1)
          })
    } else if (
      current_line.first_operand && 
      current_line.operator) {
        setCurrent_line({
          ...current_line,
          operator : current_line.operator.slice(0, -1)
        })
    } else if (
      current_line.first_operand
    ) {
      setCurrent_line({
        ...current_line,
        first_operand : current_line.first_operand.slice(0, -1)
      })
    } else {
      if (!current_line.first_operand && 
        !current_line.operator && 
        !current_line.second_operand) {
          return;
        } else {
          console.log("Something is wrong!");
        }
    }
  }

  function calc() {
    if (   current_line.first_operand 
        && current_line.operator
        && current_line.second_operand) {
    const first_num = Number(current_line.first_operand);
    const second_num = Number(current_line.second_operand);

    switch (current_line.operator) {
     case "+":
        return first_num + second_num;
        break;
      case "-":
        return first_num - second_num;
        break;
      case "×":
        return first_num * second_num;
        break;
      case "÷":
        return first_num / second_num;
        break;
     default:
      console.log("Operator Not Expected!");
    }
    } else {
      console.log("No calculation performed!")
    }
  }


  function add(Type, ToAdd) {
    if (Type === TransactionType.Number) {
      if (current_line.operator) {
        setCurrent_line({
          ...current_line,
          second_operand : current_line.second_operand.concat(ToAdd)
        })
      } else {
        setCurrent_line({
          ...current_line,
          first_operand : current_line.first_operand.concat(ToAdd)
        })
      }
    } else {
      if (current_line.operator) {
        const result = calc();
        if (result) {
          setCurrent_line({
            ...initial_state,
            first_operand: result,
            operator: ToAdd
          });

        }
      } else {
        if (current_line.first_operand) {
          setCurrent_line({
            ...current_line,
            operator : ToAdd
          })
        } 
      }
    }
  }



  return (
    <div className="calculator-grid">
    <div className="output">
      <div className="previous-operand">{print(previous_line, previousResult)}</div>
      <div className="current-operand">{print(current_line, currentResult)}</div>
    </div>
    <button onClick={clear}>AC</button>
    <button onClick={() => {
      add(TransactionType.Number, previousResult)
    }}>ANS</button>
    <button onClick={del}>DEL </button>
    <button onClick={() => add(TransactionType.Operator, "÷")}>÷</button>
    <button onClick={() => add(TransactionType.Number, "1")}>1</button>
    <button onClick={() => add(TransactionType.Number, "2")}>2</button>
    <button onClick={() => add(TransactionType.Number, "3")}>3</button>
    <button onClick={() => add(TransactionType.Operator, "×")}>×</button>
    <button onClick={() => add(TransactionType.Number, "4")}>4</button>
    <button onClick={() => add(TransactionType.Number, "5")}>5</button>
    <button onClick={() => add(TransactionType.Number, "6")}>6</button>
    <button onClick={() => add(TransactionType.Operator, "+")}>+</button>
    <button onClick={() => add(TransactionType.Number, "7")}>7</button>
    <button onClick={() => add(TransactionType.Number, "8")}>8</button>
    <button onClick={() => add(TransactionType.Number, "9")}>9</button>
    <button onClick={() => add(TransactionType.Operator, "-")}>-</button>
    <button onClick={() => add(TransactionType.Number, ".")}>.</button>
    <button onClick={() => add(TransactionType.Number, "0")}>0</button>
    <button onClick={() => {
      const result = calc();
      if (result !== undefined) {
      setCurrentResult("");
      setPreviousResult(result.toString());
      setPrevious_line(current_line);
      setCurrent_line(initial_state);
    }
    }} className="span-two">=</button>
  </div>
  );
}

export default App;

// onClick={calc()} 