import { useReducer } from "react";

interface Data {
  result: number;
}

interface Action {
  type: "add" | "minus";
  num: number;
}
function reducer(state: Data, action: Action) {
  switch (action.type) {
    case "add":
      return {
        result: state.result + action.num,
      };
    case "minus":
      return {
        result: state.result - action.num,
      };
  }
  return state;
}
//在React中只要涉及到state的修改，就必须返回新的对象，不论是useState还是useReducer
function App3() {
  //第一个参数是reducer，第二个是初始数据
  /*   const [res, dispatch] = useReducer(reducer, { result: 0 });
   */
  //另一种重载，通过函数来创建初始数据，这时useReducer第二个参数就是传给这个函数的参数
  const [res, dispatch] = useReducer(reducer, "zero", (param) => {
    return {
      result: param === "zero" ? 0 : 1,
    };
  });
  return (
    <div>
      <div onClick={() => dispatch({ type: "add", num: 2 })}>加</div>
      <div onClick={() => dispatch({ type: "minus", num: 1 })}>减</div>
      <div>{res.result}</div>
    </div>
  );
}

export default App3;
