// import {Client, GuildMember, MessageEmbed, TextChannel} from "discord.js";
// import UserSchema from "../schemas/user-schema";
// import ChannelsSchema from "../schemas/channels-schema";
//
// export default async (client: Client, member: GuildMember) => {
//
//     const result = await UserSchema.findOne({user: member.id}) || {}
//     const {reason, guild, author} = result || {}
//
//     const guildName = client.guilds.cache.get(guild)?.name || {}
//     const guildID = member.guild.id || {}
//
//     const {channelID} = await ChannelsSchema.findOne({guildID: guildID}) || {}
//     // const channel = (client.channels.cache.get(`${channelID}`)) as TextChannel
//
//     const channel = (client.channels.cache.get('950183129879031869')) as TextChannel
//
//     const embed = new MessageEmbed()
//         .setTitle(`:scream_cat: Blacklisted member has arrived!`)
//         .setDescription(`User :: **${member}** (\`${member.id}\`)\nReason :: **${reason}**\nAuthor :: **<@${author}>** (\`${author}\`)\nGuild :: **${guildName}**`)
//         .setColor("RED")
//         .setThumbnail(member.displayAvatarURL())
//
//     if (reason != undefined){
//         channel?.send({ embeds: [embed] })
//     } else {console.log(`${member.displayName} is not blacklisted (${member.guild.id} ${member.guild.name})`)}
// }
//
// export const config = {
//     dbName: 'USER_VALIDATOR',
//     displayName: 'User Validator'
// }