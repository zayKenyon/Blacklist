const {SlashCommandBuilder} = require("@discordjs/builders");
const {MessageEmbed} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Get help with BlacklistBot'),
    async execute(interaction) {

        const Embed = new MessageEmbed()
            .setColor("AQUA")
            .setDescription(
                "I am a Ban-Pool bot shared by the mods of VALORANT content creator servers, and I was created by [zay](https://zay.kenyon.co.uk/). " +
                "I don't have many commands, so it shouldn't take you long to get acquainted.")
            .addFields([
                { "name": "How to setup BlacklistBot?", "value": "Assuming you have the `MANAGE_SERVER` permission, run the `/set` command, make sure I actually have permission to view this channel or you will be publicly shamed!", "inline": false },
                { "name": "How do I blacklist someone?", "value": "Assuming you have the `MANAGE_SERVER` permission, you should run the `/blacklist` command, it takes two inputs: the user and the reason. This command is not ephemeral so it is suggested to run this from your bot-console channel.", "inline": false },
                { "name": "How can I receive extra help?", "value": "Within the ModMafia server, you should send a message in <#842863878173491290>. If you are not a member of the ModMafia server but you are a server staff member, you should contact your administrator.", "inline": false } ])
        return interaction.reply( { embeds: [Embed], ephemeral: true} )
    },
};