var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var morgan = require('morgan');
var mongoose = require('mongoose'); 
var bodyParser = require('body-parser');
var router = express.Router();
/*var doctorRouter = express.Router();
var appointmentRouter = express.Router();
var patientRouter = express.Router();
var prescriptionRouter = express.Router();*/
var doctorRoutes = require('./Server/Routes/doctor')(router);
var appointmentRoutes = require('./Server/Routes/appointment')(router);
var patientRoutes = require('./Server/Routes/patient')(router);
var prescriptionRoutes = require('./Server/Routes/prescription')(router);
var accountsRoutes = require('./Server/Routes/accounts')(router);
var tokenRoutes = require('./Server/Routes/token')(router);

var path = require('path');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(__dirname + '/Public'));
app.use('/api/accounts',accountsRoutes);
app.use('/api/token',tokenRoutes);
app.use('/api/patient',patientRoutes);
app.use('/api/doctor',doctorRoutes);
app.use('/api/appointment',appointmentRoutes);
app.use('/api/prescription', prescriptionRoutes);


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/wellnes', function(err){
    if (err) {
        console.log('Not connected to the DB Wellnes: ' + err);
    } else {
        console.log('Succesfully connected to Wellnes Database');
    }
});

app.get('*', function(req, res){
    res.sendFile(path.join(__dirname + '/Public/app/view/index.html'));
});


app.listen(port, function(){
    console.log('running the server on port' + port);

});

