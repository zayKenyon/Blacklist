const mongoose = require("mongoose");
const {mongoURI} = require("../config.json");

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
        console.log(`${client.users.cache.size} Members :: ${client.guilds.cache.size} Servers`)

        main().catch(err => console.log(err));
        async function main() {
            await mongoose.connect(mongoURI);
        }
    },
};