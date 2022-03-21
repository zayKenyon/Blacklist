import DiscordJS, {Intents} from 'discord.js';
import dotenv from 'dotenv';
import WOKCommands from "wokcommands";
import path from "path";
dotenv.config()

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_PRESENCES
    ]
})

client.on('ready', async (payload) => {
    console.log(`Bot has started. We have infiltrated ${client.users.cache.size} people in ${client.guilds.cache.size} servers.`);
    // console.log(client.guilds.cache.map((guild) => guild.name).join('\n'))

    payload.guilds.cache.forEach((g) => {
        console.log(
            g.name,
            "has",
            g.memberCount,
            "members"
        );
    });

    const wok = new WOKCommands(client, {
        commandsDir: path.join(__dirname, 'commands'),
        featuresDir: path.join(__dirname, 'features'),
        typeScript: true,
        testServers: ['932240564102000710'],
        botOwners: ['452793411401940995'],
        mongoUri: process.env.MONGO_URI,
    });

    wok.on('databaseConnected', (connection, state) => {
        console.log(`The connection state is "${state}"`)
    })

});

client.login(process.env.TOKEN)
