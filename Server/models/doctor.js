var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var ID = require.uniqueID();

//console.log(ID.generate('/uniqueID/ext'));


var DoctorSchema = new Schema({
    Name: { type: String, lowercase: true, required: true },
    Phone: { type: Number, required: true },
    Email: { type: String, required: true, lowercase: true, unique: true },
    UserName: { type: String, lowercase: true, required: true },
    Password: { type: String, required: true },
    ClinicName: { type: String, lowercase: true, required: true },
    Speciality: { type: String, lowercase: true, required: true },
    ClinicAddress: { type: String, required: true, lowercare: true, unique: true }, 
    LicenseID: { type: String, lowercase: true, required: true },
    PhotoProofofLicense: { type: String , required: true },
    doctor_qualification: {type: String},
    experience: [{
                 from: {type: String},
                 to: {type: String},
                 hospital: {type: String},
                 post: {type: String},
                 description: {type: String},
                 active  : {type: Boolean, default: false}
                }]

});

DoctorSchema.pre('save', function(next){
  var user = this;
  bcrypt.hash(user.Password, null, null, function(err, hash){
  if (err) return next(err);
  user.Password = hash;
  next();

});
});

DoctorSchema.methods.comparePassword = function(Password) {
  return bcrypt.compareSync(Password, this.Password);

};



module.exports = mongoose.model('Doctor', DoctorSchema);
