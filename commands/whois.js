const {SlashCommandBuilder} = require("@discordjs/builders");
const {MessageEmbed} = require("discord.js");
const UserSchema = require("../schemas/user-schema");
const {client} = require("../index");
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('whois')
        .setDescription('Returns information about a user')
        .addUserOption(option =>
            option.setName('target')
                .setRequired(true)
                .setDescription('Select a user')),
    async execute(interaction) {

        // This command takes longer than the allowed 3 seconds, so we must defer
        // https://discordjs.guide/interactions/slash-commands.html#deferred-responses
        await interaction.deferReply({ephemeral: true});
        await wait(4000);

        const user = interaction.options.getUser('target');

        // I have no clue how this works
        const joinDate = new Date(Number((BigInt(user.id) >> 22n) + 1420070400000n));

        // Attempts to fetch target from all guilds the bot is in, errored guilds are ignored
        const guilds = [];
        for (const [, guild] of interaction.client.guilds.cache) {
            await guild.members.fetch(user).then(() => guilds.push(guild)).catch(error => console.log(error));
        }

        // TBD: Instant Invite feature to make the guilds hyperlinks
        const Embed = new MessageEmbed()
            .setTitle('🕵️ User Lookup :: Found')
            .setColor("AQUA")
            .setThumbnail(`${user.displayAvatarURL()}`)
            .setDescription(`
                **User**: ${user.tag}
                **Discord Id**:  ${user} \`${user.id}\`
                **Joined Discord**: \`${joinDate.toDateString()}\`
                **Profile Picture**: [Avatar URL](${user.displayAvatarURL()})
                
                **Joined ${interaction.guild.name}**: \`${interaction.member.joinedAt.toDateString()}\`
                **Mutual Servers** (with me): ${guilds}
            `)

        // If Blacklist Schema returns null, original embed is sent
        if (!await UserSchema.findOne({user: user.id})) return await interaction.editReply({
            embeds: [Embed],
            ephemeral: true
        })

        // Any way to avoid these repeated query's?
        const {reason, guild, author} = await UserSchema.findOne({user: user.id})

        // To convert the Guild Id into something understandable
        const guildObject = client.guilds.cache.get(guild)

        // Blacklist Schema did not return null, fields are edited
        Embed.setColor("RED")

        // Ugly but not sure how to extend previous description
        Embed.setDescription(`
                ⚠ This user is blacklisted ️
        
                **User**: ${user.tag}
                **Discord Id**: \`${user.id}\` ${user}
                **Joined Discord**: \`${joinDate.toDateString()}\`
                **Profile Picture**: [Avatar URL](${user.displayAvatarURL()})
                
                **Joined ${interaction.guild.name}**: \`${interaction.member.joinedAt.toDateString()}\`
                **Mutual Servers** (with me): ${guilds}
                
                **Blacklist Reason**: ${reason}
                **Author**: <@${author}> \`${author}\`
                **Guild**: ${guildObject.name}
            `)

        await interaction.editReply({embeds: [Embed], ephemeral: true})
    }
}
