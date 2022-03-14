import {ICommand} from "wokcommands";
import {MessageEmbed} from "discord.js";
import UserSchema from "../schemas/user-schema";

export default {
    category: 'Owner',
    description: 'Manual submission to blacklist',

    slash: true,
    testOnly: true,

    ownerOnly: true,

    minArgs: 4,
    expectedArgs: '<user> <reason> <guild> <author>',
    expectedArgsTypes: ['STRING', 'STRING', 'STRING', 'STRING'],

    callback: ({ interaction, args}) => {
        const[target, reason, guild, author] = args
        const owner = interaction.user

        new UserSchema({
            user: `${target}`,
            reason: `${reason}`,
            guild: `${guild}`,
            author: `${author}`
        }).save()

        return new MessageEmbed()
            .setDescription(`:loudspeaker: **${owner}**, **${target}** has been manually submitted.`)
            .setColor("NOT_QUITE_BLACK")

    }
} as ICommand