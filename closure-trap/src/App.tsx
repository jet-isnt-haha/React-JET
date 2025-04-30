import { stat } from "fs";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
} from "react";
/* 
    该组件并不会每秒加1，并且可以看到setCount时拿到的count一直是0，为什么呢？
    原因是useEffect的deps是[]，**也就是只会执行并保留第一次的function。**而第一次的function引用了当时的count，形成了闭包。
    这就导致了每次执行定时器的时候，都是在count=0的基础上加一
    这就叫做hook的闭包陷阱。
*/
/* function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setInterval(() => {
      console.log(count);
      setCount(count + 1);
    }, 1000);
  }, []);

  return <div>{count}</div>;
}
 */

//解法一
/* 
  这时候可以用setState的另一种参数：
    这次并没有形成闭包，每次的count都是参数传入的上一次的state。
    这样功能就正常了
*/
/* function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setCount((preCount) => preCount + 1);
    }, 1000);
  }, []);

  return <div>{count}</div>;
}
 */
/* 
  和用setState传入函数的方案类似，还可以使用useReducer来解决。
  因为它是dispatch一个action，**不直接引用state**，所以也不会形成闭包
*/
/* interface Action {
  type: "add" | "minus";
  num: number;
}
function reducer(state: number, action: Action) {
  switch (action.type) {
    case "add":
      return state + action.num;
    case "minus":
      return state - action.num;
  }
  return state;
}

function App() {
  const [count, dispatch] = useReducer(reducer, 0);

  useEffect(() => {
    setInterval(() => {
      dispatch({ type: "add", num: 1 });
    }, 1000);
  }, []);

  return <div>{count}</div>;
} */

//解法二
/* 
  但有的时候，必须要用到state的，也就是肯定会形成闭包，
  比如这里，clg的count就用到了外面的count，但又不能把它挪到setState里取去写
  这种情况怎么办呢？
  当deps变动的时候，会重新执行effect

*/
/* function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(count);
    const timer = setInterval(() => {
      setCount(count + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [count]);

  return <div>{count}</div>;
} */
/* 
  deps加上了count，这样count变化的时候重新执行effect，那执行的函数引用的就是最新的count值。
  这种解法是能解决闭包陷阱的，但在这里并不合适，因为effect里跑的是定时器，每次都重新跑定时器，那定时器就不是每1秒执行一次了？
*/

//解法三
/* 
  有定时器不能重新跑effect函数，那怎么做呢？
  可以使用useRef
*/
/* function App() {
  const [count, setCount] = useState(0);

  const updateCount = () => {
    setCount(count + 1);
  };

  const ref = useRef(updateCount);

  ref.current = updateCount;

  useEffect(() => {
    const timer = setInterval(() => ref.current(), 1000);

    return () => {
      clearInterval(timer);
    };
  });

  return <div>{count}</div>;
} */
/* 
  通过useRef创建对象，保存执行的函数，每次渲染更新ref.current的值为最新函数。
  这样，定时器执行的函数里就始终引用的是最新的count。
  useEffect只跑一次，保证setInterval不会重置，是每秒执行一次。
  执行的函数是从ref.current取的，这个函数每次渲染都会更新，引用这最新的count。
*/

/* 
  ref.current的值改变不会触发重新渲染，
  它就很适合保存渲染过程中的一些数据的场景。
  定时器的这种处理就是常见场景，可以对其封装
*/
/* function useInterval(fn: Function, delay?: number | null) {
  const callbackFn = useRef(fn);

  useLayoutEffect(() => {
    callbackFn.current = fn;
  });

  useEffect(() => {
    const timer = setInterval(() => callbackFn.current(), delay || 0);

    return () => clearInterval(timer);
  }, [delay]);
} */
//上面的 useInterval 没有返回 clean 函数，调用者不能停止定时器，所以我们再加一个 ref 来保存 clean 函数，然后返回：

function useInterval(fn: Function, time: number) {
  const ref = useRef(fn);

  ref.current = fn;

  let cleanUpFnRef = useRef<Function>(null);

  const clean = useCallback(() => {
    cleanUpFnRef.current?.();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => ref.current(), time);

    cleanUpFnRef.current = () => {
      clearInterval(timer);
    };

    return clean;
  }, []);

  return clean;
}
/* 
  为什么要用 useCal
  lback 包裹返回的函数呢？

因为这个返回的函数可能作为参数传入别的组件，这样用 useCallback 包裹就可以避免该参数的变化，配合 memo 可以起到减少没必要的渲染的效果。

1. 避免函数引用频繁变化
在 React 中，每次组件重新渲染时，函数组件内部定义的函数都会重新创建。这意味着函数的引用会发生变化，即使函数的逻辑没有改变。如果这个函数作为 prop 传递给子组件，子组件可能会因为这个 prop 的引用变化而重新渲染，即使 prop 的实际内容并没有改变。
通过使用 useCallback 包裹函数，可以确保函数的引用在多次渲染之间保持不变，只要依赖项数组中的值没有发生变化。在 useInterval 中，clean 函数使用 useCallback 包裹，依赖项数组为空 []，这意味着 clean 函数的引用在组件的整个生命周期内都不会改变。
2. 提高性能
当一个函数的引用频繁变化时，会导致接收该函数作为 prop 的子组件不必要地重新渲染，从而影响性能。使用 useCallback 可以避免这种情况，减少不必要的渲染，提高应用的性能。
配合 memo 减少不必要的渲染
1. memo 的作用
memo 是 React 提供的一个高阶组件，用于对组件进行浅比较优化。当一个组件被 memo 包裹时，React 会在组件接收到新的 props 时，对新旧 props 进行浅比较。如果 props 没有发生变化，React 会跳过该组件的重新渲染，直接复用之前的渲染结果。

*/

function App() {
  const [count, setCount] = useState(0);

  const updateCount = () => {
    setCount(count + 1);
  };

  useInterval(updateCount, 1000);
  return <div>{count}</div>;
}
/* 
  这里我们封装了个 useInterval 的函数，传入 fn 和 delay，里面会用 useRef 保存并更新每次的函数。
  在useLayoutEffect里更新ref.current的值，它是在dom操作完之后同步执行的，比useEffect更早（useLayoutEffect 会在每次组件重新渲染时重新执行。这是因为 useLayoutEffect 没有传入依赖项数组所以 React 会认为每次渲染时都有潜在的变化，从而在 DOM 更新后同步执行其回调函数。在这个回调函数里，callbackFn.current 会被更新为最新的 fn 函数。）
  通过useEffect来跑定时器，deps为[delay],确保定时器只跑一次，但是delay变化的话会重新跑。
  在useEffect里返回clean函数在组件销毁的时候自动调用来清理定时器。
*/

export default App;
