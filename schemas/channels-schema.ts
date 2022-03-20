import mongoose from "mongoose";

const schema = new mongoose.Schema({
    guildID: {
        type: String,
        required: true
    },
    channelID: {
        type: String,
        required: true
    }
})

export default mongoose.model('channel', schema)