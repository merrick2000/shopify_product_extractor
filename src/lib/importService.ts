import { ProductData, OptimizedProduct } from './types';

/**
 * Extrait les données d'un produit à partir d'une URL Alibaba ou AliExpress
 * @param url URL du produit à extraire
 * @returns Données du produit extraites ou null en cas d'erreur
 */
export async function extractProductData(url: string): Promise<ProductData | null> {
  try {
    // Dans une application réelle, ceci appellerait une API backend
    // qui utiliserait le code Python de l'agent d'importation
    const response = await fetch('/api/extract', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de l'extraction: ${response.statusText}`);
    }

    const data = await response.json();
    return data.product;
  } catch (error) {
    console.error('Erreur lors de l\'extraction des données du produit:', error);
    return null;
  }
}

/**
 * Optimise le titre et la description d'un produit
 * @param productData Données du produit à optimiser
 * @returns Produit avec titre et description optimisés ou null en cas d'erreur
 */
export async function optimizeProductContent(productData: ProductData): Promise<OptimizedProduct | null> {
  try {
    // Dans une application réelle, ceci appellerait une API backend
    const response = await fetch('/api/optimize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ product: productData }),
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de l'optimisation: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      originalData: productData,
      optimizedTitle: data.title,
      optimizedDescription: data.description,
    };
  } catch (error) {
    console.error('Erreur lors de l\'optimisation du contenu:', error);
    return null;
  }
}

/**
 * Importe un produit dans Shopify
 * @param product Produit optimisé à importer
 * @returns ID du produit créé dans Shopify ou null en cas d'erreur
 */
export async function importProductToShopify(product: OptimizedProduct): Promise<string | null> {
  try {
    // Dans une application réelle, ceci appellerait une API backend
    const response = await fetch('/api/import', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ product }),
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de l'importation: ${response.statusText}`);
    }

    const data = await response.json();
    return data.productId;
  } catch (error) {
    console.error('Erreur lors de l\'importation du produit:', error);
    return null;
  }
}

/**
 * Importe plusieurs produits en batch
 * @param urls Liste des URLs de produits à importer
 * @returns Résultats de l'importation batch
 */
export async function batchImportProducts(urls: string[]): Promise<{
  success: { url: string; productId: string }[];
  failed: { url: string; reason: string }[];
}> {
  try {
    // Dans une application réelle, ceci appellerait une API backend
    const response = await fetch('/api/batch-import', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ urls }),
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de l'importation batch: ${response.statusText}`);
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Erreur lors de l\'importation batch:', error);
    return {
      success: [],
      failed: urls.map(url => ({ url, reason: 'Erreur de connexion au serveur' })),
    };
  }
}
