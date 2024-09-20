import "@testing-library/jest-dom";
import { beforeEach, vi } from "vitest";

beforeEach(() => {
  const query = "(max-width: 600px)"; // Define a default value for query

  const matchMediaMock = vi.fn().mockImplementation(() => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));

  const computedStyleMock = vi.fn().mockImplementation(() => ({}));
  vi.stubGlobal("matchMedia", matchMediaMock);
  vi.stubGlobal("computedStyle", computedStyleMock);
});
