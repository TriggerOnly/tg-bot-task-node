import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    tgId: {
        type: String,
        require: true
    },
    maxScore: {
        type: Number,
        default: 0
    }
})

export default mongoose.model("User", UserSchema)