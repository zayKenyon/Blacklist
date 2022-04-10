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

        if (interaction.member.permissions.has("ADMINISTRATOR")) {
            const {id, name} = interaction.options.getChannel('destination')

            new ChannelSchema({
                guildID: `${interaction.guildId}`,
                channelID: `${id}`
            }).save()

            await interaction.reply( { content: `${name} (\`${id}\`) has been set for ${interaction.guild.name}.` } )

        } else {
            await interaction.reply({ content: 'Lol no 🖕', ephemeral: true })
        }
    }
}