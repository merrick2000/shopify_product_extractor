import { NextRequest, NextResponse } from 'next/server';
import { OptimizedProduct } from '@/lib/types';

// Cette fonction simule l'importation d'un produit dans Shopify
// Dans une implémentation réelle, elle appellerait le code Python de l'agent d'importation
async function importToShopify(product: OptimizedProduct): Promise<{ productId: string; shopifyUrl: string }> {
  // Simuler un délai d'importation
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Générer un ID fictif pour le produit Shopify
  const productId = `gid://shopify/Product/${Math.floor(Math.random() * 10000000)}`;
  
  // Générer une URL fictive pour le produit Shopify
  const handle = product.optimizedTitle
    .toLowerCase()
    .replace(/[^\w\s]/gi, '')
    .replace(/\s+/g, '-');
  const shopifyUrl = `https://votre-boutique.myshopify.com/products/${handle}`;
  
  return {
    productId,
    shopifyUrl
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { product } = body;
    
    if (!product || !product.originalData || !product.optimizedTitle || !product.optimizedDescription) {
      return NextResponse.json(
        { error: "Les données du produit optimisé sont requises" },
        { status: 400 }
      );
    }
    
    const importResult = await importToShopify(product);
    
    return NextResponse.json({
      productId: importResult.productId,
      shopifyUrl: importResult.shopifyUrl,
      success: true,
      message: "Produit importé avec succès dans Shopify"
    });
  } catch (error) {
    console.error('Erreur lors de l\'importation dans Shopify:', error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'importation dans Shopify" },
      { status: 500 }
    );
  }
}
