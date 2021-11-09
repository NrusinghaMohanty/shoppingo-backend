const mongoose = require("mongoose")

const dbconnection = () => {
const dotenv = require('dotenv');
dotenv.config();
const mySecret = process.env['dburl']
mongoose.connect(mySecret,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex:true
})
.then(()=>console.log("successfully connected ....."))
.catch(error => console.error("sorry !!!connection failed" , error))
}

module.exports = {dbconnection}