"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const status_changer_1 = __importDefault(require("./status-changer"));
const user_validator_1 = __importDefault(require("./user-validator"));
exports.default = (client) => {
    client.on('guildCreate', function () {
        (0, status_changer_1.default)(client);
        console.log('Guild count increased');
    });
    client.on('guildDelete', function () {
        (0, status_changer_1.default)(client);
        console.log('Guild count decreased');
    });
    client.on("guildMemberAdd", function () {
        (0, user_validator_1.default)(client);
        console.log('Member count increased');
    });
};
exports.config = {
    displayName: 'Guild Events',
    dbName: 'GUILD_EVENTS'
};
