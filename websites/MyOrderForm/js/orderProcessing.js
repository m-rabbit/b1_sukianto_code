function get_data(orderForm) {
	var order_data = "This Orda is ...\n";
	for ( i = 0; i < orderForm.line.length; i++) {
		if (orderForm.line[i].value == "") {
			orderForm.line[i].value = "0";
		}
		order_data += "Line " + i + ", Qty = " + orderForm.line[i].value + ", Price = " + orderForm.line[i].id + "\n";
	}
	order_data += "\nShipping Cost " + shippingCost;
	order_data += "\nSales Tax " + accounting.formatMoney(salesTax);
	if (orderForm.grand_total.value == "") {
		orderForm.grand_total.value = "Nothing yet";
	}
	order_data += "\nTotal Orda value = " + orderForm.grand_total.value;
	document.confirmationForm.order.value = order_data;

};
/*<tr style="background-color:#ffa500">
 <td>
 <input type="button" value="Reset" onclick="init()">
 </td>
 <td colspan="2" align="right">Grand Total: </td>
 <td align="right">
 <input name="grand_total" type="text" size="10" readonly>
 </td>
 </tr>*/


var optionsCost;
var shippingCost;
var sizeCost;
var salesTax;
var finalCost;

function calculateTotal() {
	finalCost = 0.00;
	optionsCost = 0.00;
	sizeCost = 0.00;
	shippingCost = 0.00;
	salesTax = 0.00;
	
	shippingCost = orderForm.lineShip.value;

	
	optionsCost = orderForm.menu_total.value;

	//need to add sales tax
	finalCost = accounting.unformat(optionsCost) + accounting.unformat(shippingCost);
	
	salesTax = 0.06*finalCost;
	orderForm.tax.value = accounting.formatMoney(salesTax);
	finalCost += salesTax;
	
	orderForm.grand_total.value = accounting.formatMoney(finalCost);
	
}
function setSize(size) {
	var price = 0.0;
	document.getElementById("mySize").value = size;
	if (size == "small") {
		price = 16.95;
		document.orderForm.lineSize.value = accounting.formatMoney(price);
	} else if (size == "medium") {
		price = 17.95;
		document.orderForm.lineSize.value = accounting.formatMoney(price);
	} else if (size == "lahge") {
		price = 18.95;
		document.orderForm.lineSize.value = accounting.formatMoney(price);
	}
	orderForm.menu_total.value = accounting.formatMoney(accounting.unformat(orderForm.menu_total.value) + price);
};

function setShipper() {
	var shipDropDown = document.getElementById("theShipper");
	var displayShipper = document.getElementById("myShipper");
	var price;

	if (shipDropDown.options[shipDropDown.selectedIndex].text == "Fastest") {
		price = parseFloat(9.95);
		displayShipper.value = "Fastest - $9.95";

		document.orderForm.lineShip.value = accounting.formatMoney(price);
	} else if (shipDropDown.options[shipDropDown.selectedIndex].text == "Faster") {
		price = parseFloat(6.95);
		displayShipper.value = "Faster - $6.95";

		document.orderForm.lineShip.value = accounting.formatMoney(price);
	}
	if (shipDropDown.options[shipDropDown.selectedIndex].text == "Fast") {
		price = parseFloat(4.95);
		displayShipper.value = "Fast - $4.95";

		document.orderForm.lineShip.value = accounting.formatMoney(price);
	}
	if (shipDropDown.options[shipDropDown.selectedIndex].text == "Self pickup") {
		price = parseFloat(0);
		displayShipper.value = "Self pickup - $0.00";

		document.orderForm.lineShip.value = accounting.formatMoney(price);
	};
};

function count(orderForm, lineNumber, itemCost) {
	orderForm.line_sum[lineNumber].value = orderForm.line[lineNumber].value * itemCost;
	//orderForm.line_sum[lineNumber].value = Math.ceil(orderForm.line_sum[lineNumber].value * 1000) / 1000;
	//orderForm.line_sum[lineNumber].value = Math.floor(orderForm.line_sum[lineNumber].value * 1000) / 1000;
	//orderForm.line_sum[lineNumber].value = Math.round(orderForm.line_sum[lineNumber].value * 100) / 100;
	if (orderForm.line_sum[lineNumber].value == "NaN") {
		alert("Error:\nYou may only enter numbers...\nPlease retry");
		orderForm.line[lineNumber].value = orderForm.line[lineNumber].value.substring(0, orderForm.line[lineNumber].value.length - 1);
		orderForm.line_sum[lineNumber].value = orderForm.line[lineNumber].value * itemCost;
		if (orderForm.line_sum[lineNumber].value == "0")
			orderForm.line_sum[lineNumber].value = "";
	} else {
		var grandTotal = 0;
		for ( i = 0; i < orderForm.line_sum.length; i++) {
			grandTotal += Math.ceil(orderForm.line_sum[i].value * 1000) / 1000;
		}
		grandTotal = (Math.round(grandTotal * 100) / 100);
		grandTotal = accounting.formatMoney(grandTotal);
		orderForm.menu_total.value = grandTotal;
		
	}
};

function init() {
	document.orderForm.reset();
	document.orderForm.line[0].select();
	document.orderForm.line[0].focus();
	document.confirmationForm.order.value = "";
};

window.onload = init;
