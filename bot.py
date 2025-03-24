import discord
from discord.ext import commands


TARGET_CHANNEL_ID = "" # Channel ID goes here (please store as an integer.)


class Client(discord.Client):   
    async def on_ready(self):
        print(f'{self.user} has connected to Discord!')
        await self.fetch_images()


    async def on_message(self, message):
        if message.author == self.user:
            return
        
        if message.content.startswith('hello'):
            await message.channel.send(f'Hi there {message.author}!')
            
            
    async def fetch_images(self):
        channel = self.get_channel(TARGET_CHANNEL_ID)
        user = await self.dedicated_user()
        
        if not channel:
            print("Channel not found!")
            return

        async for message in channel.history(limit=1000): # Fetches the last x images.
            for attachment in message.attachments: # Loops through messages with attachments.
                for reaction in message.reactions: # Loops through reactions on message.
                    if reaction.emoji == "☁️": # If message contains a cloud emoji.
                        async for user in reaction.users(): # Program pauses and continues once data is available, in this case (users).
                            if user.id == "": # Checks if user ID is correct.
                                image_url = attachment.url
                                print(image_url) # Prints image url in terminal.
        
             
intents = discord.Intents.default()
intents.message_content = True # Give bot access to message content.


client = Client(intents=intents)

if __name__ == "__main__":
    client.run('') # Put unique bot token here.