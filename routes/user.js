const express = require('express');
const { find } = require('../models/user');
const router = express.Router();
const userModel = require("../models/user");
//Call for APIs
router.get("/",(req,res)=>{
   //find({filter})
   userModel.find({},(err,usersList)=>{
    if (!err) return res.json(usersList);
    res.json({ Error: "DataBase ERRORR"});

   });
});

router.get("/:id",(req,res)=>{
    const id = req.params.id;
    userModel.findById(id, (err,user)=>{
        if (!err) return res.json(user);
        res.json({ Error: "DataBase ERRORR"});
    
       });
       /* 
       userModel.find({_id:id}, (err,user)=>{
        if (!err) return res.json(user);
        res.json({ Error: "DataBase ERRORR"});
    
       });
       */
 });

router.post("/",(req,res)=>{
    const userData = req.body;
    const user = new userModel(userData) ;
    user.save((err, savedUser)=>{
        if (!err) {
            return res.json(savedUser);
        }
        //console.log(req.body);
        res.json({ Error: "DataBase ERRORR"});
    });
 });
//update,updateOne,updateOne,findAndUpdate,findbyIdAndUpdate
//how to update using mongoose
//بياخد اتنين body of req and id in url
//////////////////////////////ليه مش بيتغير الا بعد اتنين send?/////////////////////////////////////////////////////////
router.put("/:id",(req,res)=>{
    const id = req.params.id;
    const body = req.body;
    userModel.findByIdAndUpdate(id,body,{new:true}, (err,user)=>{
        if (!err) return res.json(user);
        res.json({ Error: "DataBase ERRORR"});
    
       });
 });
///////////////////////////////difference(findbyidanddelete ,findbyidandremove)//////////////////////////////////////////
router.delete("/:id",(req,res)=>{
    const id = req.params.id;
    userModel.findByIdAndDelete(id, (err,user)=>{
        if (!err) return res.json(user);
        res.json({ Error: "DataBase ERRORR"});
    
       });
 });
module.exports = router