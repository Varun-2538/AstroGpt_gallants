from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Flask app setup
app = Flask(__name__)
CORS(app)

# Langflow configuration
BASE_API_URL = "https://api.langflow.astra.datastax.com"
LANGFLOW_ID = os.getenv('LANGFLOW_ID')
FLOW_ID = os.getenv('FLOW_ID')
APPLICATION_TOKEN = os.getenv('APPLICATION_TOKEN')

# Validate required environment variables
required_env_vars = ['LANGFLOW_ID', 'FLOW_ID', 'APPLICATION_TOKEN']
missing_vars = [var for var in required_env_vars if not os.getenv(var)]
if missing_vars:
    raise EnvironmentError(f"Missing required environment variables: {', '.join(missing_vars)}")

TWEAKS = {
    "ChatInput-H4yRa": {},
    "ParseData-67Big": {},
    "Prompt-Rwqkl": {},
    "SplitText-1Qvd7": {},
    "OpenAIModel-h16gt": {},
    "ChatOutput-aVYDO": {},
    "AstraDB-4Vo6G": {},
    "OpenAIEmbeddings-34uTS": {},
    "AstraDB-AeLsd": {},
    "OpenAIEmbeddings-5ECcb": {},
    "File-7A7RK": {}
}

def run_flow(message: str, endpoint: str, tweaks: dict) -> dict:
    """
    Run the Langflow API with a given message and optional tweaks.
    """
    api_url = f"{BASE_API_URL}/lf/{LANGFLOW_ID}/api/v1/run/{endpoint}"

    payload = {
        "input_value": message,
        "output_type": "chat",
        "input_type": "chat",
        "tweaks": tweaks,
    }
    headers = {
        "Authorization": f"Bearer {APPLICATION_TOKEN}",
        "Content-Type": "application/json",
    }

    response = requests.post(api_url, json=payload, headers=headers)

    # Handle errors gracefully
    if response.status_code != 200:
        return {"error": "Langflow API request failed", "details": response.text}

    return response.json()

@app.route("/api/chat", methods=["POST"])
def chat():
    """
    Chat endpoint for handling messages from the frontend.
    """
    try:
        data = request.json
        message = data.get("message", "").strip()
        if not message:
            return jsonify({"error": "Message is required"}), 400

        print(f"Received message: {message}")

        # Run the flow with the given message
        response = run_flow(message=message, endpoint=FLOW_ID, tweaks=TWEAKS)

        # Log response
        print(f"Langflow API response: {response}")

        if "error" in response:
            return jsonify({"error": response["error"], "details": response.get("details", "")}), 500

        # Extract chatbot's reply
        outputs = response.get("outputs", [])
        if outputs:
            # Correctly extract the chatbot response
            chatbot_response = outputs[0]["outputs"][0]["results"]["message"]["text"]
            return jsonify({"message": chatbot_response}), 200

        return jsonify({"error": "No response from Langflow API"}), 500

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 500

# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True, port=5001)