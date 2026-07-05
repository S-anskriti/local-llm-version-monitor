const fs = require('fs');
const path = require('path');
function loadJsonData(context, relativePath) {
    try {
        // Resolves the absolute path relative to the extension's installation directory
        const absolutePath = path.join(context.extensionPath, relativePath);
        const rawData = fs.readFileSync(absolutePath, 'utf8');
        return JSON.parse(rawData);
    } catch (error) {
        console.error(`Error reading file at ${relativePath}:`, error);
        return {};
    }
}
module.exports = { loadJsonData };