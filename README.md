# Sistema de Login con Base de Datos

Este proyecto utiliza JSON Server como base de datos para almacenar usuarios.

## Instalación

1. Asegúrate de tener Node.js instalado en tu sistema
2. Abre la terminal en esta carpeta
3. Ejecuta: `npm install`

## Uso

### Iniciar el servidor de base de datos:
```bash
npm start
```

El servidor se iniciará en http://localhost:3000

### Usar la aplicación:
1. Inicia el servidor con `npm start`
2. Abre `login.html` en tu navegador
3. Registra nuevos usuarios o inicia sesión

## Archivos

- `login.html` - Interfaz de usuario
- `style.css` - Estilos
- `script.js` - Lógica del frontend
- `api.js` - Funciones de API para comunicarse con la base de datos
- `db.json` - Base de datos JSON
- `package.json` - Configuración de dependencias

## Características

✅ Registro de usuarios con número de teléfono boliviano
✅ Inicio de sesión seguro
✅ Almacenamiento persistente en base de datos
✅ Validación de datos
✅ Interfaz responsive
