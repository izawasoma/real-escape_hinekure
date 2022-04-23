var express = require('express');
const app = require('../app');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.query.stage == 1){
    req.app.set("start_to_1st_flg",1);
  }
  else if(req.query.stage == 2){
    req.app.set("1st_to_2nd_flg",1);
  }
  let flgs = [];
  flgs[0] = flg_check(req.app.get("start_to_1st_flg"));
  flgs[1] = flg_check(req.app.get("1st_to_2nd_flg"));
  res.render('./flg_change.ejs',{title:"回答許可",flgs:flgs});
});

function flg_check(value){
  if(value == 0){
    return "許可していません";
  }
  else if(value == 1){
    return "許可しています";
  }
}

module.exports = router;
