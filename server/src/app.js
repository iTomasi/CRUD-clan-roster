const express = require("express");
const path = require("path");
const cors = require("cors")
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))
app.use("/", require("./router/pages.js"));

app.listen(port, () => console.log(`SV ON PORT ${port}`))