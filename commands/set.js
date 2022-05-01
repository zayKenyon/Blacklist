const {SlashCommandBuilder, Permissions, channelMention} = require("@discordjs/builders");
const ChannelSchema = require('../schemas/channels-schema')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('set')
        .setDescription('Sets a logging channel')
        .addChannelOption(option =>
            option.setName('destination')
                .setRequired(true)
                .setDescription('Select a channel')),
    async execute(interaction) {
        if (!interaction.member.permissions.has("MANAGE_GUILD")) return interaction.reply({ content: 'Lol no 🖕', ephemeral: true })

        const {id, name} = interaction.options.getChannel('destination')
        const result = await ChannelSchema.findOneAndUpdate(
            { guildID: `${interaction.guildId}` },
            { channelID: `${id}` },
            { upsert: true } )
        console.log(`Submitted the channel ${id.name} for ${interaction.guildId}`)

        await interaction.reply( { content: `<#${id}> (\`${id}\`) has been set for ${interaction.guild.name}.` } )

    }
}