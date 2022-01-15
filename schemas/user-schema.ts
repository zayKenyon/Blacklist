import mongoose from "mongoose";

const schema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    }
})

export default mongoose.model('blacklist', schema)