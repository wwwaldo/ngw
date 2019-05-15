import * as React from "react";
import { useState } from "react";
import * as ReactDOM from "react-dom";

/**
Input:
    hello world bob yay hello
    hello
Output:
    *hello* world bob yay *hello*
**/
function FormatText({ text }: { text: string }): JSX.Element {
  const [highlighted, setHighlighted] = useState<string | null>(null);
  const words = text.split(" ");
  const output = words
    .map((word, idx) =>
      word === highlighted ? (
        <mark key={idx}>{word}</mark>
      ) : (
        <text key={idx} onMouseOver={() => setHighlighted(word)}>
          {word}
        </text>
      )
    )
    .reduce((prev: (JSX.Element | string)[], curr: JSX.Element | string) => {
      prev.push(curr);
      prev.push(" ");
      return prev;
    }, []);
  return <div>{output}</div>;
}

function App({}) {
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
