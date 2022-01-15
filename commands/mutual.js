"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    category: 'Miscellaneous',
    description: 'Returns an embed to list what servers bot and user share',
    slash: true,
    testOnly: true,
    minArgs: 1,
    expectedArgs: '<user>',
    expectedArgsTypes: ['USER'],
    callback: ({ interaction, args }) => {
        const target = interaction.options.getMember('user');
        if (!target) {
            return {
                custom: true,
                content: 'Please tag target to scan.',
                ephemeral: true,
            };
        }
    }
};
