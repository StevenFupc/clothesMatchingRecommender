// Copyright 2013 SAP AG.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http: //www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
// either express or implied. See the License for the specific
// language governing permissions and limitations under the License.
'use strict';

var gp = require('generic-pool');
var mysql = require('mysql2');

var pool = gp.Pool({
		name : 'mysql',
		// create a new client object
		create : function create(callback) {
			var client = mysql.createConnection({
					// host : 'LSSINH003.sin3.sap.corp',
					// port : 3306,
					// user : 'huang_yi',
					// password : 'm@keIThappen',
					
					host : 'stevenfupcdb.cv1u8ytuieza.us-west-2.rds.amazonaws.com',
					port : 3306,
					user : 'stevenfupc',
					password : 'Toor1234',
					database : 'adidas'
				});
			client.hadError = false;
			client.once('error', function onerror(err) {
				console.error('Client error:', err);
				client.hadError = true;
			});
			client.connect(function onconnect(err) {
				if (err) {
					return callback(err);
				}
				callback(null, client);
			});
		},
		// If a client is removed from the pool
		// and the client is not already closed
		// gently close the client connection.
		destroy : function destroy(client) {
			if (!client.hadError && client.readyState !== 'closed') {
				client.end();
			}
		},
		// validate is called before a client is acquired from pool.
		// If the client is not connected it should be removed from pool.
		validate : function validate(client) {
			return (!client.hadError && client.readyState === 'connected');
		},
		max : 10,
		min : 5,
		idleTimeoutMillis : 30000,
		// don't destroy and recreate idle resources every idleTimeoutMillis
		refreshIdle : false,
		log : false
	});

exports = module.exports = pool;
