import discord
from discord.ext import commands, tasks
import mysql.connector

# Connects to MySQL database.
mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="", # PASSWORD!
    database="testdatabase"
)
mycursor = mydb.cursor()

sql_insert = "INSERT INTO images (file_size, image_url) VALUES (%s, %s)" # SQL statement to insert records to DB.
TARGET_CHANNEL_ID =  "" # Channel ID goes here (please store as an integer.)

# Global list vars to store image data
image_sizes = []
image_urls = []

class Client(discord.Client):   
    async def on_ready(self):
        print(f"{self.user} has connected to Discord!")
        self.auto_upload_to_db.start()


    @tasks.loop(minutes=1) # Runs every x minutes (adjust as needed)
    async def auto_upload_to_db(self):
        
        # Clear previous data on local list vars to avoid duplicates
        image_urls.clear()
        image_sizes.clear()
        
        # Fetch images from the channel
        await self.fetch_images()
        
        # Check if any images were fetched before attempting upload
        if image_urls and image_sizes:
            
            # Combine lists into a list of tuples (file_size, image_url)
            data_to_insert = list(zip(image_sizes, image_urls))
            for image_size, image_url in data_to_insert:
                # Check if this image_url already exists in the database
                sql_check = "SELECT COUNT(*) FROM images WHERE image_url = %s"
                mycursor.execute(sql_check, (image_url,))
                (count,) = mycursor.fetchone()
                
                if count == 0:
                    # No duplicate found, so insert the record
                    mycursor.execute(sql_insert, (image_size, image_url))
                    print(f"Inserted: {image_url}, size: {image_size}mb.")
                else:
                    print(f"Duplicate found, not inserting: {image_url}")
            mydb.commit()
            
            
    async def on_message(self, message):
        if message.author == self.user:
            return
        
        if message.content.startswith("hello"):
            await message.channel.send(f"Hi there {message.author}!")
            
            
    async def fetch_images(self):
        channel = self.get_channel(TARGET_CHANNEL_ID)     
        if not channel:
            print("Channel not found!")
            return

        async for message in channel.history(limit=1000): # Fetches images from last 50 messages
            for attachment in message.attachments: # Loops through messages with attachments.
                for reaction in message.reactions: # Loops through reactions on message.
                    if reaction.emoji == "☁️": # If message contains a cloud emoji.
                        async for user in reaction.users(): # Program pauses and continues once data is available, in this case (users).
                            if user.id == "": # Checks if user ID is correct (STORE AS INTEGER!)
                                image_urls.append(attachment.url)
                                image_sizes.append(attachment.size)
        
             
intents = discord.Intents.default()
intents.message_content = True # Give bot access to message content.


client = Client(intents=intents)

if __name__ == "__main__":
    client.run("") # Put unique bot token here.