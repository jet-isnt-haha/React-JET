import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>出错了：{this.state.message}</div>;
    }
    return this.props.children;
  }
}

function Bbb() {
  const b = window.a.b;

  return <div>{b}</div>;
}
/* 
当子组件报错的时候，会把错误传递给它的 getDerivedStateFromError 和 componentDidCatch 方法。

getDerivedStateFromError 接收 error，返回一个新的 state，会触发重新渲染来显示错误对应的 UI。

componentDidCatch 接收 error 和堆栈 info，可以用来打印错误日志。
*/
export default function App() {
  return (
    <ErrorBoundary>
      <Bbb></Bbb>
    </ErrorBoundary>
  );
}
