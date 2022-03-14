"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const user_schema_1 = __importDefault(require("../schemas/user-schema"));
const user_notifier_1 = __importDefault(require("../utils/user-notifier"));
exports.default = {
    category: 'Administration',
    description: 'Submits user to blacklist',
    permissions: ['ADMINISTRATOR'],
    slash: true,
    testOnly: true,
    minArgs: 2,
    expectedArgs: '<user> <reason>',
    expectedArgsTypes: ['STRING', 'STRING'],
    callback: ({ client: Client, interaction, args, guild }) => __awaiter(void 0, void 0, void 0, function* () {
        const { id, user } = interaction.options.getMember('user');
        args.shift();
        const reason = args.join(' ');
        const author = interaction.user;
        new user_schema_1.default({
            user: `${id}`,
            reason: `${reason}`,
            guild: `${guild === null || guild === void 0 ? void 0 : guild.id}`,
            author: `${author.id}`
        }).save();
        yield (0, user_notifier_1.default)(Client, author, guild, user, reason);
        return new discord_js_1.MessageEmbed()
            .setDescription(`:loudspeaker: **${author}**, **${user}** has been blacklisted.`)
            .setColor("WHITE");
    })
};
