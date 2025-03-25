import { NextRequest, NextResponse } from 'next/server';
import { ProductData } from '@/lib/types';

// Cette fonction simule l'extraction de données depuis Alibaba/AliExpress
// Dans une implémentation réelle, elle appellerait le code Python de l'agent d'importation
async function extractProductDataFromUrl(url: string): Promise<ProductData | null> {
  // Vérifier si l'URL est valide
  if (!url || (!url.includes('alibaba.com') && !url.includes('aliexpress.com'))) {
    return null;
  }

  // Déterminer la plateforme
  const platform = url.includes('alibaba.com') ? 'alibaba' : 'aliexpress';
  
  // Simuler un délai d'extraction
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Générer des données fictives basées sur la plateforme
  if (platform === 'alibaba') {
    return {
      title: "Montre connectée étanche avec moniteur cardiaque et GPS intégré",
      price: "$59.99 - $79.99",
      description: "Cette montre connectée de haute qualité offre de nombreuses fonctionnalités pour suivre votre activité physique quotidienne. Dotée d'un écran tactile HD, elle est résistante à l'eau et dispose d'une autonomie exceptionnelle. Idéale pour les sportifs et les personnes soucieuses de leur santé.",
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
      },
      source_url: url,
      platform: "alibaba"
    };
  } else {
    return {
      title: "Écouteurs sans fil Bluetooth 5.0 avec réduction de bruit active",
      price: "€29.99",
      description: "Ces écouteurs sans fil offrent une qualité sonore exceptionnelle avec leur technologie de réduction de bruit active. Profitez de votre musique préférée sans être dérangé par les bruits extérieurs. Leur design ergonomique assure un confort optimal même lors d'une utilisation prolongée.",
      images: [
        "https://example.com/ecouteurs1.jpg",
        "https://example.com/ecouteurs2.jpg",
        "https://example.com/ecouteurs3.jpg"
      ],
      specifications: {
        "Color": "Blanc, Noir",
        "Bluetooth Version": "5.0",
        "Battery Life": "6 hours (30 hours with charging case)",
        "Charging": "USB-C",
        "Noise Cancellation": "Active",
        "Waterproof": "IPX5",
        "Microphone": "Built-in with echo cancellation",
        "Controls": "Touch sensitive"
      },
      source_url: url,
      platform: "aliexpress"
    };
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = body;
    
    if (!url) {
      return NextResponse.json(
        { error: "L'URL du produit est requise" },
        { status: 400 }
      );
    }
    
    const productData = await extractProductDataFromUrl(url);
    
    if (!productData) {
      return NextResponse.json(
        { error: "Impossible d'extraire les données du produit. Vérifiez que l'URL est valide." },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ product: productData });
  } catch (error) {
    console.error('Erreur lors de l\'extraction des données:', error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'extraction des données" },
      { status: 500 }
    );
  }
}
