import DiscordJS, {Intents} from 'discord.js';
import dotenv from 'dotenv';
import WOKCommands from "wokcommands";
import mongoose from "mongoose";
import path from "path";
dotenv.config()

import userSchema from "./schemas/user-schema";


const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_BANS,
    ]
})


client.on('ready', async () => {
    await mongoose.connect(process.env.MONGO_URI || ' ', {
        keepAlive: true
    })

    console.log('The bot is ready')

    new WOKCommands(client, {
        commandsDir: path.join(__dirname, 'commands'),
        featuresDir: path.join(__dirname, 'features'),
        typeScript: true,
        testServers: ['931238613180612708'],
        botOwners: ['452793411401940995'],
        mongoUri: process.env.MONGO_URI,
    })

    setTimeout(async () => {
        await new userSchema({
            id: '01234567890',
            reason: 'ate lowlander'
        }).save()
    }, 1000)

})

client.login(process.env.TOKEN)