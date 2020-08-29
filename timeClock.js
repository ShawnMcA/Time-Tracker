// current time at start work
let _currentTime;
// timer function
let _timer = 0;

const clockIn = () => {
  const status = getStatus();

  if(status === 'Not Working'){
    setStatus('Working');
    startClock();
  }
}

const clockOut = () => {
  const status = getStatus();

  if(status === 'Working'){
    setStatus('Not Working');
    clearInterval(_timer);
  }
}

const clearTime = () => {
  const status = getStatus();

  if(status === 'Not Working') {
    updateTime('00:00:00');
  }
}

const getStatus = () => {
  const currStatus = document.getElementById('current-status-text');
  let status = currStatus.innerHTML;

  return status;
}

const setStatus = status => {
  const currStatus = document.getElementById('current-status-text');
  currStatus.innerHTML = status;
}

const startTimer = prevTime => {
  let newTime = new Date();
  let dif = Math.abs(newTime - prevTime) / 1000;

  let hours = Math.floor(dif / 3600) % 24;
  let minutes = Math.floor(dif / 60) % 60;
  let seconds = Math.floor(dif % 60);

  let time = [hours, minutes, seconds];
  updateTime(timeToText(time));
}

const startClock = () => {
  _currentTime = new Date();
  updateTime(timeToText([0, 0, 0]));
  _timer = setInterval(startTimer, 1000, _currentTime);
}

const stopClock = () => {
  clearInterval(_timer);
}

const updateTime = (time) => {
  const workTime = document.getElementById('time-working-text');
  workTime.innerHTML = time;
}

const timeToText = time => {
  let hours = addZeroToTime(time[0]);
  let minutes = addZeroToTime(time[1]);
  let seconds = addZeroToTime(time[2]);

  return `${hours}:${minutes}:${seconds}`;
}

const addZeroToTime = time => {
  if(time < 10) time = `0${time}`;

  return time.toString();
}