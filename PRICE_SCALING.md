# 💰 Sistema de Escalado de Precios por Nivel VIP

## 📊 Descripción General

Se ha implementado un sistema de escalado de precios donde los productos aumentan su costo de forma **FIJA** a partir del **VIP 2**. Todos los productos tienen un incremento de **600%** (7x el precio base).

---

## � Multiplicadores por Nivel

| Nivel VIP | Multiplicador | Ejemplo (50 Bs base) |
|-----------|--------------|----------------------|
| VIP 1     | 1.0x         | 50.00 Bs            |
| VIP 2     | 7.0x         | 350.00 Bs           |
| VIP 3     | 7.0x         | 350.00 Bs           |
| VIP 4     | 7.0x         | 350.00 Bs           |
| VIP 5     | 7.0x         | 350.00 Bs           |
| VIP 6     | 7.0x         | 350.00 Bs           |
| VIP 7     | 7.0x         | 350.00 Bs           |
| VIP 8     | 7.0x         | 350.00 Bs           |
| VIP 9     | 7.0x         | 350.00 Bs           |
| VIP 10    | 7.0x         | 350.00 Bs           |

---

## 🎯 Características del Sistema

### ✨ Incremento Fijo
- Todos los productos a partir de VIP 2 tienen un incremento de **600%**
- Precio final = Precio base × 7
- **VIP 1 mantiene precios originales** (sin incremento)

### 🔒 Consistencia
- Los precios son consistentes para todos los usuarios
- Los precios NO cambian al recargar la página
- Fácil de calcular: solo multiplicar por 7

### 🎨 Simplicidad
- Sistema simple y predecible
- Todos los productos del mismo nivel tienen el mismo multiplicador
- Facilita la administración de precios

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Productos en VIP 1
```
Smartphone Samsung A15 (50 Bs) → 50 Bs (sin cambio)
Laptop HP 15" (55 Bs) → 55 Bs (sin cambio)
Auriculares JBL (25 Bs) → 25 Bs (sin cambio)
```

### Ejemplo 2: Productos en VIP 2+
```
Smartphone Samsung A15 (50 Bs) → 350 Bs (7x, +600%)
Laptop HP 15" (55 Bs) → 385 Bs (7x, +600%)
Auriculares JBL (25 Bs) → 175 Bs (7x, +600%)
```

### Ejemplo 3: Mismo producto en diferentes niveles
```
"Smartphone Samsung" (precio base: 50 Bs)

VIP 1: 50.00 Bs (sin cambio)
VIP 2: 350.00 Bs (+600%)
VIP 3: 350.00 Bs (+600%)
VIP 5: 350.00 Bs (+600%)
VIP 10: 350.00 Bs (+600%)
```

### Ejemplo 4: Con Precio Personalizado
```
Producto: Smartphone Samsung
Precio base: 50 Bs
Nivel: VIP 5
Precio calculado: 350.00 Bs (+600%)
Precio personalizado por admin: 400 Bs
Precio final: 400.00 Bs ✅ (ignora el cálculo automático)
```

---

## 🔧 Implementación Técnica

### Algoritmo de Generación

```javascript
function getRandomPriceMultiplier(level, productName) {
    if (level === 1) {
        return 1.0; // VIP 1: sin cambios
    }
    
    // A partir de VIP 2: incremento fijo de 600% (7x el precio base)
    return 7.0;
}
        2: { min: 1.05, max: 1.20 },
        3: { min: 1.10, max: 1.30 },
        // ... más niveles
    };
    
    // Calcular multiplicador dentro del rango
    const range = ranges[level];
    const random = seed / 1000;
    const multiplier = range.min + (random * (range.max - range.min));
    
    return multiplier;
}
```

### ¿Por qué es consistente?
- El seed se calcula sumando los valores ASCII del nombre del producto
- Se multiplica por el nivel VIP para variación entre niveles
- Se usa módulo 1000 para obtener un valor entre 0-999
- Este valor se normaliza a 0-1 y se mapea al rango

**Resultado:** Mismo producto + mismo nivel = mismo precio siempre

---

## 📊 Impacto por Nivel VIP (Aproximado)

### VIP 1
- Total nivel: ~600 Bs (sin cambios)
- Productos: 20 items
- Variación: 0%

