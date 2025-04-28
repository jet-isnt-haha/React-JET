import React, { useState } from "react";
import "./App.css";

function App() {
  // const [num, setNum] = useState(1);
  //如果初始状态需要经过复杂计算得到，可以传个函数来计算初始值：
  /*   const [num, setNum] = useState(() => {
    const num1 = 1 + 2;
    const num2 = 2 + 3;
    return num1 + num2;
  }); */
  //应传入函数而不是函数的调用因为只执行一次
  const [num, setNum] = useState(createInitialTodos);
  function createInitialTodos() {
    console.log("123");
    return 2;
  }
  return <div onClick={() => setNum(num + 1)}>{num}</div>;
}

export default App;
