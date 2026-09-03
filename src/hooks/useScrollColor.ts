import { useEffect } from 'react';
import { useTheme } from './useTheme';

// Light mode palette
const lightColors = [
  '#f7f4f0', // Original light bg
  '#f0f4f7', // Light blue
  '#f7f0f4', // Light pink
  '#f4f7f0', // Light green
  '#f7f4f0', // Back to original
];

// Dark mode palette
const darkColors = [
  '#15110e', // Original dark bg
  '#0e1115', // Dark blue
  '#150e11', // Dark pink
  '#11150e', // Dark green
  '#15110e', // Back to original
];

// Helper to convert hex to rgb
function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : [0, 0, 0];
}

// Helper to interpolate between two rgb arrays
function interpolateColor(color1: number[], color2: number[], factor: number) {
  const result = color1.slice();
  for (let i = 0; i < 3; i++) {
    result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
  }
  return `rgb(${result[0]}, ${result[1]}, ${result[2]})`;
}

export function useScrollColor() {
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      let scrollFraction = scrollPosition / maxScroll;
      
      if (isNaN(scrollFraction)) scrollFraction = 0;
      scrollFraction = Math.max(0, Math.min(1, scrollFraction));

      const colors = theme === 'dark' ? darkColors : lightColors;
      const totalSegments = colors.length - 1;
      const scaledFraction = scrollFraction * totalSegments;
      
      const segmentIndex = Math.floor(scaledFraction);
      const segmentFraction = scaledFraction - segmentIndex;

      // Make sure we don't go out of bounds
      const safeIndex = Math.min(segmentIndex, totalSegments - 1);

      const color1 = hexToRgb(colors[safeIndex]);
      const color2 = hexToRgb(colors[safeIndex + 1]);

      const interpolated = interpolateColor(color1, color2, segmentFraction);

      document.documentElement.style.setProperty('--bg', interpolated);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial call
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      // Reset color when component unmounts
      document.documentElement.style.removeProperty('--bg');
    };
  }, [theme]);
}
