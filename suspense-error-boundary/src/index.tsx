import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
// import App from "./App2";
// import App from "./App3";
// import App from "./App4";
import App from "./App5";
import reportWebVitals from "./reportWebVitals";

/* 
也就是说，ErrorBoundary 和 Suspense 虽然都是捕获组件 throw 出的东西，但这俩互不相干，一个捕获 error，一个捕获 promise。
*/

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
