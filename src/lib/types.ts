// Types pour les produits
export interface ProductData {
  title: string;
  price: string;
  description: string;
  images: string[];
  specifications: Record<string, string>;
  source_url: string;
  platform: 'alibaba' | 'aliexpress';
}

export interface OptimizedProduct {
  originalData: ProductData;
  optimizedTitle: string;
  optimizedDescription: string;
}

export interface ImportedProduct {
  id: string;
  title: string;
  source: string;
  sourceUrl: string;
  shopifyUrl: string;
  status: 'success' | 'pending' | 'error';
  importedAt: string;
}

// Types pour les paramètres
export interface ShopifyConfig {
  storeUrl: string;
  apiKey: string;
  apiSecret: string;
  accessToken: string;
}

export interface OptimizationConfig {
  maxTitleLength: number;
  minDescriptionLength: number;
  keywordDensity: number;
}

// Types pour l'authentification
export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
