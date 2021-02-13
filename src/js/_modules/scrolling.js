const d3 = require('d3');

const Scrolling = {
    init: () => {
        try {
            let rectangle = document.getElementById("scrolling")
            let text = document.getElementsByClassName("project__content-fulltext")[0].children[0].innerText

            d3.select('#scrolling').html(null);

            var svg = d3.select("#scrolling").append("svg")
                .attr("width", rectangle.offsetWidth)
                .attr("height", rectangle.offsetHeight)

            svg.append("defs").append("path")
                .attr("id", "path")
                .attr("d", "M20,20H" + (rectangle.offsetWidth - 50) + "V" + (rectangle.offsetHeight - 50) + "H20Z");

            let marquee = svg.append("text")
                .attr("id", "scroll-text")
                .append("textPath")
                .attr("xlink:href", "#path")
                .attr('startOffset', '0%')
                .text(text);

            svg.append("use")
                .attr("id", "scroll-line")
                .attr("xlink:href", "#scroll")

            let so = 100

            function Marquee() {
                requestAnimationFrame(Marquee)
                marquee.attr("startOffset", so + "%");
                if (so <= -100) {
                    so = 100;
                }
                else {
                    so -= .05
                }
            }

            Marquee()
        }
        catch { }

    }
};

export default Scrolling;

