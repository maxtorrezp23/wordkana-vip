const express = require('express');
const path = require('path');
const jsonServer = require('json-server');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Servir archivos estáticos
app.use(express.static(path.join(__dirname)));

// Verificar si hay DATABASE_URL (PostgreSQL)
const usePostgres = !!process.env.DATABASE_URL;

if (usePostgres) {
    console.log('🐘 Usando PostgreSQL');
    const db = require('./database');
    
    // Inicializar base de datos
    db.initDatabase().catch(console.error);
    
    // Rutas de API con PostgreSQL
    app.get('/api/users', async (req, res) => {
        try {
            if (req.query.phone) {
                const user = await db.getUserByPhone(req.query.phone);
                res.json(user ? [user] : []);
            } else if (req.query.referralCode) {
                const user = await db.getUserByReferralCode(req.query.referralCode);
                res.json(user ? [user] : []);
            } else {
                const users = await db.getAllUsers();
                res.json(users);
            }
        } catch (error) {
            console.error('Error en GET /api/users:', error);
            res.status(500).json({ error: 'Error al obtener usuarios' });
        }
    });
    
    app.post('/api/users', async (req, res) => {
        try {
            const newUser = await db.createUser(req.body);
            res.status(201).json(newUser);
        } catch (error) {
            console.error('Error en POST /api/users:', error);
            res.status(500).json({ error: 'Error al crear usuario' });
        }
    });
    
    app.patch('/api/users/:id', async (req, res) => {
        try {
            const updatedUser = await db.updateUser(parseInt(req.params.id), req.body);
            res.json(updatedUser);
        } catch (error) {
            console.error('Error en PATCH /api/users/:id:', error);
            res.status(500).json({ error: 'Error al actualizar usuario' });
        }
    });
    
} else {
    console.log('📄 Usando JSON Server (desarrollo)');
    // API con json-server para desarrollo local
    const router = jsonServer.router('db.json');
    const middlewares = jsonServer.defaults();
    
    app.use('/api', middlewares);
    app.use('/api', router);
}

// Redirigir solo la raíz a login.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`🌐 API available at http://localhost:${PORT}/api`);
    if (usePostgres) {
        console.log(`💾 Database: PostgreSQL`);
    } else {
        console.log(`💾 Database: JSON (db.json)`);
    }
});
