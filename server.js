const express = require("express");

const serverConfig = require('./configs/server.config');
const mongoose  = require("mongoose");
const dbConfig = require("./configs/db.config");
const userModel = require('./models/user.model');


const app = express();

/**
 * Logic to connect to MongoDB and create an ADMIN user
 */
mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection ;


db.on("error", ()=>{
    console.log("Error while connecting to DB")
});
db.once("open", ()=>{
    console.log("DB is connected");

       init();

})

const admin = async function init(){


    /**
     * Check if the admin user is already present
     */
    let admin = await userModel.fineOne({
        userId : "admin"
    })

    if(admin){
        console.log("Admin user already present");
        return;
    }
    /**
     * Intialize the mongo db
     * 
     * Need to create the ADMIN user
     */
    admin = await userModel.create({
        name : "Rosy Pathak",
        userId : "admin",
        email : "rosypathakcodes@gmail.com",
        userType : "ADMIN",
        password : "Welcome1"
    })
   console.log(admin);
}



app.listen(serverConfig.PORT, ()=>{
    console.log(`server started on the port number ${serverConfig.PORT}`);
})