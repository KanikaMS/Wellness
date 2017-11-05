var Appointment = require('../Models/appointment');
var mongojs = require('mongojs');
var mongo = require('mongodb');
var assert = require('assert');
var mongoose = require('mongoose');




module.exports = function(router){
    
//add appointment entery to the database http://localhost:port/api/appointments/addAppointment
router.post("/addAppointment", (req, res) => {
    var myData = new Appointment(req.body);

     // check if variable exists or not
    if (req.body.patientname == null || req.body.patientname ==''|| req.body.age == null || req.body.age ==''||
    req.body.gender == null || req.body.gender ==''|| req.body.date == null || req.body.date ==''|| 
    req.body.time == null || req.body.time ==''|| req.body.doctor_id == null || req.body.doctor_id ==''){
        res.json({success: 'false',message: 'Ensure all details  were provided'});
    } else {
   
            myData.save(function(err){
                if (err || !myData) {
                    res.json({success: 'false', message: 'not able to provide appointment'});
                } else {
                    res.json({success: 'true', message: 'appointment is booked!'});
                }
            });
  
        }
   });


    //delete appointment with the help of _id
    router.get('/delete/:id', function(req,res, next){
		Appointment.findOne({_id: mongojs.ObjectId(req.params.id)}).remove(function(err){
        if(err)	res.json(err);
        else { res.json({success: 'true' ,message: 'appointment is canceled'}); }
        });
       
     
    }); 

     //to retrieve on the basis of doctor_id
    router.get('/retrieve/:id', function(req,res, next){
        
		Appointment.find({doctor_id: req.params.id}, function(err, appointments) {
            if(!err){ 
                res.json(appointments);
                
            } else {
                res.json({success: 'false' ,message: 'could not retrieve data'});
            }
         });
        });
       
    
    

   return router;   
};
