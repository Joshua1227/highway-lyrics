require("@testing-library/jest-dom");
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: jest.fn().mockResolvedValue(undefined),
  },
  writable: true,
});
