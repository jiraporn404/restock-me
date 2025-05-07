export const generatePastelColor = () => {
  const hue = Math.floor(Math.random() * 360);
  const saturation = 60 + Math.random() * 20;
  const lightness = 75 + Math.random() * 15;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};
