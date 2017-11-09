var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var historySchema = new Schema({
	Personal_History : {type : String },
	Family_History : {type : String }, 
				});
var vitalsSchema = new Schema({
	Systolic : {type : String},
	Diastolic : {type : String},
	Pulse : {type : String},
	Weight : {type : String },
	RespiratoryRate : {type : String },
	Temperature : {type : String},
	spO2 : {type : String },
	Blood_Glucose : {type : String },
				});
var ImmunizationSchema = new Schema({
	Name : {type : String },
	SNOMEDid : {type : String},
			});
var LabTestSchema = new Schema({
	Name : {type : String},
	Type : {type : String },
			});
var ProcedureSchema = new Schema({
	Name : {type : String},
	SNOMEDid : {type : String},
			});




var DandASchema = new Schema({
	Examination :{type : String },
	Problem_Diagnosis : {type : String, required : true },
	OtherAdvice : {type : String},
	Add_Immunization : [ImmunizationSchema],
	Add_LabTest : [LabTestSchema],
	Add_Procedure : [ProcedureSchema],

});
var AllergySchema = new Schema ({
	Problem_Name : {type : String },
	Diagnosis_Date : {type : String },
	Diagnosis_By : {type : String },
	Notes : {type : String },
});


var MedicationSchema = new Schema({
	Date : {type : String },
	Medicine_Name : {type : String },
	Dosage : {type : String },
	Frequency_taken : {type : String},
	Strength : {type : String},
	Type : {type : String},


	});





 
    var PrescriptionSchema = new Schema({
        History : historySchema,
        Vitals : vitalsSchema,
        DiagnosisandAdvice : DandASchema,
        Allergies : [AllergySchema],
        Medication : [MedicationSchema],
        });
    

module.exports = mongoose.model('Prescription',PrescriptionSchema);
	
 

	
