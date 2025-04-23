import fitz
import openai
import os
import json


class PDFExtractionAgent:
    def _init_(self, model="gpt-4o"):
        self.model = model
        self.client = openai.OpenAI(
        api_key="sk-ZJRUV5433F92lpMsREYSwg",
        base_url="https://ai.exxeta.info"
    )

    def extract_text_from_pdf(self, file: str) -> str:
        try:
            doc = fitz.open(stream=file.read(), filetype="pdf")
            text = ""
            for page in doc:
                text += page.get_text()
            return text
        except Exception as e:
            return ""

    def call_llm(self, text: str) -> dict:
        prompt = f"""
Extract structured project information from the following text.

Return a JSON object with the keys:
- name
- industry
- projectName
- projectDescription
- budget
- startDate
- endDate
- requirements (each with skill, amount, recommendedSeniority)

Each skill must be listed separately even if grouped.

TEXT:
{text}
"""

        # Make the request
        client = openai.OpenAI(
        api_key="sk-ZJRUV5433F92lpMsREYSwg",
        base_url="https://ai.exxeta.info"
        )
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "You extract structured data. Requirements must have one skill each."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3
        )

        # Debugging: Print raw response
        print("Raw Response:", response)

        # Extract the content inside the code block (strip the ` json ...  `)
        raw_content = response.choices[0].message.content
        json_str = raw_content.strip("```json\n").strip("```")

        try:
            return json.loads(json_str)
        except Exception as e:
            print("Error decoding response:", e)
            return None

    def run(self, file: str) -> dict:
        text = self.extract_text_from_pdf(file)
        return self.call_llm(text)