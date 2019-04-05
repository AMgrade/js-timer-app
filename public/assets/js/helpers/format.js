// timeStamp => hh:mm:ss
export function formatTime(time) {
  let hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((time % (1000 * 60)) / 1000);

  return `${('0' + hours).slice(-2)}:${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)}`;
}

// .className => className
export function formatClass(className) {
  if (className.startsWith('.')) {
    return className.substr(1);
  } else {
    return className;
  }
}
