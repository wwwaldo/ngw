import * as React from "react";
import { useState, useEffect } from "react";

import JapaneseFormatterInput from "./japaneseUtils";

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

export default function TranslateCard() {
  const classes = useStyles();
  let [text, setText] = useState("蒼い風がいま\n蒼い風がいま");

  return (
    <Card className={classes.card}>
      <CardHeader
        action={
          <div>
            <IconButton
              size="small"
              aria-label={"Convert romanji/kanji output"}
            >
              <TranslateIcon fontSize="inherit" />
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
              defaultValue={text}
              className={classes.textField}
              margin="normal"
              onChange={e => setText(e.target.value)}
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
                inputProps={{ text: text }}
              />
            </FormControl>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
