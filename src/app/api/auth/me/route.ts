import { NextRequest, NextResponse } from 'next/server';
import { validateSession, getUserById } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // Récupérer le token de session depuis les cookies
    const sessionToken = request.cookies.get('session_token')?.value;
    
    if (!sessionToken) {
      return NextResponse.json(
        { error: "Non authentifié" },
        { status: 401 }
      );
    }
    
    // Valider la session
    const userId = await validateSession(sessionToken);
    
    if (!userId) {
      return NextResponse.json(
        { error: "Session invalide" },
        { status: 401 }
      );
    }
    
    // Récupérer les informations de l'utilisateur
    const user = await getUserById(userId);
    
    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      isAuthenticated: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    console.error('Erreur lors de la vérification de l\'authentification:', error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la vérification de l'authentification" },
      { status: 500 }
    );
  }
}
