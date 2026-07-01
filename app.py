from flask import Flask, render_template
from compare import compare_versions
from llm import ask_gemma

app = Flask(__name__)

@app.route("/")
def home():
    apps = compare_versions()

    for app_info in apps:
        if app_info["update"]:
            app_info["explanation"] = ask_gemma(
                app_info["name"],
                app_info["installed"],
                app_info["latest"]
            )
        else:
            app_info["explanation"] = "This application is already up to date."

    return render_template("index.html", apps=apps)


if __name__ == "__main__":
    app.run(debug=True)