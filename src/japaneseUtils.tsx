import * as React from "react";
import { useState, useEffect } from "react";

import PropTypes from "prop-types";
import uuidv1 = require("uuid/v1");

export default function JapaneseFormatterInput(props: any) {
  //@ts-ignore
  return <JapaneseFormatter {...props} />;
}

JapaneseFormatterInput.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

export function getWordIndex(text: string, word: string): number {
  // Get the first 'space' index of [word] in [text].
  // Valid inputs: Kanji or romanji text as string, after JSON fetch.
  return text.split(" ").findIndex(w => w === word);
}

function JapaneseFormatter(props: {
  isRomanji: any;
  kanjiText: string;
  romanjiText: string;
  selectedKanji: string;
  setSelectedKanji: (arg0: string) => void;
}): JSX.Element {
  /*
    JSX Element.
  
    Highlights text on mouse hover;
    text should be passed from parent component (currently named 'App'.)
    */
  let spacedText = props.isRomanji ? props.romanjiText : props.kanjiText;

  let getRomanjiEquivalent = (w: string): string =>
    props.romanjiText.split(" ")[getWordIndex(props.kanjiText, w)];

  let getKanjiEquivalent = (w: string): string =>
    props.kanjiText.split(" ")[getWordIndex(props.romanjiText, w)];

  let highlighted = props.isRomanji
    ? getRomanjiEquivalent(props.selectedKanji)
    : props.selectedKanji;

  const lines = spacedText.split("\n");

  let JSXLines: JSX.Element[] = lines.map(lineToJSX).flat();
  JSXLines.pop(); // Remove the last <br/>

  function lineToJSX(line: string): JSX.Element[] {
    const words = line.split(" ");
    const output = words
      .map(word => {
        // Do not use index to generate unique react IDs!
        return word === highlighted ? (
          <mark key={uuidv1()}>{word}</mark>
        ) : (
          <span
            key={uuidv1()}
            onMouseOver={() => {
              props.setSelectedKanji(
                props.isRomanji ? getKanjiEquivalent(word) : word
              );
            }}
          >
            {word}
          </span>
        );
      })
      .reduce((prev: (JSX.Element)[], curr: JSX.Element) => {
        prev.push(curr);
        prev.push(<b>&nbsp;&nbsp;</b>);
        return prev;
      }, []);
    output.pop(); // remove trailing space
    return output.concat(<br />);
  }

  return <pre>{JSXLines}</pre>;
}

export async function doMecabFetch(text_input: {
  body: string;
}): Promise<string> {
  let url = "spacing";

  return doAssetFetch(text_input, url);
}

export async function doRomanjiFetch(text_input: {
  body: string;
}): Promise<string> {
  let url = "romanji";

  let tmp = doAssetFetch(text_input, url);
  console.log(tmp);
  return tmp;
}

async function doAssetFetch(
  text_input: { body: string },
  url: string
): Promise<string> {
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
      return json;
    })
    .catch(error => {
      console.log(error);
      return "";
    });
  return res;
}
