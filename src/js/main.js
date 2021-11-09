const drawBarChart = (data, options, element) => {
  const el = $(element);
  const numItems = data.length;
  const height = options.height;
  const width = options.width;
  const maxY = getMaxY(data);
  const barWidth = (width/numItems) - options.barOptions.spacing - (options.barOptions.spacing/numItems);

  //create bar chart and append to element parameter
  let chart = `<div class="bar-chart"><div class="inner-chart" style="height:${height}px;width:${width}px;"></div></div>`
  $(chart).appendTo(el);

  //loop through data parameter and create bars
  for(let i = 0; i < numItems; i++) {
    let barHeight = (data[i] * 100) / maxY;
    createBar(options.barOptions, barHeight, barWidth, options.dataLabels[i]);
  }
}

//create bar and label and append to chart
const createBar = (options, height, width, label) => {
  let bar = `<div class="bar" style="height:${height}%;width:${width};background-color:${options.color};margin-left:${options.spacing}px">
    <div class="bar-label">${label}</div>
  </div>`;

  $(bar).appendTo('.inner-chart')
}

//Find the max value for the y axis
const getMaxY = (data) => {
  let largestNum = data.reduce((accumulatedValue, currentValue) => {
    return Math.max(accumulatedValue, currentValue);
  });

  return largestNum;
}
