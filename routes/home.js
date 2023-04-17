const express = require('express');
const router = express.Router();
router.get('/', (req, res) => {
    res.render('index', { title: "Suhant", message: "This is a test message" });
});

module.exports = router; 