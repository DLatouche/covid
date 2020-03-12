
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(__dirname + '/../client'));

app.listen(3000, function () {
  console.log('Run on 3000')
})

