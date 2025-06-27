const {nanoid} = require('nanoid');
const URL = require('../models/url');

async function handleGeneratenewShortURL(req,res){
    const body = req.body;
    if (!body.url) {
        return res.status(400).json({error: 'URL is required'});
    }

    const shortID = nanoid(8);
    await URL.create({
        shortId: shortID,
        redirectUrl: body.url,
        visitHistory: [],
        createdBy:req.user._id
    })
    const userUrls = await URL.find({createdBy : req.user._id})
    return res.render("home",
        {
            id:shortID,
            urls : userUrls,
            baseUrl: process.env.BASE_URL,
        }


    )
}

async function handleGetAnalytics(req,res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({totalClicks : result.visitHistory.length ,analytics : result.visitHistory});

    
}

async function handleGeturl(req,res){
     const shortId = req.params.shortId;
        const entry = await URL.findOneAndUpdate({
            shortId
        },{
            $push:
            {
                visitHistory: {
                    timestamp:Date.now(),
                },
            }
        });
    
        return res.redirect(entry.redirectUrl);

}




module.exports = {
    handleGeneratenewShortURL,
    handleGetAnalytics,
    handleGeturl
};
