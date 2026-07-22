import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock global jest for vitest
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).jest = vi;

// Mock global clipboard for vitest
Object.assign(navigator, {
    clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
    },
});

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));
