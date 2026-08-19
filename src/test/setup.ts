import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Polyfill window.matchMedia for JSDOM and useMediaQuery hook
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {}, // deprecated
    removeListener: () => {}, // deprecated
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

// Polyfill PointerEvent for Radix UI components in jsdom environment
if (!globalThis.PointerEvent) {
  class PointerEvent extends MouseEvent {
    public pointerId: number = 1;
    public pointerType: string = 'mouse';
    constructor(type: string, params: PointerEventInit = {}) {
      super(type, params);
      if (params.pointerId) this.pointerId = params.pointerId;
      if (params.pointerType) this.pointerType = params.pointerType;
    }
  }
  // @ts-ignore
  globalThis.PointerEvent = PointerEvent;
}

// Polyfill ResizeObserver for Radix UI primitives
if (!globalThis.ResizeObserver) {
  globalThis.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

// Automatically cleanup DOM after each test
afterEach(() => {
  cleanup();
});
