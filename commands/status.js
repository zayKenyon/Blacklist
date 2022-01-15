"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    category: 'Configuration',
    description: 'Sets the bots status',
    minArgs: 1,
    expectedArgs: '<status>',
    slash: true,
    testOnly: true,
    ownerOnly: true,
    callback: ({ client, text }) => {
        var _a;
        (_a = client.user) === null || _a === void 0 ? void 0 : _a.setPresence({
            activities: [
                {
                    name: text
                }
            ]
        });
        return 'Status updated';
    }
};
