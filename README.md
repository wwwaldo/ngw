# ngw

My first react project.

# Live Demo

To-do. 

# Dependencies

Everything is bundled with `Parceljs`, an alternative to `create-react-app`.
Javascript deps, including TypeScript and React, are handled by Parcel,
i.e. Parcel auto-installs dependencies and generates lockfiles.
You can try to build and run with a different tool
but you should probably know what you're doing
if an error appears.

Some TypeScript types were added via `npm --save-dev`.

A simple script to run a development server is in the Makefile.
Type `make` or `make run-dev`.
If this breaks then you should probably know what you're doing
or trying to debug may cause you some pain.

This project also depends on some common Python libraries,
namely Flask. I use Python 3.6 (the default repository install in Ubuntu Linux distros as of this writing).

I have not been as diligent with versioning my Python libraries
since there's less turnover in the Python ecosystem.
You can file an issue if you have tried and failed to build 
on a Linux system.

Finally, this project uses the `mecab` utility for parsing Japanese text
in the backend.
Its github page is found [here](https://github.com/taku910/mecab).
It can also be installed from the Ubuntu repos via `apt-get install`.
If you are having trouble getting an install of mecab then you can probably fuddle around 
with the Python source to disable the feature.

# Features
Here are some ✨hot features✨ of this project (probably only hot if you are also a developer)

## React!
This project uses React 16 for rendering onto the DOM.
We use the useState and useEffect hooks for making React Components
and some simple callback logic
for updating the DOM in response to user events.

## Material Design via MaterialUI
This project uses Google's Material Design spec for the UI/UX, thanks to
MaterialUI, a React implementation of the spec.
I chose to use MaterialUI because I am not a designer and have limited experience creating my own
component designs;
I also liked the professional look of the library, the good community support, 
and its ease of integration into my React project.

## Fetch API and JSON endpoints
In order to run mecab, the program is executed server-side, which means that
the client needs to issue !asynchronous! requests.
On the client-side we issue a POST request with the Fetch API
and on the server side we have a JSON API endpoint.
Now that's Real Web Dev!™

## UTF-8-encoded input?!
App handles Japanese input ✨out of the box✨ (somehow... don't ask me how).

# Things I Should Really Do
- Input sanitization (ーー;)
- ??? 
- Tests
- Maybe more tests (enzyme?)

# Your Feedback
If you're a more experienced dev, I'd love to hear your feedback in the form of an Issue or PR!

# Hire Me?!
Ok, actually no don't do this (i'm flattered though)

# Deployment
To-do with live demo. Expose the Flask app via WSGI on personal server;
use Makefile script to build App and deploy on Linux.

