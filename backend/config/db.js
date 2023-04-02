const mongoose = require("mongoose");

const connecttomongo = ()=>{
    mongoose.connect(process.env.DB_URI,{useNewUrlParser:true,useUnifiedTopology:true}).then((data)=>{
        console.log(`MongoDB connected to ${data.connection.host}`)
    })
}
module.exports = connecttomongo