const mysql2=require("mysql2");
const db = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "Ra16nj08it01h@",
    database: "Work", // Replace with your actual database name
  });
  
  db.connect((err) => {
    if (err) throw err;
    console.log("Connected to MySQL database.");
  });
  module.exports=db;