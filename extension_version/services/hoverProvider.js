const vscode = require('vscode');
const { loadJsonData } = require('./dataLoader');
const { isUpdateAvailable } = require('./versionChecker');
const { getAIRecommendation } = require('./llmClient');

function getHoverProvider(context) {
    return vscode.languages.registerHoverProvider('*', {
        async provideHover(document, position, token) {
            // Get the word the user is currently hovering over
            const range = document.getWordRangeAtPosition(position);
            if (!range) return null;
            
            const hoveredWord = document.getText(range).toLowerCase();

            // 1. Load Data
            const systemApps = loadJsonData(context, 'data/systemApps.json');
            const latestVersions = loadJsonData(context, 'data/latestVersions.json');

            // Check if the hovered word matches any app we care about
            if (!systemApps[hoveredWord]) {
                return null; 
            }

            const installed = systemApps[hoveredWord];
            const latest = latestVersions[hoveredWord];

            // 2. Evaluate Updates
            const updateAvailable = isUpdateAvailable(installed, latest);

            // 3. Build the UI output using Markdown
            let markdownString = new vscode.MarkdownString();
            markdownString.appendMarkdown(`### ${hoveredWord.toUpperCase()} Version Status\n\n`);
            markdownString.appendMarkdown(`* **Installed Version:** \`${installed}\`\n`);
            markdownString.appendMarkdown(`* **Latest Version:** \`${latest}\`\n\n`);

            if (updateAvailable) {
                markdownString.appendMarkdown(` **New update available.**\n\n`);
                
                // 4. Contact local LLM asynchronously 
                markdownString.appendMarkdown(`*Consulting Local AI...*\n`);
                const aiRecommendation = await getAIRecommendation(hoveredWord, installed, latest);
                
                // Re-build fresh markdown to replace the "loading" state seamlessly
                markdownString = new vscode.MarkdownString();
                markdownString.appendMarkdown(`### ${hoveredWord.toUpperCase()} Version Status\n\n`);
                markdownString.appendMarkdown(`* **Installed Version:** \`${installed}\`\n`);
                markdownString.appendMarkdown(`* **Latest Version:** \`${latest}\`\n\n`);
                markdownString.appendMarkdown(`**New update available.**\n\n`);
                markdownString.appendMarkdown(`**Local AI Recommendation:**\n> ${aiRecommendation}`);
            } else {
                markdownString.appendMarkdown(`Your application is up to date.\n`);
            }

            return new vscode.Hover(markdownString);
        }
    });
}

module.exports = { getHoverProvider };