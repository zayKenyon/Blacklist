import {Client} from "discord.js";
import {ActivityTypes} from "discord.js/typings/enums";

export default (client: Client) => {

    const statusOptions = [
        `${client.users.cache.size} viper mains`,
        `Patrolling ${client.guilds.cache.size} servers`,
        // `Warning ${modCount} mods`,
    ]
    let counter = 0

    const updateStatus = () => {
        client.user?.setPresence({
            activities: [
                {
                    type: ActivityTypes.WATCHING,
                    name: statusOptions[counter]
                }
            ]
        })

        if (++counter >= statusOptions.length) {
            counter = 0
        }

        setTimeout(updateStatus, 1000 * 60 * 3)
    }
    updateStatus()
}

export const config = {
    dbName: 'STATUS_CHANGER',
    displayName: 'Status Changer',
}