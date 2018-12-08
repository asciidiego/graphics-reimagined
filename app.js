let mainContainer = d3.select("#mainContainer");

const SVG_WIDTH = 500;
const SVG_HEIGHT = 300;

// Initialize SVG container

mainContainer.select('svg')
    .attr('width', SVG_WIDTH)
    .attr('height', SVG_HEIGHT);

setInterval(() => {
    let random_radius = Math.random() * 100;
    let svg_container = mainContainer.select('svg');
    let mainCircle = svg_container.selectAll('circle');
    if (mainCircle.empty()) {
        mainCircle.data([random_radius])
            .enter()
            .append('circle')
            .attr('cx', random_radius)
            .attr('cy', random_radius)
            .attr('r', random_radius)
            .attr('fill', 'purple')
            .merge(svg_container)
    } else {
        console.log("Trying to update circle.");
        mainCircle.data([random_radius])
        .each(function (datum) {
            let node = d3.select(this);
            node.transition().attr('r', random_radius)
        })
    }

    svg_container.exit().remove();
}, 500);