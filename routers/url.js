const express = require('express');
const router = express.Router();
const URL = require('../models/url');
const handleGeneratenewShortURL = require('../controllers/url').handleGeneratenewShortURL;
const {handleGetAnalytics} = require('../controllers/url');
router.post('/',handleGeneratenewShortURL);
router.get('/analytics/:shortId',handleGetAnalytics);

module.exports = router;