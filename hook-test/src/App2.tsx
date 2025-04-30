import { useEffect, useLayoutEffect, useState } from "react";
/* 
useEffect(setup, dependencies?) 

setup：处理 Effect 的函数。setup 函数选择性返回一个 清理（cleanup） 函数。当组件被添加到 DOM 的时候，React 将运行 setup 函数。在每次依赖项变更重新渲染后，React 将首先使用旧值运行 cleanup 函数（如果你提供了该函数），然后使用新值运行 setup 函数。在组件从 DOM 中移除后，React 将最后一次运行 cleanup 函数。

可选 dependencies：setup 代码中引用的所有响应式值的列表。响应式值包括 props、state 以及所有直接在组件内部声明的变量和函数。如果你的代码检查工具 配置了 React，那么它将验证是否每个响应式值都被正确地指定为一个依赖项。依赖项列表的元素数量必须是固定的，并且必须像 [dep1, dep2, dep3] 这样内联编写。React 将使用 Object.is 来比较每个依赖项和它先前的值。如果省略此参数，则在每次重新渲染组件之后，将重新运行 Effect 函数。
*/
async function queryData() {
  const data = await new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(666);
    }, 2000);
  });
  return data;
}

function App2() {
  const [num, setNum] = useState(0);

  useEffect(() => {
    //     console.log("effect");
    /*     const timer = setInterval(() => {
      console.log(num);
    }, 1000); */
    /* queryData().then((data) => {
        setNum(data);
    }); */
    /*     return () => {
      console.log("clean up");
      clearInterval(timer);
    }; */
  }, [num]);

  return (
    <>
      <div onClick={() => setNum((prevNum) => prevNum + 1)}>{num}</div>
    </>
  );
}

export default App2;
