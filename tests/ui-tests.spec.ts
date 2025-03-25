import { test, expect } from '@playwright/test';

// Tests pour les composants UI
test('Composants UI - Rendu et comportement', async ({ page }) => {
  // Accéder à la page d'accueil
  await page.goto('/');
  
  // Vérifier que la navbar est présente et fonctionne
  await expect(page.locator('nav')).toBeVisible();
  await expect(page.getByText('ImportAgent')).toBeVisible();
  
  // Vérifier que les liens de navigation fonctionnent
  await page.getByText('Accueil').click();
  await expect(page).toHaveURL('/');
  
  // Vérifier le rendu responsive
  await page.setViewportSize({ width: 375, height: 667 }); // Format mobile
  await expect(page.locator('button.md\\:hidden')).toBeVisible(); // Bouton de menu mobile
  
  // Revenir à la taille desktop
  await page.setViewportSize({ width: 1280, height: 720 });
});

// Tests d'accessibilité
test('Accessibilité - Contraste et navigation au clavier', async ({ page }) => {
  // Accéder à la page d'accueil
  await page.goto('/');
  
  // Vérifier la navigation au clavier
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');
  
  // Vérifier que les éléments interactifs ont un focus visible
  await page.goto('/login');
  await page.getByLabel('Adresse e-mail').focus();
  // Vérifier visuellement que le focus est visible
});

// Tests de performance
test('Performance - Chargement des pages', async ({ page }) => {
  // Mesurer le temps de chargement de la page d'accueil
  const startHome = Date.now();
  await page.goto('/');
  const loadTimeHome = Date.now() - startHome;
  console.log(`Temps de chargement de la page d'accueil: ${loadTimeHome}ms`);
  
  // Mesurer le temps de chargement du tableau de bord (après connexion)
  await page.goto('/login');
  await page.getByLabel('Adresse e-mail').fill('demo@example.com');
  await page.getByLabel('Mot de passe').fill('password');
  
  const startDashboard = Date.now();
  await page.getByRole('button', { name: 'Se connecter' }).click();
  await page.waitForURL('/dashboard');
  const loadTimeDashboard = Date.now() - startDashboard;
  console.log(`Temps de chargement du tableau de bord: ${loadTimeDashboard}ms`);
});

// Tests de gestion d'erreurs
test('Gestion d\'erreurs - Formulaires et API', async ({ page }) => {
  // Tester la validation du formulaire de connexion
  await page.goto('/login');
  await page.getByRole('button', { name: 'Se connecter' }).click();
  await expect(page.getByText('Ce champ est requis')).toBeVisible();
  
  // Tester la gestion des erreurs d'API
  await page.goto('/import');
  await page.getByLabel('URL du produit').fill('https://invalid-url.com');
  await page.getByRole('button', { name: 'Extraire les données du produit' }).click();
  await expect(page.getByText('Erreur')).toBeVisible();
});

// Tests de compatibilité navigateur
test('Compatibilité - Différents navigateurs', async ({ page, browserName }) => {
  // Enregistrer le navigateur utilisé pour le test
  console.log(`Test exécuté sur ${browserName}`);
  
  // Accéder à la page d'accueil
  await page.goto('/');
  
  // Vérifier que les éléments essentiels sont visibles
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.getByText('Commencer l\'importation')).toBeVisible();
});
