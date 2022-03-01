"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const user_schema_1 = __importDefault(require("../schemas/user-schema"));
const user_notifier_1 = __importDefault(require("../features/user-notifier"));
exports.default = {
    category: 'Administration',
    description: 'Submits user to blacklist',
    permissions: ['ADMINISTRATOR'],
    slash: true,
    testOnly: true,
    minArgs: 2,
    expectedArgs: '<user> <reason>',
    expectedArgsTypes: ['USER', 'STRING'],
    callback: ({ interaction, args, guild }) => {
        const target = interaction.options.getMember('user');
        args.shift();
        const reason = args.join(' ');
        const author = interaction.user;
        new user_schema_1.default({
            user: `${target.id}`,
            reason: `${reason}`,
            guild: `${guild === null || guild === void 0 ? void 0 : guild.id}`,
            author: `${author.id}`
        }).save();
        (0, user_notifier_1.default)(target.id);
        const embed = new discord_js_1.MessageEmbed()
            .setDescription(`:loudspeaker: **${author}**, **${target.user.tag}** has been blacklisted.`)
            .setColor("WHITE");
        return embed;
    }
};
