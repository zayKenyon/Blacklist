"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const status_changer_1 = __importDefault(require("./status-changer"));
exports.default = (client, instance) => {
    client.on('guildCreate', function () {
        (0, status_changer_1.default)(client);
        console.log('Member count updated');
    });
    client.on('guildDelete', function () {
        (0, status_changer_1.default)(client);
        console.log('Member count updated');
    });
};
exports.config = {
    displayName: 'Guild Events',
    dbName: 'GUILD_EVENTS'
};
