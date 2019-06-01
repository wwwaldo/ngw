from flask import jsonify, request, render_template, send_from_directory
from app import app


@app.route("/")
def hello():
    message = "Hello, World"
    return render_template('./index.html', message=message)


@app.route("/<path:path>")
def send_src(path):
    '''
    You can also do this using nginx/apache, but this
    works on my local computer as well (which doesn't
    have either installed).

    Question: How secure is this?
    '''
    return send_from_directory('code', path)


@app.route('/translate', methods=['POST'])
def translate_text():
    data = request.get_json()  # how does this work O_o

    # Okay, sweet... Now I know how to get json data.
    # can I pass my json

    print('Data Received: "{data}"'.format(data=data))

    return "Nothing to see here..."
