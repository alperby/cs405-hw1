/*
CS405 - Assignment 1
ALPER BUYUKALACA
*/

//Data for the bars
const male_data = [
  81, 92, 104, 81, 106, 98, 88, 87, 133, 142, 133, 148, 197, 211, 231, 315, 316,
  321, 322, 356, 367, 517, 504,
];
const female_data = [
  35, 31, 42, 26, 41, 31, 23, 33, 36, 37, 42, 33, 56, 56, 41, 67, 66, 68, 98,
  104, 107, 105, 131,
];

//Years data (for the x axis)
let years = [];

for (let i = 2000; i < 2023; i++) {
  years.push(i);
}

//Acquiring svg values
const svg = document.getElementById("datachart");
let svgWidth = svg.getAttribute("width");
let svgHeight = svg.getAttribute("height");

svgWidth = parseInt(svgWidth);
svgHeight = parseInt(svgHeight);

//Pre-determined values for the chart
const margin = { top: 50, right: 50, bottom: 50, left: 40 };
const chartWidth = svgWidth - margin.left - margin.right;
const chartHeight = svgHeight - margin.top - margin.bottom;

const chart = document.createElementNS("http://www.w3.org/2000/svg", "g");
chart.setAttribute("transform", `translate(${margin.left},${margin.top})`);
svg.appendChild(chart);

//Pre-determined bar width
const barWidth = 40;

//Custom functions to determine x and y values of bars
const xScaleMale = (i) => 10 + i * (barWidth + barWidth + 20);
const xScaleFemale = (i) => 10 + barWidth + i * (barWidth + barWidth + 20);
const yScale = (d) => chartHeight - (d / 520) * chartHeight;

// X-axis
const xAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
xAxis.setAttribute("x1", 0);
xAxis.setAttribute("y1", chartHeight);
xAxis.setAttribute("x2", chartWidth);
xAxis.setAttribute("y2", chartHeight);
xAxis.setAttribute("stroke", "black");
chart.appendChild(xAxis);

// Labels of the x-axis
for (let i = 0; i < male_data.length; i++) {
  // Ticks
  const tick = document.createElementNS("http://www.w3.org/2000/svg", "line");
  tick.setAttribute("x1", xScaleMale(i) + barWidth);
  tick.setAttribute("y1", chartHeight);
  tick.setAttribute("x2", xScaleMale(i) + barWidth);
  tick.setAttribute("y2", chartHeight + 5);
  tick.setAttribute("stroke", "black");
  chart.appendChild(tick);

  // Labels
  const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
  label.setAttribute("x", xScaleMale(i) + barWidth);
  label.setAttribute("y", chartHeight + 20);
  label.setAttribute("text-anchor", "middle");
  label.textContent = years[i];
  chart.appendChild(label);
}

// Y-axis
const yAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
yAxis.setAttribute("x1", 0);
yAxis.setAttribute("y1", 0);
yAxis.setAttribute("x2", 0);
yAxis.setAttribute("y2", chartHeight);
yAxis.setAttribute("stroke", "black");
chart.appendChild(yAxis);

// Label of Y-Axis (value on the top of the y line)
const YAxisLabel = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "text"
);
YAxisLabel.setAttribute("x", 50);
YAxisLabel.setAttribute("y", -20);
YAxisLabel.setAttribute("text-anchor", "end");
YAxisLabel.textContent = "(Death count)";
chart.appendChild(YAxisLabel);

// Labels of the y-axis
for (let i = 0; i <= 520; i += 40) {
  // Ticks
  const tick = document.createElementNS("http://www.w3.org/2000/svg", "line");
  tick.setAttribute("x1", -5);
  tick.setAttribute("y1", yScale(i));
  tick.setAttribute("x2", 0);
  tick.setAttribute("y2", yScale(i));
  tick.setAttribute("stroke", "black");
  chart.appendChild(tick);

  // Labels
  const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
  label.setAttribute("x", -10);
  label.setAttribute("y", yScale(i));
  label.setAttribute("text-anchor", "end");
  label.setAttribute("alignment-baseline", "middle");
  label.textContent = i;
  chart.appendChild(label);
}

//Right (of the graph) line
const rightLine = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "line"
);
rightLine.setAttribute("x1", chartWidth);
rightLine.setAttribute("y1", 0);
rightLine.setAttribute("x2", chartWidth);
rightLine.setAttribute("y2", chartHeight);
rightLine.setAttribute("stroke", "black");
chart.appendChild(rightLine);

