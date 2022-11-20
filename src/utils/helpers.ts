export const formatTemperature = (temperature: number) => {
  const temp = temperature.toFixed();
  return temp === '-0' ? '0' : temp;
};
