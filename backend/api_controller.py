from flask import Flask, request, jsonify
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from utilities import search_candidates, rank_candidates_with_llm

app = Flask(__name__)

@app.route('/submit', methods=['POST'])
def submit_data():
    data = request.get_json()

    project = data['projectApplication']['projectDetails']
    project_description = project['description']
    results = []

    for req in project['requirements']:
        skill = req['skill']
        seniority = req['recommendedSeniority']
        amount = req['amount']

        matched_candidates = search_candidates(skill, seniority, top_k=30)

        # Step 2: Rank using LLM
        top_ranked = rank_candidates_with_llm(project_description, skill, seniority, amount, matched_candidates)

        results.append({
            "skill": skill,
            "required": amount,
            "ranked_candidates": top_ranked
        })

    return jsonify({"matched_consultants": results}), 200

if __name__ == '__main__':
    app.run(debug=True)
