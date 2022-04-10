const UserSchema = require('../schemas/user-schema');
const ChannelSchema = require('../schemas/channels-schema');
const {MessageEmbed} = require("discord.js");

module.exports = {
    name: 'guildMemberAdd',
    async execute(member, client) {
        const result = await UserSchema.findOne({user: member.id}) || {};
        const {reason, guild, author} = result

        const guildName = guild

        const {channelId} = ChannelSchema.findOne({guildID: member.guild.id})

        if(channelId !== undefined) {
            const channel = client.channels.cache.get(`${channelId}`)

            const Embed = new MessageEmbed()
                .setTitle(`:loudspeaker: New Member Blacklisted!`)
                .setColor("WHITE")
                .setDescription(`User :: **${member}** \`${member.id}\`\nReason :: **${reason}**\nAuthor :: **${author}** \`${author.id}\`\nGuild :: **${guildName}**`)
                .setThumbnail(`${member.displayAvatarURL()}`)
            channel?.send({ embeds: [Embed] });

        } else {
            console.log(`${member.displayName} is not blacklisted (${member.guild.id} ${member.guild.name})`)
        }
    }
}