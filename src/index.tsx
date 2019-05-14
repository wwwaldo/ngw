import * as React from "react";
import { useState } from "react";
import ReactDOM from "react-dom";

/**
Input:
    hello world bob yay hello
    hello
Output:
    *hello* world bob yay *hello*
**/
function FormatText(text: string, textitem: string): string {
  const words = text.split(" ");
  const output = words.map(word => {
    if (word === textitem) {
      return `*${word}*`;
    } else {
      return `${word}`;
    }
  });
  return output.join(" ");
}

function App(props) {
  let s: string = "foo";
  const [text, setText] = useState(s);

  return [
    <textarea onChange={e => setText(e.target.value)} value={text} />,
    <div>{text}</div>,
    <div>{FormatText(text, "hello")}</div>
  ];
}
const appdiv = document.getElementById("app");

ReactDOM.render(<App />, appdiv);
