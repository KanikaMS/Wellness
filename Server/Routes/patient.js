var Patient = require('../Models/patient');
var mongojs = require('mongojs');


module.exports = function(patientRouter){
     
      
 
patientRouter.put('/updatePatient/:id', function(req, res){
 var password = Patient.hashpassword(req.body.password);
     var patient = {
        username: req.body.username,
          name: {
            firstName: req.body.name.firstName,
            middleName: req.body.name.middleName,
            lastName: req.body.name.lastName
            },
    
        password: password,   
        gender: req.body.gender,
        dob: req.body.dob,
       address: {
                line1: req.body.address.line1,
                line2: req.body.address.line2,
                city: req.body.address.city,
                district: req.body.address.district,
                state: req.body.address.state,
                pinCode: req.body.address.pincode, 
                country: req.body.address.country
                
                }, 
    
        occupation: req.body.occupation,
    
        patient_Details: {
                    patient_height: req.body.patient_Details.patient_height,
                    patient_weight: req.body.patient_Details.patient_weight,
                    patient_maritaiStatus: req.body.patient_Details.patient_maritaiStatus,
                    patient_Smoking_status: req.body.patient_Details.patient_Smoking_status,
                    patient_Drinking_status: req.body.patient_Details.patient_Drinking_status,
                    patient_allergy: req.body.patient_Details.patient_allergy,
                    patient_history: req.body.patient_Details.patient_history
                  },
                  
        responsible_person: {
                               rname: req.body.responsible_person.rname,
                               number: req.body.responsible_person.number,
                               relation: req.body.responsible_person.relation,
                               raddress: req.body.responsible_person.raddress
                            } 
                            
     };
    var opts = { strict: false };
    
    Patient.update({_id: mongojs.ObjectId(req.params.id)}, patient, opts, function(error) {
      
      res.json({success:true,message: "Sucessfully updated", error: error});
    });

});


return patientRouter; 
};


