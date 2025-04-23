

def get_conversational_chain(vectors, filter_value):
    llm = ChatOpenAI(openai_api_key=gb.OPENAI_API_KEY)
    memory = AnswerConversationBufferMemory(memory_key="chat_history", return_messages=True)
    conversational_chain = ConversationalRetrievalChain.from_llm(
        llm=llm,
        retriever=vectors.as_retriever(search_kwargs={"score_threshold": .5}),
        memory=memory,
        return_source_documents=True
    )
    return conversational_chain

collections = client.get_collections()
if os.getenv("QDRANT_COLLECTION_NAME") not in [c.name for c in collections.collections]:
    client.recreate_collection(
        collection_name=os.getenv("QDRANT_COLLECTION_NAME"),
        vectors_config=qdrant_client.http.models.VectorParams(
            size=768,
            distance=qdrant_client.http.models.Distance.COSINE,
        ),
    )