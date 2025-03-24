from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/contact")
def contact():
    return render_template("contact.html")

@app.route("/cv")
def cv():
    return render_template("cv.html")

@app.route("/gamedev")
def gamedev():
    return render_template("gamedev.html")

@app.route("/photography")
def photography():
    return render_template("photography.html")

@app.route("/portfolio")
def portfolio():
    return render_template("portfolio.html")

if __name__ == "__main__":
    app.run(host="localhost", debug=True)