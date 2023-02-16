// set constants
const FRAME_HEIGHT = 200;
const FRAME_WIDTH = 500;
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};

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

		// const MAX_Y = d3.max(data, (d) => {return d.y;});


		// const Y_SCALE = d3.scaleLinear()
		// 					.domain([0, (MAX_Y)])
		// 					.range([VIS_HEIGHT, 0]);


		// const MAX_X = d3.max(data, (d) => {return d;});

		// const X_SCALE = d3.scaleLinear()
		// 					.domain([0, (MAX_X)])
		// 					.range([0, VIS_WIDTH]);
		// plot
		FRAME1.selectAll("circle")
			.data(data)
			// loop through all the rows
			.enter()
			// for each row, append a circle 
			.append("circle")
				.attr("cx", (d) => {return d.x})
				.attr("cy", (d) => {return d.y})
				.attr("r", 10)
				.attr("fill", (d) => {return d.color});

		// add an axis
		// g is used for a placeholder
		FRAME1.append("g")
				// attribute transform - moves horizontal and vertically
				.attr("transform", 
					// how far to translate horizontal (move over past the left margin) and vertical move past viz heights plus the margin
					"translate(" + MARGINS.left + "," + (VIS_HEIGHT + MARGINS.top) + ")")
				// call the axisBottom function and make an axis for the x_scale function and make 4 ticks
				.call(d3.axisBottom(d.x).ticks(4))
					// technically not in-line but you can also give it a class and style it in css
					.attr("font-size", "20px");

	});

}

scatterPlot();