import DiscordJS, {Client, Intents} from 'discord.js';
import dotenv from 'dotenv';
import WOKCommands from "wokcommands";
import mongoose from "mongoose";
import path from "path";
import statusChanger from "./features/status-changer";
dotenv.config()

const client = new DiscordJS.Client({
    intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_PRESENCES]
})


client.on('ready', async () => {
    await mongoose.connect(process.env.MONGO_URI || ' ', { keepAlive: true })
    statusChanger(client)
    console.log(`Bot has started.`);

    new WOKCommands(client, {
        commandsDir: path.join(__dirname, 'commands'),
        featuresDir: path.join(__dirname, 'features'),
        typeScript: true,
        testServers: ['931238613180612708'],
        botOwners: ['452793411401940995'],
        mongoUri: process.env.MONGO_URI,
    })
})

client.login(process.env.TOKEN)
