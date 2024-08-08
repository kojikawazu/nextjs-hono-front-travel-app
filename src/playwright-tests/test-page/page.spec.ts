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

        // レイアウトの検証: サイドバーの項目が表示されていることを確認
        await expect(page.locator('text=Projects')).toBeVisible();
        await expect(page.locator('text=Menu Item 2')).toBeVisible();
        await expect(page.locator('text=Menu Item 3')).toBeVisible();
    });
});
