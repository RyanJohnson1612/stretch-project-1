const drawBarChart = (data, options, element) => {
  const el = $(element);
  const numItems = data.length;
  const height = options.height;
  const width = options.width;
  const maxY = getMaxY(data);
  const barWidth = (width/numItems) - options.barOptions.spacing - (options.barOptions.spacing/numItems);

  //create bar chart and append to element parameter
  let chart = `<div class="bar-chart-container">
    <div class="y-axis-container" style="height:${height + 2}px;">
      <div class="ticks-container"></div>
    </div>
    <div class="inner-chart" style="height:${height}px;width:${width}px;"></div>
  </div>`
  $(chart).appendTo(el);

  //loop through data parameter and find height of bar then create it
  for(let i = 0; i < numItems; i++) {
    let barHeight = (data[i] * 100) / maxY;
    createBar(options.barOptions, barHeight, barWidth, options.dataLabels[i], options.barOptions.color[i]);
  }

  createTicks(maxY, options.ticks, height, width);
}

//create bar and label and append to chart
const createBar = (options, height, width, label, color) => {
  let bar = `<div class="bar" style="height:${height}%;width:${width};background-color:${color};margin-left:${options.spacing}px">
    <div class="bar-label">${label}</div>
  </div>`;

  $(bar).appendTo('.inner-chart');
}

const createTicks = (max, ticks, height, width) => {
  const numTicks = Math.floor(max/every) + 1;
  const tickSpacing = height/(numTicks - 1) - 12;

  for(let i = 0; i < numTicks; i++) {
    if(i < numTicks - 1) {
      let tick = `<div class="tick" style="margin-top:${tickSpacing}px">
        <span class="tick-number">${i*ticks}</span>
        <span class="tick-dash" style="width:${width + 10}px"></span>
      </div>`;
      $('.ticks-container').prepend(tick);
    }
    else {
      let tick = `<div class="tick">
        <span class="tick-number">${i*ticks}</span>
        <span class="tick-dash" style="width:${width + 10}px"></span>
      </div>`;
      $('.ticks-container').prepend(tick);
    }
  }
}

//Find the max value for the y axis
const getMaxY = (data) => {
  let largestNum = data.reduce((accumulatedValue, currentValue) => {
    return Math.max(accumulatedValue, currentValue);
  });

  return largestNum;
}
