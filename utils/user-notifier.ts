import userSchema from "../schemas/user-schema";
import {Client, MessageEmbed, TextChannel} from "discord.js";

export default async (client: Client, id: string) => {
    const result = await userSchema.findOne({user: id})
    console.log('Result:', result)

    const {user, reason, guild, author} = result
    console.log(`${user} ${reason} ${guild} ${author}`)

    const embed = new MessageEmbed()
        .setDescription(`:loudspeaker: **${author}** from **${guild}** just blacklisted **${user}** for **${reason}**.`)
        .setColor("WHITE")

    const channel = (client.channels.cache.get('932240564102000713')) as TextChannel
    await channel.send(`:loudspeaker: **${author}** from **${guild}** just blacklisted **${user}** for **${reason}**.`)

}

export const config = {
    dbName: 'USER_NOTIFIER',
    displayName: 'User Notifier',
}
