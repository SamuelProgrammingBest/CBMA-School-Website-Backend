const mongoose = require("mongoose")

const connectMyDB = () =>{
    mongoose.connect(process.env.MONGOCONNECTURI).then(()=>{
        console.log("Mongoose DB connected successfully")
    }).catch((error)=>{
        console.log(`DB not connected. Error = ${error}`)
    })
}

module.exports={connectMyDB}