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
function FormatText({ text }: { text: string }): JSX.Element {
  const [highlighted, setHighlighted] = useState("foo");
  const words = text.split(" ");
  const output = words.map(word => {
    if (word === highlighted) {
      return <mark onMouseOver={() => setHighlighted(word)}>{word}</mark>;
    } else {
      return <text onMouseOver={() => setHighlighted(word)}> {word} </text>;
    }
  });
  return <p>{output}</p>;
}

function App(props) {
  let s: string = "foo";
  const [text, setText] = useState(s);

  return (
    <div id="app-mini">
      <textarea onChange={e => setText(e.target.value)} value={text} />
      <FormatText text={text} />
    </div>
  );
}
const appdiv = document.getElementById("app");

ReactDOM.render(<App />, appdiv);
