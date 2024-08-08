import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
    await page.goto('/');
    const mainContent = await page.textContent('main');
    expect(mainContent).toBe('Hello');
});

test('title test', async ({ page }) => {
    await page.goto('/');
    const title = await page.title();
    expect(title).toBe('Travel Web App');
});
