

const FRAME_WIDTH = 500;
const FRAME_HEIGHT = 500;
const MARGINS = {top: 50, bottom: 50, left: 50, right: 50};
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right;
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;


const FRAME1 = d3.select("#vis1")
    .append("svg")
        .attr("height", FRAME_HEIGHT)
        .attr("width", FRAME_WIDTH)
        .attr("class", "frame");

function build_plot() {
    d3.csv("data/scatter-data.csv").then((data) => {

        console.log(data);

        const MAX_X = d3.max(data, (d) => {
                                    return parseInt(d.x)
                                });

        const X_SCALE = d3.scaleLinear()
                            .domain([0, MAX_X + 1])
                            .range([0, VIS_WIDTH]);

        const MAX_Y = d3.max(data, (d) => {
            return parseInt(d.y)
        });

        const Y_SCALE = d3.scaleLinear()
                            .domain([0, MAX_Y + 1])
                            .range([VIS_WIDTH, 0]);


        let points = FRAME1.selectAll("points")
                .data(data)
                .enter()
                .append("circle")
                    .attr("cx", (d) => {return (X_SCALE(d.x) + MARGINS.left)})
                    .attr("cy", (d) => {return (Y_SCALE(d.y) + MARGINS.bottom)})
                    .attr("r", 10)
                    .attr("class", "point");

        FRAME1.append("g")
                .attr("transform", "translate(" + MARGINS.left + "," + (VIS_HEIGHT + MARGINS.top) +")")
                .call(d3.axisBottom(X_SCALE).ticks(5))
                    .attr("font-size", 12);

        FRAME1.append("g")
                .attr("transform", `translate( ${MARGINS.bottom}, ${MARGINS.left})`)
                .call(d3.axisLeft(Y_SCALE).ticks(5))
                    .attr("font-size", 12);

        
        // mouseover
        points.on("mouseover", function(d) {
            d3.select(this)
              .attr("fill" , "yellow")
          })
          
        points.on("mouseout", function(d) {
            d3.select(this)
              .attr("fill" , "black")
          })

    });
}
build_plot()
