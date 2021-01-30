const mysql = require("mysql");
const path = require("path");

require("dotenv").config({path: path.join(__dirname, "../.env")})

const connection = mysql.createConnection({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

connection.connect(err => {
    if (err) {
        console.log(err)
    }

    else {
        console.log("MySQL Connected")
    }
});

module.exports = connection