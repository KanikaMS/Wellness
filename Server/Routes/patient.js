var Patient = require('../Models/patient');
var jwt = require('jsonwebtoken');
var secret = 'patientsecret';
var mongojs = require('mongojs');


module.exports = function(kanika){
     //patient basic registeration http://localhost:port/patients/register
    kanika.post('/register', function(req, res){
        var patient = new Patient(req.body);
        patient.save(function(err){
            if (err) {
                res.json({success: 'false',message: 'email already exists!'});//because email attribute set to unique
            } else {
                res.json({success: 'true',message: 'Patient registered'});
            }
        });
    
        
    }); 
  
    //patient basic registeration http://localhost:port/patients/authenticate
   kanika.post('/authenticate', function(req, res){
        Patient.findOne({username: req.body.username}).select('email username password').exec(function(err, user){
            if (err) throw err;
            if(!user) {
                res.json({success: false,mesage: 'Could not authenticate user'});
            } else if(user) {
                if(req.body.password) {
              var validPassword =  user.comparePassword(req.body.password); }
               else {
                res.json({success: false,mesage: 'No password provided'});
               }
              if(!validPassword) {
                  res.json({success: false, message: 'Could not authenticate password'});
              } else {
                var token = jwt.sign({username: user.username, email: user.email}, secret, {expiresIn: '96h'} );
                res.json({success: true, message: 'user authenticated', token: token  });
              }
            
            }
        });
        
    });
      


    return kanika;   
};

jwt.sign({
    data: 'foobar'
}, 'secret' , {expiresIn: '96h'});

