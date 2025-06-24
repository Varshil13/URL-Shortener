const express = require('express');
const app   = express();
const {handleGeneratenewShortURL}= require('./controllers/url');
const urlRoute = require('./routers/url');
const PORT = 3000;
const connectToDatabase = require('./connect');
const URL = require('./models/url');
const path = require('path');
const staticRoute = require('./routers/staticRouter')



app.use(express.json());
app.use(express.urlencoded({extended:false}))

connectToDatabase('mongodb+srv://sharmapriyanshu91:4fJlemLS8ZZayBkd@cluster0.tgjfxm1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
    console.log('Mongodb connected')
})


app.set('view engine','ejs');
app.set('views',path.resolve("./views"));



app.use('/url',urlRoute);
app.use('/',staticRoute);



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});