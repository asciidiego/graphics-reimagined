let mainContainer = d3.select("#mainContainer");

const SVG_WIDTH = Math.max(500, innerWidth);
const SVG_HEIGHT = Math.max(300, innerHeight);

// Useful variables
const BPM = 120;
const updateInterval = 60 / BPM * 1000;

// Initialize SVG container
let svg = mainContainer
    .append('svg')
    .attr('width', SVG_WIDTH)
    .attr('height', SVG_HEIGHT);


// >> Particles
let particles_group = svg.append('g');
particles_group.append("rect")
    .attr("width", SVG_WIDTH)
    .attr("height", SVG_HEIGHT)
    .on("ontouchstart" in document ? "touchmove" : "mousemove", particle);

function particle() {
    let i = 0;
    var m = d3.mouse(this);

    particles_group.insert("circle", "rect")
    .attr("fill", "none")
        .attr("cx", m[0])
        .attr("cy", m[1])
        .attr("r", 1e-6)
        .style("stroke", d3.hsl((i = (i + 1) % 360), 1, .5))
        .style("stroke-opacity", 1)
        .transition()
        .duration(2000)
        .ease(Math.sqrt)
        .attr("r", 100)
        .style("stroke-opacity", 1e-6)
        .remove();

    d3.event.preventDefault();
}
// << End of particles


// Intervalic Circles
let intervalic_circles = svg.append('g');
setInterval(() => {
    let data = [];
    const MAX_RADIUS = 50;
    const PADDING = 100;
    data[0] = Math.random() * MAX_RADIUS;
    data[1] = Math.random() * MAX_RADIUS;
    data[2] = Math.random() * MAX_RADIUS;
    let generateScaledColor = d3.scaleSequential(d3.interpolateMagma).domain([0, MAX_RADIUS]);

    console.log("Trying  to update circle:");

    intervalic_circles.selectAll('circle')
        .each(function (datum, index) {
            let node = d3.select(this);
            generateScaledColor;
            node.transition()
                .attr('r', datum)
                .attr('fill', generateScaledColor(datum));
        })
        .data(data)
        .enter()
        .append('circle')
        .each(function (datum, index) {
            console.log(`[${index}] Radius: ${Math.round(datum)}`)
            let node = d3.select(this);
            node.attr('cx', (index) / data.length * (SVG_WIDTH - PADDING) + PADDING)
                .attr('cy', SVG_HEIGHT / 2)
                .attr('r', datum)
                .attr('fill', generateScaledColor(datum));
        })
        .exit()
        .remove()
}, updateInterval);