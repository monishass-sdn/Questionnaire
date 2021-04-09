var express = require('express');
const Router = require('../../controllers/Question');
var router = express.Router()
var multer = require('multer');
const crypto = require('crypto')
const path = require('path')

var storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
      crypto.pseudoRandomBytes(16, function (err, raw) {
        if (err) return cb(err)
  
        cb(null, raw.toString('hex') + path.extname(file.originalname))
      })
    }
  })

var upload = multer({ storage: storage })

var cpUpload = upload.fields([{ name: 'video', maxCount: 1 }, { name: 'audio', maxCount: 1 }])

router.get('/', Router.getData);

router.post('/submit', cpUpload, Router.create);
router.post('/update', cpUpload, Router.update);

module.exports = router

