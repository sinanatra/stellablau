const d3 = require('d3');
const projects = d3.selectAll('.data-category');
let csvData = 'text,category,cluster,url,color\n'
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
const isFirefox = /^((?!chrome|android).)*firefox/i.test(navigator.userAgent);
console.log(isFirefox, navigator.userAgent)

projects._groups[0].forEach(element => {
    csvData += element.innerHTML + ',' + element.dataset.link + ',' + element.dataset.cluster + ',' + element.dataset.url + ',' + element.dataset.color + '\n'
});

const data = d3.csvParse(csvData);

const Blobs = {
    init: () => {

        let width = window.innerWidth - 1,
            height = window.innerHeight - 1;

        let radius;

        if (window.innerWidth <= 750) {
            radius = window.innerWidth / 5;
        } else {
            radius = window.innerWidth / 10;
        }

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
            .attr("stdDeviation", "30")
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

            const circleWrapper = svg.append("g");

            if (isFirefox == false && isSafari == false) {
                circleWrapper.style("filter", "url(#gooe)");
            }

            const circles = circleWrapper.append('g')
                .datum(nodes)
                .selectAll('.circle')
                .data(d => d)
                .enter().append('a')
                .attr("xlink:href", d => d.url)
                .append('circle')
                .attr('r', (d) => d.r)
                .attr('fill',
                    function (d) {
                        if (isSafari == false && isFirefox == false) {
                            return d.color
                        } else {
                            return 'white'
                        }
                    })
                .call(drag())

            const texts = svg.append('g')
                .attr('class', 'text')
                .selectAll('text')
                .data(nodes)
                .enter().append('a')
                .attr('color',
                    function (d) {
                        if (isSafari == false && isFirefox == false) {
                            return 'black'
                        } else {
                            return d.color
                        }
                    })
                .attr("xlink:href", d => d.url)
                .append('foreignObject')
                .attr("class", "text-inner")
                .attr('width', '250px')
                .attr('height', '50px')
                .html(d => d.major)
                .call(drag());

            const simulation = d3.forceSimulation(nodes)
                .velocityDecay(0.2)
                .force("x", d3.forceX().strength(.001))
                .force("y", d3.forceY().strength(.001))
                .force("cluster", clustering)
                .on("tick", ticked);
            simulation.force("collide", d3.forceCollide().radius(radius - (radius / 4)).iterations(2))

            function ticked() {
                circles
                    .attr('cx', (d) => d.x)
                    .attr('cy', (d) => d.y);
                texts
                    .attr('x', function (d) { return d.x; })
                    .attr('y', function (d) { return d.y; });
            }

            // setInterval(function () { simulation.alphaTarget(1); }, 500);


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
