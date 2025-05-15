import { error } from "console";
import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";

function Bbb() {
  useEffect(() => {
    throw new Error("xxx");
  }, []);

  return <div>bbb</div>;
}

function Aaa() {
  return <Bbb />;
}

/* 
    也就是说组件抛错的时候，会向上寻找最近的 ErrorBoundary 组件。

这也是 boundary 的含义。
*/
export default function App() {
  return (
    <ErrorBoundary
      fallbackRender={({ error }) => {
        return (
          <div>
            <p>出错了：</p>
            <div>{error.message}</div>
          </div>
        );
      }}
    >
      <Aaa />
    </ErrorBoundary>
  );
}
