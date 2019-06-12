import * as React from "react";
import { useState, useEffect } from "react";

import { doRomanjiFetch, doMecabFetch } from "./japaneseUtils";

import "typeface-roboto";

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
  Paper,
  Typography
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  card: {
    border: theme.spacing(2),
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
  }
}));

export default function WordCard({ word }: { word: string }) {
  const classes = useStyles();

  // Somewhat inefficient fetch for converting currently selected word
  // to romanji
  let [romanji, setRomanji] = useState("");
  let [kanji, setKanji] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setKanji(await doMecabFetch({ body: word }));
      setRomanji(await doRomanjiFetch({ body: word }));
    };
    fetchData();
  });

  return (
    <Card className={classes.card}>
      <Typography color={"textPrimary"} variant={"h2"} align={"center"}>
        {kanji}
      </Typography>
      <Typography color={"textSecondary"} variant={"h4"} align={"center"}>
        {romanji}
      </Typography>
    </Card>
  );
}
