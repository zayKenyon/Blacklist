const UserSchema = require('../schemas/user-schema');
const ChannelSchema = require('../schemas/channels-schema');
const {MessageEmbed, Permissions} = require("discord.js");
const { client } = require("../index");

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        const result = await UserSchema.findOne({user: member.id}) || {};
        const {reason, guild, author} = result || {};

        if(reason) {
            const guildObject = client.guilds.cache.get(guild) || {}

            const Embed = new MessageEmbed()
                .setTitle(`:scream_cat: Blacklisted Member Arrived`)
                .setColor("RED")
                .setDescription(`User :: **${member}** \`${member.id}\`\nReason :: **${reason}**\nAuthor :: **<@${author}>** \`${author}\`\nGuild :: **${guildObject.name}**`)
                .setThumbnail(`${member.displayAvatarURL()}`)

            const {channelID} = await ChannelSchema.findOne({guildID: member.guild.id}) || {};
            const channel = await client.channels.fetch(channelID)

            const bitPermissions = guildObject.me.permissionsIn(channel)
            const flagPermissions = new Permissions([
                Permissions.FLAGS.VIEW_CHANNEL,
                Permissions.FLAGS.SEND_MESSAGES,
                Permissions.FLAGS.EMBED_LINKS
            ])

            console.log(bitPermissions.has(flagPermissions))

            if(bitPermissions.has(flagPermissions)) {
                channel.send({ embeds: [Embed] })
            } else {
                const shameChannel = await client.channels.fetch('842863878173491290')
                shameChannel.send(`${channel.guild.name} does not have the correct permissions for me, can someone tell them to fix it <a:Blacklist_DinkDonk:970452374856548402>`)
            }
        }
    }
}