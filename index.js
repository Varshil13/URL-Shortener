const express = require('express');
const app   = express();
const {handleGeneratenewShortURL}= require('./controllers/url');
const urlRoute = require('./routers/url');
const PORT = 3000;
const connectToDatabase = require('./connect');
const URL = require('./models/url');
const path = require('path');
const {restrictToLoggedinUserOnly,checkAuth} = require('./middlewares/auth')
const { config } = require('dotenv');
const cookieParser = require('cookie-parser')
const staticRoute = require('./routers/staticRouter')
const userRoute = require('./routers/user');

config();
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cookieParser());

connectToDatabase(process.env.MONGO_URL).then(() => {
  console.log('MongoDB connected');
});


app.set('view engine','ejs');
app.set('views',path.resolve("./views"));




app.use('/url',restrictToLoggedinUserOnly,urlRoute);
app.use('/',checkAuth,staticRoute);
app.use('/user',userRoute);



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});