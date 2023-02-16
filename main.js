// set constants
const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 500;
const MARGINS = {left: 75, right: 75, top: 75, bottom: 75};

const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.bottom;

const FRAME1 = d3.select("#column1")
				.append("svg")
					.attr("height", FRAME_HEIGHT)
					.attr("width", FRAME_WIDTH)
					.attr("class", "frame");

function scatterPlot() {
	// reading from scatter plot file
	d3.csv("data/scatter-data.csv").then((data) => {

		const MAX_Y = d3.max(data, (d) => {
			return parseInt(d.y)
		}) 

		const Y_SCALE = d3.scaleLinear()
							.domain([0, (MAX_Y)])
							.range([VIS_HEIGHT, 0]);

		const MAX_X = d3.max(data, (d) => {
			return parseInt(d.x)
		});

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
	        .attr("r", 4)
	        .style("fill", "#CC0000")
	        .attr("class", "point");

	    // Mouseover
		function handleMouseover(event, d) {
			d3.select(this).style("fill", "#00c");
		}

		// Mouseleave
		function handleMouseleave(event, d) {
			d3.select(this).style("fill", "#CC0000");
		}

		// Add border to points if it is not there and remove border if it is there
		function onClick(event, d) {
			if (d3.select(this).attr("stroke") !== "none") {
		        d3.select(this).attr("stroke", "none"); 
		    // Otherwise, show it 
		    } else {
		        d3.select(this).attr("stroke", "black"); 
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