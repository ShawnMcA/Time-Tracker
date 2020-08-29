const fs = require("fs");
const timeData = require("./timeData");


const submitTime = () => {
  const totalTime = document.getElementById('time-working-text');
  let time = totalTime.innerHTML;
  let status = getStatus();

  time = time.split(':');
  let hours = +time[0];
  let minutes = +time[1];
  let seconds = +time[2];

  if(status === "Not Working" && (hours || minutes || seconds)){
    timeData['hoursWorked'] += hours;
    timeData['minutesWorked'] += minutes;
    timeData['secondsWorked'] += seconds;

    writeToJSON();
    refactorJSON();
    writeToJSON();
  }
  
  clearTime();
}

const writeToJSON = () => {
  fs.writeFile('timeData.json', JSON.stringify(timeData), err => {
    if(err) throw err;
  });
}

const refactorJSON = () => {
  let hours = 0;
  let minutes = 0;

  if(timeData['secondsWorked'] >= 60) {
    minutes = timeData['secondsWorked'] / 60;
    timeData['secondsWorked'] = Math.floor(timeData['secondsWorked'] % 60);
    timeData['minutesWorked'] += Math.floor(minutes);
    minutes = 0;
  }

  if(timeData['minutesWorked'] >= 60) {
    hours = timeData['minutesWorked'] / 60;
    timeData['minutesWorked'] = Math.floor(timeData['minutesWorked'] % 60);
    timeData['hoursWorked'] += Math.floor(hours);
    hours = 0;
  }
}