const mongoose = require('mongoose');



// define a schema
const phoneSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      },

name : {
    type : String , 
    required : true , 

},
image : {
    type : String , 
    required : true
},

price : {
    type : String ,
    required : true
},


ram : {
    type : String ,
    required : true
},

processor : {
    type : String ,
    required : true
},

storage : {
    type : String ,
     required : true
}

})





  // compile our model 



  const Phone = mongoose.model('phone' , phoneSchema)


  module.exports = Phone





