export function formatTime(t: number) {
  const min = minutes(t);
  const sec = seconds(t);

  return `${min}:${sec < 10 ? '0' + sec : sec}`;
}

export function hours(t: number) {
  return Math.floor(t / 3600);
}

export function minutes(t: number) {
  return Math.floor((t % 3600) / 60);
}

export function seconds(t: number) {
  return Math.floor(t % 60);
}
