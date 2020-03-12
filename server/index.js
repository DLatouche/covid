
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(__dirname + '/../client'));


app.get('/data/confirmed', function (req, res) {
  res.sendFile(__dirname + '/data/confirmed.json');
})

app.get('/data/deaths', function (req, res) {
  res.sendFile(__dirname + '/data/deaths.json');
})

app.get('/data/recovery', function (req, res) {
  res.sendFile(__dirname + '/data/recovery.json');
})

app.listen(3000, function () {
  console.log('Run on 3000')
})

