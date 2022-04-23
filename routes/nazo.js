var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let flgs = [];
  flgs[0] = flg_check1(req.app.get("start_to_1st_flg"));
  flgs[1] = flg_check2(req.app.get("1st_to_2nd_flg"));
  res.render('./nazo.ejs',{flgs:flgs});
});

function flg_check1(value){
  if(value == 0){
    return "";
  }
  else if(value == 1){
    return "display:none;";
  }
}

function flg_check2(value){
  if(value == 0){
    return "ng";
  }
  else if(value == 1){
    return "ok";
  }
}

module.exports = router;
