import * as React from "react";
import ReactDOM from "react-dom";

function App(props) {
    return <h1>Hello world</h1>;
}
const appdiv = document.getElementById('app');

ReactDOM.render(<App/>, appdiv);