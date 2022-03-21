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
const discord_js_1 = require("discord.js");
const status_changer_1 = __importDefault(require("./status-changer"));
// import userValidator from "./user-validator";
const user_schema_1 = __importDefault(require("../schemas/user-schema"));
const channels_schema_1 = __importDefault(require("../schemas/channels-schema"));
exports.default = (client) => {
    client.on('guildCreate', function () {
        (0, status_changer_1.default)(client);
        console.log('Guild count increased');
    });
    client.on('guildDelete', function () {
        (0, status_changer_1.default)(client);
        console.log('Guild count decreased');
    });
    client.on("guildMemberAdd", function (member) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Member count increased');
            const result = (yield user_schema_1.default.findOne({ user: member.id })) || {};
            const { reason, guild, author } = result || {};
            const guildName = ((_a = client.guilds.cache.get(guild)) === null || _a === void 0 ? void 0 : _a.name) || {};
            const guildID = member.guild.id || {};
            const { channelID } = (yield channels_schema_1.default.findOne({ guildID: guildID })) || {};
            const channel = (client.channels.cache.get(`${channelID}`));
            // const channel = (client.channels.cache.get('950183129879031869')) as TextChannel
            const embed = new discord_js_1.MessageEmbed()
                .setTitle(`:scream_cat: Blacklisted member has arrived!`)
                .setDescription(`User :: **${member}** (\`${member.id}\`)\nReason :: **${reason}**\nAuthor :: **<@${author}>** (\`${author}\`)\nGuild :: **${guildName}**`)
                .setColor("RED")
                .setThumbnail(member.displayAvatarURL());
            if (reason != undefined) {
                channel === null || channel === void 0 ? void 0 : channel.send({ embeds: [embed] });
            }
            else {
                console.log(`${member.displayName} is not blacklisted (${member.guild.id} ${member.guild.name})`);
            }
        });
    });
};
exports.config = {
    displayName: 'Guild Events',
    dbName: 'GUILD_EVENTS'
};
