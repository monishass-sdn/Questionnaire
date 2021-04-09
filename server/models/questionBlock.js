const mongoose = require("mongoose");
const { Schema, model } = mongoose;

var qSchema = new Schema({
    name:String,
    createdAt:String,
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"question"
    }]
});
module.exports = model('questionBlock', qSchema);