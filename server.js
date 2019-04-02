var express = require("express");
require('dotenv').config();
var path = require('path');
const { Pool, Client } = require('pg');// postgres db connection module
const connectionString = process.env.DATABASE_URL;

// Establish a new connection to the data source specified the connection string.
const pool = new Pool({connectionString: connectionString});

//locahost
var app = express();
const PORT = process.env.PORT || 5000;

//localhost
app.listen(PORT, function () {
	console.log(`Listening on ${ PORT }`)
});

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
	var params = {
		result: getPerson(req.query)
	};
	res.render("pages");
});



//week 10 teach code + familyhistory endpoint callback  (using teacher solution functions)

app.get("/familyhistory", function (req, res) {
	// Controller
	console.log("Received a request for the familyhistory page");
	//var params = {
		//result:getPerson(req.query)
		// return json object person
	};
	res.render("familyhistory");
});

app.get("/services/getPerson, (req, res) => {
        getPerson(req.query.id, res)
        // return json object person
    })

	// This says that we want the function "getPerson" below to handle
	// any requests that come to the /getPerson endpoint
	app.get("/getPerson", getPerson);

	// This function handles requests to the /getPerson endpoint
	// it expects to have an id on the query string, such as: http://localhost:5000/getPerson?id=1
	function getPerson(request, response) {
		// First get the person's id
		const id = request.query.id;

		// TODO: We should really check here for a valid id before continuing on...

		// use a helper function to query the DB, and provide a callback for when it's done
		getPersonFromDb(id, function(error, result) {
			// This is the callback function that will be called when the DB is done.
			// The job here is just to send it back.

			// Make sure we got a row with the person, then prepare JSON to send back
			if (error || result == null || result.length != 1) {
				response.status(500).json({success: false, data: error});
			} else {
				const person = result[0];
				response.status(200).json(person);
			}
		});
	}

	// This function gets a person from the DB.
	// By separating this out from the handler above, we can keep our model
	// logic (this function) separate from our controller logic (the getPerson function)
	function getPersonFromDb(id, callback) {
		console.log("Getting person from DB with id: " + id);

		// Set up the SQL that we will use for our query. Note that we can make
		// use of parameter placeholders just like with PHP's PDO.
		const sql = "SELECT id, first, last, birthdate FROM person WHERE id = $1::int";

		// We now set up an array of all the parameters we will pass to fill the
		// placeholder spots we left in the query.
		const params = [id];

		// This runs the query, and then calls the provided anonymous callback function
		// with the results.
		pool.query(sql, params, function(err, result) {
			// If an error occurred...
			if (err) {
				console.log("Error in query: ")
				console.log(err);
				callback(err, null);
			}

			// Log this to the console for debugging purposes.
			console.log("Found result: " + JSON.stringify(result.rows));

			// When someone else called this function, they supplied the function
			// they wanted called when we were all done. Call that function now
			// and pass it the results.

			// (The first parameter is the error variable, so we will pass null.)
			callback(null, result.rows);
		});

	} // end of getPersonFromDb
//end of week 10 teach code + familyhistory endpoint callback(teacher solution)


//week 9 PROVE callback + code
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
app.get("/calculateShipping", calculate);
	//result: getResults(req.query)
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
	//app.get("/calculateShipping", calculate);
	function calculate(request, response) {
		const lb = Number(request.query.lb);
		const oz = Number(request.query.oz);
		const type = request.query.type;

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
	function getPrice(response, lb, oz, type) {
		var price = 0.0;
		switch (type) {
			case "First Class Letter: Stamped":
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
//end week 9 PROVE callback +  code


//week 8 prove callback + code
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
	//app.get("/math", function (req, res) {
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
//end week 8 prove callback + code


/*/*//*/*//*/*//*//*//*//**//*//*//*//*
/* NOT SURE THE CODE BELOW WORKS OR NOT - FROM TEAM 4 TEACH SESSION
		//code from team 4 teach session: week 10 teach callback + code
		app.get("/person", function (req, res) {
			// Controller
			console.log("Received a request for the person page");
			var params = {
				result: getPerson(req.query)
			};
			res.render("person", params);
		});

		app.get("/services/getPerson", (req, res) => {

			getPerson(req.query.id, res)
				// return json object person
			})
			function callback(data, res) {
				for (var i = 0; i < data.length; i++) {
					console.log(data[i])
				}
			}
			//app.get("/services/getPerson", (req, res)
			function getPerson(id, res) {
				var sql = "SELECT * FROM person_table WHERE person_id=" + id;
				pool.query(sql, function(err, result) {
					if (err) {
						console.log("Error in Query" + err)
					}
					res.writeHead(200, {"Content-type": "application/json"})
					res.write(JSON.stringify(result.rows))
					res.end()
				})
			}
		//end w10 teach callback + code: team 4 teach session 
		*/
