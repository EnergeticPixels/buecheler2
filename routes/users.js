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
		res.send(
			(err === null) ? { msg: '' } : { msg: err }
		);
	});
});

/* 
 * DELETING USERS
 * pass an ID parameter in the URI and mongodb matches it up with the unique _id field that it generates
 * for every entry in a coll and nukes that entry.  Just like addUser route, if all goes ok it returns a blank
 * string, if not it sends back an error messasge from db.
*/
router.delete('/deleteuser/:id', function (req, res) {
    var db = req.db;
    var userToDelete = req.params.id;
    db.collection('userlist').removeById(userToDelete, function (err, result) {
        res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
    });
});

module.exports = router;
