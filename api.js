// API para comunicarse con la base de datos
// Detectar si estamos en producción o desarrollo
const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000/api' 
    : window.location.origin + '/api';

console.log('API_URL configurada:', API_URL);

// Obtener todos los usuarios
async function getAllUsers() {
    try {
        const response = await fetch(`${API_URL}/users`);
        if (!response.ok) throw new Error('Error al obtener usuarios');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

// Obtener usuario por teléfono
async function getUserByPhone(phone) {
    try {
        const response = await fetch(`${API_URL}/users?phone=${encodeURIComponent(phone)}`);
        if (!response.ok) throw new Error('Error al buscar usuario');
        const users = await response.json();
        return users.length > 0 ? users[0] : null;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

// Crear nuevo usuario
async function createUser(userData) {
    try {
        const response = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        if (!response.ok) throw new Error('Error al crear usuario');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// Verificar credenciales de login
async function verifyLogin(phone, password) {
    try {
        const user = await getUserByPhone(phone);
        if (user && user.password === password) {
            return user;
        }
        return null;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

// Verificar si un teléfono ya está registrado
async function phoneExists(phone) {
    try {
        const user = await getUserByPhone(phone);
        return user !== null;
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}

// Obtener usuario por código de referido
async function getUserByReferralCode(referralCode) {
    try {
        const response = await fetch(`${API_URL}/users?referralCode=${encodeURIComponent(referralCode)}`);
        if (!response.ok) throw new Error('Error al buscar código de referido');
        const users = await response.json();
        return users.length > 0 ? users[0] : null;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

// Actualizar usuario
async function updateUser(userId, userData) {
    try {
        const response = await fetch(`${API_URL}/users/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        if (!response.ok) throw new Error('Error al actualizar usuario');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