### VIP 2
- Total nivel: ~700-840 Bs (rango +5% a +20%)
- Productos: 20 items
- Cada producto varía de forma única

### VIP 5
- Total nivel: ~840-980 Bs (rango +20% a +40%)
- Productos: 20 items
- Mayor diversidad de precios

### VIP 10
- Total nivel: ~1050-1400 Bs (rango +50% a +100%)
- Productos: 20 items
- Máxima variación de precios

**Nota:** Los totales son aproximados ya que cada producto tiene un multiplicador único.

---

## 🎮 Ventajas del Sistema Aleatorio

### 1. Mayor Realismo
- Los precios en tiendas reales varían entre productos
- No todos los productos suben igual
- Experiencia más natural para el usuario

### 2. Estrategia de Compra
- Los usuarios pueden buscar "gangas" (productos con menor aumento)
- O productos premium (mayor aumento = mayor ganancia 120%)
- Añade elemento estratégico al juego

### 3. Diversidad Visual
- La tienda se ve más variada
- Precios diferentes hacen más interesante la navegación
- No hay monotonía en los precios

### 4. Dificultad Progresiva
- VIP 1: Fácil y predecible
- VIP 5: Moderado con variación
- VIP 10: Difícil con alta variación

---

## ⚙️ Configuración y Ajustes

Para modificar los rangos de variación, edita la función `getRandomPriceMultiplier()` en:
- `/tienda.js` (línea ~256)
- `/admin.js` (línea ~364)

**Ejemplo de ajuste:**
```javascript
// Para hacer VIP 2 con menos variación (+8% a +15% en vez de +5% a +20%)
2: { min: 1.08, max: 1.15 },

// Para hacer VIP 10 con más variación (+50% a +150% en vez de +50% a +100%)
10: { min: 1.50, max: 2.50 }
```

---

## 🧪 Pruebas Recomendadas

1. ✅ Crear usuario en VIP 1, verificar precios base (sin variación)
2. ✅ Subir usuario a VIP 2, confirmar que cada producto tiene un precio diferente
3. ✅ Verificar que los precios están dentro del rango (+5% a +20%)
4. ✅ Recargar la página y confirmar que los precios NO cambian (consistencia)
5. ✅ Subir a VIP 5, verificar mayor variación de precios
6. ✅ Admin edita precio personalizado en VIP 5
7. ✅ Verificar que precio personalizado ignora el cálculo aleatorio
8. ✅ Cambiar usuario de VIP 5 a VIP 1
9. ✅ Confirmar que precios vuelven a valores base
10. ✅ Volver a VIP 5 y verificar que los precios aleatorios son los mismos que antes

---

## 📝 Notas Importantes

- ⚠️ Los precios aleatorios son **consistentes** (no cambian al recargar)
- ⚠️ Cada producto tiene un multiplicador **único** dentro del rango del nivel
- ⚠️ Los precios personalizados **NO se ven afectados** por el multiplicador aleatorio
- ⚠️ Al cambiar de nivel VIP, se recalculan los precios con los nuevos rangos
- ⚠️ Los productos comprados **NO cambian de precio** retroactivamente
- ⚠️ Las ganancias se calculan sobre el precio FINAL (con multiplicador o personalizado)
- ✨ Mismo producto + mismo nivel = **siempre el mismo precio**
- 🎲 Diferentes productos = **diferentes aumentos** dentro del rango

---

## 🎯 Comparación: Sistema Anterior vs Nuevo

### Sistema Anterior (Fijo)
```
VIP 5 - Todos los productos: +25%
Smartphone: 50 Bs → 62.50 Bs
Laptop: 100 Bs → 125.00 Bs
Auriculares: 25 Bs → 31.25 Bs
```
✅ Predecible
❌ Monótono
❌ Menos realista

### Sistema Nuevo (Aleatorio)
```
VIP 5 - Cada producto varía (+20% a +40%)
Smartphone: 50 Bs → 64.00 Bs (+28%)
Laptop: 100 Bs → 138.50 Bs (+38.5%)
Auriculares: 25 Bs → 30.25 Bs (+21%)
```
✅ Realista
✅ Variado
✅ Estratégico
❌ Menos predecible

---

**Fecha de implementación**: 8 de diciembre de 2025
**Versión**: 2.2 - Sistema de Escalado Aleatorio
**Estado**: ✅ Activo
