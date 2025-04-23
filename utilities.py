from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import FAISS
import globals as gb
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain
from langchain.llms import OpenAI
from langchain.chat_models import ChatOpenAI
from langchain.text_splitter import RecursiveCharacterTextSplitter
import qdrant_client
import os
import joblib
from langchain.vectorstores import Qdrant
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain
from langchain.chat_models import ChatOpenAI
from langchain.text_splitter import RecursiveCharacterTextSplitter
import qdrant_client
from langchain.vectorstores import Qdrant
from langchain.text_splitter import RecursiveCharacterTextSplitter
from typing import Dict, Any
from langchain.docstore.document import Document
import json
from qdrant_client import QdrantClient
from qdrant_client.models import PointStruct, VectorParams, Distance
from sentence_transformers import SentenceTransformer

# Load model
embedder = SentenceTransformer('all-MiniLM-L6-v2')
COLLECTION_NAME = "Consultant_Profiles"

# Load JSON profiles
with open("../profiles.json", "r", encoding="utf-8") as f:
    profiles = json.load(f)


client = QdrantClient(
    url="https://7d34deb9-21f3-47f8-a8e4-afb15609c48b.us-east4-0.gcp.cloud.qdrant.io:6333",
    api_key="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIn0.7A_oZg6_9-SYmfsygpgz7RzoNU-mvrTW1NAdtSO2LdQ",
)

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


"""# Upload in batch
client.upsert(collection_name="Consultant_Profiles", points=points)

print(f"Uploaded {len(points)} profiles to Qdrant.")"""

def embed_text(text):
    vector = embedder.encode(combined_text).tolist()
    return vector

def search_candidates(project_description, skill, seniority, top_k=20):
    query_vector = embed_text(project_description)
    return client.search(
        collection_name=COLLECTION_NAME,
        query_filter=Filter(
            must=[
                FieldCondition(key="technologies", match=MatchValue(value=skill)),
                FieldCondition(key="seniority", match=MatchValue(value=seniority)),
            ]
        ),
        query_vector=None,  # If using hybrid search, replace with project description vector
        limit=top_k,
        with_payload=True
    )

import openai

# Set your OpenAI API key
openai.api_key = None


def rank_candidates_with_llm(project_description, skill, seniority, amount, candidates):
    candidates_data = [
        {
            "name": c.payload["name"],
            "role": c.payload.get("role", ""),
            "seniority": c.payload.get("seniority", ""),
            "description": c.payload.get("description", ""),
            "technologies": c.payload.get("technologies", [])
        }
        for c in candidates
    ]

    system_prompt = """
You are an expert technical recruiter. Based on the project description and a list of consultants, rank the ones who best fit the specified role.
"""
    user_prompt = f"""
Project Description:
{project_description}

Requirement: {skill} ({seniority}) — Need {amount} consultant(s)

Consultant Profiles:
{candidates_data}

Rank the top {amount} suitable candidates with reasons.
"""

    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": system_prompt.strip()},
            {"role": "user", "content": user_prompt.strip()},
        ],
        temperature=0.2
    )

    return response['choices'][0]['message']['content']
