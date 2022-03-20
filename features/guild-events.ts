import { Client } from 'discord.js'
import statusChanger from "./status-changer";
import userValidator from "./user-validator";

export default (client: Client) => {

    client.on('guildCreate', function (){
        statusChanger(client)
        console.log('Guild count increased');

    })

    client.on('guildDelete', function (){
        statusChanger(client)
        console.log('Guild count decreased')
    })

    client.on("guildMemberAdd", function(){
        userValidator(client)
        console.log('Member count increased')
    })

}

export const config = {
    displayName: 'Guild Events',
    dbName: 'GUILD_EVENTS'
}