const express = require('express')
const router = express.Router();
const postModel = require('../models/post')
//APIs
router.get('/',(req,res)=>{
    postModel.find({},(err,postsList)=>{
        if (!err) return res.json(postsList);
        res.json({ Error: "DataBase ERRORR"});
    //Populate==>refer to table and return rest of object data
       }).populate('author');
})
router.get('/:id',(req,res)=>{
    const id = req.params.id;
    postModel.findById(id, (err,post)=>{
        if (!err) return res.json(post);
        res.json({ Error: "DataBase ERRORR"});
    
       }).populate('author');
})

router.post('/',(req,res)=>{
    //Another way for add // instance method
    /*postModel.create(req.body,(err, savedPost)=>{
        if (!err) {
            return res.json(savedPost);
        }
        res.json({ Error: "DataBase ERRORR"});
    });*/
    // static method
    const post = new postModel(req.body) ;
    post.save((err, savedPost)=>{
        if (!err) {
            return res.json(savedPost);
        }
        res.json({ Error: "DataBase ERRORR"});
    });
})

router.put('/:id',(req,res)=>{
    const id = req.params.id;
    const body = req.body;
    postModel.findByIdAndUpdate(id,body,{new:true}, (err,post)=>{
        if (!err) return res.json(post);
        res.json({ Error: "DataBase ERRORR"});
    
       }).populate('author');
})

router.delete('/:id',(req,res)=>{
    const id = req.params.id;
    postModel.findByIdAndDelete(id, (err,post)=>{
        if (!err) return res.json(post);
        res.json({ Error: "DataBase ERRORR"});
    
       });
})

module.exports = router