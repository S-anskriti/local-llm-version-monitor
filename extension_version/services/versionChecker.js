function isUpdateAvailable(installedVersion, latestVersion) {
    // Basic structural check. In a production environment, use the 'semver' package.
    return installedVersion !== latestVersion;
}

module.exports = { isUpdateAvailable };