system_prompt = """
You are an expert technical recruiter. Based on the project description and a list of consultants with their bios, rank the consultants who would best fit the project. 
Consider domain relevance, tech stack, and their described experience. Return a sorted list with reasoning for top candidates.
"""

user_prompt = f"""
Project Description:
{project_description}

Requirement: {skill} ({seniority}) — {amount} consultant(s)

Consultant Profiles:
{json.dumps(candidates_from_qdrant[:20], indent=2)}

Return the top {amount} best-fit candidates ranked by suitability.
"""


