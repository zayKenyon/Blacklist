import { Client } from 'discord.js'
import WOKCommands from "wokcommands";
import statusChanger from "./status-changer";

export default (client: Client, instance: WOKCommands) => {

    client.on('guildCreate', function (){
        statusChanger(client)
        console.log('Member count updated')
    })

    client.on('guildDelete', function (){
        statusChanger(client)
        console.log('Member count updated')
    })
}

export const config = {
    displayName: 'Guild Events',
    dbName: 'GUILD_EVENTS'
}