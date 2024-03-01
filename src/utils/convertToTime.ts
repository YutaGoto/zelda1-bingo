interface ConvertToTime {
  time: number;
  isMillisecond?: boolean;
}

export const convertToTime = ({
  time,
  isMillisecond = true,
}: ConvertToTime): string => {
  const milliseconds = `00${time % 1000}`.slice(-3);
  const seconds = `0${Math.floor(time / 1000) % 60}`.slice(-2);
  const minutes = `0${Math.floor(time / 60000)}`.slice(-2);
  const hours = Math.floor(time / 3600000);

  if (isMillisecond) {
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
  }

  return `${hours}:${minutes}:${seconds}`;
};