// Label of Right-Line (value on the top of the right line)
const RightLineLabel = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "text"
);
RightLineLabel.setAttribute("x", chartWidth - 50);
RightLineLabel.setAttribute("y", -20);
RightLineLabel.setAttribute("text-anchor", "start");
RightLineLabel.textContent = "(in hundreds)";
chart.appendChild(RightLineLabel);

//Labels of the right line
for (let i = 0; i <= 520; i += 100) {
  // Ticks
  const tick = document.createElementNS("http://www.w3.org/2000/svg", "line");
  tick.setAttribute("x1", chartWidth);
  tick.setAttribute("y1", yScale(i));
  tick.setAttribute("x2", chartWidth + 5);
  tick.setAttribute("y2", yScale(i));
  tick.setAttribute("stroke", "black");
  chart.appendChild(tick);

  // Labels
  const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
  label.setAttribute("x", chartWidth + 20);
  label.setAttribute("y", yScale(i));
  label.setAttribute("text-anchor", "end");
  label.setAttribute("alignment-baseline", "middle");
  label.setAttribute("font-size", "24px");
  label.textContent = i / 100;
  chart.appendChild(label);
}

//Bars for male data
for (let i = 0; i < male_data.length; i++) {
  const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");

  const x = xScaleMale(i);
  const y = yScale(male_data[i]);
  const barHeight = chartHeight - y;

  rect.setAttribute("x", x);
  rect.setAttribute("y", y);
  rect.setAttribute("width", barWidth);
  rect.setAttribute("height", barHeight);
  rect.setAttribute("fill", "#2480c6");

  chart.appendChild(rect);

  //Text within the male bar
  const valueText = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "text"
  );
  valueText.setAttribute("x", x + barWidth / 2);
  valueText.setAttribute("y", y + barHeight / 2);
  valueText.setAttribute("text-anchor", "middle");
  valueText.setAttribute("dominant-baseline", "middle");
  valueText.setAttribute(
    "transform",
    `rotate(-90, ${x + barWidth / 2}, ${y + barHeight / 2})`
  );
  valueText.setAttribute("font-size", "24px");
  valueText.setAttribute("fill", "white");
  valueText.textContent = male_data[i];
  chart.appendChild(valueText);
}

//Bars for female data
for (let i = 0; i < female_data.length; i++) {
  const x = xScaleFemale(i);
  const y = yScale(female_data[i]);
  const barHeight = chartHeight - y;

  const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttribute("x", x);
  rect.setAttribute("y", y);
  rect.setAttribute("width", barWidth);
  rect.setAttribute("height", barHeight);
  rect.setAttribute("fill", "green");

  chart.appendChild(rect);

  //Text within the female bar
  const valueText = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "text"
  );
  valueText.setAttribute("x", x + barWidth / 2);
  valueText.setAttribute("y", y + barHeight / 2);
  valueText.setAttribute("text-anchor", "middle");
  valueText.setAttribute("dominant-baseline", "middle");
  valueText.setAttribute(
    "transform",
    `rotate(-90, ${x + barWidth / 2}, ${y + barHeight / 2})`
  );
  valueText.setAttribute("font-size", "20px");
  valueText.setAttribute("fill", "white");
  valueText.textContent = female_data[i];
  chart.appendChild(valueText);
}

//Legend
const legendWidth = 200;
const legendX = (chartWidth - legendWidth) / 2;

const legend = document.createElementNS("http://www.w3.org/2000/svg", "g");
legend.setAttribute("transform", `translate(${legendX}, ${chartHeight + 40})`);

// Male box in legend
const box1 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
box1.setAttribute("x", 0);
box1.setAttribute("y", 0);
box1.setAttribute("width", 20);
box1.setAttribute("height", 20);
box1.setAttribute("fill", "#2480c6");
legend.appendChild(box1);

const text1 = document.createElementNS("http://www.w3.org/2000/svg", "text");
text1.setAttribute("x", 30);
text1.setAttribute("y", 10);
text1.textContent = "Male Death";
legend.appendChild(text1);

// Female box in legend
const box2 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
box2.setAttribute("x", 130);
box2.setAttribute("y", 0);
box2.setAttribute("width", 20);
box2.setAttribute("height", 20);
box2.setAttribute("fill", "green");
legend.appendChild(box2);

const text2 = document.createElementNS("http://www.w3.org/2000/svg", "text");
text2.setAttribute("x", 160);
text2.setAttribute("y", 10);
text2.textContent = "Female Death";
legend.appendChild(text2);

chart.appendChild(legend);
