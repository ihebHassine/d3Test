import * as d3 from "d3";
import {
  convertDateDdMmYyyy,
  convertDateYyyyMmDd,
} from "../../data/DataGenerator";
let colors = ["#f06565", "#65f065"];
export const DrawChart = (
  svgRef,
  data,
  dimensions,
  margin,
  xUnit,
  yUnit,
  setSelectedId,
  setValue,
  setDate
) => {
  const chartwidth =
    parseInt(d3.select("#d3demo").style("width")) - margin.left - margin.right;
  const chartheight =
    parseInt(d3.select("#d3demo").style("height")) - margin.top - margin.bottom;

  const svg = d3
    .select(svgRef.current)
    .attr("width", chartwidth + margin.left + margin.right)
    .attr("height", chartheight + margin.top + margin.bottom);

  // x scale
  const x = d3
    .scaleBand()
    .domain(d3.range(data.length))
    .range([margin.left, chartwidth - margin.right])
    .padding(0.1);

  svg
    .append("g")
    .attr("transform", "translate(0," + chartheight + ")")
    .call(
      d3
        .axisBottom(x)
        .tickFormat((i) => yUnit + convertDateDdMmYyyy(data[i].date))
        .tickSizeOuter(0)
    );

  const max = d3.max(data, function (d) {
    return d.value;
  });

  // y scale
  const y = d3.scaleLinear().domain([0, max]).range([chartheight, margin.top]);

  svg
    .append("g")
    .attr("transform", "translate(" + margin.left + ",0)")
    .call(
      d3
        .axisLeft(y)
        .tickFormat((i) => (xUnit.trim().length > 0 ? xUnit + " : " + i : i))
    );

  const tooldiv = d3
    .select("#d3demo")
    .append("div")
    .style("visibility", "hidden")
    .style("position", "absolute")
    .style("background-color", "#65f0eb");

  // Create Gradient colors
  var grad = svg
    .append("defs")
    .append("linearGradient")
    .attr("id", "grad")
    .attr("x1", "0%")
    .attr("x2", "0%")
    .attr("y1", "0%")
    .attr("y2", "100%");
  grad
    .selectAll("stop")
    .data(colors)
    .enter()
    .append("stop")
    .style("stop-color", (d) => d)
    .attr("offset", (d, i) => 100 * (i / (colors.length - 1)) + "%");

  // Draw bars
  svg
    .append("g")
    .selectAll("rect")
    .data(data)
    .join("rect")
    .style("fill", "url(#grad)")
    .attr("x", (d, i) => x(i))
    .attr("y", (d) => y(d.value))
    .attr("height", (d) => y(0) - y(d.value))
    .attr("width", x.bandwidth())
    .on("click", (event, d) => {
      setSelectedId(d.id);
      setValue(data.find((element) => element.id === d.id).value);
      setDate(
        convertDateYyyyMmDd(
          data.find((element) => element.id === d.id).date,
          "-"
        )
      );
    })
    .on("mouseover", (e, d) => {
      tooldiv
        .style("visibility", "visible")
        .text(
          "date : " + convertDateDdMmYyyy(d.date) + " - value : " + d.value
        );
    })
    .on("mousemove", (e, d) => {
      tooldiv
        .style("top", e.pageY - 50 + "px")
        .style("left", e.pageX - 50 + "px");
    })
    .on("mouseout", () => {
      tooldiv.style("visibility", "hidden");
    });
};
