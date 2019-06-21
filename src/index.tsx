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
  Link,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider
} from "@material-ui/core";
import { getWordIndex, doRomanjiFetch } from "./japaneseUtils";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  /* styles for drawer. */
  root: {
    display: "flex"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  /* older styles ... */
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  appBar: {
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    zIndex: theme.zIndex.drawer + 1
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

/* The drawer on the right side of the app. */
function AppDrawer() {
  const classes = useStyles();
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper
      }}
      anchor="right"
    >
      <div className={classes.appBarSpacer} />
      <Divider />
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

/* The attribution text at the bottom of the app. */
function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Built with love by "}
      <a href={"https://www.github.com/caroline-lin"}>{"@caroline-lin."}</a>
    </Typography>
  );
}

/* The app bar. */
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

class ClassApp extends React.Component<
  {},
  { kanjiText: string; romanjiText: string; selectedKanji: string }
> {
  constructor(props: Readonly<{}>) {
    super(props);

    let initialText = `Explore song lyrics by hovering over the characters, eg.

    白鳥たちはそう 
    見えないとこでバタ足するんです 
    
    Input your own song lyrics by clicking the explorer.

    Highlighted characters' definitions pop up in the right box.

    Have fun!
    `;

    this.state = {
      kanjiText: initialText,
      romanjiText: "",
      selectedKanji: initialText[0]
    };
  }

  render() {
    return (
      <div>
        Still working on this... Need to learn about higher-order components in
        order to use the MUI styling solution.
      </div>
    );
  }

  componentDidMount() {
    // Setting the romanjitext currently requires fetching from Mecab.
    // So it makes sense to do the fetch when the component mounts.
    // Apparently "this can lead to performance issues"
    // because this double-renders the component. See React docs.
    let f = async () => {
      let romanjiText = await doRomanjiFetch({ body: this.state.kanjiText });
      this.setState({ romanjiText: romanjiText });
    };
    f();
  }
}

function App() {
  const classes = useStyles();

  // TODO: Refactor TranslateCard to update these when text field changes.
  let [kanjiText, setKanjiText] = useState("蒼い 風 が いま");
  let [romanjiText, setRomanjiText] = useState("aoi kaze ga ima");
  let [selectedKanji, setSelectedKanji] = useState("が"); // todo
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
    <div className={classes.root}>
      <main>
        <Header />
        {/* spacer element! use this to pad between container and menubar */}
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={6}>
              <TranslateCard {...props} />
            </Grid>
            <Grid
              item
              container
              xs={12}
              md={12}
              lg={6}
              spacing={2}
              flex-direction={"column"}
            >
              <Grid item xs={12}>
                <WordCard
                  kanji={selectedKanji}
                  romanji={getRomanjiEquivalent(selectedKanji)}
                />
              </Grid>
              <Grid item xs={12}>
                <JishoWordCard kanji={selectedKanji} />
              </Grid>
            </Grid>
          </Grid>
        </Container>
        <MadeWithLove />
      </main>
      <aside>
        <AppDrawer />
      </aside>
    </div>
  );
}

const appdiv = document.getElementById("app");
ReactDOM.render(<App />, appdiv);
