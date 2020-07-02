const express = require('express')
const app = express()
const connectMongo = require('./config/db')

// Connect  Database

connectMongo()

// initialise Body Parser

app.use(express.json({extended : false}))

app.get('/', (req, res) => {
 
    res.send("api is running")


    


})




// Deploy The Routes 


app.use('/',require('./routes/users'))

app.use('/login',require('./routes/auth'))

app.use('/admin', require('./routes/index')) 










const PORT = 5000 || process.env.PORT


app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))