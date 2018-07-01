/*
 * Created by Administrator on 2018-01-26.
 */
var Sequelize = require('sequelize');

module.exports = {
	info: {
		idx: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		item_idx: {
			type: Sequelize.INTEGER
		},
		quantity: {
			type: Sequelize.INTEGER
		},
		createdAt: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW
		}
	}
};