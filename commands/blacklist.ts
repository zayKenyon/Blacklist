import { GuildMember, MessageEmbed} from "discord.js";
import {ICommand} from "wokcommands";
import UserSchema from "../schemas/user-schema";
import userNotifier from "../utils/user-notifier";

export default {
    category: 'Administration',
    description: 'Submits user to blacklist',

    permissions: ['ADMINISTRATOR'],

    slash: true,
    testOnly: true,

    minArgs: 2,
    expectedArgs: '<user> <reason>',
    expectedArgsTypes: ['STRING', 'STRING'],


    callback: async ({ client: Client, interaction, args, guild}) => {
        const {id, user} = interaction.options.getMember('user') as GuildMember

        args.shift()
        const reason = args.join(' ')
        const author = interaction.user

        new UserSchema({
            user: `${id}`,
            reason: `${reason}`,
            guild: `${guild?.id}`,
            author: `${author.id}`
        }).save()

        await userNotifier(Client, id)

        return new MessageEmbed()
            .setDescription(`:loudspeaker: **${author}**, **${user}** has been blacklisted.`)
            .setColor("WHITE")

    }
} as ICommand

