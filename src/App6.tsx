import { memo, useCallback, useEffect, useMemo, useState } from "react";

function App6() {
  const [, setNum] = useState(1);
  const [count, setCount] = useState(2);
  useEffect(() => {
    //当不对Bbb使用优化的hooks时,每过2秒Bbb组件都会重新渲染（这时可以加上memo）
    setInterval(() => {
      setNum(Math.random());
    }, 2000);
  }, []);
  useEffect(() => {
    //2s后props变化了触发memo的重新渲染
    setTimeout(() => {
      setCount(Math.random());
    }, 2000);
  }, []);

  //给Bbb加一个callback参数：参数传一个function(){},你会发现memo失效了因为每次 function 都是新创建的，也就是每次 props 都会变，这样 memo 就没用了。
  //这时就需要useCallback：
  const bbbCallback = useCallback(function () {
    //xxx
  }, []);
  /*
    它的作用是当依赖数组不变时，始终返回一个function，当依赖数组变式才把function改为新入的 
    这时候你会发现，memo 又生效了
   */

  //同理，useMemo也是和memo配合使用的，但他保存的不是函数是值：
  const count2 = useMemo(() => {
    return count * 10;
  }, [count]);
  //它是在 deps 数组变化的时候，计算新的值返回。
  return (
    <div>
      <MemoBbb count={count2} callback={bbbCallback} />
    </div>
  );
}

interface BbbProps {
  count: number;
  callback: Function;
}

function Bbb(props: BbbProps) {
  console.log("bbb render");

  return <h2>{props.count}</h2>;
}

//当只使用memo时只有props变的时候才会重新渲染被包裹的组件
const MemoBbb = memo(Bbb);
//使用memo的话，一般还会结合两个hook：useMemo和useCallback
//memo是防止props没变时的重新渲染，useMemo和useCallback是防止props的不必要变化

export default App6;
