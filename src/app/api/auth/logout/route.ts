import { NextRequest, NextResponse } from 'next/server';
import { endSession } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    // Récupérer le token de session depuis les cookies
    const sessionToken = request.cookies.get('session_token')?.value;
    
    if (sessionToken) {
      // Terminer la session
      await endSession(sessionToken);
    }
    
    // Créer une réponse et supprimer le cookie de session
    const response = NextResponse.json({
      success: true,
      message: "Déconnexion réussie"
    });
    
    response.cookies.delete('session_token');
    
    return response;
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la déconnexion" },
      { status: 500 }
    );
  }
}
