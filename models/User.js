const mongoose = require('mongoose');




const UserSchema = new mongoose.Schema({
name : {
    type : String ,
    required : true
},

email : {
type : String ,
required : true
 
},

password  : {
    type : String ,
    required : true
},
adress : {
 type : String ,
 required : true

},

zipCode : {
    type : Number , 
    required :true
},
avatar: {
    type: String
},


phoneNumber : {
type : Number , 
required  : true
},

date : {
    type : Date ,
default : Date.now()
}



})




module.exports = User = mongoose.model('User' , UserSchema )