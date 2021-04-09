var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');
const router = require('./router');

var app = express();
var PORT = 5000;

app.use(cors())
app.use(express.static('uploads'))

mongoose.connect(
    'mongodb+srv://user:12345@cluster0.rieiw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
);


app.use('/', router)

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});