// test the Jisho card class as a class component.

// the golden rule of a prop is that it should be read-only.
// so then using the kanji as a prop is perfectly the right way to do a thing!

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { doDefinitionFetch, JishoResult } from "./japaneseUtils";

import ArrowForward from "@material-ui/icons/ArrowForward";
import ArrowBack from "@material-ui/icons/ArrowBack";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

import "typeface-roboto";

export default class MockWordCard extends React.Component<
  { kanji: string },
  { definitions: JishoResult }
> {
  constructor(props: Readonly<{ kanji: string }>) {
    super(props);
    this.state = {} as { definitions: JishoResult };
  }

  render() {
    return (
      <div>
        <p>Hello world!</p>
        {this.props.kanji}
        {this.state.hasOwnProperty("definitions")
          ? JSON.stringify(this.state.definitions)
          : ""}
      </div>
    );
  }

  // Note: FB's function signature allows for props *and* state to be used
  // in componentDidUpdate.
  // https://reactjs.org/docs/react-component.html#componentdidupdate
  componentDidUpdate(prevProps: { kanji: string }) {
    // When the kanji is changed, perform a definition fetch.
    if (this.props.kanji !== prevProps.kanji) {
      // async wrapper -- later: check out aync React
      let asyncFetchWrapper = async () => {
        let result = await doDefinitionFetch(this.props.kanji);
        console.log("Updated the definitions for the word card..");
        this.setState({ definitions: result });
      };
      asyncFetchWrapper();
    }
  }
}
