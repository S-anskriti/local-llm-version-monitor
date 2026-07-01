import json
# Loads any JSON file and returns it as a Python dictionary
def load_json(filename):
    with open(filename, "r") as file:
        data = json.load(file)
    return data
# Compares installed apps against the latest available versions
def compare_versions():
    installed = load_json("systemApp.json")
    latest = load_json("external.json")
    results = []
    for app_name in installed:
        installed_version = installed[app_name]
        # Skip if this app isn't found in external.json
        # (e.g. "Node" vs "Node.js" mismatch — check your file names match exactly)
        if app_name not in latest:
            print(f"Warning: '{app_name}' not found in external.json")
            continue

        latest_version = latest[app_name]["latest"]

        update_needed = installed_version != latest_version

        results.append({
            "name": app_name,
            "installed": installed_version,
            "latest": latest_version,
            "update": update_needed
        })
    return results
# Quick test — only runs if you execute this file directly
if __name__ == "__main__":
    result = compare_versions()
    for app in result:
        print(app)