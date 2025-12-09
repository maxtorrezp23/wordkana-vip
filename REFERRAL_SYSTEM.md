# 🎁 Sistema de Referidos - Wordkana

## Descripción General

El sistema de referidos permite a los usuarios invitar amigos y recibir bonos por cada registro exitoso. Es una herramienta de crecimiento que beneficia tanto al referente como al nuevo usuario.

## Características Principales

### ✅ Código Único por Usuario
- Cada usuario recibe un código de 6 caracteres al registrarse
- Formato: 4 últimos dígitos del teléfono + 2 caracteres aleatorios
- Ejemplo: Teléfono `+59177080900` → Código `0900AB`

### 💰 Sistema de Bonos

#### Para el Referente (quien invita):
- **Bono**: 10 Bs por cada amigo registrado
- **Acumulable**: Sin límite de referidos
- **Instantáneo**: Se acredita automáticamente al registro

#### Para el Nuevo Usuario (referido):
- **Bono de Bienvenida**: 5 Bs al usar código de referido
- **Opcional**: No es obligatorio usar un código
- **Propio Código**: Recibe su código para compartir

### 📊 Estadísticas y Seguimiento
- Contador de referidos totales
- Ganancias acumuladas por referidos
- Visualización en modal dedicado

## Flujo de Funcionamiento

### 1. Registro con Código de Referido

```
Usuario Nuevo
    ↓
Ingresa Código (opcional)
    ↓
Sistema Valida Código
    ↓
[Código Válido] → Crea usuario + Aplica bonos
[Código Inválido] → Muestra error
[Sin Código] → Crea usuario sin bonos
```

### 2. Proceso de Validación

```javascript
// 1. Usuario ingresa código al registrarse
referralCode = "0900AB"

// 2. Sistema busca el código en la base de datos
referrerUser = getUserByReferralCode("0900AB")

// 3. Si existe, se crea la relación
newUser.referredBy = referrerUser.phone

// 4. Se aplican los bonos
referrerUser.balance += 10  // Bono para referente
newUser.balance = 5         // Bono inicial para nuevo usuario
referrerUser.totalReferrals += 1  // Contador +1
```

### 3. Visualización del Código

Los usuarios pueden ver su código en:
1. **Mensaje de Bienvenida**: Al completar el registro
2. **Modal de Referidos**: Botón "🎁 Referidos" en tienda.html
3. **Copiar al Portapapeles**: Un clic para compartir

## Implementación Técnica

### Base de Datos (db.json)

```json
{
  "users": [
    {
      "id": 1,
      "name": "Juan Pérez",
      "phone": "+59177080900",
      "password": "123456",
      "referralCode": "0900AB",
      "referredBy": "+59160000000",
      "totalReferrals": 3,
      "createdAt": "2025-12-08T20:34:44.991Z"
    }
  ]
}
```

### Campos Nuevos

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `referralCode` | String | Código único de 6 caracteres |
| `referredBy` | String/null | Teléfono del referente (null si no fue referido) |
| `totalReferrals` | Number | Cantidad de personas referidas |

### API Functions (api.js)

