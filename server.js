var express = require("express");
var request = require("request");

var app = express();
const PORT = process.env.PORT || 5000

app.use(express.static("public"));

app.set("views", "views");
app.set("view engine", "ejs");

app.get("/", function (req, res) {
	console.log("Received a request for /");
	res.render("home");
});

app.get("/pages", function (req, res) {
	// Controller
	console.log("Received a request for the home page");
	res.render("pages");
});

app.get("/math", function (req, res) {
	// Controller
	console.log("Received a request for the math page");
	var params = {
		result: getResults(req.query)
	};
	res.render("math", params);
});

app.get("/math_service", function (req, res) {
	console.log("Received a request for the math_service page");
	res.render("math_service");
});


app.get("/postal", function (req, res) {
	// Controller
	console.log("Received a request for the postal page");
	var params = {
		result: getResults(req.query)
	};
	res.render("postal", params);
});

app.get("/postal_service", function (req, res) {
	console.log("Received a request for the postal_service page");
	res.render("postal_service");
});

app.listen(PORT, function () {
	console.log(`Listening on ${ PORT }`)
});




////////////////////////***********************///////////////////////////////
//-----------week 9 prove code for postal rate calculator------------------//
////////////////////////***********************///////////////////////////////


//app.get("/calculateShipping", calculate);
//console.log("ok the code is working so far");

//gets user input and calculates shipping cost
app.get("/calculateShipping", function(req, res) {
var result = calculate(request, response);
res.render("postal/results", result);	
});

function calculate(req, res) {
	
	//const lb = Number(request.query.lb);
	//const oz = Number(request.query.oz);
	var oz = request.query.oz;
	var lb = request.query.lb;
	var type = request.query.type;
	var weight = (query.lb + query.oz);

	if (lb == 0 &&
		oz > 4 && (type == "First Class Letter: Stamped" ||
			type == "First Class Letter: Metered")) {
		type = "Large Flat Envelope";
	}
	if (lb == 0 && oz > 13 && type == "First Class Envelopes: Large Flat") {
		type = "First Class Package";
	}

	getPrice(response, lb, oz, type);
}

function getPrice(res, lb, oz, type) {
	var price = 0.0;

	switch (type) {
		case "First Class Letter: Stamped":
			if (weight <= 1) {
				result = 0.55;
			} else if (weight <= 2) {
				result = 0.870;
			} else if (weight <= 3) {
				result = .85;
			} else if (weight <= 3.5) {
				result = 1.0;
			} else {
				console.log("There is a weight limit of 3.5oz for First Class stampled-letter mailing. Your selection is too heavy for sending a First Class stamped letter via U.S.P.S.");
			}
			break;
		case "First Class Letter: Metered":
			if (weight <= 1) {
				result = 0.50;
			} else if (weight <= 2) {
				result = 0.65;
			} else if (weight <= 3) {
				result = .80;
			} else if (weight <= 3.5) {
				result = 1.0;
			} else {
				console.log("There is a weight limit of 3.5oz for First Class metered mailing. Your selection is too heavy for sending a First Class metered letter via U.S.P.S.");
			}
				break;
		case "First Class Envelope: Large Flat":
			if (weight <= 1) {
				cost = 0.98;
			} else if (weight <= 2) {
				cost = 1.19;
			} else if (weight <= 3) {
				cost = 1.40;
			} else if (weight <= 4) {
				cost = 1.61;
			} else if (weight <= 5) {
				cost = 1.82;
			} else if (weight <= 6) {
				cost = 2.03;
			} else if (weight <= 7) {
				cost = 2.24;
			} else if (weight <= 8) {
				cost = 2.45;
			} else if (weight <= 9) {
				cost = 2.66;
			} else if (weight <= 10) {
				cost = 2.87;
			} else if (weight <= 11) {
				cost = 3.08;
			} else if (weight <= 12) {
				cost = 3.29;
			} else if (weight <= 13) {
				cost = 3.50;
			} else {
				console.log("There is a weight limit of 13oz for First Class Large Envelope mailing. Your selection is too heavy for sending a First Class large envelope via U.S.P.S.");
			}
				break;
		case "First Class Package":
			if (weight <= 1) {
				cost = 3.66;
			} else if (weight <= 2) {
				cost = 3.66;
			} else if (weight <= 3) {
				cost = 3.66;
			} else if (weight <= 4) {
				cost = 3.66;
			} else if (weight <= 5) {
				cost = 4.39;
			} else if (weight <= 6) {
				cost = 4.39;
			} else if (weight <= 7) {
				cost = 4.39;
			} else if (weight <= 8) {
				cost = 4.39;
			} else if (weight <= 9) {
				cost = 5.19;
			} else if (weight <= 10) {
				cost = 5.19;
			} else if (weight <= 11) {
				cost = 5.19;
			} else if (weight <= 12) {
				cost = 5.19;
			} else if (weight <= 13) {
				cost = 5.71;
			} else {
				console.log("There is a weight limit of 13oz for First Class Package mailing. Your selection is too heavy for sending a First Class package via U.S.P.S.");
			}
				break;
		case "default":
				console.log("Something went wrong, please try again.");;
				}
					//const params = {
					return {
						lb: lb,
						oz: oz,
						weight: weight,
						type: type,
						price: price
					};

			}
	

/////*****************week 9 teach code DO MATH****************//////
			function getResults(data) {
				if (data.submit == 'Add') {
					return add(data.num1, data.num2);
				} else if (data.submit == 'Subtract') {
					return subtract(data.num1, data.num2);
				} else if (data.submit == 'Multiply') {
					return multiply(data.num1, data.num2);
				} else if (data.submit == 'Divide') {
					return divide(data.num1, data.num2);
				} else {
					console.log("Something weird happened. What did you click on????");
				}
			}

			function subtract(num1, num2) {
				// console.log("Subtract" + num1 + ' ' + num2);
				return parseInt(num1) - parseInt(num2);
			}

			function divide(num1, num2) {
				// console.log("Divide" + num1 + ' ' + num2);
				return parseInt(num1) / parseInt(num2);
			}

			function multiply(num1, num2) {
				// console.log("Multiply" + num1 + ' ' + num2);
				return parseInt(num1) * parseInt(num2);
			}

			function add(num1, num2) {
				// console.log("Add" + num1 + ' ' + num2);
				return parseInt(num1) + parseInt(num2);
			}
