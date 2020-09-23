const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const jwtSecret = "Ashish";
const auth = require('../auth');
const router = express.Router();

//get all users in admin panel.
router.get('/', (req,res)=>{
    User.find({})
        .then((userlists)=>{
            res.send(userlists);
        }).catch((err)=>{
        res.send('Error', err.message)
    })
});

//User Create by admin
router.post('/signup', (req,res, next) => {
    User.find({Email: req.body.Email}) //Check if email id exists
        .exec()
        .then(user => {
            if (user.length >=1) {
                return res.status(409).json({
                    message: 'Email already exists'
                });
            }
            else{
                let Password = req.body.Password
                bcrypt.hash(Password, 10, function(err,hash){
                    if(err){
                        let err = new Error('Could not hash!')
                        err.status = 500
                        return next(err)
                    }
                    User.create({
                        FullName: req.body.FullName,
                        UserName: req.body.UserName,
                        Email: req.body.Email,
                        PhoneNo: req.body.PhoneNo,
                        Password: hash,
                        isWaiter: req.body.isWaiter,
                        isChief: req.body.isChief
                    }).then(()=>{
                        let token = jwt.sign({ _id: user._id }, jwtSecret)
                        res.json({ status: "Signup success!", token: token});
                    }).catch(next);
                })
            }
        })
})

module.exports = router;