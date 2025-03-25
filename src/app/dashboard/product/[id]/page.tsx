"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Données fictives pour la démonstration
  const product = {
    id: params.id,
    title: "Montre connectée étanche avec moniteur cardiaque",
    description: "# Montre connectée étanche avec moniteur cardiaque et GPS intégré\n\n## Description du produit\n\nCette montre connectée de haute qualité offre de nombreuses fonctionnalités pour suivre votre activité physique quotidienne. Dotée d'un écran tactile HD, elle est résistante à l'eau et dispose d'une autonomie exceptionnelle. Idéale pour les sportifs et les personnes soucieuses de leur santé.\n\n## Caractéristiques techniques\n\n- **Color**: Noir, Bleu, Rouge\n- **Material**: Aluminium et silicone\n- **Water Resistance**: IP68\n- **Battery Life**: 7 days\n- **Screen**: 1.3 inch HD\n- **Connectivity**: Bluetooth 5.0\n- **Compatibility**: Android 5.0+ / iOS 9.0+\n- **Features**: Heart rate monitor, GPS, Sleep tracking, Step counter\n\n## Avantages et bénéfices\n\n- Design élégant qui s'intègre parfaitement à votre style de vie\n- Excellent rapport qualité-prix pour un produit de cette catégorie\n- Facile à utiliser et à entretenir\n\n## Conseils d'utilisation\n\nPour profiter pleinement de votre produit, suivez ces conseils simples :\n\n1. Vérifiez le produit dès réception pour vous assurer qu'il est en parfait état\n2. Suivez les instructions du fabricant pour l'installation et l'utilisation\n3. Entretenez régulièrement votre produit pour prolonger sa durée de vie\n\n## Garantie et service après-vente\n\nCe produit est couvert par notre garantie satisfaction. N'hésitez pas à nous contacter pour toute question ou préoccupation concernant votre achat.",
    price: "$59.99 - $79.99",
    source: "alibaba",
    sourceUrl: "https://www.alibaba.com/product-detail/example_123456789.html",
    shopifyUrl: "https://votre-boutique.myshopify.com/products/montre-connectee",
    status: "success",
    importedAt: "2025-03-22T14:25:30Z",
    images: [
      "https://example.com/montre1.jpg",
      "https://example.com/montre2.jpg",
      "https://example.com/montre3.jpg"
    ],
    specifications: {
      "Color": "Noir, Bleu, Rouge",
      "Material": "Aluminium et silicone",
      "Water Resistance": "IP68",
      "Battery Life": "7 days",
      "Screen": "1.3 inch HD",
      "Connectivity": "Bluetooth 5.0",
      "Compatibility": "Android 5.0+ / iOS 9.0+",
      "Features": "Heart rate monitor, GPS, Sleep tracking, Step counter"
    }
  };

  // Fonction pour formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Fonction pour convertir le markdown en HTML (simplifiée)
  const renderMarkdown = (markdown: string) => {
    const paragraphs = markdown.split('\n\n');
    return (
      <div className="space-y-4">
        {paragraphs.map((paragraph, index) => {
          if (paragraph.startsWith('# ')) {
            return <h1 key={index} className="text-2xl font-bold">{paragraph.substring(2)}</h1>;
          } else if (paragraph.startsWith('## ')) {
            return <h2 key={index} className="text-xl font-semibold mt-6">{paragraph.substring(3)}</h2>;
          } else if (paragraph.startsWith('- ')) {
            const items = paragraph.split('\n').map(item => item.substring(2));
            return (
              <ul key={index} className="list-disc pl-5 space-y-1">
                {items.map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />)}
              </ul>
            );
          } else if (paragraph.match(/^\d\./)) {
            const items = paragraph.split('\n').map(item => item.replace(/^\d\.\s/, ''));
            return (
              <ol key={index} className="list-decimal pl-5 space-y-1">
                {items.map((item, i) => <li key={i}>{item}</li>)}
              </ol>
            );
          } else {
            return <p key={index}>{paragraph}</p>;
          }
        })}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/dashboard" className="text-blue-600 hover:text-blue-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Retour au tableau de bord
        </Link>
      </div>

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

      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">{product.title}</h1>
            <div className="flex items-center">
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800 mr-2">Importé</span>
              <div className="text-sm text-gray-500">
                {formatDate(product.importedAt)}
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <div className="aspect-square bg-gray-100 rounded-md flex items-center justify-center mb-4">
                <div className="text-gray-400 text-center p-2">Image principale</div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {product.images.map((image, index) => (
                  <div key={index} className="aspect-square bg-gray-100 rounded-md flex items-center justify-center">
                    <div className="text-gray-400 text-xs text-center p-1">Image {index + 1}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <div className="mb-6">
                <h2 className="text-lg font-medium mb-2">Informations générales</h2>
                <div className="bg-gray-50 rounded-md p-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <span className="text-sm text-gray-500">Prix:</span>
                      <p className="font-medium">{product.price}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Source:</span>
                      <p className="font-medium capitalize">{product.source}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">URL source:</span>
                      <p>
                        <a href={product.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          Voir sur {product.source}
                        </a>
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">URL Shopify:</span>
                      <p>
                        <a href={product.shopifyUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          Voir sur Shopify
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-lg font-medium mb-2">Spécifications</h2>
                <div className="bg-gray-50 rounded-md p-4">
                  <div className="grid grid-cols-1 gap-2">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex">
                        <span className="text-sm text-gray-500 w-1/3">{key}:</span>
                        <span className="text-sm w-2/3">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-2">Description</h2>
            <div className="bg-gray-50 rounded-md p-4 prose max-w-none">
              {renderMarkdown(product.description)}
            </div>
          </div>
          
          <div className="flex justify-between">
            <div>
              <button
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mr-2"
                onClick={() => {}}
              >
                Modifier
              </button>
              <button
                className="bg-white text-gray-700 py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                onClick={() => {}}
              >
                Réimporter
              </button>
            </div>
            <button
              className="bg-red-50 text-red-700 py-2 px-4 border border-red-200 rounded-md hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              onClick={() => {}}
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
