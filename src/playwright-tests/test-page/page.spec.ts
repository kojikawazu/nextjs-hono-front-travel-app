import { test, expect } from '@playwright/test';

test.describe('TestPage', () => {
    test('fetches and displays data', async ({ page }) => {
        // テスト用のバックエンドURLを環境変数に設定
        process.env.NEXT_PUBLIC_BACKEND_URL = 'http://localhost:3001';

        // ページを開く
        await page.goto('/test-page');

        // 特定のdata-testid属性を持つdiv要素を選択してテキストの確認
        const mainContent = page.locator('[data-testid="api-text"]');
        await expect(mainContent).toHaveText('Test, Hello');
    });
});
