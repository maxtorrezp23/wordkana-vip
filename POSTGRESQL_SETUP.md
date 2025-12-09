# Configuración de PostgreSQL en Railway

## Pasos para agregar PostgreSQL a tu proyecto:

1. **Ir a tu proyecto en Railway**
   - Ve a: https://railway.app/
   - Abre tu proyecto "wordkana-vip-production"

2. **Agregar PostgreSQL**
   - Click en "New" → "Database" → "Add PostgreSQL"
   - Railway creará automáticamente una base de datos PostgreSQL

3. **Conectar la base de datos**
   - Railway automáticamente agregará la variable `DATABASE_URL` a tu servicio
   - El servidor detectará esta variable y usará PostgreSQL automáticamente

4. **Verificar la conexión**
   - En los logs de Railway, deberías ver: "🐘 Usando PostgreSQL"
   - La base de datos se inicializará automáticamente con la tabla de usuarios

## Migración de datos existentes

Los usuarios existentes en `db.json` deberán registrarse nuevamente, o puedes:

1. Exportar los usuarios de `db.json`
2. Importarlos manualmente a PostgreSQL usando la consola de Railway

## Ventajas de PostgreSQL

✅ Los datos persisten entre despliegues
✅ Mayor rendimiento
✅ Escalable
✅ Backups automáticos en Railway

## Desarrollo local

En desarrollo local (sin DATABASE_URL), el servidor seguirá usando `db.json` automáticamente.
