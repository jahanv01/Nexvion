from flask import Flask, request, jsonify
import os
import sys
import json
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from utilities import search_candidates, rank_candidates_with_llm, parse_response
from extractor import PDFExtractionAgent
from flask_cors import CORS

app = Flask(__name__)

CORS(app)
with open(r"../profiles.json", "r", encoding="utf-8") as f:
    all_profiles = json.load(f)

# Create a quick lookup for name -> full profile
profile_map = {profile["name"]: profile for profile in all_profiles}

@app.route('/submit', methods=['POST'])
def submit_data():
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file and file.filename.endswith('.pdf'):
        agent = PDFExtractionAgent()
        result = agent.run(file)

    project = result['projectDescription']
    requirements = result['requirements']
    location = result['location']
    results = []

    for req in requirements:
        skill = req['skill']
        seniority = req['recommendedSeniority']
        amount = req['amount']
        vector_query = f"{seniority}.Technologies used:" \
                       f" {', '.join([skill])}."
        matched_candidates = search_candidates(vector_query, skill, seniority, top_k=amount)

        # Step 2: Rank using LLM
        top_ranked = rank_candidates_with_llm(project, skill, seniority, location, amount, matched_candidates)

        response = parse_response(top_ranked.choices[0].message.content)

        for entry in response:
            if entry:
                name = entry["name"]
                if name in profile_map:
                    entry["metadata"] = profile_map[name]
                else:
                    entry["metadata"] = ""

        results.append({
            "skill": skill,
            "ranked_candidates": response
        })

    return jsonify({"matched_consultants": results}), 200

if __name__ == '__main__':
    app.run(port=5002)
