import { useCustomCursor } from '@/hooks/useCustomCursor';

export function CustomCursor() {
  const cursor = useCustomCursor();

  return (
    <>
      <div
        data-cursor-dot
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-accent-600 dark:bg-accent-400"
        style={{ transition: 'width 0.3s, height 0.3s, opacity 0.3s' }}
      />
      <div
        data-cursor-ring
        className="pointer-events-none fixed left-0 top-0 z-[9998] flex items-center justify-center rounded-full"
        style={{
          width: cursor.isHovering ? '64px' : '36px',
          height: cursor.isHovering ? '64px' : '36px',
          border: '1.5px solid var(--accent)',
          backgroundColor: cursor.isHovering ? 'rgba(194, 94, 58, 0.08)' : 'transparent',
          transition: 'width 0.3s cubic-bezier(0.22, 1, 0.36, 1), height 0.3s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.3s',
        }}
      >
        {cursor.label && (
          <span className="text-[10px] font-medium uppercase tracking-wider text-accent-600 dark:text-accent-400">
            {cursor.label}
          </span>
        )}
      </div>
    </>
  );
}
