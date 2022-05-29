const {SlashCommandBuilder, bold} = require("@discordjs/builders");
const UserSchema = require('../schemas/user-schema');
const {MessageEmbed} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('blacklist')
        .setDescription('Blacklists a user')
        .addUserOption(option =>
            option.setName('target')
                .setRequired(true)
                .setDescription('Select a user'))
        .addStringOption(option =>
            option.setName('reason')
                .setRequired(true)
                .setDescription('Enter a reason')),
    async execute(interaction) {
        if (!interaction.member.permissions.has("MANAGE_GUILD")) return interaction.reply({ content: 'Lol no 🖕', ephemeral: true })

        const user = interaction.options.getUser('target');
        const string = interaction.options.getString('reason');

        new UserSchema({
            user: `${user.id}`,
            reason: `${string}`,
            guild: `${interaction.guild.id}`,
            author: `${interaction.user.id}`,
        }).save()
        console.log(`Submitted ${user.id} for ${string} from ${interaction.guild.id} by ${interaction.user.id}`)

        const boldUser = bold(user)
        const boldReason = bold(string)
        const boldAuthor = bold(interaction.user)
        const boldGuild = bold(interaction.guild.name)

        const Embed = new MessageEmbed()
            .setTitle(`:loudspeaker: New Member Blacklisted!`)
            .setColor("WHITE")
            .setDescription(`User :: ${boldUser} \`${user.id}\`\nReason :: ${boldReason}\nAuthor :: ${boldAuthor} \`${interaction.user.id}\`\nGuild :: ${boldGuild}`)
            .setThumbnail(`${user.displayAvatarURL()}`)

        const channel = interaction.client.channels.cache.get('832783717747130378') //An announcement channel all servers follow
        channel.send({ embeds: [Embed] });
        console.log(`Published Blacklisted Message into ${channel.name}`)

        interaction.reply({ embeds: [Embed]})
    }
}
