// Set constants for frame and vis dimensions (height and width) and margins
const FRAME_HEIGHT = 700;
const FRAME_WIDTH = 700;
const MARGINS = {left: 75, right: 75, top: 75, bottom: 75};
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.bottom;

// Create frame1
const FRAME1 = d3.select("#vis1")
				.append("svg")
					.attr("height", FRAME_HEIGHT)
					.attr("width", FRAME_WIDTH)
					.attr("class", "frame");

// Function that creates a scatter plot with different possible interactions
function scatterPlot() {
	// Reading from scatter plot file
	d3.csv("data/scatter-data.csv").then((data) => {

		// Find max of y 
		const MAX_Y = d3.max(data, (d) => {
			return parseInt(d.y);
		}); 

		// Scale function for y 
		const Y_SCALE = d3.scaleLinear()
							.domain([0, (MAX_Y)])
							.range([VIS_HEIGHT, 0]);

		// Find max of x 
		const MAX_X = d3.max(data, (d) => {
			return parseInt(d.x);
		});

		// Scale function for x
		const X_SCALE = d3.scaleLinear()
							.domain([0, (MAX_X)])
							.range([0, VIS_WIDTH]);

		// Title the scatter plot
        FRAME1.append("text")
	        .attr("x", MARGINS.left + VIS_WIDTH/2)
	        .attr("y", MARGINS.top - 25)
	        .attr('text-anchor', "middle")
	        .style("font-size", "18px")
	        .text("Scatter Plot");
        
        // Label the x axis
        FRAME1.append("text")
	        .attr("x", MARGINS.left + VIS_WIDTH/2)
	        .attr("y", FRAME_HEIGHT)
	        .attr("text-anchor", "middle")
	        .style("font-size", "12px")
	        .text("x");
        
        // Label the y axis
        FRAME1.append("text")
	        .attr("text-anchor", "middle")
	        .attr("x", MARGINS.left - 50)
	        .attr("y", VIS_HEIGHT - 200)
	        .style("font-size", "12px")
	        .text("y");

	    // Add tick marks for x axis
		FRAME1.append("g")
			.attr("transform", 
				"translate(" + MARGINS.left + "," + (VIS_HEIGHT + MARGINS.bottom) + ")")
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
	        // Loop through all the data from the dataset and append them as a circle
	        .data(data)
	        .enter()
	        .append("circle")
	        .attr("cx", (d) => { return X_SCALE(d.x) + MARGINS.left; })
			.attr("cy", (d) => { return Y_SCALE(d.y) + MARGINS.top; })
	        .attr("r", 10)
	        .style("fill", "#CC0000")
	        .attr("stroke", "none")
	        .attr("class", "point")
	        .attr("id", (d) => { return '(' + d.x + ', ' + d.y + ')'; });

	
	    // Function that changes color of dots when moused over 
		function handleMouseover(event, d) {
			d3.select(this).style("fill", "#00c");
		}

		// Function that changes color of dots when mouse leaves 
		function handleMouseleave(event, d) {
			d3.select(this).style("fill", "#CC0000");
		}

		// Function that adds a border to points if it is not there and removes border if it is there
		// Also shows coordinates of last clicked points
		function onClick(event, d) {
			// If there is border, remove border and show coordinates
			if (d3.select(this).attr("stroke") !== "none") {
		        d3.select(this).attr("stroke", "none");
		        d3.select(this).attr("stroke-width", "5");

			    // Otherwise, show border and coordinates
			    } else {
			        d3.select(this).attr("stroke", "#000000");
			       	d3.select(this).attr("stroke-width", "5");
				    };

				// Show coordinates of last point clicked based on the id attribute
			    let point = this.getAttribute("id");
			    let newText = "Last Point Clicked: " + point;
			    document.getElementById("showPoint").innerHTML = newText;
				}

		// Add event listeners to the points for mouseover, mouseleave, and onclick
		FRAME1.selectAll(".point")
				.on("mouseover", handleMouseover)
				.on("mouseleave", handleMouseleave)
				.on("click", onClick); 

		// Function adds new points (based on user choices) to the scatter plot
		function addPoint() {
		    // Set the x and y coordinate values for new point
			let x_coord = Number(document.getElementById("x_coord").value);
			let y_coord = Number(document.getElementById("y_coord").value);
			
			// Add point to scatterplot
		    FRAME1.append("g")
		    	.append("circle")
			   		.attr("cx", X_SCALE(x_coord) + MARGINS.left)
					.attr("cy", Y_SCALE(y_coord) + MARGINS.top)
			        .attr("r", 10)
			        .style("fill", "#CC0000")
			        .attr("stroke", "none")
					.attr("class", "point")
					.attr("id", '(' + x_coord + ', ' + y_coord + ')');

			// Add event listeners to the points for mouseover, mouseleave, and onclick
			FRAME1.selectAll(".point")
					.on("mouseover", handleMouseover)
					.on("mouseleave", handleMouseleave)
					.on("click", onClick); 
		}
		// Add event handler to add point button in order to execute the addPoint function
		document.getElementById("subButton").addEventListener("click", addPoint);
	});
}
// Call the scatter plot function to plot it with all the given interactions available (mouseover, mouseleave, onclick)
scatterPlot();

