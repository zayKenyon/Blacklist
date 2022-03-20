import {Client, MessageEmbed, TextChannel} from "discord.js";
import UserSchema from "../schemas/user-schema";
import ChannelsSchema from "../schemas/channels-schema";

export default (client: Client) => {
    client.on("guildMemberAdd", async member => {

        const result = await UserSchema.findOne({user: member.id}) || {}
        const {reason, guild, author} = result || {}

        const guildName = client.guilds.cache.get(guild)?.name || {}
        const guildID = member.guild.id || {}

        const {channelID} = await ChannelsSchema.findOne({guildID: guildID}) || {}
        const channel = (client.channels.cache.get(`${channelID}`)) as TextChannel

        const embed = new MessageEmbed()
            .setDescription(`:warning: **${member}** (\`${member.id}\`) who just joined was blacklisted from **${guildName}** by **<@${author}>** (\`${author}\`) for **${reason}**.`)
            .setColor("RED")
        channel?.send({ embeds: [embed] })
    })

}

export const config = {
    dbName: 'USER_VALIDATOR',
    displayName: 'User Validator'
}