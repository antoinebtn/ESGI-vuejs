import { Request, Response } from 'express';
import crypto from 'crypto';
import {db} from "../service/db.service";

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Tous les champs sont requis (nom, email et mot de passe)'
    });
  }

  try {
    const conn = await db.getConnection();
    const existingUser = await conn.query('SELECT * FROM users WHERE email = ?', [email]);

    if (existingUser.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Un utilisateur avec cet email existe déjà'
      });
    }

    const hashedPassword = hashPassword(password);

    const result = await conn.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    const responseData = JSON.parse(JSON.stringify(result, (key, value) =>
        typeof value === 'bigint' ? Number(value) : value
    ));



    return res.status(201).json({
      success: true,
      message: 'Utilisateur créé avec succès',
      data: responseData
    });

  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'inscription'
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Validation des champs requis
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email et mot de passe requis'
    });
  }

  try {
    const conn = await db.getConnection();
    const users = await conn.query('SELECT * FROM users WHERE email = ?', [email]);

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Email ou mot de passe incorrect'
      });
    }

    const user = users[0];
    const hashedPassword = hashPassword(password);

    if (hashedPassword !== user.password) {
      return res.status(401).json({
        success: false,
        message: 'Email ou mot de passe incorrect'
      });
    }

    return res.json({
      success: true,
      message: 'Connexion réussie',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      }
    });

  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur lors de la connexion'
    });
  }
};

export const logout = (req: Request, res: Response) => {
  return res.json({
    success: true,
    message: 'Déconnexion réussie'
  });
};
