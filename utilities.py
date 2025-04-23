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

