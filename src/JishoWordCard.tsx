import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { doDefinitionFetch } from "./japaneseUtils";

import ArrowForward from "@material-ui/icons/ArrowForward";
import ArrowBack from "@material-ui/icons/ArrowBack";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

import "typeface-roboto";

import {
  IconButton,
  TextField,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  Input,
  OutlinedInput,
  Typography,
  Button,
  ButtonGroup,
  Grid,
  StepButton,
  MobileStepper
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  card: {
    padding: theme.spacing(0),
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
  },
  mobileStepper: {
    flexGrow: 1
  }
}));

class MyMobileStepper extends React.Component<
  {},
  { activeStep: number; numSteps: number }
> {
  constructor(props: any) {
    super(props);
    this.state = { activeStep: 1, numSteps: 5 };
  }

  handleNext = () => {
    this.setState({ activeStep: this.state.activeStep + 1 });
  };

  handleBack = () => {
    this.setState({ activeStep: this.state.activeStep - 1 });
  };

  render() {
    let activeStep = this.state.activeStep;
    let numSteps = this.state.numSteps;

    let setNumSteps = (step: number) => {
      this.setState({ numSteps: step });
    };

    return (
      <div>
        <Button
          onClick={() =>
            numSteps > 8 ? setNumSteps(numSteps - 1) : setNumSteps(numSteps + 1)
          }
        >
          Hii
        </Button>
        <MobileStepper
          variant={"text"}
          steps={numSteps}
          position="static"
          activeStep={activeStep}
          className={"todo"}
          nextButton={
            <Button
              size="small"
              onClick={this.handleNext}
              disabled={activeStep === numSteps - 1}
            >
              Next
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={this.handleBack}
              disabled={activeStep === 0}
            >
              <KeyboardArrowLeft />
              Back
            </Button>
          }
        />
      </div>
    );
  }
}

export default function JishoWordCard({ kanji }: { kanji: string }) {
  const classes = useStyles();

  // TODO: store the state of the API request into
  // the button...

  // Somewhat inefficient fetch for converting currently selected kanji
  // to romanji
  let [jishoResult, setJishoResult] = useState({});
  let counter = 5;
  const here = useRef(null);

  /** 
  useEffect(() => {
    const fetchData = async () => {
      let definitionJSON = doDefinitionFetch(kanji);
      setJishoResult(definitionJSON);
    };
    fetchData();
  });
  */

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant={"h1"} align={"center"}>
          {kanji}
        </Typography>
        <Button
          onClick={e => {
            console.log(here.current);
          }}
        >
          Click me ..
        </Button>

        <Typography variant={"body1"} align={"left"}>
          {"TODO: ping the Jisho API with a request\n"}
          {kanji}
          {"\n\n"}
        </Typography>

        <div>
          <MyMobileStepper ref={here} />
        </div>
      </CardContent>
    </Card>
  );
}
