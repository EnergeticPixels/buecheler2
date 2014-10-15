var express = require('express');
var router = express.Router();

/*
 * GET userList
*/
router.get('/userlist', function (req, res) {
	var db = req.db;
	db.collection('userlist').find().toArray(function (err, items) {
		res.json(items);
	});
});


/* 
 * POST userList
 * just posting some ata (req.body) and your going to insert it into collection in database. if that goes well,
 * return an empty string. if somethign goes haywire, return the error message that the database gives.
*/
router.post('/adduser', function (req, res) {
	var db = req.db;
	db.collection('userlist').insert(req.body, function (err, result) {
		res.send((err === null) ? (msg: '') : (msg: err));
	});
});

module.exports = router;
