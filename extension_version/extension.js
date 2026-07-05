const { getHoverProvider } = require('./services/hoverProvider');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log('Version Monitor Extension is now active.');

    // Register our modular workflow
    const hoverProviderDisposable = getHoverProvider(context);

    // Ensure resources are cleaned up properly when deactivated
    context.subscriptions.push(hoverProviderDisposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}