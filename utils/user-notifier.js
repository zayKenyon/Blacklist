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
exports.config = void 0;
const user_schema_1 = __importDefault(require("../schemas/user-schema"));
const discord_js_1 = require("discord.js");
exports.default = (client, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_schema_1.default.findOne({ user: id });
    console.log('Result:', result);
    const { user, reason, guild, author } = result;
    console.log(`${user} ${reason} ${guild} ${author}`);
    const embed = new discord_js_1.MessageEmbed()
        .setDescription(`:loudspeaker: **${author}** from **${guild}** just blacklisted **${user}** for **${reason}**.`)
        .setColor("WHITE");
    const channel = (client.channels.cache.get('932240564102000713'));
    yield channel.send(`:loudspeaker: **${author}** from **${guild}** just blacklisted **${user}** for **${reason}**.`);
});
exports.config = {
    dbName: 'USER_NOTIFIER',
    displayName: 'User Notifier',
};
