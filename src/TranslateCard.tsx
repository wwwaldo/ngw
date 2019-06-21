import * as React from "react";
import { useState, useEffect } from "react";

import JapaneseFormatterInput, {
  doMecabFetch,
  doRomanjiFetch
} from "./japaneseUtils";

import TranslateIcon from "@material-ui/icons/Translate";
import DownloadIcon from "@material-ui/icons/ArrowDownward";

import "typeface-roboto";

import uuidv1 = require("uuid/v1");
import {
  IconButton,
  makeStyles,
  TextField,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  Input,
  OutlinedInput,
  Switch
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  card: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  content: {
    display: "flex",
    flexDirection: "row",
    overflow: "auto",
    alignItems: "left",
    justifyContent: "left"
  },
  inputPanel: {
    display: "flex",
    flexDirection: "column"
  },
  outputPanel: {
    leftPadding: theme.spacing(2),
    width: "65%"
  },
  textField: {
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(0)
  },
  formControl: {
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(0)
  }
}));

// TODO: refactor this as a class-based component
// so you can change the highlighted word
// by passing in an onchange event
//@ts-ignore
export default function TranslateCard(props): JSX.Element {
  const classes = useStyles();

  let defaultString = props.kanjiText.split(" ").join("");
  let [isRomanji, setIsRomanji] = useState(true);

  // toggle whether highlighting is shown or not.
  let [highlighting, setHighlighting] = useState(false);
  let A = (
    <TextField
      class={classes.inputPanel}
      id="standard-multiline-flexible"
      multiline
      defaultValue={defaultString}
      className={classes.textField}
      margin="normal"
      onChange={async e => {
        let text = e.target.value;

        props.setKanjiText(await doMecabFetch({ body: text }));
        props.setRomanjiText(await doRomanjiFetch({ body: text }));
      }}
      variant="outlined"
    />
  );

  let B = (
    <FormControl
      class={classes.inputPanel}
      margin="normal"
      fullWidth={true}
      className={classes.formControl}
      variant="outlined"
    >
      <OutlinedInput
        labelWidth={0}
        onChange={() => {}}
        multiline
        id="highlight-japanese-tool"
        inputComponent={JapaneseFormatterInput}
        inputProps={...{ ...props, isRomanji }}
      />
    </FormControl>
  );

  return (
    <Card className={classes.card}>
      <CardHeader
        action={
          <div>
            <IconButton
              size="small"
              aria-label={"Convert romanji/kanji output"}
              onClick={() => setIsRomanji(!isRomanji)}
            >
              <TranslateIcon fontSize="inherit" />
              {"Display Kanji/Romanji"}
            </IconButton>
            <Switch onChange={() => setHighlighting(!highlighting)}>
              Edit/Highlight
            </Switch>
          </div>
        }
        title="Japanese Explorer"
      />
      <CardContent>{highlighting ? B : A}</CardContent>
    </Card>
  );
}
