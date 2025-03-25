import { test, expect } from '@playwright/test';

// Tests unitaires pour les services d'importation
test('Services d\'importation - Fonctions et intégrations', async ({ page }) => {
  // Tester l'extraction de données
  await page.goto('/api-test');
  await page.evaluate(() => {
    window.testExtractProductData = async () => {
      const url = 'https://www.aliexpress.com/item/1234567890.html';
      try {
        const response = await fetch('/api/extract', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url }),
        });
        return await response.json();
      } catch (error) {
        return { error: error.message };
      }
    };
    return window.testExtractProductData();
  }).then(result => {
    expect(result.product).toBeDefined();
    expect(result.product.title).toBeDefined();
    expect(result.product.images).toBeInstanceOf(Array);
  });

  // Tester l'optimisation de contenu
  await page.evaluate(() => {
    window.testOptimizeContent = async () => {
      const product = {
        title: "Test Product",
        description: "Test Description",
        price: "$10",
        images: ["image1.jpg"],
        specifications: { "Color": "Red" },
        source_url: "https://example.com",
        platform: "aliexpress"
      };
      try {
        const response = await fetch('/api/optimize', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ product }),
        });
        return await response.json();
      } catch (error) {
        return { error: error.message };
      }
    };
    return window.testOptimizeContent();
  }).then(result => {
    expect(result.title).toBeDefined();
    expect(result.description).toBeDefined();
    expect(result.description.length).toBeGreaterThan(result.title.length);
  });

  // Tester l'importation vers Shopify
  await page.evaluate(() => {
    window.testImportToShopify = async () => {
      const product = {
        originalData: {
          title: "Test Product",
          description: "Test Description",
          price: "$10",
          images: ["image1.jpg"],
          specifications: { "Color": "Red" },
          source_url: "https://example.com",
          platform: "aliexpress"
        },
        optimizedTitle: "Optimized Test Product",
        optimizedDescription: "Optimized Test Description"
      };
      try {
        const response = await fetch('/api/import', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ product }),
        });
        return await response.json();
      } catch (error) {
        return { error: error.message };
      }
    };
    return window.testImportToShopify();
  }).then(result => {
    expect(result.productId).toBeDefined();
    expect(result.shopifyUrl).toBeDefined();
    expect(result.success).toBe(true);
  });
});

// Tests de sécurité
test('Sécurité - Authentification et protection des routes', async ({ page }) => {
  // Tester l'accès aux routes protégées sans authentification
  await page.goto('/dashboard');
  await expect(page).toHaveURL('/login');
  
  await page.goto('/import');
  await expect(page).toHaveURL('/login');
  
  await page.goto('/settings');
  await expect(page).toHaveURL('/login');
  
  // Tester la protection des API
  const response = await page.request.post('/api/import', {
    data: { test: true }
  });
  expect(response.status()).toBe(401);
});

// Tests de validation des données
test('Validation - Formulaires et entrées utilisateur', async ({ page }) => {
  // Tester la validation du formulaire d'inscription
  await page.goto('/register');
  
  // Tester avec un mot de passe trop court
  await page.getByLabel('Nom').fill('Test User');
  await page.getByLabel('Adresse e-mail').fill('test@example.com');
  await page.getByLabel('Mot de passe').fill('123');
  await page.getByLabel('Confirmer le mot de passe').fill('123');
  await page.getByRole('button', { name: 'Créer un compte' }).click();
  
  await expect(page.getByText('Le mot de passe doit contenir au moins 6 caractères')).toBeVisible();
  
  // Tester avec des mots de passe qui ne correspondent pas
  await page.getByLabel('Mot de passe').fill('password123');
  await page.getByLabel('Confirmer le mot de passe').fill('password456');
  await page.getByRole('button', { name: 'Créer un compte' }).click();
  
  await expect(page.getByText('Les mots de passe ne correspondent pas')).toBeVisible();
  
  // Tester la validation de l'URL du produit
  await page.goto('/login');
  await page.getByLabel('Adresse e-mail').fill('demo@example.com');
  await page.getByLabel('Mot de passe').fill('password');
  await page.getByRole('button', { name: 'Se connecter' }).click();
  await page.waitForURL('/dashboard');
  
  await page.goto('/import');
  await page.getByLabel('URL du produit').fill('invalid-url');
  await page.getByRole('button', { name: 'Extraire les données du produit' }).click();
  
  await expect(page.getByText('URL invalide')).toBeVisible();
});
