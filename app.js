let mainContainer = d3.select("#mainContainer");

mainContainer.selectAll('div')
    .exit().remove()
    .data([4, 8, 15, 16, 23, 42])
    .enter().append("div")
    .html((d) => {
        return "<b>D3 String</b>: Element number: " + d + "!";
    });