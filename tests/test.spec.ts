import { test, expect } from '@playwright/test';

test.describe('Candidate Form', () => {
    test.beforeEach(async ({ page }) => {
    
        await page.goto('http://localhost:5173/');
    });

    test('Deve permitir que o usuário preencha e envie o formulário', async ({ page }) => {
   
        await page.fill('input[type="text"]', 'Carol');
        await page.fill('input[type="tel"]', '1234567890');
        await page.fill('input[type="email"]', 'carol@gmail.com');
        
     
        await page.click('button:has-text("Start challenge")');

   
        const timeLeft = await page.locator('h2').textContent();
        expect(timeLeft).toContain('Time left:');
    });

    test('Deve abrir o modal ao enviar o desafio', async ({ page }) => {
    
        await page.fill('input[type="text"]', 'Carol');
        await page.fill('input[type="tel"]', '1234567890');
        await page.fill('input[type="email"]', 'carol@gmail.com');
        

        await page.click('button:has-text("Start challenge")');

        await page.waitForTimeout(10000); 

  
        await page.click('button:has-text("Submit")');

 
        const modal = await page.locator('h3');
        await expect(modal).toBeVisible();
        await expect(modal).toHaveText('Challenge completed!');
    });

    test('Deve navegar para a página de informações do candidato', async ({ page }) => {
   
        await page.fill('input[type="text"]', 'Carol');
        await page.fill('input[type="tel"]', '1234567890');
        await page.fill('input[type="email"]', 'carol@gmail.com');
        await page.click('button:has-text("Start challenge")');
        await page.waitForTimeout(10000);
        await page.click('button:has-text("Submit")');

        await page.click('button:has-text("Back to your information")');

       
        const nameText = await page.locator('p:has-text("Name:")').textContent();
        expect(nameText).toContain('Carol');
    });
});