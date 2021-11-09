const drawBarChart = (data, options, element) => {
  const el = $(element);
  const numItems = data.length;
  const height = options.height;
  const width = options.width;
  const barWidth = (width/numItems) - options.barOptions.spacing - (options.barOptions.spacing/numItems);

  //create bar chart and append to element parameter
  let chart = `<div class="bar-chart"><div class="inner-chart" style="height:${height}px;width:${width}px;"></div></div>`
  $(chart).appendTo(el);

  //loop through data parameter and create bars
  for(let i = 0; i < numItems; i++) {
    createBar(data[i], options.barOptions, height, barWidth, options.dataLabels[i]);
  }
}

//creates bar and bar label and appends to chart
const createBar = (data, options, height, width, label) => {
  const barHeight = (height / 100) * data;

  let bar = `<div class="bar" style="height:${barHeight}px;width:${width};background-color:${options.color};margin-left:${options.spacing}px">
    <div class="bar-label">${label}</div>
  </div>`;

  $(bar).appendTo('.inner-chart')
}
