# APIVeil

APIVeil is an AI-powered reverse proxy for monitoring and debugging APIs. It provides an interface where you can easily onboard reverse proxies, which will subsequently spin up AWS EC2 instances. Then, any requests sent to the proxy URL will be forwarded to the base API URL, with all API traffic logged in the interface. Users can then utilize LLMs and RAG to assist with debugging while using API documentation and traffic as context.

This project was made for Georgia Tech's CS 4723: Inter Capstone Design.

## Tech Stack

- C++
- Poco
- WebSocket
- Python
- AWS
- PostgreSQL
- Flask
- RAG
- LangChain
- Next.js

## Prerequisites

### A. Install POCO [here](https://pocoproject.org/)

## B. Set Up Your OpenAI API Key

**macOS (Bash or Zsh):**

```bash
export OPENAI_API_KEY=YOUR_OPENAI_API_KEY
```
**Windows:**

```$env:OPENAI_API_KEY="YOUR_OPENAI_API_KEY"
Replace YOUR_OPENAI_API_KEY with your actual key from OpenAI’s platform.
```

## How to set up RAG and populate chunks with API documentation:
1. Go to api/open_ai/rag
2. Run 'pip install -r requirements.txt' onto your virtual environment
3. Run 'streamlit run app.py'
4. This will spin up a frontend for you to populate chunks with documentation and other static context

