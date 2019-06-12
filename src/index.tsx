import * as React from "react";
import { useState, useEffect } from "react";
import * as ReactDOM from "react-dom";

import TranslateCard from "./TranslateCard";
import WordCard from "./WordCard";
import JishoWordCard from "./JishoWordCard";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { trim } from "jquery";

import "typeface-roboto";

import {
  AppBar,
  Toolbar,
  CssBaseline,
  makeStyles,
  Button,
  Link
} from "@material-ui/core";
import { getWordIndex } from "./japaneseUtils";

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

function Header() {
  const classes = useStyles();

  return (
    <AppBar position="absolute" className={classes.appBar}>
      <Toolbar>
        <Typography className={classes.title} variant="h6">
          Dashboard
        </Typography>
        <Button className={classes.menuButton}>About</Button>
        <Button className={classes.menuButton}>Other</Button>
      </Toolbar>
    </AppBar>
  );
}

function App() {
  const classes = useStyles();

  // TODO: Refactor TranslateCard to update these when text field changes.
  let [kanjiText, setKanjiText] = useState("蒼い 風 が いま");
  let [romanjiText, setRomanjiText] = useState("aoi kaze ga ima");
  let [selectedKanji, setSelectedKanji] = useState("風"); // todo
  let props = {
    kanjiText,
    setKanjiText,
    romanjiText,
    setRomanjiText,
    selectedKanji,
    setSelectedKanji
  };

  let getRomanjiEquivalent = (w: string): string =>
    romanjiText.split(" ").map(trim)[getWordIndex(kanjiText, w)];

  return (
    <div>
      <main>
        <Header />
        {/* spacer element! use this to pad between container and menubar */}
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={6}>
              <TranslateCard {...props} />
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
                <WordCard
                  kanji={selectedKanji}
                  romanji={getRomanjiEquivalent(selectedKanji)}
                />
              </Grid>
              <Grid item lg={12}>
                <JishoWordCard kanji={selectedKanji} />
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
