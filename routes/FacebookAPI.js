var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (req.query['hub.verify_token'] === 'tanmoy8447696675mitra') {
        res.send(req.query['hub.challenge']);
    }
    res.send('Error, wrong token');
});

module.exports = router;