import {GuildMember, MessageEmbed} from "discord.js";
import {ICommand} from "wokcommands";
import UserSchema from "../schemas/user-schema";
import userNotifier from "../features/user-notifier";

export default {
    category: 'Administration',
    description: 'Submits user to blacklist',

    permissions: ['ADMINISTRATOR'],

    slash: true,
    testOnly: true,

    minArgs: 2,
    expectedArgs: '<user> <reason>',
    expectedArgsTypes: ['USER', 'STRING'],


    callback: ({ interaction, args, guild}) => {
        const target = interaction.options.getMember('user') as GuildMember

        args.shift()
        const reason = args.join(' ')
        const author = interaction.user

        new UserSchema({
            user: `${target.id}`,
            reason: `${reason}`,
            guild: `${guild?.id}`,
            author: `${author.id}`
        }).save()

        userNotifier(target.id)

        const embed = new MessageEmbed()
            .setDescription(`:loudspeaker: **${author}**, **${target.user.tag}** has been blacklisted.`)
            .setColor("WHITE")
        return embed
    }
} as ICommand

