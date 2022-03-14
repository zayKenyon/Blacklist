import {Client, MessageEmbed, TextChannel, } from "discord.js";

export default (client: Client, author: any, guild: any, user: any, reason: string) => {

    const embed = new MessageEmbed()
        .setDescription(`:loudspeaker: **${author}** from **${guild}** just blacklisted **${user}** for **${reason}**.`)
        .setColor("WHITE")

    const channel = (client.channels.cache.get('950444081874616331')) as TextChannel
    channel.send({ embeds: [embed] })
}


export const config = {
    dbName: 'USER_NOTIFIER',
    displayName: 'User Notifier',
}
