import argparse
import json
from argparse import RawTextHelpFormatter
import requests
from typing import Optional
import warnings

# Optional file upload helper (requires langflow)
try:
    from langflow.load import upload_file
except ImportError:
    warnings.warn("Langflow provides a function to help you upload files to the flow. Please install langflow to use it.")
    upload_file = None

# Configuration
BASE_API_URL = "https://api.langflow.astra.datastax.com"
LANGFLOW_ID = "13d2661b-1cac-469c-a004-3df3ec5a3da7"
FLOW_ID = "f35a2497-666e-479d-879e-29b1817f5916"
APPLICATION_TOKEN = "AstraCS:ReHMyrqyATrjxuKwRdQuHpdu:9f90ff548e2390e505c74ace5471b0c9fa480289dfb3e29a1935c7ec739bc84a"
ENDPOINT = ""  # Specify the endpoint name in flow settings if required

# Default tweaks
TWEAKS = {
    "ParseData-0gmwq": {},
    "Prompt-oUvL5": {},
    "SplitText-XnWhn": {},
    "OpenAIModel-lWy6T": {},
    "ChatOutput-SWqbK": {},
    "AstraDB-WDBUA": {},
    "OpenAIEmbeddings-dy4fm": {},
    "AstraDB-g5gxZ": {},
    "OpenAIEmbeddings-IUM4B": {},
    "File-DZQuH": {},
    "TextInput-w1RfG": {}
}

def run_flow(
    message: str,
    endpoint: str,
    output_type: str = "text",
    input_type: str = "text",
    tweaks: Optional[dict] = None,
    application_token: Optional[str] = None
) -> dict:
    """
    Run a flow with the given message and optional tweaks.

    :param message: The message to send to the flow
    :param endpoint: The ID or endpoint name of the flow
    :param tweaks: Optional tweaks to customize the flow
    :param application_token: The application token for authentication
    :return: The JSON response from the flow
    """
    api_url = f"{BASE_API_URL}/lf/{LANGFLOW_ID}/api/v1/run/{endpoint}"

    payload = {
        "input_value": message,
        "output_type": output_type,
        "input_type": input_type,
    }
    if tweaks:
        payload["tweaks"] = tweaks

    headers = {"Authorization": f"Bearer {application_token}", "Content-Type": "application/json"} if application_token else {}

    response = requests.post(api_url, json=payload, headers=headers)

    if response.status_code != 200:
        return {"error": "API request failed", "details": response.text}

    return response.json()

def main():
    parser = argparse.ArgumentParser(
        description="""Run a flow with the given message and optional tweaks.
Example usage:
python <script_name>.py "your message" --endpoint "your_endpoint" --tweaks '{"key": "value"}'
""",
        formatter_class=RawTextHelpFormatter
    )
    parser.add_argument("message", type=str, help="The message to send to the flow")
    parser.add_argument("--endpoint", type=str, default=ENDPOINT or FLOW_ID, help="The ID or endpoint name of the flow")
    parser.add_argument("--tweaks", type=str, default=json.dumps(TWEAKS), help="JSON string representing the tweaks")
    parser.add_argument("--application_token", type=str, default=APPLICATION_TOKEN, help="Application token for authentication")
    parser.add_argument("--output_type", type=str, default="text", help="The output type (default: text)")
    parser.add_argument("--input_type", type=str, default="text", help="The input type (default: text)")
    parser.add_argument("--upload_file", type=str, help="Path to the file to upload", default=None)
    parser.add_argument("--components", type=str, help="Components for uploading the file", default=None)

    args = parser.parse_args()

    try:
        tweaks = json.loads(args.tweaks)
    except json.JSONDecodeError:
        raise ValueError("Invalid JSON format for tweaks")

    if args.upload_file:
        if not upload_file:
            raise ImportError("Langflow is not installed. Install it to use the upload_file function.")
        elif not args.components:
            raise ValueError("Provide the components for uploading the file.")
        tweaks = upload_file(
            file_path=args.upload_file,
            host=BASE_API_URL,
            flow_id=args.endpoint,
            components=args.components,
            tweaks=tweaks
        )

    response = run_flow(
        message=args.message,
        endpoint=args.endpoint,
        output_type=args.output_type,
        input_type=args.input_type,
        tweaks=tweaks,
        application_token=args.application_token
    )

    print(json.dumps(response, indent=2))

if __name__ == "__main__":
    main()
