import { test, expect } from '@playwright/test';

// Tests pour la page d'accueil
test('Page d\'accueil - Affichage et navigation', async ({ page }) => {
  // Accéder à la page d'accueil
  await page.goto('/');
  
  // Vérifier que le titre est présent
  await expect(page.locator('h1')).toContainText('Agent d\'Importation de Produits');
  
  // Vérifier que les boutons de navigation sont présents
  await expect(page.getByText('Commencer l\'importation')).toBeVisible();
  await expect(page.getByText('Voir le tableau de bord')).toBeVisible();
  
  // Vérifier que la section des fonctionnalités est présente
  await expect(page.getByText('Fonctionnalités principales')).toBeVisible();
  
  // Tester la navigation vers la page d'importation
  await page.getByText('Commencer l\'importation').click();
  await expect(page).toHaveURL('/import');
});

// Tests pour la page de connexion
test('Page de connexion - Formulaire et authentification', async ({ page }) => {
  // Accéder à la page de connexion
  await page.goto('/login');
  
  // Vérifier que le formulaire est présent
  await expect(page.locator('h2')).toContainText('Connexion à votre compte');
  await expect(page.getByLabel('Adresse e-mail')).toBeVisible();
  await expect(page.getByLabel('Mot de passe')).toBeVisible();
  
  // Tester la connexion avec des identifiants de démo
  await page.getByLabel('Adresse e-mail').fill('demo@example.com');
  await page.getByLabel('Mot de passe').fill('password');
  await page.getByRole('button', { name: 'Se connecter' }).click();
  
  // Vérifier le message de succès
  await expect(page.getByText('Connexion réussie')).toBeVisible();
  
  // Vérifier la redirection vers le tableau de bord
  await page.waitForURL('/dashboard');
});

// Tests pour la page d'importation
test('Page d\'importation - Formulaire et processus d\'importation', async ({ page }) => {
  // Se connecter d'abord
  await page.goto('/login');
  await page.getByLabel('Adresse e-mail').fill('demo@example.com');
  await page.getByLabel('Mot de passe').fill('password');
  await page.getByRole('button', { name: 'Se connecter' }).click();
  await page.waitForURL('/dashboard');
  
  // Accéder à la page d'importation
  await page.goto('/import');
  
  // Vérifier que le formulaire est présent
  await expect(page.locator('h1')).toContainText('Importer des produits');
  await expect(page.getByLabel('URL du produit')).toBeVisible();
  
  // Tester l'importation d'un produit
  await page.getByLabel('URL du produit').fill('https://www.aliexpress.com/item/1234567890.html');
  await page.getByRole('button', { name: 'Extraire les données du produit' }).click();
  
  // Vérifier l'état de chargement
  await expect(page.getByText('Extraction des données')).toBeVisible();
  
  // Vérifier la prévisualisation du produit
  await expect(page.getByText('Prévisualisation du produit')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Importer dans Shopify' })).toBeVisible();
  
  // Tester l'importation
  await page.getByRole('button', { name: 'Importer dans Shopify' }).click();
  
  // Vérifier le message de succès
  await expect(page.getByText('Importation réussie')).toBeVisible();
});

// Tests pour le tableau de bord
test('Tableau de bord - Affichage et fonctionnalités', async ({ page }) => {
  // Se connecter d'abord
  await page.goto('/login');
  await page.getByLabel('Adresse e-mail').fill('demo@example.com');
  await page.getByLabel('Mot de passe').fill('password');
  await page.getByRole('button', { name: 'Se connecter' }).click();
  
  // Vérifier que le tableau de bord est chargé
  await expect(page.locator('h1')).toContainText('Tableau de bord');
  
  // Vérifier que les statistiques sont présentes
  await expect(page.getByText('Total des produits')).toBeVisible();
  await expect(page.getByText('Importations réussies')).toBeVisible();
  
  // Vérifier que la liste des produits est présente
  await expect(page.getByText('Produits importés')).toBeVisible();
  
  // Tester la recherche
  await page.getByPlaceholder('Rechercher un produit...').fill('montre');
  await expect(page.getByText('Montre connectée')).toBeVisible();
  
  // Tester le filtre par statut
  await page.getByRole('combobox').selectOption('success');
  await expect(page.getByText('Importés')).toBeVisible();
  
  // Tester la navigation vers la page de détail d'un produit
  await page.getByText('Montre connectée').click();
  await expect(page).toHaveURL(/\/dashboard\/product\/\d+/);
});

// Tests pour la page de détail d'un produit
test('Page de détail d\'un produit - Affichage des informations', async ({ page }) => {
  // Se connecter d'abord
  await page.goto('/login');
  await page.getByLabel('Adresse e-mail').fill('demo@example.com');
  await page.getByLabel('Mot de passe').fill('password');
  await page.getByRole('button', { name: 'Se connecter' }).click();
  await page.waitForURL('/dashboard');
  
  // Accéder à la page de détail d'un produit
  await page.goto('/dashboard/product/1');
  
  // Vérifier que les informations du produit sont présentes
  await expect(page.locator('h1')).toContainText('Montre connectée');
  
  // Vérifier que les sections sont présentes
  await expect(page.getByText('Informations générales')).toBeVisible();
  await expect(page.getByText('Spécifications')).toBeVisible();
  await expect(page.getByText('Description')).toBeVisible();
  
  // Vérifier que les boutons d'action sont présents
  await expect(page.getByRole('button', { name: 'Modifier' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Supprimer' })).toBeVisible();
  
  // Tester le retour au tableau de bord
  await page.getByText('Retour au tableau de bord').click();
  await expect(page).toHaveURL('/dashboard');
});

// Tests pour la déconnexion
test('Déconnexion - Processus et redirection', async ({ page }) => {
  // Se connecter d'abord
  await page.goto('/login');
  await page.getByLabel('Adresse e-mail').fill('demo@example.com');
  await page.getByLabel('Mot de passe').fill('password');
  await page.getByRole('button', { name: 'Se connecter' }).click();
  await page.waitForURL('/dashboard');
  
  // Tester la déconnexion
  await page.getByText('Déconnexion').click();
  
  // Vérifier la redirection vers la page de connexion
  await expect(page).toHaveURL('/login');
});
