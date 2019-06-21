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
    padding: theme.spacing(2),
    overflow: "auto"
  }
}));

export default function WordCard({
  kanji,
  romanji
}: {
  kanji: string;
  romanji: string;
}) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <Typography color={"textPrimary"} variant={"h1"} align={"center"}>
        {kanji}
      </Typography>
      <Typography color={"textSecondary"} variant={"h4"} align={"center"}>
        {romanji}
      </Typography>
    </Card>
  );
}
