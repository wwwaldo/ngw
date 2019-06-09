from flask import jsonify, request, render_template, send_from_directory
from app import app
from app.mecab import mecab, run_kakasi


@app.route("/")
def hello():
    message = "Hello, World"
    return render_template('./index.html', message=message)


@app.route('/spacing', methods=['POST'])
def spacing():
    # To-do: input sanitization?
    post_data = request.get_json()
    try:
        mecab_input = post_data['body']
        output = mecab(mecab_input)
        return jsonify(output)

    except KeyError as e:
        print('Keyerror ', e)


@app.route('/romanji', methods=['POST'])
def romanji():
    # To-do: input sanitization?
    post_data = request.get_json()
    try:
        mecab_input = post_data['body']
        output = run_kakasi(mecab_input)
        return jsonify(output)

    except KeyError as e:
        print('Keyerror ', e)


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
