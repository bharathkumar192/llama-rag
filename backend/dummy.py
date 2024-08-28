from flask import Flask, jsonify, request, Response, make_response
from flask_cors import CORS
from datetime import datetime
import time
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
import json

# Sample data
CUSTOMERS = [
    {
        "timestamp": datetime.now().isoformat(),
        "name": "John Doe",
        "company": "Alpha Corp",
        "summary": """We discussed two topics related to Oracle's DataSafe Data Masking product:

1. **Masking a Production Database**: I emphasized that it's not recommended to mask sensitive data on a production database, as it could compromise the security and integrity of critical business data. Instead, it's best to use a test environment or a non-production database for testing and validating data masking jobs.
2. **Masking Report**: We talked about the types of reports that can be generated after a data masking job, including Work Request Reports, Masking Policy Reports, and Data Masking Reports. I mentioned that these reports provide valuable insights into the data masking process, including masked column names, masking algorithms used, number of rows processed, and more.
"""

    },
    {
        "timestamp": datetime.now().isoformat(),
        "name": "Jane Smith",
        "company": "Beta Inc",
        "summary": "We discussed the Deterministic Encryption masking format in Oracle's DataSafe Data Masking product. I explained what Deterministic Encryption is, its characteristics, limitations, and use cases. Additionally, we covered how to decrypt the encrypted data using the same seed value used for encryption."
    }
]

feedbacks = [
    {
        "timestamp": "2024-05-31T12:00:00Z",
        "name": "Alice Johnson",
        "company": "Tech Innovations Inc.",
        "userQuery": "Can we mask production Database?",
        "botResponse": "No, we strongly advise against masking a production database. It's recommended to create a backup of your production database and then clone it to create a stage database. This ensures that the original production database remains unchanged while allowing you to safely apply data masking without affecting critical business operations.",
        "like": True,
        "manualFeedback": "The response was helpful and detailed. Thanks!"
    },
    {
        "timestamp": "2024-05-31T12:30:00Z",
        "name": "Bob Smith",
        "company": "DataSecure LLC",
        "userQuery": "Is it possible to reverse the masked data?",
        "botResponse": "According to our documentation, some masking formats support reversible masking. Specifically, the Deterministic Encryption masking format allows retrieving original column data from masked data. However, this capability depends on the specific masking format used. Not all masking formats offer reversibility. We recommend checking the characteristics of the chosen masking format to determine its reversibility capabilities.",
        "like": False,
        "manualFeedback": "I need more specifics on techniques for reversible masking."
    },
    {
        "timestamp": "2024-05-31T13:00:00Z",
        "name": "Carol White",
        "company": "FastData Corp",
        "userQuery": "Can you please provide more details about this masking format?",
        "botResponse": """Based on the documentation, here are the key features and characteristics of the Deterministic Encryption masking format:

Uniqueness: Yes, this masking format ensures uniqueness of the generated masked data, making it suitable for masking columns with uniqueness constraints.
Reversibility: Yes, this masking format supports reversible masking, meaning that original column data can be retrieved from masked""",
        "like": True,
        "manualFeedback": "Thanks for the details !"
    }
]



# @app.route('/chat_llm', methods=['GET', 'POST'])
# def agent():
#     data = request.json
#     # print(generate_model_prompt(data['history']))
#     time.sleep(5)
#     return jsonify({'docs':"https://google.com", 'answer': "\n\nBased on the documentation, we know that Data Masking requires additional space, which is approximately 5 times the size of the largest table being masked. Since your largest table is 10KB, the additional space required would be:\n\n5 x 10KB = 50KB\n\nSo, an additional 50KB of space will be required on your database to mask the data. This includes both TEMP tablespace (roughly 20KB) and the tablespace where masking is running (roughly 30KB). | Header 1 | Header 2 | \n |---|---| \n | Row 1 Cell 1 | \n Row 1 Cell 2 | \n | Row 2 Cell 1 | \n Row 2 Cell 2 |"})


# { "key0" : "val" }


@app.route("/narratives", methods=["GET"])
def narratives():
    # return jsonify({"data" : CUSTOMERS})
    return jsonify(CUSTOMERS)


@app.route("/feedback", methods=["GET"])
def feedback():
    # return jsonify({"data" : feedbacks})
    return jsonify(feedbacks)


@app.route("/chat_llm", methods=["POST", "OPTIONS"])
def chat_llm():
    if request.method == "OPTIONS":
        # Respond to preflight request
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Allow-Headers", "*")
        response.headers.add("Access-Control-Allow-Methods", "*")
        return response

    def generate():
        dummy_responses = [
            "\n\nBased on the documentation,",
            "we know that Data Masking requires additional space,",
            "which is approximately 5 times the size of the largest table being masked.",
            "Since your largest table is 10KB, the additional space required would be:",
            "\n\n5 x 10KB = 50KB\n\nSo, an additional 50KB of space will be required on your database to mask the data.",
            "This includes both TEMP tablespace (roughly 20KB) and the tablespace where masking is running (roughly 30KB)"
        ]
        
        for response in dummy_responses:
            time.sleep(1)
            yield f"data: {json.dumps({'answer': response})}\n\n"
        
        yield f"data: {json.dumps({'answer': 'END'})}\n\n"

    response = Response(generate(), mimetype='text/event-stream')
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/user')
def user():

    return jsonify({'message' : "user's data is saved", "status" : 200})


if __name__ == '__main__':
    app.run(debug=True, port=5000)  # Run the server in debug mode on port 5000