// Create frame2
const FRAME2 = d3.select("#vis2")
				.append("svg")
					.attr("height", FRAME_HEIGHT)
					.attr("width", FRAME_WIDTH)
					.attr("class", "frame");

// Function that plots a bar chart with tooltip 
function barChart() {
	// Reading from the bar chart file
	d3.csv("data/bar-data.csv").then((data) => {

		// Title
        FRAME2.append("text")
	        .attr("x", MARGINS.left + VIS_WIDTH/2)
	        .attr("y", MARGINS.top - 25)
	        .attr('text-anchor', "middle")
	        .style("font-size", "18px")
	        .text("Bar Chart");
        
        // Label the x axis
        FRAME2.append("text")
	        .attr("x", MARGINS.left + VIS_WIDTH/2)
	        .attr("y", VIS_HEIGHT + 125)
	        .attr("text-anchor", "middle")
	        .style("font-size", "12px")
	        .text("category");
        
        // Label the y axis 
        FRAME2.append("text")
	        .attr("text-anchor", "middle")
	        .attr("x", MARGINS.left - 50)
	        .attr("y", VIS_HEIGHT - 200)
	        .style("font-size", "12px")
	        .text("amount");

	    // Add X axis and x ticks 
		const x = d3.scaleBand()
	  		.range([0, VIS_WIDTH])
			.domain(data.map((d) => { return d.category; }))
			.padding(0.2);
		FRAME2.append("g")
			.attr("transform", "translate(" + MARGINS.left + ", " + (VIS_HEIGHT + MARGINS.top) + ")")
		  	.call(d3.axisBottom(x))
		  	.selectAll("text")
		    .attr("transform", "translate(-10,0)rotate(-45)")
		    .style("text-anchor", "end");

		// Find max of y 
		const MAX_Y = d3.max(data, (d) => {
			return parseInt(d.amount);
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

		// Plot barchart
		FRAME2.selectAll("bars")
			// Loop through all the data from the dataset and append them as rectangles
		  	.data(data)
		  	.enter()
		  	.append("rect")
		    	.attr("x", (d) => { return x(d.category) + MARGINS.left; })
		    	.attr("y", (d) => { return y(d.amount) + MARGINS.bottom; })
			    .attr("width", x.bandwidth())
			    .attr("height", (d) => { return VIS_HEIGHT - y(d.amount); })
			    .attr("fill", "#CC0000")
			    .attr("class", "bar");

		// Create a tooltip
		const TOOLTIP = d3.select("#vis3")
			.append("div")
				// Make it non visible at first
				.style("opacity", 0)
				.attr("class", "tooltip");

		// Mouseover
		function barHover(event, d) {
			d3.select(this).style("fill", "#00c");
			TOOLTIP.style("opacity", 1);
		}

		// Mouseleave
		function barLeave(event, d) {
			d3.select(this).style("fill", "#CC0000");
			TOOLTIP.style("opacity", 0);
		}

		// mousemove - fill in information on the tooltip
		function barMove(event, d) {
			// set html on the tooltip
			TOOLTIP.html("Category:" + d.category + "<br>Value: " + d.amount)
					// Tooltip position relative to the event
					.style("left", (event.pageX) + "px")
					.style("top", (event.pageY) + "px");
		}

		// Add event listeners to the points for mouseover, mouseleave, and mousemove
		FRAME2.selectAll(".bar")
			.on("mouseover", barHover)
			.on("mouseleave", barLeave)
			.on("mousemove", barMove);

	});
}
// Call the bar chart function to plot it along with tooltip providing more information
barChart();