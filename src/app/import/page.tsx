"use client";

import React, { useState } from 'react';
import { extractProductData, optimizeProductContent, importProductToShopify } from '@/lib/importService';
import { ProductData, OptimizedProduct } from '@/lib/types';

export default function ImportPage() {
  const [url, setUrl] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [optimizedProduct, setOptimizedProduct] = useState<OptimizedProduct | null>(null);
  const [importResult, setImportResult] = useState<{ productId: string, shopifyUrl: string } | null>(null);

  const handleExtract = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) {
      setError('Veuillez entrer une URL de produit');
      return;
    }
    
    // Validation simple de l'URL
    if (!url.startsWith('http')) {
      setError('URL invalide. Assurez-vous qu\'elle commence par http:// ou https://');
      return;
    }
    
    setIsExtracting(true);
    setError(null);
    setSuccess(null);
    
    try {
      const data = await extractProductData(url);
      setProductData(data);
      
      // Lancer automatiquement l'optimisation
      setIsOptimizing(true);
      const optimized = await optimizeProductContent(data);
      setOptimizedProduct(optimized);
      setIsOptimizing(false);
      
      setSuccess('Données extraites et optimisées avec succès');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue lors de l\'extraction des données');
      setProductData(null);
      setOptimizedProduct(null);
    } finally {
      setIsExtracting(false);
    }
  };

  const handleImport = async () => {
    if (!productData || !optimizedProduct) {
      setError('Aucune donnée de produit à importer');
      return;
    }
    
    setIsImporting(true);
    setError(null);
    setSuccess(null);
    
    try {
      const result = await importProductToShopify({
        originalData: productData,
        optimizedTitle: optimizedProduct.title,
        optimizedDescription: optimizedProduct.description
      });
      
      setImportResult(result);
      setSuccess('Produit importé avec succès dans Shopify');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue lors de l\'importation du produit');
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Importer des produits</h1>
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}
      
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">{success}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Étape 1: Extraire les données du produit</h2>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleExtract} className="space-y-4">
            <div>
              <label htmlFor="product-url" className="block text-sm font-medium text-gray-700 mb-1">
                URL du produit
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  name="product-url"
                  id="product-url"
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="https://www.aliexpress.com/item/..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  disabled={isExtracting || isOptimizing}
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Entrez l'URL complète du produit sur Alibaba ou AliExpress
              </p>
            </div>
            
            <div>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
                disabled={isExtracting || isOptimizing || !url}
              >
                {isExtracting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Extraction des données...
                  </>
                ) : isOptimizing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Optimisation du contenu...
                  </>
                ) : (
                  'Extraire les données du produit'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {optimizedProduct && (
        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Étape 2: Prévisualisation du produit</h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Informations originales</h3>
                <div className="bg-gray-50 rounded-md p-4">
                  <div className="mb-4">
                    <span className="text-sm text-gray-500">Titre original:</span>
                    <p className="font-medium">{productData?.title}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Description originale:</span>
                    <p className="text-sm text-gray-700 mt-1 line-clamp-5">{productData?.description}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Contenu optimisé</h3>
                <div className="bg-gray-50 rounded-md p-4">
                  <div className="mb-4">
                    <span className="text-sm text-gray-500">Titre optimisé:</span>
                    <p className="font-medium">{optimizedProduct.title}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Description optimisée:</span>
                    <p className="text-sm text-gray-700 mt-1 line-clamp-5">{optimizedProduct.description.substring(0, 200)}...</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={handleImport}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-300"
                disabled={isImporting}
              >
                {isImporting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Importation en cours...
                  </>
                ) : (
                  'Importer dans Shopify'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {importResult && (
        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Étape 3: Importation réussie</h2>
          </div>
          
          <div className="p-6">
            <div className="bg-green-50 rounded-md p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">
                    Le produit a été importé avec succès dans votre boutique Shopify.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-md p-4 mb-6">
              <div className="mb-2">
                <span className="text-sm text-gray-500">ID du produit:</span>
                <p className="font-medium">{importResult.productId}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">URL Shopify:</span>
                <p>
                  <a href={importResult.shopifyUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {importResult.shopifyUrl}
                  </a>
                </p>
              </div>
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={() => {
                  setUrl('');
                  setProductData(null);
                  setOptimizedProduct(null);
                  setImportResult(null);
                  setSuccess(null);
                  setError(null);
                }}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Importer un autre produit
              </button>
              
              <a
                href="/dashboard"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Aller au tableau de bord
              </a>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Astuce</h3>
            <div className="text-sm text-blue-700">
              <p>
                Vous pouvez également importer plusieurs produits à la fois en utilisant un fichier CSV. Contactez-nous pour activer cette fonctionnalité.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
