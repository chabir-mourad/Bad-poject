const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI')



const connectMongo = async() => {
    try {
        await mongoose.connect(db , {useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex : true })
        console.log("MongoDB is connected ...")
    }
    catch(err) {
        console.error(err.message);
        //Exit Process with failure 
        process.exit(1)
    }
}


module.exports = connectMongo