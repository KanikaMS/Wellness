var Doctor = require('../Models/user');
var Appointment = require('../Models/appointment');
var jwt = require('jsonwebtoken');
var secret = 'meanstack';
var mongojs = require('mongojs');





module.exports = function(router){
     //doctor basic registeration http://localhost:port/api/users
    router.post('/doctors', function(req, res){
        var user = new Doctor();
        user.username= req.body.username;
        user.password= req.body.password;
        user.email= req.body.email;
        user.doctor_id= req.body.doctor_id;
        user.contact_number= req.body.contact_number;

         if (req.body.username == null || req.body.username == '' || req.body.password == null || req.body.password == '' || req.body.email == null || req.body.email == ''
        || req.body.doctor_id == null || req.body.doctor_id == '' || req.body.contact_number == null || req.body.contact_number == ''){
            res.json({success: 'false',message: 'Ensure username, email and password were provided'});
        } else {
        user.save(function(err){
            if (err) {
                res.json({success: 'false',message: 'Username or email already exists!'});
            } else {
                res.json({success: 'true',message: 'User created'});
            }
        });
    }
        
    });  


      //doctors login http://localhost:port/api/authenticate
    router.post('/authenticate', function(req, res){
        Doctor.findOne({username: req.body.username}).select('email username password').exec(function(err, user){
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
                res.json({success: true, message: 'user authenticated', token: token });
              }
            
            }
        });
        
    });


    //delete doctor login credentials
    router.get('/del/:id', function(req,res, next){
		User.findOne({_id: mongojs.ObjectId(req.params.id)}).remove(function(err){
        if(err)	res.json(err);
        else { res.json({success: 'true'}); }
        });
       
     
    }); 




    return router;   
};

jwt.sign({
    data: 'foobar'
}, 'secret' , {expiresIn: '96h'});



 
