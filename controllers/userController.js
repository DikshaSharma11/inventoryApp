 var  user= require('../models/user');
 const{body,validationResult}=require('express-validator');
const bcrypt= require('bcryptjs')
exports.sign_up=(req,res)=> res.render("sign_up_form");
exports.sign_up_post=[
    body('username','invalidusername').trim().islength({min:1}).escape(),
    body('password',invalidpassword).trim().islength({mim:1}).escape(),
    (req,res,next)=>{
        const errors =validationResult(req);
        const user=new user({
            username:req.body.username,
            password: req.body.password
        });
        if(!errors.isEmpty()){
            res.render('sign_up_form'),{error:errors.array()};
            return;
        }else{
            user.findOne({'username': req.body.username})
.exce({function(err,found_user){
    if(err|| found_user){return next(err);}
    user.password=hashPassword;
    user.saved(function(err){
        if(err){return next(err);}
        res.redirect("/")
    })
}})
        }
    }]
    exports.log_in_get=(req,res)=>res.render("log_in_forms");
    exports.get_log_out=(req,res)=>{
        req.logout();
        ews.redirect("/")
    }
    