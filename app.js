let mainContainer = d3.select("#mainContainer");

const SVG_WIDTH = 500;
const SVG_HEIGHT = 300;

// Initialize SVG container

mainContainer.select('svg')
    .attr('width', SVG_WIDTH)
    .attr('height', SVG_HEIGHT);

const BPM = 120;
const updateInterval = 60 / BPM * 1000;
setInterval(() => {
    let data = [];
    const MAX_RADIUS = 50;
    const PADDING = 100;
    data[0] = Math.random() * MAX_RADIUS;
    data[1] = Math.random() * MAX_RADIUS;
    data[2] = Math.random() * MAX_RADIUS;
    let generateScaledColor = d3.scaleSequential(d3.interpolateMagma).domain([0, MAX_RADIUS]);
    let svg_container = d3.select('svg');

    console.log("Trying  to update circle:");

    svg_container.selectAll('circle')
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
                .attr('fill', 'purple');
        })
        .exit()
        .remove()
}, updateInterval);