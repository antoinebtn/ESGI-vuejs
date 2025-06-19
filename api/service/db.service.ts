import mariadb from 'mariadb';
import dotenv from 'dotenv';

// Initialiser dotenv pour charger les variables du .env
dotenv.config();

class DatabaseService {
  private pool: mariadb.Pool;

  constructor() {
    this.pool = mariadb.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'mydb',
      connectionLimit: 5,
      port: parseInt(process.env.DB_PORT || '3306', 10),
    });
  }

  async query(sql: string, params?: any[]): Promise<any[]> {
    let conn;
    try {
      conn = await this.pool.getConnection();
      const rows = await conn.query(sql, params);
      return rows;
    } catch (err) {
      console.error('Erreur lors de la requête:', err);
      throw err;
    } finally {
      if (conn) conn.release();
    }
  }

  async execute(sql: string, params?: any[]): Promise<any> {
    let conn;
    try {
      conn = await this.pool.getConnection();
      const result = await conn.query(sql, params);
      return result;
    } catch (err) {
      console.error('Erreur lors de l\'exécution:', err);
      throw err;
    } finally {
      if (conn) conn.release();
    }
  }

  async close(): Promise<void> {
    await this.pool.end();
  }

  async getConnection(): Promise<mariadb.Connection> {
    return await this.pool.getConnection();
  }
}

export const db = new DatabaseService();