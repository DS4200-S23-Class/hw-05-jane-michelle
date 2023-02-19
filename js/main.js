// set constants
const FRAME_HEIGHT = 600;
const FRAME_WIDTH = 600;
const MARGINS = {left: 75, right: 75, top: 75, bottom: 75};

const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.bottom;

const FRAME1 = d3.select("#vis1")
				.append("svg")
					.attr("height", FRAME_HEIGHT)
					.attr("width", FRAME_WIDTH)
					.attr("class", "frame");

function scatterPlot() {
	// reading from scatter plot file
	d3.csv("data/scatter-data.csv").then((data) => {

		// Find max of y 
		const MAX_Y = d3.max(data, (d) => {
			return parseInt(d.y)
		}) 

		// Scale function for y 
		const Y_SCALE = d3.scaleLinear()
							.domain([0, (MAX_Y)])
							.range([VIS_HEIGHT, 0]);

		// Find max of x 
		const MAX_X = d3.max(data, (d) => {
			return parseInt(d.x)
		});

		// Scale function for x
		const X_SCALE = d3.scaleLinear()
							.domain([0, (MAX_X)])
							.range([0, VIS_WIDTH]);

		// Title
        FRAME1.append("text")
	        .attr("x", MARGINS.left + VIS_WIDTH/2)
	        .attr("y", MARGINS.top - 25)
	        .attr('text-anchor', "middle")
	        .style("font-size", 18)
	        .text("Scatter Plot");
        
        // X label
        FRAME1.append("text")
	        .attr("x", MARGINS.left + VIS_WIDTH/2)
	        .attr("y", VIS_HEIGHT + 125)
	        .attr("text-anchor", "middle")
	        .style("font-size", 12)
	        .text("x");
        
        // Y label
        FRAME1.append("text")
	        .attr("text-anchor", "middle")
	        .attr("x", MARGINS.left - 50)
	        .attr("y", VIS_HEIGHT - 100)
	        .style("font-size", 12)
	        .text("y");

	    // Add tick marks for x axis
		FRAME1.append("g")
			.attr("transform", 
				"translate(" + MARGINS.left + "," + (VIS_HEIGHT + MARGINS.top) + ")")
			.call(d3.axisBottom(X_SCALE).ticks(9))
				.attr("font-size", "10px");


		// Add tick marks for y axis 
		FRAME1.append("g")
			.attr("transform", 
				"translate(" + MARGINS.left + "," + (MARGINS.bottom) + ")")
			.call(d3.axisLeft(Y_SCALE).ticks(9))
				.attr("font-size", "10px");

		// Plot scatter plot
        FRAME1.append("g")
	        .selectAll("dot")
	        .data(data)
	        .enter()
	        .append("circle")
	        .attr("cx", (d) => {return X_SCALE(d.x) + MARGINS.left;})
			.attr("cy", (d) => {return Y_SCALE(d.y) + MARGINS.top;})
	        .attr("r", 10)
	        .style("fill", "#CC0000")
	        .attr("class", "point")
	        .attr("stroke", "none");

	    // Mouseover
		function handleMouseover(event, d) {
			d3.select(this).style("fill", "#00c");
		}

		// Mouseleave
		function handleMouseleave(event, d) {
			d3.select(this).style("fill", "#CC0000");
		}

		// Add border to points if it is not there and remove border if it is there and show coordinate of point
		function onClick(event, d) {
			// if there is border, remove border and show coordinates
			if (d3.select(this).attr("stroke") !== "none") {
		        d3.select(this).attr("stroke", "none")
		        d3.select(this).attr("stroke-width", "5")
		        d3.select("#showPoint").text("Last Point Clicked: (" + d["x"] + "," + d["y"] + ")")

		    // Otherwise, show border and coordinates
		    } else {
		        d3.select(this).attr("stroke", "black")
		       	d3.select(this).attr("stroke-width", "5")

		       	d3.select("#showPoint").text("Last Point Clicked: (" + d["x"] + "," + d["y"] + ")");

		    };
		}



		// Add event listeners to the points for mouseover, mouseleave, and onclick
		FRAME1.selectAll(".point")
				.on("mouseover", handleMouseover)
				.on("mouseleave", handleMouseleave)
				.on("click", onClick); 
	});
}
scatterPlot();

