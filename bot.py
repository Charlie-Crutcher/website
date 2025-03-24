import discord
from discord.ext import commands


TARGET_CHANNEL_ID = "Channel ID goes here"


class Client(discord.Client):
    async def on_ready(self):
        print(f'{self.user} has connected to Discord!')

    async def on_message(self, message):
        if message.author == self.user:
            return
        
        if message.content.startswith('hello'):
            await message.channel.send(f'Hi there {message.author}!')
            

intents = discord.Intents.default()
intents.message_content = True # Give bot access to message content.


client = Client(intents=intents)
client.run('Token goes here')