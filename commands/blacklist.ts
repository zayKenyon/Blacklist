import {GuildMember, MessageEmbed} from "discord.js";
import {ICommand} from "wokcommands";
import UserSchema from "../schemas/user-schema";


export default {
    category: 'Testing',
    description: 'Sends fields to mongo',

    permissions: ['ADMINISTRATOR'],

    slash: true,
    testOnly: true,

    guildOnly: true,

    minArgs: 2,
    expectedArgs: '<user> <reason>',
    expectedArgsTypes: ['USER', 'STRING'],


    callback: ({ interaction, args, guild}) => {
        const target = interaction.options.getMember('user') as GuildMember
        if (!target) {
            return {
                custom: true,
                content: 'Please tag target to blacklist.',
                ephemeral: true,
            }

        }

        args.shift()
        const reason = args.join(' ')

        new UserSchema({
            user: `${target.id}`,
            reason: `${reason}`,
            guild: `${guild?.id}`
        }).save()

        const author = interaction.user

        const embed = new MessageEmbed()
            .setDescription(`:loudspeaker: **${author}**, **${target.user.tag}** has been blacklisted.`)
            .setColor("WHITE")
        return embed
    }
} as ICommand