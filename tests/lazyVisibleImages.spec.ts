import test, { expect } from '@playwright/test';

test('scroll to lazy visible images and wait for loading', async ({ page }) => {
  const lazyImages = await page.locator('img[loading="lazy"]:visible').all();

  for (const lazyImage of lazyImages) {
    await lazyImage.scrollIntoViewIfNeeded();
    await expect(lazyImage).not.toHaveJSProperty('naturalWidth', 0);
  }
});
