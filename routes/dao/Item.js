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
		category: {
			type: Sequelize.STRING,
			defaultValue: "Default Category"
		},
		name: {
			type: Sequelize.STRING,
			defaultValue: "Default Prouct Name"
		},
		corporation: {
			type: Sequelize.STRING,
			defaultValue: "Default Coporation Name"
		},
		price: {
			type: Sequelize.INTEGER,
			defaultValue: 0
		},
		priceReal: {
			type: Sequelize.INTEGER,
			defaultValue: 0
		},
		quantity: {
			type: Sequelize.INTEGER,
			defaultValue: 0
		},
		unit: {
			type: Sequelize.STRING,
			defaultValue: "EA"
		},
		desc: {
			type: Sequelize.STRING,
			defaultValue: "This item is not set."
		},
		images: {
			type: Sequelize.STRING
		},
		isDel: {
			type: Sequelize.INTEGER,
			defaultValue: 0
		},
		createdAt: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW
		},
		updatedAt: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW
		}
	}
};