class CountdownTimer {
  constructor({ targetDate, selector }) {
    this.intervalId = null;
    this.targetDate = targetDate;
    this.onTick = this.updateClockface;

    this.selector = selector;
    this.start();
  }

  start() {
    this.intervalId = setInterval(() => {
      const targetDate = this.targetDate.getTime();
      const currentTime = Date.now();
      const deltaTime = targetDate - currentTime;
      const time = this.getTimeComponents(deltaTime);

      this.onTick(time);
    }, 1000);
  }

  getTimeComponents(time) {
    const days = this.padDay(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }

  padDay(value) {
    return String(value).padStart(3, '0');
  }

  updateClockface(time = { days, hours, mins, secs }) {
    const timerEl = document.querySelector(this.selector);
    for (const key in time) {
      const valueEl = timerEl.querySelector(`[data-value="${key}"]`);
      valueEl.innerHTML = `<span>${time[key]}</span>`;
    }
  }
}

new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Dec 08, 2021'),
});

new CountdownTimer({
  selector: '#timer-2',
  targetDate: new Date('Feb 20, 2022'),
});

// const startBtn = document.querySelector('button[data-action-start]');
// const stopBtn = document.querySelector('button[data-action-stop]');
// const clockface = document.querySelector('.js-clockface');

// class Timer {
//   constructor({ onTick }) {
//     this.intervalId = null;
//     this.isActive = false;
//     this.onTick = onTick;

//     this.init();
//   }

//   init() {
//     const time = this.getTimeComponents(0);
//     this.onTick(time);
//   }

//   start() {
//     if (this.isActive) {
//       console.log('таймер запущен, кронка старт не активна');
//       return;
//     }

//     const startTime = Date.now();
//     this.isActive = true;

//     this.intervalId = setInterval(() => {
//       const currentTime = Date.now();
//       const deltaTime = currentTime - startTime;
//       const time = this.getTimeComponents(deltaTime);

//       this.onTick(time);
//     }, 1000);
//   }

//   stop() {
//     clearInterval(this.intervalId);
//     this.isActive = false;
//     const time = this.getTimeComponents(0);
//     this.onTick(time);
//   }

//   getTimeComponents(time) {
//     const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
//     const hours = this.pad(
//       Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
//     );
//     const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
//     const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

//     return { days, hours, mins, secs };
//   }

//   pad(value) {
//     return String(value).padStart(2, '0');
//   }
// }

// const timer = new Timer({ onTick: updateClockface });

// startBtn.addEventListener('click', timer.start.bind(timer));
// stopBtn.addEventListener('click', timer.stop.bind(timer));

// function updateClockface({ days, hours, mins, secs }) {
//   clockface.textContent = `${days}:${hours}:${mins}:${secs}`;
// }
