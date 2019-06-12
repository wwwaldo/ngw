import * as React from "react";
import { useState, useEffect } from "react";
import * as ReactDOM from "react-dom";

import TranslateCard from "./TranslateCard";
import WordCard from "./WordCard";
import JishoWordCard from "./JishoWordCard";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import "typeface-roboto";

import {
  AppBar,
  Toolbar,
  CssBaseline,
  makeStyles,
  Button,
  Link
} from "@material-ui/core";
import { doMecabFetch } from "./japaneseUtils";

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  appBar: {
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Built with love by "}
      <a href={"https://www.github.com/caroline-lin"}>{"@caroline-lin."}</a>
    </Typography>
  );
}

function App() {
  const classes = useStyles();

  let [selectedWord, setSelectedWord] = useState("");
  let [selectedWordIndex, setSelectedWordIndex] = useState(0);

  return (
    <div>
      {/* Header App-bar */}
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar>
          <Typography className={classes.title} variant="h6">
            Dashboard
          </Typography>
          <Button className={classes.menuButton}>About</Button>
          <Button className={classes.menuButton}>Other</Button>
        </Toolbar>
      </AppBar>

      <main>
        {/* spacer element! use this to pad between container and menubar */}
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={6}>
              <TranslateCard
                onChange={word => {
                  setSelectedWord(word); // bug..
                }}
              />
            </Grid>
            <Grid
              item
              container
              xs={12}
              md={4}
              lg={6}
              spacing={2}
              flex-direction={"column"}
            >
              <Grid item lg={12}>
                <WordCard word={selectedWord} />
              </Grid>
              <Grid item lg={12}>
                <JishoWordCard kanji={selectedWord} />
              </Grid>
            </Grid>
          </Grid>
        </Container>
        <MadeWithLove />
      </main>
    </div>
  );
}

const appdiv = document.getElementById("app");
ReactDOM.render(<App />, appdiv);
