'use strict';
var db = require('../db');

module.exports = {
	getTopAll: function (data) {
		return db.execute({
			sql: 'SELECT id as "id", product_name as "Product Name" FROM adidas.Top order by id DESC ',
			//sql : 'SELECT * FROM "SAP_HHP_MEDEX"."sap.hhp.medexplorer.db::SV_ANSWERS_ALL"',
			cb: data.cb
		});
	},

	getTopById: function (data) {
		return db.execute({
			sql: 'SELECT id as "id", product_name as "Product Name" FROM adidas.Top'
			+ ' WHERE id = ?',
			cb: data.cb,
			param: data.param
		});

	},

	deleteTopById: function (data) {
		return db.execute({
			sql: 'DELETE FROM "SAP_HPH"."sap.hc.hph.cdw.db::STUDY"'
			+ ' WHERE STUDY_ID = ?',
			cb: data.cb,
			param: data.param
		});
	},

	upsertStudy: function (data) {
		return db.execute({
			sql: 'UPSERT "SAP_HPH"."sap.hc.hph.cdw.db::STUDY"'
			+ ' ( STUDY_ID, STUDY_TITLE, STUDY_DESC) VALUES (?, ?, ? ) '
			+ ' WITH PRIMARY KEY',
			cb: data.cb,
			param: data.param
		});
	},

	updateStudy: function (data) {
		return db.execute({
			sql: 'update "SAP_HPH"."sap.hc.hph.cdw.db::STUDY"'
			+ ' set STUDY_TITLE = ?, STUDY_DESC = ? where STUDY_ID=? ',
			cb: data.cb,
			param: data.param
		});
	}
};
