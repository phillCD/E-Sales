from flask import Flask, request, jsonify
from flask_cors import CORS
import test_script
import import_script_no_display

app = Flask(__name__)

CORS(app)

@app.route('/run-script', methods=['POST'])
def run_script():
    try:
        data = request.get_json()  # Receive JSON from the request
        # You can now access data from the JSON, e.g., data['param']
        result = test_script.run_some_function(data)  # Run the specific function in your script



        return jsonify({'status': 'success', 'files': result}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 400

@app.route('/import-product', methods=['POST'])
def import_product():
    try:
        data = request.json # Receive JSON from the request
        # You can now access data from the JSON, e.g., data['param']
        result = import_script_no_display.import_product(data)  # Run the specific function in your script

        return jsonify({'status': 'success', 'files': result}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 400

@app.route('/import-product-display', methods=['POST'])
def import_product_display():
    try:
        data = request.json # Receive JSON from the request
        # You can now access data from the JSON, e.g., data['param']
        result = import_script_no_display.import_product_display(data)  # Run the specific function in your script

        return jsonify({'status': 'success', 'files': result}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 400


if __name__ == '__main__':
    app.run(debug=True)
