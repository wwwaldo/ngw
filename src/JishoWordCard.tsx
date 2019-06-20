import * as React from "react";
import { useState, useEffect } from "react";

import { doRomanjiFetch } from "./japaneseUtils";

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
  Typography
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  card: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    width: "100%"
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

export default function JishoWordCard({ kanji }: { kanji: string }) {
  const classes = useStyles();

  // Somewhat inefficient fetch for converting currently selected kanji
  // to romanji
  let [jishoResult, setJishoResult] = useState({});
  useEffect(() => {
    const fetchData = async () => {};
    fetchData();
  });

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant={"body1"} align={"left"}>
          {"TODO: ping the Jisho API with a request"}
          {kanji}
        </Typography>
      </CardContent>
    </Card>
  );
}
