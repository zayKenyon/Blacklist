import {Client, MessageEmbed, TextChannel} from 'discord.js'
import statusChanger from "./status-changer";
import UserSchema from "../schemas/user-schema";
import ChannelsSchema from "../schemas/channels-schema";

export default (client: Client) => {

    client.on('guildCreate', function (){
        statusChanger(client)
        console.log('Guild count increased');

    })

    client.on('guildDelete', function (){
        statusChanger(client)
        console.log('Guild count decreased')
    })

    client.on("guildMemberAdd", async function (member) {
        console.log('Member count increased')

        const result = await UserSchema.findOne({user: member.id}) || {}
        const {reason, guild, author} = result || {}

        const guildName = client.guilds.cache.get(guild)?.name || {}
        const guildID = member.guild.id || {}

        const {channelID} = await ChannelsSchema.findOne({guildID: guildID}) || {}
        const channel = (client.channels.cache.get(`${channelID}`)) as TextChannel

        // const channel = (client.channels.cache.get('950183129879031869')) as TextChannel

        const embed = new MessageEmbed()
            .setTitle(`:scream_cat: Blacklisted member has arrived!`)
            .setDescription(`User :: **${member}** (\`${member.id}\`)\nReason :: **${reason}**\nAuthor :: **<@${author}>** (\`${author}\`)\nGuild :: **${guildName}**`)
            .setColor("RED")
            .setThumbnail(member.displayAvatarURL())

        if (reason != undefined) {
            channel?.send({embeds: [embed]})
        } else {
            console.log(`${member.displayName} is not blacklisted (${member.guild.id} ${member.guild.name})`)
        }
    })

}

export const config = {
    displayName: 'Guild Events',
    dbName: 'GUILD_EVENTS'
}