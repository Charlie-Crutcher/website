from flask import Flask, render_template, request, jsonify
import mysql.connector

app = Flask(__name__)


# Connects to MySQL database.
mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="testdatabase"
)

sql_insert = "INSERT INTO exercise (exercise_name) VALUES (%s)" # SQL statement to insert records to DB.


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


# ----- Workout App : Admin Page ----- #
@app.route("/workoutadmin", methods=['GET', 'POST'])
def workoutadmin():
    return render_template("workoutadmin.html")

# ----- Workout App : Fetch All Page ----- #
@app.route('/fetchall', methods=['GET'])
def fetch_all():
    mycursor = mydb.cursor(dictionary=True)
    mycursor.execute('SELECT * FROM exercise')  # Fetch all data
    data = mycursor.fetchall()  # Get all records
    mycursor.close()
    
    if not data:
        return "No data found"
    
    return render_template('workoutadmin.html', data=data)


# ----- Workout App : Add Exercise Page ----- #
@app.route('/add_exercise', methods=['GET', 'POST'])
def add_user():
    print("lol")
    mycursor = mydb.cursor()
    post = request.form['exercise'] # This variable is storing the input to be uploaded to DB.
    print(post)
    data_to_insert = [post]
    mycursor.execute(sql_insert, data_to_insert)
    mydb.commit()
    return render_template('workoutadmin.html')


# ----- Workout App : Home ----- #
@app.route("/workouts")
def workouts():
    return render_template("workouts.html")


# ----- Workout App : Push Day ----- #
@app.route("/workouts-push")
def pushday():
    return render_template("workouts-push.html")


# ----- Workout App : Pull Day ----- #
@app.route("/workouts-pull")
def pullday():
    return render_template("workouts-pull.html")


# ----- Workout App : Leg Day ----- #
@app.route("/workouts-legs")
def legsday():
    return render_template("workouts-legs.html")


@app.route("/log_workout", methods=['GET', 'POST'])
def log_workout():
    if request.method == 'POST':
        exercise_id = request.form['exercise_id']
        weight = request.form['weight']
        reps = request.form['reps']
        
        # Assuming you have a user_id (you may want to associate users to a session or a login system)
        user_id = 1  # Placeholder for logged-in user ID
        
        # Insert workout log into database
        mycursor = mydb.cursor()
        sql_insert_log = """
        INSERT INTO workout_log (user_id, exercise_id, weight, reps)
        VALUES (%s, %s, %s, %s)
        """
        mycursor.execute(sql_insert_log, (user_id, exercise_id, weight, reps))
        mydb.commit()
        
        return render_template('log_workout.html', message="Workout logged successfully!")
    
    # Get all exercises for the user to choose from
    mycursor = mydb.cursor()
    mycursor.execute("SELECT * FROM exercise")
    exercises = mycursor.fetchall()
    
    return render_template("log_workout.html", exercises=exercises)


if __name__ == "__main__":
    app.run(host="localhost", debug=True)