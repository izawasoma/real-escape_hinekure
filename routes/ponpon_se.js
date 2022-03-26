var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('ponpon_se', { title: 'Socket.io + Express' });
});

module.exports = router;
