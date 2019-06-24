import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { doDefinitionFetch, JishoResult } from "./japaneseUtils";

import ArrowForward from "@material-ui/icons/ArrowForward";
import ArrowBack from "@material-ui/icons/ArrowBack";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

import "typeface-roboto";

import {
  Card,
  CardContent,
  Typography,
  Button,
  MobileStepper,
  Chip
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  chip: {
    margin: theme.spacing(1)
  },
  defArea: {
    margin: theme.spacing(1)
  }
  card: {
    padding: theme.spacing(0),
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
  },
  mobileStepper: {
    flexGrow: 1
  }
}));

export default function JishoWordCard({
  kanji,
  romanji
}: {
  kanji: string;
  romanji: string;
}) {
  const classes = useStyles();

  let [activeStep, setActiveStep] = useState(0);
  let [nSteps, setNSteps] = useState(1);
  let [kanjiDefinitions, setKanjiDefinitions] = useState({
    jlpt: "Null definition",
    senses: [],
    japanese: []
  });

  /* Don't mind these.. */
  let handleBack = () => {
    setActiveStep(prevActiveStep => {
      // I should probably feel ashamed of myself for this
      return (((prevActiveStep - 1) % nSteps) + nSteps) % nSteps;
    });
  };

  let handleNext = () => {
    setActiveStep(prevActiveStep => {
      return (prevActiveStep + 1) % nSteps;
    });
  };
  /* nothing to see here */

  // Update the internal state when a new kanji is hovered over.
  useEffect(() => {
    const fetchData = async () => {
      let definitionJSON = await doDefinitionFetch(kanji);

      // update the state
      setKanjiDefinitions(definitionJSON);
      setNSteps(definitionJSON.senses.length);

      // When a new kanji is hovered over, the active step should be reset to 0.
      setActiveStep(0);

      console.log("fetched data...");
    };
    fetchData();
  }, [kanji, romanji]);

  function displayResults(jisho: JishoResult) {
    // Ok, next we'll make the definition display nicer

    if (jisho != null) {
      let def = jisho.senses[activeStep];
      if (def != null && def != undefined) {
        return (
          <React.Fragment>
            <Typography color={"textPrimary"} variant={"h1"} align={"center"}>
              {kanji}
            </Typography>
            <Typography color={"textSecondary"} variant={"h4"} align={"center"}>
              {romanji}
            </Typography>
            <div style={{ display: "flex", paddingTop: "10%" }}>
              <div
                style={{
                  flexGrow: 1,
                  wordWrap: "break-word",
                  paddingLeft: "5%"
                }}
              >
                <Typography variant={"h6"}>Definitions.</Typography>
                <Typography variant={"body2"}>
                  {def.english_definitions.join(", ")}
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  minWidth: "15%"
                }}
              >
                <Chip
                  color={"secondary"}
                  variant={"outlined"}
                  size={"small"}
                  label={def.jlpt}
                  className={classes.chip}
                />
                <Chip
                  color={"secondary"}
                  variant={"outlined"}
                  size={"small"}
                  label={"Help!"}
                  className={classes.chip}
                />

                <Typography variant={"h6"}>`{def.jplt}</Typography>
              </div>
            </div>
          </React.Fragment>
        );
      }
      return ":((";
    } else {
      return ":(";
    }
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        {displayResults(kanjiDefinitions)}

        {/* When the buttons on the stepper are pressed,
        The update functions should also update the view.*/}
        <MobileStepper
          style={
            /* This is how you can specify JSX styles in CSS. */
            {
              flexGrow: 1
            }
          }
          variant={"text"}
          steps={nSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button size="small" onClick={handleNext}>
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack}>
              <KeyboardArrowLeft />
            </Button>
          }
        />
      </CardContent>
    </Card>
  );
}
