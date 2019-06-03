from flask import jsonify, request, render_template, send_from_directory
from app import app


@app.route("/")
def hello():
    message = "Hello, World"
    return render_template('./index.html', message=message)


# temporary
@app.route("/<asset>.png")
def send_asset(asset):
    return send_from_directory('static', './' + asset + '.png')


@app.route("/<asset>.json", methods=['POST'])
def send_json_asset(asset):
    data = request.get_json()
    print(data)
    print(asset)
    # return data
    return


@app.route("/<path:path>")
def send_src(path):
    '''
    You can also do this using nginx/apache, but this soln
    works on my local computer as well (which doesn't
    have either installed).

    Question: How secure is this?
    Ans: Secure enough as long as you aren't stupid
        and put things in the 'code' directory
        which you don't want users to be able to access.
    '''
    return send_from_directory('code', path)


@app.route('/translate', methods=['POST'])
def translate_text():
    data = request.get_json()  # how does this work O_o

    # Okay, sweet... Now I know how to get json data.
    # can I pass my json

    print('Data Received: "{data}"'.format(data=data))

    return "Nothing to see here..."
