# ngw

A web app to help me learn Japanese (well, and maybe you too). Started with help from [Soenke Hahn](https://github.com/soenkehahn) during [Recurse's Never Graduate Week](https://www.recurse.com/) in 2019.

# Live Demo

You can visit [here](http://app.rylin.cc).

# Dependencies

Everything is bundled with `Parceljs`, an alternative to `create-react-app`.

Some TypeScript types were added via `npm --save-dev`.

Grab python deps by making a virtualenv and sourcing requirements.txt:
```
cd server
virtualenv venv
source venv/bin/activate
pip install -r requirements.txt
```

Additionally, the mecab binary needs to be installed: [here](https://github.com/taku910/mecab).

# Local Development

A script to run a development server is in the Makefile. Type `make run-dev`.

# Things I Would Like To Do
- Responsiveness on mobile
- Input sanitization?
