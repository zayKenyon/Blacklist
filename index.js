"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const discord_js_1 = __importStar(require("discord.js"));
const dotenv_1 = __importDefault(require("dotenv"));
const wokcommands_1 = __importDefault(require("wokcommands"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const status_changer_1 = __importDefault(require("./features/status-changer"));
dotenv_1.default.config();
const client = new discord_js_1.default.Client({
    intents: [
        discord_js_1.Intents.FLAGS.GUILDS,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGES,
        discord_js_1.Intents.FLAGS.GUILD_BANS,
        discord_js_1.Intents.FLAGS.GUILD_PRESENCES
    ]
});
client.on('ready', (payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(process.env.MONGO_URI || ' ', { keepAlive: true });
    console.log(`Bot has started. We have infiltrated ${client.users.cache.size} people in ${client.guilds.cache.size} servers.`);
    new wokcommands_1.default(client, {
        commandsDir: path_1.default.join(__dirname, 'commands'),
        featuresDir: path_1.default.join(__dirname, 'features'),
        typeScript: true,
        testServers: ['932240564102000710', '931238613180612708'],
        botOwners: ['452793411401940995'],
        mongoUri: process.env.MONGO_URI,
    });
    payload.guilds.cache.forEach((guild) => {
        console.log(guild.name, "has", guild.members.cache.filter((members) => members.permissions.has("BAN_MEMBERS")).size, "mods");
        // const modCount = guild.members.cache.filter((members) => members.permissions.has("BAN_MEMBERS")).size;
        // console.log(modCount)
        // for (let modCount = 0; guild.members.cache.filter((members) => members.permissions.has("ADMINISTRATOR")).size; modCount++){
        //     console.log(modCount)
        // }
    });
}));
client.on('guildCreate', function (guild) {
    (0, status_changer_1.default)(client);
    console.log('Member count updated');
});
client.on('guildDelete', function (guild) {
    (0, status_changer_1.default)(client);
    console.log('Member count updated');
});
client.login(process.env.TOKEN);
