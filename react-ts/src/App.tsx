import { JSX, ReactNode } from "react";

interface AaaProps {
  name: string;
  content: ReactNode;
}

function Aaa(props: AaaProps) {
  return (
    <div>
      aaa,{props.name}
      {props.content}
    </div>
  );
}

function App() {
  return (
    <div>
      <Aaa name="jet" content={<div>aaa</div>}></Aaa>
    </div>
  );
}

//组件一遍不写返回值类型，就用默认推导出来。React函数组件默认返回值是JSX.Element
//JSX.Element的类型定义
/* const content: JSX.Element = <div>aaa</div>; */
/* 
  它就是React.ReactElement。
  也就是说，如果要描述一个jsx类型，就用React.ReactElement
  比如Aaa组件有一个content的props，类型为ReactElement
  这样就只能传入JSX。
  ReactElement就是jsx类型，但如果传入null、number等就会报错
*/
//  当有的时候为number、null时，需要换成ReactNode
/* 
  它的类型定义：
    ReactNode包含ReactElment、number、string、null、boolean等可以写在JSX里的类型。
    三个类型的关系ReactNode>ReactElement>JSX.Element。
    所以，一般情况下，想要描述一个参数接收JSX类型，就用ReactNode就行
*/

//函数组件的类型是FunctionComponent
/* const Aaa: React.FunctionComponent<AaaProps> = (props) => {
  return (
    <div>
      aaa,{props.name}
      {props.content}
    </div>
  );
}; */
/* 
  FC和FunctionComponent等价，参数是Props，返回值是ReactNode
  而且函数组件还可以写几个可选属性。
*/
export default App;
