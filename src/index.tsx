import * as React from "react";
import { useState } from "react";
import ReactDOM from "react-dom";

function App(props) {
  let s: string = "foo";
  const [text, setText] = useState(s);

  return (
    [
      <textarea onChange={e => setText(e.target.value)} value={text} />,
      <div>{text}</div>,
      
    ]
  );
}
const appdiv = document.getElementById("app");

ReactDOM.render(<App />, appdiv);
