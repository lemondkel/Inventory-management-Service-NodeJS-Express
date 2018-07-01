var express = require('express');
var router = express.Router();

var Sequelize = require('sequelize');
var db = require('./config/db').info;
var sequelize = new Sequelize(db.dbname, db.username, db.password, db.server);

var itemDao = require('./dao/Item');
var historyDao = require('./dao/History');

const Item = sequelize.define('Item', itemDao.info, itemDao.desc);
const History = sequelize.define('History', historyDao.info, historyDao.desc);

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', {title: 'Inventory management'});
});

router.get('/items', function (req, res, next) {
	Item.findAll({
		attributes: ['idx', 'category', 'name', 'quantity']
	}).then(function (data) {
		res.status(200).json({data: data});
	});
});

router.post('/createItem', function (req, res, next) {
	var name = req.body.name;
	var category = req.body.category;
	var corporation = req.body.corporation;
	var price = req.body.price;
	var priceReal = req.body.priceReal;
	var quantity = req.body.quantity;
	var unit = req.body.unit;
	var desc = req.body.desc;


	Item.create({
		name: name,
		category: category,
		corporation: corporation,
		price: price,
		priceReal: priceReal,
		quantity: quantity,
		unit: unit,
		desc: desc
	}).then(function (data) {
		History.create({
			item_idx: data.idx,
			quantity: quantity
		});

		res.status(200).json({data: data});
	});
});

router.post('/addItem', function (req, res, next) {
	var itemIdx = req.body.itemIdx;
	var quantity = parseInt(req.body.quantity);

	Item.update({
		quantity: Sequelize.literal('quantity + ' + quantity)
	}, {where: {idx: itemIdx}}).then(function (data1) {
		History.create({
			item_idx: itemIdx,
			quantity: quantity
		}).then(function (data2) {
			res.status(200).json({data: data2});
		})
	})
});

router.post('/minusItem', function (req, res, next) {
	var itemIdx = req.body.itemIdx;
	var quantity = parseInt(req.body.quantity);

	Item.update({
		quantity: Sequelize.literal('quantity - ' + quantity)
	}, {where: {idx: itemIdx}}).then(function (data1) {
		History.create({
			item_idx: itemIdx,
			quantity: -quantity
		}).then(function (data2) {
			res.status(200).json({data: data2});
		})
	})
});

module.exports = router;