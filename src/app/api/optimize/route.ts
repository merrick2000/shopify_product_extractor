import { NextRequest, NextResponse } from 'next/server';
import { ProductData } from '@/lib/types';

// Cette fonction simule l'optimisation des titres et descriptions
// Dans une implémentation réelle, elle appellerait le code Python de l'agent d'importation
async function optimizeContent(productData: ProductData): Promise<{ title: string; description: string }> {
  // Simuler un délai d'optimisation
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Optimiser le titre
  let optimizedTitle = productData.title;
  
  // Limiter la longueur du titre à 70 caractères
  if (optimizedTitle.length > 70) {
    optimizedTitle = optimizedTitle.substring(0, 67) + '...';
  }
  
  // Optimiser la description
  let optimizedDescription = `# ${productData.title}\n\n`;
  optimizedDescription += "## Description du produit\n\n";
  optimizedDescription += `${productData.description}\n\n`;
  
  // Ajouter les caractéristiques techniques
  optimizedDescription += "## Caractéristiques techniques\n\n";
  for (const [key, value] of Object.entries(productData.specifications)) {
    optimizedDescription += `- **${key}**: ${value}\n`;
  }
  optimizedDescription += "\n";
  
  // Ajouter les avantages et bénéfices
  optimizedDescription += "## Avantages et bénéfices\n\n";
  optimizedDescription += "- Design élégant qui s'intègre parfaitement à votre style de vie\n";
  optimizedDescription += "- Excellent rapport qualité-prix pour un produit de cette catégorie\n";
  optimizedDescription += "- Facile à utiliser et à entretenir\n\n";
  
  // Ajouter les conseils d'utilisation
  optimizedDescription += "## Conseils d'utilisation\n\n";
  optimizedDescription += "Pour profiter pleinement de votre produit, suivez ces conseils simples :\n\n";
  optimizedDescription += "1. Vérifiez le produit dès réception pour vous assurer qu'il est en parfait état\n";
  optimizedDescription += "2. Suivez les instructions du fabricant pour l'installation et l'utilisation\n";
  optimizedDescription += "3. Entretenez régulièrement votre produit pour prolonger sa durée de vie\n\n";
  
  // Ajouter la garantie
  optimizedDescription += "## Garantie et service après-vente\n\n";
  optimizedDescription += "Ce produit est couvert par notre garantie satisfaction. ";
  optimizedDescription += "N'hésitez pas à nous contacter pour toute question ou préoccupation concernant votre achat.\n\n";
  
  return {
    title: optimizedTitle,
    description: optimizedDescription
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { product } = body;
    
    if (!product) {
      return NextResponse.json(
        { error: "Les données du produit sont requises" },
        { status: 400 }
      );
    }
    
    const optimizedContent = await optimizeContent(product);
    
    return NextResponse.json(optimizedContent);
  } catch (error) {
    console.error('Erreur lors de l\'optimisation du contenu:', error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'optimisation du contenu" },
      { status: 500 }
    );
  }
}
