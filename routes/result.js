var express = require('express')
var router = express.Router()
var {vote,VoteSchema, Vote} = require('../models/vote')
router.get("/",(req,res) => {
    res.render("result",{title:"PhotoGraphyClub Result"})
})
router.get('/view',(req,res) => {
    Vote.find({},(err,found) => {
        if(!err){
            console.log(typeof found)
            res.set('Content-Type', 'application/json')
            return res.status(200).send(JSON.stringify(found))
        }
    })
 
})

module.exports = router;