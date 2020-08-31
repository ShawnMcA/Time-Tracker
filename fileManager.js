const { ipcRenderer } = require('electron');
const fs = require("fs");
const timeData = require("./timeData");

const submitTime = () => {

  const totalTime = document.getElementById('time-working-text');
  let time = totalTime.innerHTML;
  let status = getStatus();

  time = time.split(':');

  let currentTime = {
    'hoursWorked': +time[0],
    'minutesWorked': +time[1],
    'secondsWorked': +time[2]
  }

  if(status === "Not Working"){
    updateJSONTime(currentTime);
    refactorJSON();
  }
  
  clearTime();
}

const refactorJSON = () => {
  let oldHours = getTotalTime();
  let newHours = {};
  let hours = 0;
  let minutes = 0;

  oldHours.then(time => {
    if(time['secondsWorked'] >= 60) {
      minutes = time['secondsWorked'] / 60;
      time['secondsWorked'] = Math.floor(time['secondsWorked'] % 60);
      time['minutesWorked'] += Math.floor(minutes);
      minutes = 0;
    }
  
    if(time['minutesWorked'] >= 60) {
      hours = time['minutesWorked'] / 60;
      time['minutesWorked'] = Math.floor(time['minutesWorked'] % 60);
      time['hoursWorked'] += Math.floor(hours);
      hours = 0;
    }
    newHours = time;
    replaceJSONTime(newHours);
    displayTotalHours();
  }); 
}

const displayTotalHours = () => {
  const timeWorked = document.getElementById('total-time-text');
  timeWorked.style.visibility = 'initial';
  
  let getTime = getTotalTime();

  getTime.then(time => {
    let times = [time['hoursWorked'], time['minutesWorked'], time['secondsWorked']];
    let totalTimeText = timeToText(times);
    timeWorked.innerHTML = `Total Time Worked: ${totalTimeText}`;
  });

}

const getTotalTime = async () => {
  const result = await ipcRenderer.invoke('requestTimeData', 'timeData');

  return result;
}

const updateJSONTime = async newTime => {
  const result = await ipcRenderer.invoke('updateTimeData', 'all', newTime);

  return result;
}

const replaceJSONTime = async newTime => {
  const result = await ipcRenderer.invoke('replaceTimeData', newTime);
  
  return result;
}
