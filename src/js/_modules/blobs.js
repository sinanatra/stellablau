const d3 = require('d3');
const projects = d3.selectAll('.data-category');
let csvData = 'text,category,cluster,url,color\n'

projects._groups[0].forEach(element => {
    csvData += element.innerHTML + ',' + element.dataset.link + ',' + element.dataset.cluster + ',' + element.dataset.url + ',' + element.dataset.color + '\n'
});

const data = d3.csvParse(csvData);
console.log(data);

const Blobs = {
    init: () => {

        let width = window.innerWidth,
            height = window.innerHeight,
            radius = window.innerWidth / 10;

        let m = 0,
            clusters = new Array(m);

        d3.select('.svgContainer').html(null);

        let svg = d3.select('.svgContainer')
            .append('svg')
            .attr('height', height)
            .attr('width', width)
            .attr("viewBox", `0 0 ${width} ${height}`)
            .append('g').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

        let defs = svg.append("defs");
        let filter = defs.append("filter").attr("id", "gooe");

        filter.append("feGaussianBlur")
            .attr("in", "SourceGraphic")
            .attr("stdDeviation", "10")
            .attr("color-interpolation-filters", "sRGB")
            .attr("result", "blur");
        filter.append("feColorMatrix")
            .attr("in", "blur")
            .attr("mode", "matrix")
            .attr("values", "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -10")
            .attr("result", "gooey");
        filter.append('feConvolveMatrix')
            .attr('in', 'gooey')
            .attr('kernelMatrix', [0, -1, 0, -1, 4, -1, 0, -1, 0,].join(" "))
            .attr('order', 5)
            .attr('kernelMatrix', [0, 0, .5, 0, 0, 0, 0, .5, 0, 0, .5, .5, 4, .5, .5, 0, 0, .5, 0, 0, 0, 0, .5, 0, 0,].join(" "))
            .attr('result', 'edges');

        (async () => {
            let datum = await data;
            console.log(datum)
            blobs(datum)
        })();


        function blobs(d) {
            const nodes = d.map((d) => {
                let forcedCluster = +d.cluster;
                d = {
                    cluster: forcedCluster,
                    r: radius,
                    major: d.text,
                    major_cat: d.category,
                    url: d.url,
                    color: d.color
                };

                if (!clusters[forcedCluster]) clusters[forcedCluster] = d;

                return d;
            });

            const circleWrapper = svg.append("g")
                .style("filter", "url(#gooe)");

            const circles = circleWrapper.append('g')
                .datum(nodes)
                .selectAll('.circle')
                .data(d => d)
                .enter().append('a')
                .attr("xlink:href", d => d.url)
                .append('circle')
                .attr('r', (d) => d.r)
                .attr('fill', (d) => d.color)
                .call(drag())

            const texts = svg.append('g')
                .attr('class', 'text')
                .selectAll('text')
                .data(nodes)
                .enter().append('a')
                .attr("xlink:href", d => d.url)
                .append('foreignObject')
                .attr("class", "text-inner")
                .attr('width', '250px')
                .attr('height', '50px')
                .html(d => d.major)
                .call(drag());


            const simulation = d3.forceSimulation(nodes)
                .velocityDecay(0.1)
                .force("x", d3.forceX(d => d.r).strength(.01))
                .force("y", d3.forceY(d => d.r).strength(.01))
                .force("cluster", clustering)
                .on("tick", ticked)
                .force("collide", d3.forceCollide().radius(radius - 20 ).iterations(5))

            function ticked() {
                circles
                    .attr('cx', (d) => d.x)
                    .attr('cy', (d) => d.y);
                texts
                    .attr('x', function (d) { return d.x; })
                    .attr('y', function (d) { return d.y; });
            }

            setInterval(function () { simulation.alphaTarget(1); }, 500);


            function drag() {
                function dragstarted(event) {
                    if (!event.active) simulation.alphaTarget(0.3).restart();
                    event.subject.fx = event.subject.x;
                    event.subject.fy = event.subject.y;
                }

                function dragged(event) {
                    event.subject.fx = event.x;
                    event.subject.fy = event.y;
                }

                function dragended(event) {
                    if (!event.active) simulation.alphaTarget(0);
                    event.subject.fx = null;
                    event.subject.fy = null;
                }

                return d3.drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended);
            }

            function clustering(alpha) {
                nodes.forEach(function (d) {
                    var cluster = clusters[d.cluster];
                    if (cluster === d) return;
                    var x = d.x - cluster.x,
                        y = d.y - cluster.y,
                        l = Math.sqrt(x * x + y * y),
                        r = d.r + cluster.r;
                    if (l !== r) {
                        l = (l - r) / l * alpha;
                        d.x -= x *= l;
                        d.y -= y *= l;
                        cluster.x += x;
                        cluster.y += y;
                    }
                });
            }
        }

    }

    
};

export default Blobs;