import {ICommand} from "wokcommands";
import ChannelsSchema from "../schemas/channels-schema";

export default {
    category: 'Administration',
    description: 'Sets a a logging channel',

    permissions: ['ADMINISTRATOR'],

    slash: true,
    testOnly: true,

    minArgs: 1,
    expectedArgs: '<channel>',
    expectedArgsTypes: ['CHANNEL'],

    callback: ({args, member}) => {
        new ChannelsSchema({
            guildID: `${member.guild.id}`,
            channelID: args[0]
        }).save()

        return `<#${args[0]}> has been set.`
    }
} as ICommand