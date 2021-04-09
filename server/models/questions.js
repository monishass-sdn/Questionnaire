const mongoose = require("mongoose");
const { Schema} = mongoose;

const qSchema = new Schema({
    question: String,
    audio: String,
    video: String,
    createdAt:Date,
    modifiedAt:Date,
    questionBlock:String
});
module.exports = mongoose.model('question', qSchema);