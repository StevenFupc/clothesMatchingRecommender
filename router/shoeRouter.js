'use strict';
var express = require('express');
var router = express.Router();
var shoeData = require('../data/shoeData');

var uuid = require('node-uuid');

var util = require('util');

function insp(obj) {
	console.log(util.inspect(obj, {
		colors: true
	}));
}

router.param("shoeId", function (req, res, next, shoeId) {
	shoeData.getShoeById({
		cb: function (err, rows) {
			if (err) {
				return next(new Error(err));
			}
			if (rows.length > 0)
				req.shoe = rows[0];
			else {
				res.status(404);
				return next(new Error("shoe record not found."));
			}
			next();
		},
		param: [req.params.shoeId]
	});

});

router.route('/')
//list all studies
	.get(function (req, res) {
		shoeData.getShoeAll({
			cb: function (err, rows) {
				res.send(rows);
			}
		});
		//res.send('recommendation Router test OK');
	})
//create a new study /update the study for the given studyId
	// .post(function (req, res) {
		// var studyId = req.body.studyId || uuid.v4();
		// req.body.studyId = studyId;
		// studydata.upsertStudy({
			// cb: function (err, rows) {
				// if (err) res.send(err.message);
				// res.send(req.body);
			// },
			// param: [req.body.studyId, req.body.studyTitle, req.body.studyDesc]
		// });
	// });

router.route('/:shoeId')
//return the study for the given studyId
	.get(function (req, res) {
		res.send(req.shoe);
	});
// //update the study for the given studyId
	// .put(function (req, res, next) {
		// studydata.updateStudy({
			// cb: function (err, rows) {
				// req.body.studyId = req.params.studyId;
				// if (err) {
					// return next(new Error(err));
				// }
				// res.status(200).send(req.body);
			// },
			// param: [req.body.studyTitle, req.body.studyDesc, req.params.studyId]
		// });
	// })
// //delete the study for the given studyId
	// .delete(function (req, res, next) {
		// var result = {
			// "studyId": req.params.studyId
		// };
		// studydata.deleteStudyById({
			// cb: function (err, rows) {
				// if (err) {
					// return next(new Error(err));
				// }
				// res.status(200).send(result);
			// },
			// param: [req.params.studyId]
		// });
	// });

module.exports = router;
