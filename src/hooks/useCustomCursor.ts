import { useEffect, useState } from 'react';

interface CursorState {
  x: number;
  y: number;
  isHovering: boolean;
  label: string;
}

/**
 * Custom magnetic cursor with a dot and outer ring.
 * Detects elements with [data-cursor] attribute for hover label states.
 */
export function useCustomCursor() {
  const [cursor, setCursor] = useState<CursorState>({
    x: 0,
    y: 0,
    isHovering: false,
    label: '',
  });

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let rafId = 0;

    const dot = document.querySelector('[data-cursor-dot]') as HTMLElement | null;
    const ring = document.querySelector('[data-cursor-ring]') as HTMLElement | null;

    if (!dot || !ring) return;

    document.body.classList.add('cursor-hover');

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;

      const target = e.target as HTMLElement;
      const hoverEl = target.closest('[data-cursor]') as HTMLElement | null;

      if (hoverEl) {
        setCursor({
          x: mouseX,
          y: mouseY,
          isHovering: true,
          label: hoverEl.dataset.cursor || '',
        });
      } else {
        setCursor({
          x: mouseX,
          y: mouseY,
          isHovering: false,
          label: '',
        });
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMove);
    rafId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
      document.body.classList.remove('cursor-hover');
    };
  }, []);

  return cursor;
}