const FRAME2 = d3.select("#vis2")
				.append("svg")
					.attr("height", FRAME_HEIGHT)
					.attr("width", FRAME_WIDTH)
					.attr("class", "frame");

function barChart() {
	// reading from the bar chart file
	d3.csv("data/bar-data.csv").then((data) => {

		// Title
        FRAME2.append("text")
	        .attr("x", MARGINS.left + VIS_WIDTH/2)
	        .attr("y", MARGINS.top - 25)
	        .attr('text-anchor', "middle")
	        .style("font-size", 18)
	        .text("Bar Chart");
        
        // X label
        FRAME2.append("text")
	        .attr("x", MARGINS.left + VIS_WIDTH/2)
	        .attr("y", VIS_HEIGHT + 125)
	        .attr("text-anchor", "middle")
	        .style("font-size", 12)
	        .text("category");
        
        // Y label
        FRAME2.append("text")
	        .attr("text-anchor", "middle")
	        .attr("x", MARGINS.left - 50)
	        .attr("y", VIS_HEIGHT - 200)
	        .style("font-size", 12)
	        .text("amount");

	     // Add X axis
		const x = d3.scaleBand()
	  		.range([ 0, VIS_WIDTH ])
			  .domain(data.map(function(d) { return d.category;}))
			  .padding(0.2);
		FRAME2.append("g")
			.attr("transform", "translate(" + MARGINS.left + ", " + (VIS_HEIGHT + MARGINS.top) + ")")


		  .call(d3.axisBottom(x))
		  .selectAll("text")
		    .attr("transform", "translate(-10,0)rotate(-45)")
		    .style("text-anchor", "end");

		// Find max of y 
		const MAX_Y = d3.max(data, (d) => {
			return parseInt(d.amount)
		}) 

		// Add Y axis
		const y = d3.scaleLinear()
		  .domain([0, (MAX_Y)])
		  .range([ VIS_HEIGHT, 0]);
		FRAME2.append("g")
			.attr("transform", 
					"translate(" + MARGINS.left + "," + (MARGINS.bottom) + ")")
		  .call(d3.axisLeft(y).ticks(6))
		  	.attr("font-size", "10px");

		// Bars
		FRAME2.selectAll("mybar")
		  .data(data)
		  .enter()
		  .append("rect")
		    .attr("x", function(d) { return x(d.category) + MARGINS.left; })
		    .attr("y", function(d) { return y(d.amount) + MARGINS.bottom; })
		    .attr("width", x.bandwidth())
		    .attr("height", function(d) { return VIS_HEIGHT - y(d.amount); })
		    .attr("fill", "#69b3a2")
		    .attr("class", "bar");

		// create a tooltip
		const TOOLTIP = d3.select("#vis3")
			.append("div")
			.attr("class", "tooltip")
			// make it non visible at first
			.style("opacity", 0);

		// Mouseover
		function barHover(event, d) {
			d3.select(this).style("fill", "#00c");
			TOOLTIP.style("opacity", 1);
		}

		// Mouseleave
		function barLeave(event, d) {
			d3.select(this).style("fill", "#69b3a2");
			TOOLTIP.style("opacity", 0);
		}

		// mousemove - fill in information on the tooltip
		function barMove(event, d) {
			// set html on the tooltip
			TOOLTIP.html("Category:" + d.category + "<br>Value: " + d.amount)
					// where we want to tooltip positioned - should be relative to the event
					// where the event occurred based on x and y pixels
					.style("left", (event.pageX) + "px")
					.style("top", (event.pageY) + "px");
		}

		// Add event listeners to the points for mouseover, mouseleave, and mousemove
		FRAME2.selectAll(".bar")
				.on("mouseover", barHover)
				.on("mouseleave", barLeave)
				.on("mousemove", barMove)

	});
}
barChart();


// set x value for coordinate once selected value from options
function setXValue() {
	let x_coord = document.getElementById("x_coord").value;
}

// set y value for coordinate once selected value from options
function setYValue() {
	let y_coord = document.getElementById("y_coord").value;
}

