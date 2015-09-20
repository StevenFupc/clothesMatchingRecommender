'use strict';

var util = require('util');
var async = require('async');
var pool = require('./pool');

var fields = ['SCHEMA_NAME || \'.\' || TABLE_NAME as TABLE'];
var sql = util.format('select top 50 %s from TABLES', fields.join(','));
var finalCb;
var param;

function insp(obj) {
	console.log(util.inspect(obj, {
			colors : true
		}));
}

function connect(cb) {
	//client.connect(cb);

	pool.acquire(function (err, client) {
		if (err) {
			// handle error - this is generally the err from your
			// factory.create function
			console.error('Pool acquire error: ' + err);
			cb(err, null);
		} else {
			cb(null, client);
		}
	});
}

function executeAndfetchRows(client, cb) {
	client.execute(sql, function(err, rows){
		pool.release(client);
		cb(err, rows);
	});
	
}

function prepare(client, cb) {
	client.prepare(sql, function (err, statement) {
		cb(err, statement, client);
	});
}

function executeAndfetchRowsWithParam(statement, client, cb) {
	statement.execute(param, function (err, rows) {
		cb(err, client, rows);
	});
}

function release(client, rows, cb) {
	pool.release(client);
	cb(null, rows);
}

function done(err, rows) {

	if (err) {
		console.error(err);
	}

	finalCb(err, rows);
}

module.exports = {
	execute : function (data) {
		sql = data.sql;
		finalCb = data.cb;
		param = data.param;

		console.log(util.inspect(data, {
				colors : true
			}));
		console.log('\n');

		if (param) {
			async.waterfall([connect, prepare, executeAndfetchRowsWithParam, release], done);
		} else {
			async.waterfall([connect, executeAndfetchRows], done);
		}
	}
};
