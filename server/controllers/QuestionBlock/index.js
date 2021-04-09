const qBlock = require('../../models/questionBlock');

exports.createQBlock = (req, res) => {
  if (req.body) {
    var date = new Date();
    const bodyData = {
      name: req.body.name,
      createdAt: date.getTime(),
    }
    const questionBlock = new qBlock(bodyData);
    questionBlock
      .save()
      .then(done => {
        res.send({ sms: "Success", done })
      })
  } else {
    res.send("error")
  }
}

exports.getAll = (req, res) => {
  qBlock
    .find()
    .then(done => {
      res.send(done)
    })
}

exports.getById = (req, res) => {
  let id = req.params.id;
  qBlock
    .findOne({ "_id": id }).populate("questions")
    .then(done => {
      res.send(done)
    }).catch((err) => {
      res.send(err)
    })
}