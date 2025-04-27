const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();
const port = process.env.PORT|| 8070;
const routes = require('./Routes');
app.use('/routes', routes);
app.use(cors({ origin: 'http://localhost:3000',
    
 }));
 
app.use(bodyparser.json());
const URL = process.env.MONGODB_URL;



mongoose.connect(URL,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
})

.then(() => console.log("Mongodb connection success!"))
.catch(err => console.error("Mongodb connection error:", err));

app.use(express.json());
const CompanyRouter = require("./Routes.js");
app.use("/router",CompanyRouter);


app.listen(8070,()=>{
    console.log('Server is up and running on port ${port}');

});
