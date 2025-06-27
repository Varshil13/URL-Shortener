const express = require('express');
const URL = require('../models/url');
const router = express.Router();



router.get('/', async (req,res)=>{
    if(!req.user) return res.redirect('/login')
       


    const userUrls = await URL.find({createdBy : req.user._id})

    return res.render('home',{
        urls: userUrls,
         baseUrl: process.env.BASE_URL,
    })
    
}
)
router.get('/signup',(req,res)=>{
    return res.render('signup')
})
router.get("/login",(req,res)=>{
    return res.render("login")
})

module.exports = router;

