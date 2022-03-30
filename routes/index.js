var express = require('express');
var router = express.Router();
var mongo = require('../DB/connect');
var {Vote,VoteSchema} = require('../models/vote')

router.get('/', function(req, res, next) {
  res.render('index', { title: 'PhotoGraphic Club MSEC' });
});
mongo()
router.post('/voting',(req,res) => {
  console.log(req.body)
  const votingUser = new Vote({
    regNo:req.body.registrationNo,
    vote:parseInt(req.body.votingNo)
  })
  
  Vote.findOne({regNo:req.body.registrationNo},(err,found) => {
    if(!found){
       votingUser.save()
        res.send({status:true})
        console.log(true)
      }
    else{
      res.send({status:false})
      
      console.log("user already exist")
    }
  })
})



module.exports = router;
