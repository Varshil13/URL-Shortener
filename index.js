const express = require('express');
const app   = express();
const {handleGeneratenewShortURL}= require('./controllers/url');
const urlRoute = require('./routers/url');
const PORT = 3000;
const connectToDatabase = require('./connect');
const URL = require('./models/url');



app.use(express.json());

connectToDatabase('mongodb+srv://sharmapriyanshu91:4fJlemLS8ZZayBkd@cluster0.tgjfxm1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
    console.log('Mongodb connedted')
})
app.use('/url',urlRoute);

app.get('/url/:shortId',async (req ,res) =>{
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

    res.redirect(entry.redirectUrl);
})
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});