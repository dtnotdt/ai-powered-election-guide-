import { test, expect } from '@playwright/test';

test('End-to-End Voting Flow (Guest Mode)', async ({ page }) => {
  // Go to the app
  await page.goto('/');

  // Expect title to contain VoteVerse
  await expect(page).toHaveTitle(/VoteVerse India/);

  // Click on "Continue as Guest"
  await page.click('button:has-text("Continue as Guest")');

  // Verify we are on the main landing page and nav is visible
  await expect(page.locator('.floating-nav')).toBeVisible({ timeout: 10000 });

  // Verify the checklist shows 0%
  // Navigate to Sandbox
  await page.click('button:has-text("What-If")');

  // Verify Sandbox loaded
  await expect(page.locator('text=Election Sandbox')).toBeVisible();

  // Try clicking an accordion
  await page.click('text=Lost Voter ID');
  await expect(page.locator('text=Alternative Documents')).toBeVisible();
});
