import { useEffect, useRef, useState } from "react";

function App4() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  });

  return (
    <div>
      <input ref={inputRef} />
    </div>
  );

  //ref就是一个有current属性的对象，除了可以保存dom引用，也可以放别的内容
  /*   const numRef = useRef<number>(0);
  const [, forceRender] = useState(0);
  return (
    <div>
      <div
        onClick={() => {
          numRef.current += 1;
          forceRender(Math.random());
        }}
      >
        {numRef.current}
      </div>
    </div>
  ); */
  //但它不会触发重新渲染，想要重新渲染还得配合useState
  //一般不这样做，useRef一般是用来存一些不是用于渲染的内容的
}

export default App4;
