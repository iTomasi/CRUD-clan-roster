const router = require("express").Router();
const path = require("path");
const fs = require("fs");
const connection = require("../database/mysql.js");
const {addMember_multer} = require("../config/multer.js");
const ranks = ["leaders", "staff", "advanced-members", "members", "trials"];

router.get("/", (req, res) => {
    connection.query("SELECT * FROM members", (err, resp) => {
        if (err) {
            console.log(err)
        }

        else {
            res.json(resp)
        }
    })
})

router.get("/image/:id", (req, res) => {
    const id = req.params.id;

    res.sendFile(path.join(__dirname, `../public/img/${id}`))
})

router.post("/", addMember_multer, (req, res) => {
    const {nickname, therol, therank} = req.body;
    const fileName = req.file.filename;

    if (nickname && therol && therank && ranks.indexOf(therol) !== -1) {
        connection.query("INSERT INTO members (therol, nickname, therank, theimg) VALUE (?, ?, ?, ?)", [therol, nickname, therank, fileName], (err, resp) => {
            if (err) {
                console.log(err)
            }

            else {
                console.log(resp)
            }
        })

        res.json({
            message: "Works!"
        })
    }

    else {
        res.json({
            message: "Fail :("
        })
        fs.unlinkSync(path.join(__dirname, `../public/img/${fileName}`))
    }
});

router.get("/data-member/:id", (req, res) => {
    const id = req.params.id;

    connection.query("SELECT * FROM members WHERE id = ?", [id], (err, resp) => {
        if (err) {
            console.log(err)
        }

        else {
            res.json(resp[0])
        }
    })
})

router.delete("/:id", (req, res) => {
    const id = req.params.id;

    connection.query("SELECT theimg FROM members WHERE id = ?", [id], (err, resp) => {
        if (err) {
            console.log(err)
        }

        else {
            connection.query("DELETE FROM members WHERE id = ?", [id], (err, resp2) => {
                if (err) {
                    console.log(err)
                    res.json({
                        message: "Fail bro :("
                    })
                }

                else {
                    res.json({
                        message: "Member Deleted"
                    })

                    fs.unlinkSync(path.join(__dirname, `../public/img/${resp[0].theimg}`))
                }
            })
        }
    })
});

router.put("/:id", addMember_multer, (req, res) => {
    const id = req.params.id;
    const {nickname, therol, therank} = req.body;
    let fileName;
    let oldImg = "";

    try {
        fileName = req.file.filename;

        connection.query("SELECT theimg FROM members WHERE id = ?", [id], (err, resp) => {
            if (err) {
                console.log(err)
            }
    
            else {
                connection.query("UPDATE members SET therol = ?, nickname = ?, therank = ?, theimg = ? WHERE id = ?", [therol, nickname, therank, fileName, id], (err, resp2) => {
                    if (err) {
                        console.log(err)
                        res.json({
                            message: "ERROR :("
                        })
                    }
    
                    else {
                        oldImg = resp[0].theimg
                        fs.unlinkSync(path.join(__dirname, `../public/img/${oldImg}`))
                        res.json({
                            message: "UPDATED"
                        })
                    }
                })
            }
        })
    }

    catch(e) {
        connection.query("SELECT theimg FROM members WHERE id = ?", [id], (err, resp) => {
            if (err) {
                console.log(err)
            }

            else {
                fileName = resp[0].theimg

                connection.query("UPDATE members SET therol = ?, nickname = ?, therank = ?, theimg = ? WHERE id = ?", [therol, nickname, therank, fileName, id], (err, resp2) => {
                    if (err) {
                        console.log(err)
                        res.json({message: "FAIL"})
                    }

                    else {
                        res.json({message: "NICE"})
                    }
                })
            }
        })
    }
    
})

module.exports = router;