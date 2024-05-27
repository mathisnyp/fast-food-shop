const User = require('../../models/user');
const SHA256 = require("crypto-js/sha256");
const jwt = require('jsonwebtoken');
const verifyToken = require("./verifyToken");
const Order = require("../../models/fastfood/order");
const {isNil} = require("lodash");



function generateToken(res, email,id){
    const expiration = 604800000;
    const token = jwt.sign({email, id}, process.env.TOKEN_SECRET, {
      expiresIn: '7d',
    });
    return res.cookie('token', token, {
      expires: new Date(Date.now() + expiration),
      secure: false, // set to true if your using https
      httpOnly: true
    });
}





module.exports = function (app){

    app.post('/signup', async function (req,res){
        let userData = req.body;
        let user = await User.findOne({ email: userData.email });
        if(!user){
            let pw = SHA256(userData.password);
            userData.password = pw;
            let user = new User(userData);
            user.save(function (err){
                if(err){
                    res.status(422).send("data are not correct!");
                }else{
                    generateToken(res,userData.email, user._id);
                    res.status(201).send("successfully signed up!");
                }
            });
        }else{
            res.status(401).send("user already exists");
        }
    });


    app.post('/login', async function(req,res){
        let userData = req.body;
        let user = await User.findOne({ email: userData.email });
        if(user){
            let pw = SHA256(userData.password);

            if(user.password === pw.toString()){
                generateToken(res,userData.email, user._id);
                res.status(201).send("successfully signed in!");
            }else{
                res.status(401).send("user or password wrong!");
            }
            
        }else{
            res.status(401).send("user does not exists");
        }
    });

    app.get('/profile',verifyToken, async function (req,res){
        try{
            let userProfile = await User.findOne({_id:req.user.id});
            delete userProfile.__v
            delete userProfile.password
            res.status(200).send(userProfile);
        }catch(error){
            let errorObj = {body:req.body,errorMessage:"Server error!" };
            res.status(500).send(errorObj);
        }
    });

    app.post('/profile/edit',verifyToken, async function (req,res){
        const userProfileUpdate = req.body
        if(userProfileUpdate._id === undefined || userProfileUpdate._id === null) {
            try{
                if(!isNil(userProfileUpdate.password)) {
                    userProfileUpdate.password = SHA256(userProfileUpdate.password);
                }
                await User.findOneAndUpdate({_id:req.user.id}, userProfileUpdate)
                res.status(200).send("successfully edited profile!");
            }catch(error){
                let errorObj = {body:req.body,errorMessage:"Server error!" };
                res.status(500).send(errorObj);
            }
        } else {
            res.status(500).send({body: "You cannot edit your id!", errorMessage: "Server error!"});
        }
    });

    app.post('/logout', function(req,res){
        res.clearCookie('token');
        res.status(200).send("logout successful")
    });
}