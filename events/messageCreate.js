const { client } = require('../index');
const { requiredPerms } = require('../config.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'messageCreate',
	async execute(message) {
		if (!message.mentions.has(client.user.id) || message.content.includes('@here') || message.content.includes('@everyone')) return false;

		const Embed = new MessageEmbed()
			.setColor('AQUA')
			.setDescription(
				'I was a Ban-Pool bot originally shared by the mods of VALORANT content creator servers, and I was created by [zay](https://zay.kenyon.co.uk/). ' +
                'I don\'t have many commands, so it shouldn\'t take you long to get acquainted.')
			.addFields([
				{ 'name': 'How to setup BlacklistBot?', 'value': `Assuming you have the ${requiredPerms} permission, run the \`/set\` command, make sure I actually have permission to view this channel or you will be publicly shamed!`, 'inline': false },
				{ 'name': 'How do I blacklist someone?', 'value': `Assuming you have the ${requiredPerms} permission, you should run the \`/blacklist\` command, it takes two inputs: the user and the reason. This command is not ephemeral so it is suggested to run this from your bot-console channel.`, 'inline': false },
				{ 'name': 'How can I receive extra help?', 'value': '', 'inline': false } ]);

		message.channel.send({ embeds: [Embed] });
	},
};