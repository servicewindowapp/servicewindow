// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './smoke',
  timeout: 30000,
  retries: 0,
  workers: 1,

  use: {
    baseURL: 'http://127.0.0.1:3001',
    headless: true,
    ignoreHTTPSErrors: true,
  },

  webServer: {
    command: 'python3 -m http.server 3001 --bind 127.0.0.1 --directory ..',
    port: 3001,
    reuseExistingServer: true,
    timeout: 30000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
