import {Client} from "discord.js";

export default (client: Client) => {

    const statusOptions = [
        `Blacklisting ${client.users.cache.size} users`,
        `Patrolling ${client.guilds.cache.size} servers`,
        // `Warning ${modCount} mods`,
    ]
    let counter = 0

    const updateStatus = () => {
        client.user?.setPresence({
            activities: [
                {
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