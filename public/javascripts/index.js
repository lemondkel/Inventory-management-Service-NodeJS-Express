/**
 * Created by dkel on 2018-07-01.
 */

documentReady(getItems);

function getItems() {
	var request = new XMLHttpRequest();
	request.open('GET', '/items', true);

	document.getElementById('item_list').style.display = 'table';
	document.getElementById('create_item').style.display = 'none';

	request.onload = function () {
		if (request.status >= 200 && request.status < 400) {
			document.getElementById('item_list').querySelector('tbody').innerHTML = "";
			var resp = JSON.parse(request.responseText);
			for (var i = 0; i < resp.data.length; i++) {
				var html = '<tr data-idx="' + resp.data[i].idx + '" onclick="clickDetail(this)">';
				html += '<td>' + resp.data[i].idx + '</td>';
				html += '<td>' + resp.data[i].category + '</td>';
				html += '<td>' + resp.data[i].name + '</td>';
				html += '<td>' + resp.data[i].quantity + '</td>';
				html += '</tr>';
				document.getElementById('item_list').querySelector('tbody').innerHTML += html;
			}
		}
	};
	request.send();
}

function documentReady(fn) {
	if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
		fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}

var menuList = document.querySelectorAll('ul.menu_list li');
for (var i = 0; i < menuList.length; i++) {
	menuList[i].addEventListener('click', function () {
		var el = document.querySelector('ul.menu_list li.active');
		if (el.classList)
			el.classList.remove('active');
		else
			el.className -= ' ' + 'active';

		if (this.classList)
			this.classList.add('active');
		else
			this.className += ' ' + 'active';

		var menuId = parseInt(this.getAttribute('data-menu-id'));
		switch (menuId) {
			case 1:
				getItems();
				break;
			case 2:
				//상품등록
				document.getElementById('item_list').style.display = 'none';
				document.getElementById('create_item').style.display = 'block';
				break;
			case 3:
				getItems();
				break;
			case 4:
				getItems();
				break;
		}

		document.querySelector('h1.table_title').innerText = this.innerText;
	})
}

function createItem() {
	var category = document.getElementById('category').value;
	var name = document.getElementById('name').value;
	var corporation = document.getElementById('corporation').value;
	var price = document.getElementById('price').value;
	var priceReal = document.getElementById('priceReal').value;
	var quantity = document.getElementById('quantity').value;
	var unit = document.getElementById('unit').value;
	var desc = document.getElementById('desc').value;

	if (category === 'Unselected') {
		swal({
			title: 'Error!',
			text: 'Please select a category.',
			type: 'error',
			confirmButtonText: 'Confirm'
		}).then(function () {
			document.getElementById('category').focus();
			return false;
		});
		return false;
	}

	if (name === '') {
		swal({
			title: 'Error!',
			text: 'Enter product name.',
			type: 'error',
			confirmButtonText: 'Confirm'
		}).then(function () {
			document.getElementById('name').focus();
			return false;
		});
		return false;
	}

	if (corporation === '') {
		swal({
			title: 'Error!',
			text: 'Enter corporation name.',
			type: 'error',
			confirmButtonText: 'Confirm'
		}).then(function () {
			document.getElementById('corporation').focus();
			return false;
		});
		return false;
	}

	if (price === '') {
		swal({
			title: 'Error!',
			text: 'Enter unit price.',
			type: 'error',
			confirmButtonText: 'Confirm'
		}).then(function () {
			document.getElementById('price').focus();
			return false;
		});
		return false;
	}

	if (priceReal === '') {
		swal({
			title: 'Error!',
			text: 'Enter supply amount.',
			type: 'error',
			confirmButtonText: 'Confirm'
		}).then(function () {
			document.getElementById('priceReal').focus();
			return false;
		});
		return false;
	}

	if (quantity === '') {
		swal({
			title: 'Error!',
			text: 'Enter initial quantity.',
			type: 'error',
			confirmButtonText: 'Confirm'
		}).then(function () {
			document.getElementById('quantity').focus();
			return false;
		});
		return false;
	}

	if (unit === '') {
		swal({
			title: 'Error!',
			text: 'Enter unit of item.',
			type: 'error',
			confirmButtonText: 'Confirm'
		}).then(function () {
			document.getElementById('unit').focus();
			return false;
		});
		return false;
	}

	var request = new XMLHttpRequest();
	request.open('POST', '/createItem', true);
	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

	request.onload = function () {
		if (request.status >= 200 && request.status < 400) {
			swal(
				'Registration complete.',
				'Registered.',
				'success'
			).then(function () {
				swal({
					title: 'Would you like to register another item?',
					text: "You can register another item right away.",
					type: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Register',
					cancelButtonText: 'No'
				}).then(function (result) {
					if (result.value) {
						document.getElementById('name').value = "";
						document.getElementById('corporation').value = "";
						document.getElementById('price').value = 0;
						document.getElementById('priceReal').value = 0;
						document.getElementById('quantity').value = 0;
						document.getElementById('unit').value = 'EA';
						document.getElementById('desc').value = "";
					} else {
						getItems();
					}
				});
			});
		}
	};

	request.send("name=" + name + "&" + "category=" + category + "&" + "corporation=" + corporation + "&"
		+ "price=" + price + "&" + "priceReal=" + priceReal + "&" + "quantity=" + quantity + "&"
		+ "unit=" + unit + "&" + "desc=" + desc);
}

function clickDetail(target) {
	var itemIdx = parseInt(target.getAttribute('data-idx'));
	var menuId = parseInt(document.querySelector('ul.menu_list li.active').getAttribute('data-menu-id'));

	switch (menuId) {
		case 1:
			// Product List Click Product Event
			break;
		case 3:
			// Receiving product click event
			swal({
				title: itemIdx + " Product received",
				text: "How many would you like to carry?",
				input: 'number',
				inputAttributes: {
					autocapitalize: 'off',
					min: 1
				},
				inputValue: 1,
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Receiving',
				cancelButtonText: 'No'
			}).then(function (result) {
				if (result.value) {
					var request = new XMLHttpRequest();
					request.open('POST', '/addItem', true);
					request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

					request.onload = function () {
						if (request.status >= 200 && request.status < 400) {
							swal(
								'Receiving complete.',
								'It was received normally.',
								'success'
							).then(function () {
								getItems();
							});
						}
					};

					request.send("itemIdx=" + itemIdx + "&" + "quantity=" + result.value);
				}
			});
			break;
		case 4:
			var maxQuantity = parseInt(target.lastElementChild.innerText);
			//Forwarding product click event
			swal({
				title: itemIdx + " Product forwarding.",
				text: "How many do you want to release?",
				input: 'number',
				inputAttributes: {
					autocapitalize: 'off',
					min: 0,
					max: maxQuantity
				},
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Forwarding',
				cancelButtonText: 'No'
			}).then(function (result) {
				if (result.value) {
					if (parseInt(result.value) === 0) {
						swal({
							title: 'Error!',
							text: 'Enter exact quantity.',
							type: 'error',
							confirmButtonText: 'Confirm'
						});
						return false;
					}
					var request = new XMLHttpRequest();
					request.open('POST', '/minusItem', true);
					request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

					request.onload = function () {
						if (request.status >= 200 && request.status < 400) {
							swal(
								'Forwarding complete.',
								'Successfully shipped.',
								'success'
							).then(function () {
								getItems();
							});
						}
					};

					request.send("itemIdx=" + itemIdx + "&" + "quantity=" + result.value);
				}
			});
			break;
	}
}