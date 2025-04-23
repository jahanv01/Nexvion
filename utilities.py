import qdrant_client
import os
import json
import qdrant_client
from qdrant_client import QdrantClient
from qdrant_client.models import PointStruct, VectorParams, Distance
from sentence_transformers import SentenceTransformer
import openai

# Load model
embedder = SentenceTransformer('all-MiniLM-L6-v2')
client = QdrantClient(
        url="https://7d34deb9-21f3-47f8-a8e4-afb15609c48b.us-east4-0.gcp.cloud.qdrant.io:6333",
        api_key="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIn0.7A_oZg6_9-SYmfsygpgz7RzoNU-mvrTW1NAdtSO2LdQ",
    )
COLLECTION_NAME = "Consultant_Profiles"

def create_collection():

    # Load JSON profiles
    with open(r"../profiles.json", "r", encoding="utf-8") as f:
        profiles = json.load(f)

    vector_size = embedder.get_sentence_embedding_dimension()
    client.recreate_collection(
        collection_name="Consultant_Profiles",
        vectors_config=VectorParams(size=vector_size, distance=Distance.COSINE)
    )

    points = []
    for idx, profile in enumerate(profiles):
        combined_text = f"""
        {profile['name']} is a {profile['seniority']} {profile['role']}.
        {profile['description']}
        Technologies used: {', '.join(profile['technologies'])}.
        Certificates: {', '.join(profile.get('certificates', []))}.
        Languages spoken: {', '.join(profile.get('languages_spoken', []))}.
        """
        vector = embedder.encode(combined_text).tolist()
        point = PointStruct(
            id=idx + 1,  # Unique integer ID
            vector=vector,
            payload=profile
        )
        points.append(point)


    # Upload in batch
    client.upsert(collection_name="Consultant_Profiles", points=points)

    # print(f"Uploaded {len(points)} profiles to Qdrant.")
def embed_text(text):
    vector = embedder.encode(text).tolist()
    return vector

def search_candidates(project_description, skill, seniority, top_k):
    query_vector = embed_text(project_description)

    return client.search(
    collection_name=COLLECTION_NAME,
    query_vector=query_vector,
    limit=int(top_k)*2
)

import openai

def rank_candidates_with_llm(project_description, skill, seniority, location, amount, candidates):
    # Step 1: Prepare and format candidate profiles
    formatted_profiles = ""
    for idx, c in enumerate(candidates, 1):
        p = c.payload
        profile_str = (
            f"{idx}. Name: {p.get('name', 'N/A')}\n"
            f"   Role: {p.get('role', '')}\n"
            f"   Seniority: {p.get('seniority', '')}\n"
            f"   Description: {p.get('description', '')}\n"
            f"   Technologies: {', '.join(p.get('technologies', []))}\n"
            f"   Languages Spoken: {', '.join(p.get('languages_spoken', []))}\n"
        )
        formatted_profiles += profile_str + "\n"

    # Step 2: Build prompt
    system_prompt = """
You are an expert technical recruiter. Based on the project description and location and a list of consultants, 
rank the ones who best fit the specified role based on skills, personal description and languages spoken.
{"response": [{"name": "Consultant Name", "reason": "Why they are a good fit"}, ...]}
    """.strip()

    user_prompt = f"""
Project Description:
{project_description}
Location: 
{location}
Requirement: {skill} ({seniority}) — Need {amount} consultant(s)

Consultant Profiles:
{formatted_profiles}
""".strip()

    # Step 3: Create a chat completion request
    client = openai.OpenAI(
        api_key="sk-ZJRUV5433F92lpMsREYSwg",
        base_url="https://ai.exxeta.info"
    )

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
        temperature=0.2
    )
    return response

def parse_response(text):
    try:
        import json
        response_text = text
        parsed = json.loads(response_text)
        return parsed["response"]
    except Exception as e:
        return None