```javascript
// Buscar usuario por código de referido
async function getUserByReferralCode(referralCode) {
    const response = await fetch(`${API_URL}/users?referralCode=${referralCode}`);
    const users = await response.json();
    return users.length > 0 ? users[0] : null;
}

// Actualizar usuario
async function updateUser(userId, userData) {
    const response = await fetch(`${API_URL}/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    });
    return await response.json();
}
```

### Generación de Código (script.js)

```javascript
function generateReferralCode(phone) {
    // Últimos 4 dígitos del teléfono
    const phoneDigits = phone.replace(/\D/g, '').slice(-4);
    
    // 2 caracteres aleatorios (A-Z, 0-9)
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomChars = '';
    for (let i = 0; i < 2; i++) {
        randomChars += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    return phoneDigits + randomChars;
}
```

## Interfaz de Usuario

### Modal de Referidos (tienda.html)

El modal incluye:

1. **Sección de Código**
   - Código grande y legible
   - Botón "📋 Copiar" con feedback visual
   - Texto explicativo

2. **Estadísticas**
   - Total de referidos (👥)
   - Ganancias por referidos (💰)
   - Diseño en tarjetas

3. **Beneficios**
   - Lista de ventajas del sistema
   - Iconos visuales
   - Información clara sobre bonos

### Estilos (tienda.css)

```css
.modal-referral {
    max-width: 600px;
    padding: 40px;
}

.referral-code-section {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 30px;
    border-radius: 15px;
    color: white;
}

.code-text {
    font-size: 32px;
    font-weight: 700;
    letter-spacing: 4px;
}

.btn-copy-code {
    background: rgba(255, 255, 255, 0.9);
    color: #667eea;
    cursor: pointer;
}
```

## Casos de Uso

### Caso 1: Registro sin Código
```
Usuario: María
Acción: Registra sin código de referido
Resultado:
  - Saldo inicial: 0 Bs
  - Código propio: "5678CD"
  - referredBy: null
```

### Caso 2: Registro con Código Válido
```
Usuario: Pedro
Código ingresado: "0900AB" (de Juan)
Resultado:
  - Pedro saldo inicial: 5 Bs
  - Pedro código propio: "1234EF"
  - Pedro referredBy: "+59177080900"
  - Juan balance: +10 Bs
  - Juan totalReferrals: +1
```

### Caso 3: Código Inválido
```
Usuario: Ana
Código ingresado: "XXXXXX" (no existe)
Resultado:
  - Muestra error: "El código de referido no es válido"
  - No se completa el registro
  - Solicita verificar el código
```

## Ventajas del Sistema

### Para la Plataforma
✅ **Crecimiento Orgánico**: Los usuarios invitan a sus contactos
✅ **Bajo Costo**: No requiere publicidad pagada
✅ **Mayor Engagement**: Usuarios activos que comparten
✅ **Base de Datos Creciente**: Más usuarios = más ventas

### Para los Usuarios
✅ **Ganancias Pasivas**: 10 Bs por cada referido
✅ **Sin Límites**: Pueden referir a todos sus contactos
✅ **Bono Inmediato**: Se acredita automáticamente
✅ **Fácil de Compartir**: Un clic para copiar código

### Para los Nuevos Usuarios
✅ **Bono de Bienvenida**: 5 Bs para empezar
✅ **Sin Obligación**: Es opcional usar código
✅ **Propio Código**: Pueden referir también

## Seguridad y Validaciones

### ✅ Validaciones Implementadas

1. **Código Existe**: Verifica en base de datos antes de aceptar
2. **Usuario Único**: No permite referir al mismo teléfono dos veces
3. **Código Único**: Cada usuario tiene un código diferente
4. **Bonos Automáticos**: Se aplican solo una vez por registro

### 🔒 Consideraciones de Seguridad

- Los códigos son públicos (no contienen información sensible)
- No se puede auto-referir (mismo teléfono)
- Los bonos se validan en backend
- Sistema de auditoría con `totalReferrals`

## Métricas y Análisis

### Indicadores de Éxito

```javascript
// Total de usuarios referidos
const totalReferred = users.filter(u => u.referredBy !== null).length;

// Usuario con más referidos
const topReferrer = users.reduce((max, user) => 
    user.totalReferrals > max.totalReferrals ? user : max
);

// Tasa de conversión
const conversionRate = (totalReferred / totalUsers) * 100;
```

## Futuras Mejoras

### 🚀 Funcionalidades Potenciales

- [ ] Niveles de referidos (Bronze, Silver, Gold)
- [ ] Bonos escalonados (más referidos = mayor bono)
- [ ] Códigos promocionales especiales
- [ ] Tabla de posiciones de referentes
- [ ] Notificaciones cuando alguien usa tu código
- [ ] Compartir código directo a WhatsApp
- [ ] Historial de referidos con nombres y fechas

## Soporte

Para consultas sobre el sistema de referidos:
- WhatsApp: +591 75605713
- Horario: 24/7

---

**Versión**: 1.0
**Fecha**: Diciembre 2025
**Autor**: Sistema Wordkana
