import requests

# Sends a prompt to your local Gemma model through Ollama
def ask_gemma(app_name, installed_version, latest_version):
    prompt = f"""
Application: {app_name}
Installed Version: {installed_version}
Latest Version: {latest_version}

Explain in one simple sentence why the user should update this application.
"""

    response = requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model": "gemma3:4b",
            "prompt": prompt,
            "stream": False
        }
    )

    data = response.json()
    return data["response"].strip()


# Quick test
if __name__ == "__main__":
    explanation = ask_gemma("Chrome", "130.0.1", "137.0.2")
    print(explanation)