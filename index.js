var express = require('express'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    cors = require('cors')
    mysql = require('mysql')

const app = express();
app.use(cors());


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));


const api = require("./src/routes/api/employee");
app.use("/api", api);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({'errors': {
    message: err.message,
    error: {}
  }});
});


var server = app.listen( process.env.PORT || 8000, function(){
  console.log('Listening on port ' + server.address().port);
});

const db = require("./src/models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });