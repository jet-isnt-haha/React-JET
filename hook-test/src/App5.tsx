//跨任意层组件传递数据，一般使用Context
import { createContext, useContext, Consumer, Component } from "react";
/* 
    用createContext创建context，在App5里面使用countContext.Provider修改它的值，然后再Ccc里用useContext取出来
*/
const countContext = createContext(111);

function App5() {
  return (
    <div>
      <countContext.Provider value={222}>
        <Bbb />
      </countContext.Provider>
    </div>
  );
}

function Bbb() {
  return (
    <div>
      <Ccc />
    </div>
  );
}

function Ccc() {
  const count = useContext(countContext);
  return <h2>context的值为:{count}</h2>;
}

/* 
    ps：在使用class组件是通过Consumer来取context的值，
    consumer与provider想呼应
*/
/* interface CccProps {
  count: number;
}

class Ccc extends Component<CccProps> {
  render() {
    return <h2>context的值为:{this.props.count}</h2>;
  }
}
function Bbb() {
  return (
    <div>
      <countContext.Consumer>
        {(count) => <Ccc count={count} />}
      </countContext.Consumer>
    </div>
  ); */

//总结：用 createContext 创建 context 对象，用 Provider 修改其中的值， function 组件使用 useContext 的 hook 来取值，class 组件使用 Consumer 来取值。

/* 
组件库里用 Context 很多，比如 antd 里就有大量 Context 的使用：
配置数据基本都是用 Context 传递。
*/
export default App5;
