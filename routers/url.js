const express = require('express');
const router = express.Router();
const URL = require('../models/url');
const handleGeneratenewShortURL = require('../controllers/url').handleGeneratenewShortURL;
const {handleGetAnalytics,handleGeturl} = require('../controllers/url');

router.post('/',handleGeneratenewShortURL);
router.get('/analytics/:shortId',handleGetAnalytics);
router.get('/:shortId',handleGeturl);

module.exports = router;