import DiscordJS, { Intents } from 'discord.js';
import dotenv from 'dotenv';
import WOKCommands from "wokcommands";
import mongoose from "mongoose";
import path from "path";
import statusChanger from "./features/status-changer";
dotenv.config()

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_PRESENCES
    ]
})


client.on('ready', async (payload) => {
    await mongoose.connect(process.env.MONGO_URI || ' ', { keepAlive: true })
    statusChanger(client)
    console.log(`Bot has started. We have infiltrated ${client.users.cache.size} people in ${client.guilds.cache.size} servers.`);

    new WOKCommands(client, {
        commandsDir: path.join(__dirname, 'commands'),
        featuresDir: path.join(__dirname, 'features'),
        typeScript: true,
        testServers: ['931238613180612708', '932240564102000710'],
        botOwners: ['452793411401940995'],
        mongoUri: process.env.MONGO_URI,
    })

    payload.guilds.cache.forEach((guild) => {
        console.log(guild.name, "has", guild.members.cache.filter((members) => members.permissions.has("BAN_MEMBERS")).size,"mods");
        // const modCount = guild.members.cache.filter((members) => members.permissions.has("BAN_MEMBERS")).size;
        // console.log(modCount)
        // for (let modCount = 0; guild.members.cache.filter((members) => members.permissions.has("ADMINISTRATOR")).size; modCount++){
        //     console.log(modCount)
        // }
    });
})

client.login(process.env.TOKEN)
