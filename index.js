var socket = new WebSocket("ws://192.168.2.75:1111");
var g_open_time = "4:00";
var g_close_time = "22:00"

socket.onopen = function(e) {
	socket.send("JOIN ");
}

socket.onmessage = function(event) {
	let category = event.data.slice(0,4);
	let data = event.data.slice(4);

	if (category == "DATA") {
		let raw_data = data.split(";");
		let opened = raw_data[0];
		let open_time = raw_data[1];
		let close_time = raw_data[2];

		let open_message = "closed";
		let open_message2 = "open";
		let colour = "#00FA9A";
		if (opened === "True") {
			open_message = "opened";
			open_message2 = "close";
			colour = "#ffaaaa"
		}

		g_open_time = open_time;
		g_close_time = close_time;

		console.log(colour);

		document.getElementById("opened").innerHTML = "The cat bowl is currently " + open_message + ".";
		document.getElementById("open-time").innerHTML = "The current opening time is " + open_time + ".";
		document.getElementById("close-time").innerHTML = "The current closing time is " + close_time + ".";
		document.getElementById("open-button").innerHTML = open_message2.toUpperCase() + " BOWL";
		document.getElementById("open-button").style.background = colour;

	}
}

socket.onclose = function(event) {
	console.log("rip the server died lol");
}

socket.onerror = function(error) {
	alert('[Error] Could not connect to the server. Please try again later.');
}

function testing() {
	console.log("sent message");
	socket.send("TOGL");
}

function updatetime() {
	let input_close_time = document.getElementById("input-close-time").value;
	let input_open_time = document.getElementById("input-open-time").value;

	document.getElementById("input-close-time").value = "";
	document.getElementById("input-open-time").value = "";

	if (input_close_time.length === 0) {
		input_close_time = g_close_time;
	}
	if (input_open_time.length === 0) {
		input_open_time = g_open_time;
	}

	socket.send("TIME" + input_open_time + ";" + input_close_time);
}


function reset() {
	socket.send("RSET");
}
