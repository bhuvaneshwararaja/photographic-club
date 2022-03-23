const mongoose = require('mongoose')
const VoteSchema = new mongoose.Schema({
    regNo:String,
    vote:Number
  
  })
  
  const Vote = new mongoose.model("Vote",VoteSchema);

  module.exports = {Vote, VoteSchema}