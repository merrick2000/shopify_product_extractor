import React from 'react';

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Paramètres</h1>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Configuration de Shopify</h2>
        </div>
        <div className="p-6">
          <p className="text-gray-600 mb-4">
            Configurez vos identifiants Shopify pour permettre l'importation de produits vers votre boutique.
          </p>
          
          <form className="space-y-4">
            <div>
              <label htmlFor="shopify-store-url" className="block text-sm font-medium text-gray-700 mb-1">
                URL de la boutique Shopify
              </label>
              <input
                type="text"
                id="shopify-store-url"
                placeholder="votre-boutique.myshopify.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="shopify-api-key" className="block text-sm font-medium text-gray-700 mb-1">
                Clé API Shopify
              </label>
              <input
                type="text"
                id="shopify-api-key"
                placeholder="Clé API"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="shopify-api-secret" className="block text-sm font-medium text-gray-700 mb-1">
                Secret API Shopify
              </label>
              <input
                type="password"
                id="shopify-api-secret"
                placeholder="Secret API"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="shopify-access-token" className="block text-sm font-medium text-gray-700 mb-1">
                Token d'accès Shopify
              </label>
              <input
                type="password"
                id="shopify-access-token"
                placeholder="Token d'accès"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="pt-2">
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Enregistrer les paramètres Shopify
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Paramètres d'optimisation</h2>
        </div>
        <div className="p-6">
          <p className="text-gray-600 mb-4">
            Personnalisez les paramètres d'optimisation des titres et descriptions de produits.
          </p>
          
          <form className="space-y-4">
            <div>
              <label htmlFor="max-title-length" className="block text-sm font-medium text-gray-700 mb-1">
                Longueur maximale du titre
              </label>
              <input
                type="number"
                id="max-title-length"
                defaultValue="70"
                min="10"
                max="100"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="mt-1 text-sm text-gray-500">
                Recommandé: 70 caractères pour une meilleure visibilité dans les résultats de recherche.
              </p>
            </div>
            
            <div>
              <label htmlFor="min-description-length" className="block text-sm font-medium text-gray-700 mb-1">
                Longueur minimale de la description
              </label>
              <input
                type="number"
                id="min-description-length"
                defaultValue="500"
                min="100"
                max="1000"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="keyword-density" className="block text-sm font-medium text-gray-700 mb-1">
                Densité maximale de mots-clés (%)
              </label>
              <input
                type="number"
                id="keyword-density"
                defaultValue="5"
                min="1"
                max="10"
                step="0.1"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="mt-1 text-sm text-gray-500">
                Recommandé: 3-5% pour éviter le sur-optimisation.
              </p>
            </div>
            
            <div className="pt-2">
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Enregistrer les paramètres d'optimisation
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Paramètres du compte</h2>
        </div>
        <div className="p-6">
          <p className="text-gray-600 mb-4">
            Gérez les paramètres de votre compte utilisateur.
          </p>
          
          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Adresse e-mail
              </label>
              <input
                type="email"
                id="email"
                defaultValue="utilisateur@exemple.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe actuel
              </label>
              <input
                type="password"
                id="current-password"
                placeholder="Votre mot de passe actuel"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                Nouveau mot de passe
              </label>
              <input
                type="password"
                id="new-password"
                placeholder="Nouveau mot de passe"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                Confirmer le nouveau mot de passe
              </label>
              <input
                type="password"
                id="confirm-password"
                placeholder="Confirmer le nouveau mot de passe"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="pt-2">
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Mettre à jour le compte
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
