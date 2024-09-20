import { expect, test } from '@playwright/test';

test('should start challenge and display sucess message', async ({ page }) => {
    await page.goto('/');
    await page.fill('input[name="name"]', 'Test user');
    await page.fill('input[name="phone"]', '123456789');
    await page.fill('input[name="email"]', 'email@example.com');
    await page.click('button:has-text("Start Challenge")');


    await page.waitForTimeout(1000); //espera um segundo
    await page.click('button:has-text("Submit")');


    const modalText = await page.textContent('.modal-box');
    expect(modalText).toContain('Challenge completed!');
});

test('should start challenge and display sucess message', async ({ page }) => {
    await page.goto('/');
    await page.fill('input[name="name"]', 'Test user');
    await page.fill('input[name="phone"]', '123456789');
    await page.fill('input[name="email"]', 'email@example.com');
    await page.click('button:has-text("Start Challenge")');


    await page.waitForTimeout(16000); //espera 16 segundos
    await page.click('button:has-text("Submit")');

    const modalText = await page.textContent('.modal-box');
    expect(modalText).toContain('Challenge failed!');
});