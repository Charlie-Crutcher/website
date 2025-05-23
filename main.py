from flask import Flask, render_template, request, jsonify, redirect, url_for, flash, session
import mysql.connector

app = Flask(__name__)


# Connects to MySQL database.
mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="GotUser85",
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

# ----- Todo List ----- #
@app.route("/todo_list", methods=['GET', 'POST'])
def todo_list():
    with mydb.cursor(dictionary=True) as mycursor:
        mycursor.execute("SELECT * FROM tasks")
        task_data = mycursor.fetchall()
        
    if request.method == "POST":
        tasks_name = ['tasks_name']
        tasks_state = ['FALSE']
        mycursor = mydb.cursor()
        sql_insert_log = """
        INSERT INTO tasks (tasks_name, tasks_state)
        VALUES (%s, %s)
        """
        mycursor.execute(sql_insert_log, (tasks_name, tasks_state))
        mydb.commit()
    return render_template('todo-list.html', task_data=task_data)


# ----- Coding Progress : Code Home ----- #
@app.route("/code_home")
def code_home():
    return render_template("code-home.html")


# ----- Coding Progress : Coddy (Home) ----- #
@app.route("/code_coddy")
def code_coddy():
    return render_template("code-coddy.html")


# ----- Coding Progress : Coddy : JavaScript ----- #
@app.route("/code_coddy_js")
def code_coddy_js():
    return render_template("code-coddy-js.html")

# ----- Workout App : Admin Page ----- #
@app.route("/workoutadmin", methods=['GET', 'POST'])
def workoutadmin():
    return render_template("workoutadmin.html")


# ----- Workout App ADMIN : Fetch All Page ----- #
@app.route('/fetchall', methods=['GET'])
def fetch_all():
    mycursor = mydb.cursor(dictionary=True)
    mycursor.execute('SELECT * FROM exercise')  # Fetch all data
    data = mycursor.fetchall()  # Get all records
    mycursor.close()
    
    if not data:
        return "No data found"
    
    return render_template('workoutadmin.html', data=data)


# ----- Workout App ADMIN : Add Exercise Page ----- #
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


# ----- Workout App : Create Workout ----- #
@app.route("/workout-create", methods=['GET', 'POST'])
def workout_create():
    if request.method == 'POST':
        workout_date = request.form['workout_date']
        workout_type = request.form['workout_type']
        workout_notes = request.form['workout_notes']
        f_user_id = 1
        
        # Assuming you have a user_id (you may w
        # ant to associate users to a session or a login system)
        
        # Insert workout log into database
        mycursor = mydb.cursor()
        sql_insert_log = """
        INSERT INTO workout (f_user_id, workout_date, workout_type, workout_notes)
        VALUES (%s, %s, %s, %s)
        """
        mycursor.execute(sql_insert_log, (f_user_id, workout_date, workout_type, workout_notes))
        mydb.commit()
        
        return redirect(url_for("workout_exercises"))  # Change this to the desired page
        
    return render_template("workout-create.html")


# ----- Workout App : Log Exercises ----- #
@app.route("/workout-exercises", methods=['GET', 'POST'])
def workout_exercises():
    if request.method == 'POST':
        f_workout_id = 1 # TODO - Change this to work for the user's actual workout ID instead of a hard-coded one.
        print("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        print(request.form['exercise_selection'])
        f_exercise_id = request.form['exercise_selection']
        set_1_weight = request.form['set_1_weight']
        set_2_weight = request.form['set_2_weight']
        set_3_weight = request.form['set_3_weight']
        set_1_reps = request.form['set_1_reps']
        set_2_reps = request.form['set_2_reps']
        set_3_reps = request.form['set_3_reps']
        
        # Assuming you have a user_id (you may w
        # ant to associate users to a session or a login system)
        
        # Insert workout log into database
        mycursor = mydb.cursor()
        sql_insert_log = """
        INSERT INTO workout_exercise (f_workout_id, f_exercise_id,
        set_1_weight, set_1_reps, 
        set_2_weight, set_2_reps, 
        set_3_weight, set_3_reps)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """
        mycursor.execute(sql_insert_log, (f_workout_id, f_exercise_id,
                                          set_1_weight, set_1_reps, 
                                          set_2_weight, set_2_reps, 
                                          set_3_weight, set_3_reps))
        mydb.commit()
        
        return redirect(url_for("workout_exercises"))  # Change this to the desired page
        
        
    with mydb.cursor(dictionary=True) as mycursor:
        mycursor.execute("SELECT * FROM exercise")
        exercise = mycursor.fetchall()
        
    with mydb.cursor(dictionary=True) as mycursor:
        mycursor.execute("SELECT * FROM workout WHERE f_user_id = 1 ORDER BY workout_id DESC LIMIT 1")
        data = mycursor.fetchall()  # Fetch the latest workout

        if data:
            return render_template("workout-exercises.html", data=data, exercise=exercise)
        else:
            return "No workouts found."


# ----- Workout App : Track Progress ----- #
@app.route('/workout-tracking', methods=["POST", "GET"])
def workout_tracking():
    with mydb.cursor(dictionary=True) as mycursor:
        mycursor.execute("SELECT * FROM workout_exercise")
        workout_data = mycursor.fetchall()
        
    with mydb.cursor(dictionary=True) as mycursor:
        mycursor.execute("SELECT * FROM workout")
        workout_id = mycursor.fetchall()          
    
    return render_template('workout-tracking.html', workout_data=workout_data, workout_id=workout_id)
    


@app.route("/workout-details")
def workout_details():
    with mydb.cursor(dictionary=True) as mycursor:
        mycursor.execute("SELECT * FROM workout WHERE f_user_id = %s ORDER BY workout_id DESC LIMIT 1")
        latest_record = mycursor.fetchone()  # Fetch the latest workout

    if latest_record:
        return render_template("workout-details.html", latest_record=latest_record)
    else:
        return "No workouts found."

if __name__ == "__main__":
    app.run(host="localhost", debug=True)