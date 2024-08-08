import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'http://localhost:3000',
    browserName: 'chromium',
  },
  testDir: './src/playwright-tests',
});