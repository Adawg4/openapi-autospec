from flask import Flask, request, jsonify

app = Flask(__name__)

# POST endpoint
@app.route('/endpoint', methods=['POST'])
def handle_post_request():
    # Retrieve data from the POST request
    data = request.json
    
    # Process the data (Here, we're simply echoing it back)
    processed_data = {"message": "Received data", "data": data}
    
    # Return a JSON response
    return jsonify(processed_data)

# GET endpoint
@app.route('/endpoint', methods=['GET'])
def handle_get_request():
    # Some example data for demonstration
    example_data = {"message": "This is a GET request response"}
    
    # Return a JSON response
    return jsonify(example_data)

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=4001)