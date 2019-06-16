import * as React from "react";
import { useState, useEffect } from "react";

//import { PropTypes } from "prop-types";
import uuidv1 = require("uuid/v1");
import { trim } from "jquery";

export default function JapaneseFormatterInput(props: any) {
  //@ts-ignore
  return <JapaneseFormatter {...props} />;
}

/*
JapaneseFormatterInput.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
}; */

export function getWordIndex(text: string, word: string): number {
  // Get the first 'space' index of [word] in [text].
  // Valid inputs: Kanji or romanji text as string, after JSON fetch.
  return text
    .split(" ")
    .map(trim)
    .findIndex(w => w === word); // buggy bc newlines :(
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
    props.romanjiText.split(" ").map(trim)[getWordIndex(props.kanjiText, w)];

  let getKanjiEquivalent = (w: string): string =>
    props.kanjiText.split(" ").map(trim)[getWordIndex(props.romanjiText, w)];

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
  return tmp;
}

/* Jisho api request */

// A loose and slightly hacky way to type a result from the Jisho API.
// [key: string] : any --> list of all other args.
export type JishoSense = { english_definitions: string[]; [key: string]: any };
export type JishoJapaneseWord = { word: string; reading: string };
export type JishoResult = {
  slug: string;
  jlpt: string;
  senses: JishoSense[];
  japanese: JishoJapaneseWord[];
  [key: string]: any;
};

export async function doDefinitionFetch(word: string) {
  let corsProxyUrl = "https://cors-anywhere.herokuapp.com/";
  let jishoUrl = "https://jisho.org/api/v1/search/words?keyword=" + word;
  let url = corsProxyUrl + jishoUrl;
  let res = await fetch(url, {
    method: "GET",
    mode: "cors"
  })
    .then(response => {
      return response.json();
    })
    .then(jsonResponse => {
      let responses = jsonResponse["data"].filter((entry: JishoResult) => {
        // Oh ok, the jisho API actually exposes the japanese!
        // Check that either the kanji reading or if that fails,
        // the hiragana reading, matches the input kanji.
        return entry.japanese.some((jEntry: JishoJapaneseWord) => {
          //console.log(jEntry);
          return jEntry.word === word || jEntry.reading === word;
        });
      });
      if (responses.length > 0) {
        if (responses.length > 1) {
          console.log("doDefinitionFetch: got multiple matches");
        }
        return responses[0];
      } else {
        // TODO : clean up after yourself, i.e.
        // Run Mecab-verb analysis.

        // Errors that can happen:
        // - common hiragana is used instead of kanji (e.g. ima -> now),
        // most common response is filtered out.

        // - conjugated form of verb is not recognized by jisho:
        //   yurusa reta -> mecab. is filtered to ?? + suffix by jisho
        //   solution: ping server to check that your thing is a verb,
        //   then use mecab's unconjugated form, and send that to jisho.

        //  this implies that your app should keep an internal representation
        //  of a japanese word which might be defined by a lightweight class..

        // What to do if multiple approximate matches?
        // Show a yellow alert to the user.

        // Ok, let's see if we can catch some other common cases.

        throw new Error(
          "doDefinitionFetch: Response from Jisho server was empty after filter. :("
        );
      }
    })
    .catch(error => console.log(error));

  return res;
}

/* Code architecture -- what's *that*?! */
/* sob sob sob */

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
