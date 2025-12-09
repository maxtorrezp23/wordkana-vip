# ✅ Checklist de Pruebas - Panel de Administración

## Estado del Sistema
- [x] JSON Server corriendo en puerto 3000
- [x] Archivos actualizados: admin.html, admin.css, admin.js, tienda.js
- [x] Sin errores de sintaxis

---

## 🧪 Pruebas a Realizar

### 1. Panel de Administración - Vista General
- [ ] Iniciar sesión con admin: 00000000 / admin123
- [ ] Verificar que la tabla muestra la columna **"VIP"**
- [ ] Verificar que cada usuario tiene un badge VIP (ej: VIP 1, VIP 2, etc.)
- [ ] Verificar que hay 4 botones por usuario:
  - [ ] 💵 Agregar Saldo (verde)
  - [ ] 💸 Retirar Ganancias (naranja)
  - [ ] 🎖️ Cambiar VIP (morado)
  - [ ] 💰 Editar Precios (azul)

---

### 2. Funcionalidad: Cambiar VIP
- [ ] Hacer clic en botón **"🎖️ Cambiar VIP"** de cualquier usuario
- [ ] Verificar que se abre el modal con:
  - [ ] Nombre del usuario
  - [ ] Nivel VIP actual
  - [ ] Dropdown con opciones VIP 1 a VIP 10
- [ ] Seleccionar un nuevo nivel VIP diferente
- [ ] Hacer clic en **"Confirmar Cambio"**
- [ ] Verificar mensaje de éxito: "VIP cambiado exitosamente a VIP X"
- [ ] Verificar que el badge VIP del usuario se actualiza en la tabla
- [ ] Verificar que aparece en el historial: "Cambio de VIP X a VIP Y"

#### Prueba en la Tienda del Usuario:
- [ ] Iniciar sesión con el usuario cuyo VIP fue cambiado
- [ ] Verificar que aparecen los 20 productos del nuevo nivel VIP
- [ ] Verificar que el contador muestra: "0/20 productos comprados"
- [ ] Verificar que el nivel VIP se muestra correctamente en la UI

---

### 3. Funcionalidad: Editar Precios
- [ ] Hacer clic en botón **"💰 Editar Precios"** de cualquier usuario
- [ ] Verificar que se abre el modal con:
  - [ ] Nombre del usuario
  - [ ] Nivel VIP actual
  - [ ] Lista de 20 productos del nivel actual
  - [ ] Cada producto muestra:
    - [ ] Nombre del producto
    - [ ] Precio base (ej: "Precio base: 50 Bs")
    - [ ] Input con precio actual/personalizado
- [ ] Modificar el precio de al menos 3 productos diferentes
- [ ] Hacer clic en **"Guardar Precios"**
- [ ] Verificar mensaje de éxito: "Precios actualizados exitosamente"
- [ ] Verificar que aparece en el historial: "Precios personalizados aplicados para VIP X"

#### Prueba en la Tienda del Usuario:
- [ ] Iniciar sesión con el usuario cuyos precios fueron editados
- [ ] Verificar que los productos modificados muestran los nuevos precios
- [ ] Verificar que los productos NO modificados muestran el precio base
- [ ] Hacer clic en un producto con precio personalizado
- [ ] Verificar que el modal de producto muestra el precio personalizado

---

### 4. Integración: Comprar Producto con Precio Personalizado
- [ ] Con el usuario cuyo precio fue personalizado, hacer una compra
- [ ] Verificar que el saldo se descuenta según el precio personalizado
- [ ] Verificar que la ganancia se calcula correctamente (precio * 1.20)
- [ ] Verificar que el progreso se actualiza (ej: "1/20 productos comprados")

---

### 5. Integración: Cambio de VIP con Precios Personalizados
Escenario:
1. Usuario tiene precios personalizados en VIP 3
2. Admin cambia el usuario a VIP 5
3. Admin edita precios en VIP 5
4. Admin vuelve a cambiar el usuario a VIP 3

Pruebas:
- [ ] Crear precios personalizados para usuario en VIP 3
- [ ] Cambiar usuario a VIP 5
- [ ] Verificar que los productos de VIP 5 tienen precios base
- [ ] Editar algunos precios en VIP 5
- [ ] Cambiar usuario de vuelta a VIP 3
- [ ] Verificar que los precios personalizados de VIP 3 se mantienen
- [ ] Cambiar nuevamente a VIP 5
- [ ] Verificar que los precios personalizados de VIP 5 se recuperan

---

### 6. Validaciones
- [ ] Intentar ingresar precio negativo → debe prevenir o mostrar error
- [ ] Intentar ingresar precio 0 → debe prevenir o mostrar error
- [ ] Intentar ingresar precio con muchos decimales → debe aceptar solo 2 decimales
- [ ] Cerrar modal sin guardar → los cambios no deben aplicarse

---

### 7. LocalStorage
Verificar que se crean las siguientes claves:

Para usuario con teléfono +59170000000:
- [ ] `level_+59170000000`: Nivel VIP (1-10)
- [ ] `purchased_+59170000000_level1`: Array de productos comprados en VIP 1
- [ ] `custom_prices_+59170000000_level1`: Objeto con precios personalizados VIP 1
- [ ] `balance_+59170000000`: Saldo actual
- [ ] `earnings_+59170000000`: Ganancias acumuladas

Abrir DevTools → Application → Local Storage → file://

---

### 8. Historial de Transacciones
- [ ] Verificar que el historial muestra todos los eventos
- [ ] Verificar formato de "Cambio de VIP": "Cambio de VIP 3 a VIP 5"
- [ ] Verificar formato de "Precios editados": "Precios personalizados aplicados para VIP X"
- [ ] Verificar que se puede filtrar por tipo de transacción
- [ ] Verificar que las fechas se muestran correctamente

---

### 9. Responsive Design
- [ ] Abrir en pantalla pequeña (< 768px)
- [ ] Verificar que los modales se adaptan correctamente
- [ ] Verificar que la tabla de usuarios tiene scroll horizontal
- [ ] Verificar que los botones son clickables en móvil

---

### 10. Compatibilidad entre Usuarios
- [ ] Crear 3 usuarios diferentes
- [ ] Asignar VIP diferente a cada uno (VIP 2, VIP 5, VIP 7)
- [ ] Editar precios diferentes para cada usuario
- [ ] Iniciar sesión con cada usuario
- [ ] Verificar que cada uno ve sus propios precios personalizados
- [ ] Verificar que los productos y niveles son independientes

---

## 🐛 Bugs Conocidos
(Dejar vacío inicialmente, llenar después de las pruebas)

---

## 📝 Notas de Prueba
(Agregar observaciones durante las pruebas)

---

## ✅ Conclusión de Pruebas

Fecha de prueba: _______________________
Probado por: __________________________

**Resultado general**: ☐ Aprobado  ☐ Fallido  ☐ Pendiente

**Funcionalidades críticas**:
- [ ] Cambio de VIP funciona correctamente
- [ ] Edición de precios funciona correctamente
- [ ] Precios personalizados se aplican en la tienda
- [ ] Historial registra todas las acciones
- [ ] LocalStorage guarda datos correctamente

**Observaciones adicionales**:
_____________________________________________________________
_____________________________________________________________
_____________________________________________________________
