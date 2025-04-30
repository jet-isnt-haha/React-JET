//如果想从子组件传递ref到父组件，就需要forwardRef了，也就是把组件内的ref转发
import React, { useEffect, useImperativeHandle } from "react";
import { useRef } from "react";

interface RefProps {
  aaa: () => void;
}

const Child: React.ForwardRefRenderFunction<RefProps> = (props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
  //有时候不希望将原生标签暴露出去（即把input标签对应的ref暴露出去），而是暴露一些自定义内容，就可以使用useImperativeHandle
  //这样，父组件拿到的ref就是useImperativeHandle第二个参数的返回值
  //第一个参数是传入的ref，第二个是返回新的ref值的函数，第三个是依赖数组
  useImperativeHandle(
    ref,
    () => {
      return {
        aaa() {
          inputRef.current?.focus();
        },
      };
    },
    [inputRef]
  );
  return (
    <div>
      <input ref={inputRef} />
    </div>
  );
};

const WrappedChild = React.forwardRef(Child);

function Test1() {
  const ref = useRef<RefProps>(null);

  useEffect(() => {
    console.log("ref", ref.current);
    ref.current?.aaa();
  }, []);

  return (
    <div className="App">
      <WrappedChild ref={ref} />
    </div>
  );
}

export default Test1;
