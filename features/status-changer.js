"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = (client) => {
    const statusOptions = [
        `${client.users.cache.size} viper mains`,
        // `Patrolling ${client.guilds.cache.size} servers`,
        // `Warning ${modCount} mods`,
    ];
    let counter = 0;
    const updateStatus = () => {
        var _a;
        (_a = client.user) === null || _a === void 0 ? void 0 : _a.setPresence({
            activities: [
                {
                    type: 3 /* WATCHING */,
                    name: statusOptions[counter]
                }
            ]
        });
        if (++counter >= statusOptions.length) {
            counter = 0;
        }
        setTimeout(updateStatus, 1000 * 60 * 3);
    };
    updateStatus();
};
exports.config = {
    dbName: 'STATUS_CHANGER',
    displayName: 'Status Changer',
};
