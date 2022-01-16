import mongoose from "mongoose";

const schema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    guild: {
        type: String,
        required: true
    }
})

export default mongoose.model('blacklist', schema)