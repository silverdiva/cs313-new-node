var express = require("express");

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


app.get("/calculateShipping", calculate);
console.log("ok the code is working so far");


////////////////////////***********************///////////////////////////////
//-----------week 9 prove code for postal rate calculator------------------//
////////////////////////***********************///////////////////////////////



/////*****************week 9 teach code CALC********************//////
function calculate(req, res) {
	const lb = Number(request.query.lb);
	const oz = Number(request.query.oz);
	const type = request.query.type;
	const weight = (Number(request.query.lb) + Number(request.query.oz));

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
			var express = require("express");

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

//////////********week 9 PROVE code POSTSL CALC*********/////////////
			app.get("/calculateShipping", calculate);
			console.log("ok the code is working so far");


			function calculate(req, res) {
				const lb = Number(request.query.lb);
				const oz = Number(request.query.oz);
				const type = request.query.type;
				//const weight = (Number(request.query.lb) + Number(request.query.oz));

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
						if ((request.query.lb)+(request.query.oz)) <= 1) {
							result = 0.55;
						} else if ((lb + oz) <= 2) {
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
						price = 2.0;
						break;
					case "First Class Envelope: Large Flat":
						price = 3.0;
						break;
					case "default":
						price = 4.0;
				}
				const params = {
					lb: lb,
					oz: oz,
					type: type,
					price: price
				};
				response.render("postal/results", params);
			}






			price = 1.0;
			break;
		case "First Class Letter: Metered":
			price = 2.0;
			break;
		case "First Class Envelope: Large Flat":
			price = 3.0;
			break;
		case "default":
			price = 4.0;
	}
	const params = {
		lb: lb,
		oz: oz,
		type: type,
		price: price
	};
	response.render("postal/results", params);
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
