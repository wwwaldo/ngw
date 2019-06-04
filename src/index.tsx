import * as React from "react";
import { useState, useEffect } from "react";
import * as ReactDOM from "react-dom";

/**
Input:
    hello world bob yay hello
    hello
Output:
    *hello* world bob yay *hello*
**/
function FormatText({ text }: { text: string }): JSX.Element {
  const [spacedText, setspacedText] = useState<string>(text);
  const [highlighted, setHighlighted] = useState<string | null>(null);

  // use useEffect to make stateful changes to a react component
  useEffect(() => {
    // wrapped async inside sync fn as crappy workaround
    const fetchData = async () => {
      const result = await doMecabFetch({ body: text });
      setspacedText(result);
    };
    fetchData();
  });

  const lines = spacedText.split("\n");

  let JSXLines: JSX.Element[] = lines.map(lineToJSX).flat();
  JSXLines.pop(); // Remove the last <br/> --> seems to cause a weird bug if left in

  function lineToJSX(line: string): JSX.Element[] {
    const words = line.split(" ");
    const output = words
      .map((word, idx) =>
        word === highlighted ? (
          <mark key={idx}>{word}</mark>
        ) : (
          <span key={idx} onMouseOver={() => setHighlighted(word)}>
            {word}
          </span>
        )
      )
      .reduce((prev: (JSX.Element | string)[], curr: JSX.Element | string) => {
        prev.push(curr);
        prev.push(" ");
        return prev;
      }, []) as JSX.Element[];
    return output.concat(<br />);
  }

  return <div>{JSXLines}</div>;
}

async function doMecabFetch(text_input: { body: string }): Promise<string> {
  let url = "spacing";

  let res = await fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(text_input)
  })
    .then(response => {
      // unwrap promise by 1 level
      return response.json();
    })
    .then(json => {
      console.log(json);
      return json;
    })
    .catch(error => {
      console.log(error);
      return "";
    });
  return res;
}

function JSXButton(): JSX.Element {
  // A button class to test the fetch API
  let text_input = { body: "蒼い風がいま" };
  return <button onClick={() => doMecabFetch(text_input)}>Click me</button>;
}

function App({}) {
  const [text, setText] = useState("蒼い風がいま\n蒼い風がいま");

  return (
    <div id="app-mini">
      <textarea onChange={e => setText(e.target.value)} value={text} />
      <FormatText text={text} />
      <JSXButton />
    </div>
  );
}
const appdiv = document.getElementById("app");

ReactDOM.render(<App />, appdiv);
