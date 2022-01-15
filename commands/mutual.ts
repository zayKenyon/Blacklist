import {ICommand} from "wokcommands";
import {GuildMember} from "discord.js";

export default {
    category: 'Miscellaneous',
    description: 'Returns an embed to list what servers bot and user share',

    slash: true,
    testOnly: true,

    minArgs: 1,
    expectedArgs: '<user>',
    expectedArgsTypes: ['USER'],

    callback: ({ interaction, args } ) => {
        const target = interaction.options.getMember('user') as GuildMember
        if (!target) {
            return {
                custom: true,
                content: 'Please tag target to scan.',
                ephemeral: true,
            }

        }
    }

} as ICommand