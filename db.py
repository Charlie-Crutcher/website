import mysql.connector

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="password goes here",
    database="testdatabase"
)

mycursor = mydb.cursor()

sql = "INSERT INTO images (file_size, image_url) VALUES (%s, %s)"
values = (123, "string") # Stores 1 integer (file size), and 1 string (image url).
mycursor.execute(sql, values)

mydb.commit()

print(mycursor.rowcount, "record inserted.") # This has been tested and works. File was inserted into database.