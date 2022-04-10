const UserSchema = require('../schemas/user-schema');
const ChannelSchema = require('../schemas/channels-schema');
const {MessageEmbed} = require("discord.js");
const { client } = require("../index");

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        const result = await UserSchema.findOne({user: member.id}) || {};
        const {reason, guild, author} = result || {};

        const {channelID} = await ChannelSchema.findOne({guildID: member.guild.id}) || {};

        if({channelID} !== undefined) {
            const guildName = client.guilds.cache.get(guild)?.name || {}
            const channel = client.channels.cache.get(channelID)

            const Embed = new MessageEmbed()
                .setTitle(`:loudspeaker: New Member Blacklisted!`)
                .setColor("RED")
                .setDescription(`User :: **${member}** \`${member.id}\`\nReason :: **${reason}**\nAuthor :: **<@${author}>** \`${author}\`\nGuild :: **${guildName}**`)
                .setThumbnail(`${member.displayAvatarURL()}`)
            
            channel.send({ embeds: [Embed] });

        } else {
            console.log(`${member.displayName} is not blacklisted (${member.guild.id} ${member.guild.name})`)
        }
    }
}