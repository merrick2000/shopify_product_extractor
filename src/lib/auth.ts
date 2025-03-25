import { User } from '@/lib/types';

// Simule un stockage d'utilisateurs en mémoire
const users: User[] = [
  {
    id: '1',
    email: 'demo@example.com',
    name: 'Utilisateur Démo'
  }
];

// Simule un stockage de sessions en mémoire
const sessions: Record<string, string> = {};

/**
 * Authentifie un utilisateur avec son email et mot de passe
 * @param email Email de l'utilisateur
 * @param password Mot de passe de l'utilisateur
 * @returns Utilisateur authentifié ou null si échec
 */
export async function authenticateUser(email: string, password: string): Promise<User | null> {
  // Dans une application réelle, vérifier le mot de passe avec bcrypt
  // Pour la démo, accepter n'importe quel mot de passe pour l'utilisateur démo
  if (email === 'demo@example.com') {
    const user = users.find(u => u.email === email);
    return user || null;
  }
  
  return null;
}

/**
 * Crée une session pour un utilisateur authentifié
 * @param userId ID de l'utilisateur
 * @returns Token de session
 */
export async function createSession(userId: string): Promise<string> {
  // Dans une application réelle, utiliser un JWT ou un token sécurisé
  const sessionToken = `session_${Math.random().toString(36).substring(2, 15)}`;
  sessions[sessionToken] = userId;
  return sessionToken;
}

/**
 * Vérifie si une session est valide
 * @param sessionToken Token de session
 * @returns ID de l'utilisateur ou null si session invalide
 */
export async function validateSession(sessionToken: string): Promise<string | null> {
  return sessions[sessionToken] || null;
}

/**
 * Récupère un utilisateur par son ID
 * @param userId ID de l'utilisateur
 * @returns Utilisateur ou null si non trouvé
 */
export async function getUserById(userId: string): Promise<User | null> {
  const user = users.find(u => u.id === userId);
  return user || null;
}

/**
 * Termine une session utilisateur
 * @param sessionToken Token de session
 */
export async function endSession(sessionToken: string): Promise<void> {
  delete sessions[sessionToken];
}
