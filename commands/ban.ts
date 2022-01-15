import {ICommand} from "wokcommands";
import {GuildMember, MessageEmbed} from "discord.js";

export default {
    category: 'Moderation',
    description: 'Bans a user',

    permissions: ['ADMINISTRATOR'],
    // requireRoles: true,

    slash: 'both',
    testOnly: true,

    guildOnly: true,

    minArgs: 2,
    expectedArgs: '<user> <reason>',
    expectedArgsTypes: ['USER', 'STRING'],


    callback: ({ interaction, args}) => {
        const target = interaction.options.getMember('user') as GuildMember
        if (!target) {
            return {
                custom: true,
                content: 'Please tag target to ban.',
                ephemeral: true,
            }

        }

        if (!target.bannable) {
            return {
                custom: true,
                content: 'Cannot ban that user. <:VBjskekw:931287046935421000> ',
                //ephemeral: true
            }
        }

        args.shift()
        const reason = args.join(' ')

        target.ban({
            reason,
            days: 7
        })

        const author = interaction.user

        const embed = new MessageEmbed()
            .setDescription(`:lock: **${author}**, **${target}** has been banned from **${interaction.guild?.name}**`)
            .setColor("WHITE")
        return embed
    }
} as ICommand