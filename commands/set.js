"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const channels_schema_1 = __importDefault(require("../schemas/channels-schema"));
exports.default = {
    category: 'Administration',
    description: 'Sets a a logging channel',
    permissions: ['ADMINISTRATOR'],
    slash: true,
    testOnly: true,
    minArgs: 1,
    expectedArgs: '<channel>',
    expectedArgsTypes: ['CHANNEL'],
    callback: ({ args, member }) => {
        new channels_schema_1.default({
            guildID: `${member.guild.id}`,
            channelID: args[0]
        }).save();
        return `<#${args[0]}> has been set.`;
    }
};
