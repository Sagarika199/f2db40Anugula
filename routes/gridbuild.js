var express = require('express');
var router = express.Router();

/* GET gridbuild page. */
router.get('/', function(req, res, next) {
    let query = req.query
    r1 = query.rows
    c1 = query.cols
console.log(`r1 ${query.r1}`)
console.log(`c1 ${query.c1}`)
  res.render('gridbuild', { title: 'Grid Build', query: query });
});

module.exports = router;