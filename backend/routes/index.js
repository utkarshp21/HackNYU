var express = require('express');
var router = express.Router();
let sensorData = null;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/callback',(req,res) => {
	console.log(req);
})

router.get('/values',(req,res) => {
	res.json({values: sensorData})
})


router.post('/data',(req,res) => {
	console.log(req.body);
	sensorData = req.body;
	res.send('OK')
})

module.exports = router;
