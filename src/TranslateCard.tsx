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
  OutlinedInput
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
            <IconButton size="small" aria-label={"Download Flashcards?"}>
              <DownloadIcon fontSize="inherit" />
            </IconButton>
          </div>
        }
        title="Main"
      />
      <CardContent>
        <div className={classes.content}>
          <div className={classes.inputPanel}>
            <TextField
              id="standard-multiline-flexible"
              label="Source Text"
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
          </div>
          <div className={classes.outputPanel}>
            <FormControl
              margin="normal"
              fullWidth={true}
              className={classes.formControl}
              variant="outlined"
            >
              <InputLabel htmlFor="formatted-text-mask-input" shrink={true} />
              <OutlinedInput
                labelWidth={0}
                onChange={() => {}}
                multiline
                id="formatted-text-mask-input"
                inputComponent={JapaneseFormatterInput}
                inputProps={...{ ...props, isRomanji }}
              />
            </FormControl>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
