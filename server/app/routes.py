from flask import jsonify, request, render_template, send_from_directory
from app import app
from app.mecab import mecab


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
    print(data.keys())

    print(asset)
    # return data
    return data


@app.route('/spacing', methods=['POST'])
def spacing():
    post_data = request.get_json()
    try:
        mecab_input = post_data['body']
        output = mecab(mecab_input)
        print(jsonify({'body': output}))
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
