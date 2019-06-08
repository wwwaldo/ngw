import * as React from "react";
import { useState, useEffect } from "react";
import * as ReactDOM from "react-dom";

import TranslateCard from "./translateCard";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import "typeface-roboto";

import {
  AppBar,
  Toolbar,
  CssBaseline,
  makeStyles,
  Button
} from "@material-ui/core";

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

function App() {
  const classes = useStyles();

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
            <Grid item xs={8} md={10} lg={10}>
              <TranslateCard />
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}

const appdiv = document.getElementById("app");
ReactDOM.render(<App />, appdiv);
