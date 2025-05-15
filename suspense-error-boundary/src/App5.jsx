import { Suspense } from "react";

let data, promise;

function fetchData() {
  if (data) return data;
  promise = new Promise((resolve) => {
    setTimeout(() => {
      data = "取到的数据";
      resolve();
    }, 2000);
  });
  throw promise;
}

function Content() {
  const data = fetchData();
  return <p>{data}</p>;
}
/* 
可以看到，触发了 Suspense：

也就是说，只要 throw 一个 promise，就会被最近的 Suspense 捕获。

promise 初始状态展示 fallback，promise 改变状态后展示子组件。
*/
export default function App() {
  return (
    <Suspense fallback={"loading data"}>
      <Content />
    </Suspense>
  );
}
