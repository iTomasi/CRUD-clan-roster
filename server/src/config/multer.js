const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, `uploaded__${Date.now()}${path.extname(file.originalname)}`)
    },
    
    destination: path.join(__dirname, "../public/img")
});


const addMember_multer = multer({
    storage
}).single("inputFile")

module.exports = {
    addMember_multer
}