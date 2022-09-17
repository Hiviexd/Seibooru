import { Schema } from "mongoose";

export default new Schema({
    _id: String,
    img: {
        data: Buffer,
        contentType: String
    },
    tags: [String],
    posterId: String,
    likes: [String]
});
