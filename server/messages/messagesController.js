var db = require('../db_config.js');
var mongoose = require('mongoose');
var Messages = db.Messages;

module.exports = {

  send : function(req, res, next){
    var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    var text = {
      user : req.body.from,
      date : date,
      message : req.body.message
    };
    Messages.findOne({users: {$all:[req.body.to, req.body.from]}}, function(err, convo){
      if(err){
        res.status(500).send(err);
        return next();
      }
      if(!convo){
        var newConvo = new Messages;
        newConvo.users.push( req.body.to , req.body.from );
        newConvo.messages.push(text);
        newConvo.save(function(err, text){
        if(err) res.status(400).send(err);
        else res.status(201).send(text);
        return next();
        });
      }  
      Messages.update({_id: convo._id}, {
        $push: { messages : text}
      }, function(err) { 
        if(err) res.status(400).send(err);
        else {
          Messages.findOne({users: {$all:[req.body.to, req.body.from]}}, function(err, convo){
            if(err){
              res.status(500).send(err);
              return next();
            }
            if(!convo){
              res.status(404).send("Conversation not found")
              return next();
            }
            res.status(200).send(convo);
         });
        }
      });
    });
  },

  getConvo : function(req, res, next){
    Messages.findOne({users: {$all:[req.body.match_id, req.body.user_id]}}, function(err, convo){
      if(err){
        res.status(500).send(err);
        return next();
      }
      if(!convo){
        res.status(404).send("Conversation not found")
        return next();
      }
      res.status(200).send(convo);
   });
  }


};