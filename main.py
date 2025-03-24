from flask import Flask, render_template
import mysql.connector

app = Flask(__name__)


# Connects to MySQL database.
mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="testdatabase"
)


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
    mycursor = mydb.cursor()
    # Query to get image URLs
    mycursor.execute("SELECT image_url FROM images")
    images_data = mycursor.fetchall() # Returns a list of tuples
    # Convert list of tuples to list of image URLs
    image_urls = [url for (url,) in images_data]
    return render_template("photography.html", images=image_urls)

@app.route("/portfolio")
def portfolio():
    return render_template("portfolio.html")

@app.route("/workouts")
def workouts():
    return render_template("workouts.html")

if __name__ == "__main__":
    app.run(host="localhost", debug=True)