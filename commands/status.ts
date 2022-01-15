import {ICommand} from "wokcommands";

export default {
    category: 'Configuration',
    description: 'Sets the bots status',

    minArgs: 1,
    expectedArgs: '<status>',

    slash: true,
    testOnly: true,

    ownerOnly: true,

    callback: ({ client, text }) => {
        client.user?.setPresence({
            activities: [
                {
                    name: text
                }

            ]
        })

        return 'Status updated'
    }
} as ICommand