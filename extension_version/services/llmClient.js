/**
 * Calls the local Ollama instance for a recommendation.
 * @param {string} appName 
 * @param {string} installed 
 * @param {string} latest 
 * @returns {Promise<string>}
 */
async function getAIRecommendation(appName, installed, latest) {
    const prompt = `Application: ${appName}\nInstalled Version: ${installed}\nLatest Version: ${latest}\n\nShould the user update? Answer with "Yes" or "No" followed by a one-sentence reason.`;

    try {
        // Ollama local endpoint default is port 11434
        const response = await fetch('http://localhost:11434/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: 'gemma3:4b', 
                prompt: prompt,
                stream: false
            })
        });

        if (!response.ok) {
            throw new Error(`Ollama HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.response.trim();
    } catch (error) {
        console.error("Failed to fetch from Ollama:", error);
        return "No (Local AI offline or unreachable)";
    }
}

module.exports = { getAIRecommendation };