const { Pool } = require('pg');

// Configuración de PostgreSQL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Crear tabla de usuarios si no existe
async function initDatabase() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                phone VARCHAR(20) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                referral_code VARCHAR(10) UNIQUE,
                referred_by VARCHAR(20),
                total_referrals INTEGER DEFAULT 0,
                balance DECIMAL(10, 2) DEFAULT 0,
                earnings DECIMAL(10, 2) DEFAULT 0,
                level INTEGER DEFAULT 1,
                purchased_products JSONB DEFAULT '{}',
                custom_prices JSONB DEFAULT '{}',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('✅ Base de datos PostgreSQL inicializada');
    } catch (error) {
        console.error('❌ Error al inicializar base de datos:', error);
    }
}

// Obtener todos los usuarios
async function getAllUsers() {
    try {
        const result = await pool.query('SELECT * FROM users ORDER BY id');
        return result.rows.map(formatUser);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        throw error;
    }
}

// Obtener usuario por teléfono
async function getUserByPhone(phone) {
    try {
        const result = await pool.query('SELECT * FROM users WHERE phone = $1', [phone]);
        return result.rows.length > 0 ? formatUser(result.rows[0]) : null;
    } catch (error) {
        console.error('Error al buscar usuario:', error);
        throw error;
    }
}

// Obtener usuario por código de referido
async function getUserByReferralCode(code) {
    try {
        const result = await pool.query('SELECT * FROM users WHERE referral_code = $1', [code]);
        return result.rows.length > 0 ? formatUser(result.rows[0]) : null;
    } catch (error) {
        console.error('Error al buscar por código de referido:', error);
        throw error;
    }
}

// Crear nuevo usuario
async function createUser(userData) {
    try {
        const result = await pool.query(
            `INSERT INTO users (
                name, phone, password, referral_code, referred_by, 
                total_referrals, balance, earnings, level, 
                purchased_products, custom_prices, created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) 
            RETURNING *`,
            [
                userData.name,
                userData.phone,
                userData.password,
                userData.referralCode,
                userData.referredBy || null,
                userData.totalReferrals || 0,
                userData.balance || 0,
                userData.earnings || 0,
                userData.level || 1,
                JSON.stringify(userData.purchasedProducts || {}),
                JSON.stringify(userData.customPrices || {}),
                userData.createdAt || new Date().toISOString()
            ]
        );
        return formatUser(result.rows[0]);
    } catch (error) {
        console.error('Error al crear usuario:', error);
        throw error;
    }
}

// Actualizar usuario
async function updateUser(id, updates) {
    try {
        const fields = [];
        const values = [];
        let paramCount = 1;

        if (updates.balance !== undefined) {
            fields.push(`balance = $${paramCount++}`);
            values.push(updates.balance);
        }
        if (updates.earnings !== undefined) {
            fields.push(`earnings = $${paramCount++}`);
            values.push(updates.earnings);
        }
        if (updates.level !== undefined) {
            fields.push(`level = $${paramCount++}`);
            values.push(updates.level);
        }
        if (updates.purchasedProducts !== undefined) {
            fields.push(`purchased_products = $${paramCount++}`);
            values.push(JSON.stringify(updates.purchasedProducts));
        }
        if (updates.customPrices !== undefined) {
            fields.push(`custom_prices = $${paramCount++}`);
            values.push(JSON.stringify(updates.customPrices));
        }
        if (updates.totalReferrals !== undefined) {
            fields.push(`total_referrals = $${paramCount++}`);
            values.push(updates.totalReferrals);
        }

        if (fields.length === 0) {
            throw new Error('No hay campos para actualizar');
        }

        values.push(id);
        const query = `UPDATE users SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`;
        
        const result = await pool.query(query, values);
        return result.rows.length > 0 ? formatUser(result.rows[0]) : null;
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        throw error;
    }
}

// Eliminar usuario
async function deleteUser(id) {
    try {
        const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
        return result.rows.length > 0 ? formatUser(result.rows[0]) : null;
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        throw error;
    }
}

// Formatear usuario de PostgreSQL a formato de la API
function formatUser(row) {
    return {
        id: row.id,
        name: row.name,
        phone: row.phone,
        password: row.password,
        referralCode: row.referral_code,
        referredBy: row.referred_by,
        totalReferrals: row.total_referrals,
        balance: parseFloat(row.balance),
        earnings: parseFloat(row.earnings),
        level: row.level,
        purchasedProducts: typeof row.purchased_products === 'string' 
            ? JSON.parse(row.purchased_products) 
            : row.purchased_products,
        customPrices: typeof row.custom_prices === 'string' 
            ? JSON.parse(row.custom_prices) 
            : row.custom_prices,
        createdAt: row.created_at
    };
}

module.exports = {
    initDatabase,
    getAllUsers,
    getUserByPhone,
    getUserByReferralCode,
    createUser,
    updateUser,
    deleteUser
};
