from openai import OpenAI
client = OpenAI()

class OpenAiService:
    @staticmethod
    def create_response(prompt: str) -> str:
        response = client.responses.create(
            model="gpt-4o",
            input=prompt,
        )

        return response.output_text