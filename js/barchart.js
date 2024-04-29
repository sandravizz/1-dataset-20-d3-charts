// --------------------------------------
//  Canvas
// --------------------------------------

const svg5 = d3.select("#chart5")
  .append("svg")
    .attr("viewBox", [0, 0, width, height]);

const innerChart5 = svg5
  .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// --------------------------------------
// Legend
// --------------------------------------

let Legend = svg5
    .append("g")
    .attr("class", "legend")
		.attr("transform", "translate(0,11)");

    Legend
    .append("rect")
		.attr("x", 0)
		.attr("y", 0)
		.attr("width", "10px")
		.attr("height", "10px")
    .attr("fill", "#05C7F2") ; 

    Legend
    .append("text")
		.attr("x", 15)
		.attr("y", 9)
    .text("> the average") 
    .attr("fill", "white")
    .attr("class", "chart_text"); 

// --------------------------------------
// Data 
// --------------------------------------

const data = d3.csv("../data/country_score.csv", d3.autoType)
            .then(function(data){ 
                
// --------------------------------------
// Tooltip 
// --------------------------------------

const tooltip = d3.tip()
                .attr("class", "tooltip")
                .html((event, d) => `<div> <b>${(d.country)}</b> <br>Home score ${format(d.home_score)}</br> </div>`)

svg5.call(tooltip); 

// --------------------------------------
// Scales
// --------------------------------------

let x = d3.scaleLinear()
        .domain([0, 3])
        .range([0, innerwidth]);

// --------------------------------------
// Bars
// --------------------------------------

innerChart5
    .selectAll(".bars")
    .data(data)
    .join("rect")
    .attr("class", "bars")
    .attr("x", margin.left)
    .attr("y", (d, i) => 40 + i * 20)
    .attr("width", 0)
    .attr("height", 20)
    .attr("fill", "#05C7F2") 
    .attr("opacity",d => d.home_score > d3.mean(data, (d) => d.home_score).toFixed(2) ? 1 : 0.3)   
    .attr("class", "bars")
    .on("mouseover", tooltip.show)
    .on("mouseout", tooltip.hide)
    .transition()
    .duration(500)
    .attr("width", (d) => x(d.home_score));

// --------------------------------------
// Text
// --------------------------------------

innerChart5
    .append("g")
    .selectAll(".text")
    .data(data)
    .join("text")
    .attr("class", "text")
    .attr("x", margin.left)
    .attr("y", (d, i) => 40 + i * 20)
    .attr("fill", d => d.home_score > d3.mean(data, (d) => d.home_score).toFixed(2) ? "black" : "white") 
    .attr("dy", 13)
    .attr("dx", 4)
    .text((d) => (d.country))
    .attr("class", "text")
    .on("mouseover", tooltip.show)
    .on("mouseout", tooltip.hide);  

});