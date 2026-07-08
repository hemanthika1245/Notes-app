const mysql=require("mysql2");
const connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"ihk123",
    database:"notes_app"
});

connection.connect((err)=>{
    if(err){
        console.log("Database connetion failed");
        console.log(err);
        return;
    }
    console.log("Connected to MYSQl");
});

module.exports=connection