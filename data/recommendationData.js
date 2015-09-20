'use strict';
var db = require('../db');

module.exports = {
	getRecommendationAll: function (data) {
		return db.execute({
			sql: 'SELECT id, topId, topURL, bottomId, bottomURL, shoeId, shoeURL, score, color FROM adidas.RecommendationURL order by id',
			//sql : 'SELECT * FROM "SAP_HHP_MEDEX"."sap.hhp.medexplorer.db::SV_ANSWERS_ALL"',
			cb: data.cb
		});
	},
	
	getRecommendationById: function (data) {
		return db.execute({
			sql: 'SELECT id, topId, topURL, bottomId, bottomURL, shoeId, shoeURL, score, color FROM adidas.RecommendationURL'
			+ ' WHERE id = ?',
			cb: data.cb,
			param: data.param
		});

	},
	

	getRecommendationByTopId: function (data) {
		return db.execute({
			sql: 'SELECT id, topId, topURL, bottomId, bottomURL, shoeId, shoeURL, score, color FROM adidas.RecommendationURL'
			+ ' WHERE topId = ? order by score desc',
			cb: data.cb,
			param: data.param
		});

	},
	
	getRecommendationByBottomId: function (data) {
		return db.execute({
			sql: 'SELECT id, topId, topURL, bottomId, bottomURL, shoeId, shoeURL, score, color FROM adidas.RecommendationURL'
			+ ' WHERE bottomId = ? order by score desc',
			cb: data.cb,
			param: data.param
		});

	},
	
	getRecommendationByShoeId: function (data) {
		return db.execute({
			sql: 'SELECT id, topId, topURL, bottomId, bottomURL, shoeId, shoeURL, score, color FROM adidas.RecommendationURL'
			+ ' WHERE shoeId = ? order by score desc',
			cb: data.cb,
			param: data.param
		});

	},

	deleteStudyById: function (data) {
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
