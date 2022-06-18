function universityWideView() {
	document.getElementById("timeline_day_view").innerHTML = "";
	document.getElementById("removeme").classList.remove("remove");
	document.getElementById("addtablehere").innerHTML = "";
	document.getElementById("timeline_venue_view").innerHTML = "";
	document
		.getElementById("university_wide_view")
		.classList.replace("not_active", "active");
	document
		.getElementById("particular_day_view")
		.classList.replace("active", "not_active");
	document
		.getElementById("particular_venue_view")
		.classList.replace("active", "not_active");

	fetch("./test.json")
		.then((res) => res.json())
		.then((res) => makeView(res));
	function makeView(res) {
		var comA = res.venue;
		var newArr = [];
		for (let obj of comA) {
			const newA = Object.values(obj);
			newArr.push([
				newA[1].institution_name,
				newA[1].name,
				newA[1].open_time,
				newA[1].capacity,
				newA[3],
			]);
		}
		console.log(newArr);
		let tbody = document.getElementById("addtablehere");
		for (let arr of newArr) {
			let trbody = document.createElement("tr");
			tbody.appendChild(trbody);
			for (let i = 0; i < arr.length; i++) {
				if (i === 4) {
					let td = document.createElement("td");
					let span = document.createElement("span");
					let spanoutter = document.createElement("span");
					let spaninner = document.createElement("span");
					spaninner.className = "tooltiptextone";
					spanoutter.className = "two";
					td.setAttribute("style", "width:40%");
					span.setAttribute("class", "one tooltipone");
					let text = document.createTextNode(arr[i] + "%" + " Utilised");
					spaninner.appendChild(text);
					span.appendChild(spaninner);
					span.setAttribute("style", "width:" + Number(arr[i]) + "%");
					spanoutter.appendChild(span);
					td.appendChild(spanoutter);
					trbody.appendChild(td);
					break;
				}
				let tdbody = document.createElement("td"); // create td element
				let tdDatabody = document.createTextNode(arr[i]); // create text node
				tdbody.appendChild(tdDatabody); // add text to td
				trbody.appendChild(tdbody); // add td to tr
			}
		}
	}
}
function particularDayView() {
	document.getElementById("removeme").classList.add("remove");
	document.getElementById("timeline_day_view").innerHTML = "";
	document.getElementById("timeline_venue_view").innerHTML = "";
	document
		.getElementById("university_wide_view")
		.classList.replace("active", "not_active");
	document
		.getElementById("particular_day_view")
		.classList.replace("not_active", "active");
	document
		.getElementById("particular_venue_view")
		.classList.replace("active", "not_active");

	// DOM element where the Timeline will be attached
	var container = document.getElementById("timeline_day_view");
	var obj;
	// fetching of json and passing it though a function
	fetch("./test.json")
		.then((res) => res.json())
		.then((resdata) => createTimeline(resdata));

	// the function that will create Timeline
	function createTimeline(DataHere) {
		var DataSetItem = [];
		for (let obj of DataHere.venue) {
			for (let newobj of obj.available_blocks) {
				console.log(newobj);
				let availableData = {
					group: obj.venue.id,
					content: obj.institution_name,
					start: newobj.from_time,
					end: newobj.to_time,
					style:
						"background-color:rgba(235, 92, 97, 0.1); border:none;height:100%",
					title: "<h6>" + newobj.from_time + "-" + newobj.to_time + "</h6>",
				};
				DataSetItem.push(availableData);
			}
		}
		for (let obj of DataHere.venue) {
			console.log(obj);
			for (let newobj of obj.used_blocks) {
				console.log(newobj);
				let availableData = {
					group: obj.venue.id,
					start: newobj.from_time,
					end: newobj.to_time,
					title: "<h6>" + newobj.from_time + " - " + newobj.to_time + "</h6>",
					style: "background-color:#EB5C61; border:none;height:100%",
				};
				console.log(availableData);
				DataSetItem.push(availableData);
			}
		}

		//putting new DataSetItem creating new items

		var items = new vis.DataSet(DataSetItem);
		var DataSetGroup = [
			{
				id: 1,
				content: "nothing nothing<br/>nothing<br/> nothing",
				title: "nothing<br/>nothing",
				style: "color:white",
			},
		];
		for (let obj of DataHere.venue) {
			let newData = {
				id: obj.venue.id,
				content:
					"<h4>" +
					obj.venue.name +
					" " +
					"<br/>" +
					obj.utilization_percentage +
					" %" +
					"</h4>",
				title: obj.venue_name,
				style: "color:#171D35",
			};
			DataSetGroup.push(newData);
		}
		//putting new DataSetGroup creating new items
		var groups = new vis.DataSet(DataSetGroup);
		// timeline customization options
		var options = {
			width: "100%",
			stack: false,
			showNested: true,
			timeAxis: { scale: "minute", step: 60 },

			tooltip: {
				followMouse: true,
				delay: 0,
			},
			zoomable: false,
			moveable: false,
			orientation: "top",
			margin: {
				item: 0, // minimal margin between items
				axis: 0, // minimal margin between items and the axis
			},
		};

		var timeline = new vis.Timeline(container, items, groups, options);
	}
}
function particularVenueView() {
	document.getElementById("removeme").classList.add("remove");
	document.getElementById("timeline_day_view").innerHTML = "";
	document.getElementById("timeline_venue_view").innerHTML = "";
	document
		.getElementById("university_wide_view")
		.classList.replace("active", "not_active");
	document
		.getElementById("particular_day_view")
		.classList.replace("active", "not_active");
	document
		.getElementById("particular_venue_view")
		.classList.replace("not_active", "active");
	// DOM element where the Timeline will be attached
	var container = document.getElementById("timeline_venue_view");
	var obj;
	// fetching of json and passing it though a function
	fetch("./test.json")
		.then((res) => res.json())
		.then((resdata) => createTimeline(resdata));

	// the function that will create Timeline
	function createTimeline(DataHere) {
		var DataSetItem = [];
		for (let obj of DataHere.venue) {
			for (let newobj of obj.available_blocks) {
				console.log(newobj);
				let availableData = {
					group: obj.venue.id,
					content: obj.institution_name,
					start: newobj.from_time,
					end: newobj.to_time,
					style:
						"background-color:rgba(235, 92, 97, 0.1); border:none;height:100%",
					title: "<h6>" + newobj.from_time + "-" + newobj.to_time + "</h6>",
				};
				DataSetItem.push(availableData);
			}
		}
		for (let obj of DataHere.venue) {
			console.log(obj);
			for (let newobj of obj.used_blocks) {
				console.log(newobj);
				let availableData = {
					group: obj.venue.id,
					start: newobj.from_time,
					end: newobj.to_time,
					title: "<h6>" + newobj.from_time + " - " + newobj.to_time + "</h6>",
					style: "background-color:#EB5C61; border:none;height:100%",
				};
				console.log(availableData);
				DataSetItem.push(availableData);
			}
		}

		//putting new DataSetItem creating new items

		var items = new vis.DataSet(DataSetItem);
		var DataSetGroup = [
			{
				id: 1,
				content: "nothing nothing<br/>nothing<br/> nothing",
				title: "nothing<br/>nothing",
				style: "color:white",
			},
		];
		for (let obj of DataHere.venue) {
			let newData = {
				id: obj.venue.id,
				content:
					"<h4>" +
					obj.venue.name +
					" " +
					"<br/>" +
					obj.utilization_percentage +
					" %" +
					"</h4>",
				title: obj.venue_name,
				style: "color:#171D35",
			};
			DataSetGroup.push(newData);
		}
		//putting new DataSetGroup creating new items
		var groups = new vis.DataSet(DataSetGroup);
		// timeline customization options
		var options = {
			width: "100%",
			stack: false,
			showNested: true,
			timeAxis: { scale: "minute", step: 60 },

			tooltip: {
				followMouse: true,
				delay: 0,
			},
			zoomable: false,
			moveable: false,
			orientation: "top",
			margin: {
				item: 0, // minimal margin between items
				axis: 0, // minimal margin between items and the axis
			},
		};

		var timeline = new vis.Timeline(container, items, groups, options);
	}
}
