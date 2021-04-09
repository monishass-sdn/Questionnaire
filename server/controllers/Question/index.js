const Question = require("../../models/questions");
const QuestionBlock = require("../../models/questionBlock");

exports.create = (req, res) => {
  if (req.body && req.files) {
    var date = new Date();
    const bodyData = {
      question: req.body.question,
      audio: req.files.audio[0].filename,
      video: req.files.video[0].filename,
      created: date.getTime(),
    };
    const question = new Question(bodyData);
    question.save().then((done) => {
      if (done._id) {
        QuestionBlock.findById(req.body.blockId).then((doc) => {
          let q = doc.questions;
          q.push(done._id);
          var newvalues = { $set: { questions: q } };
          QuestionBlock.updateOne({ _id: req.body.blockId }, newvalues).then(
            (updatedDoc) => {
              res.send(updatedDoc);
            }
          );
        });
      }
    });
  } else {
    res.send("jfdg");
  }
};

exports.update = (req, res) => {
  if (req.body && req.files) {
    var date = new Date();    
    const bodyData = {
      $set: {
        question: req.body.question || "",
        audio: req.files && req.files.audio && req.files.audio.length > 0 ? req.files.audio[0].filename : req.body.audio ,
        video: req.files && req.files.video && req.files.video.length > 0 ? req.files.video[0].filename : req.body.video ,
        modifiedAt: date.getTime(),
      }
    };
    Question.updateOne({ _id: req.body.questionId }, bodyData).then((done) => {
      res.send(done);
    });
  } else {
    res.send("jfdg");
  }
};

exports.getData = (req, res) => {
  res.send("testing route controller");
};
