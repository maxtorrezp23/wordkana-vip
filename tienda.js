// Verificar si el usuario ha iniciado sesión
document.addEventListener('DOMContentLoaded', async function() {
    console.log('=== CARGANDO TIENDA ===');
    
    try {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        console.log('Usuario actual (localStorage):', currentUser);
        
        if (!currentUser) {
            console.log('No hay usuario, redirigiendo a login');
            alert('Debes iniciar sesión primero');
            window.location.href = 'login.html';
            return;
        }
        
        // Cargar datos actualizados desde la base de datos
        let updatedUser = currentUser;
        try {
            const userFromDB = await getUserByPhone(currentUser.phone);
            if (userFromDB) {
                updatedUser = userFromDB;
                // Actualizar localStorage con datos frescos
                localStorage.setItem('currentUser', JSON.stringify(updatedUser));
                console.log('Datos actualizados desde BD:', updatedUser);
            }
        } catch (error) {
            console.error('Error al cargar datos de BD, usando localStorage:', error);
        }
        
        // Mostrar información del usuario
        const userNameElement = document.getElementById('userName');
        if (userNameElement) {
            userNameElement.textContent = updatedUser.name;
            console.log('Nombre de usuario establecido:', updatedUser.name);
        } else {
            console.error('Elemento userName no encontrado');
        }
        
        // Guardar el teléfono del usuario para uso global
        const userPhone = updatedUser.phone;
        console.log('Teléfono del usuario:', userPhone);
        
        // Limpiar localStorage de productos comprados si no coincide con BD
        // Esto previene que datos viejos/corruptos de localStorage interfieran
        if (updatedUser.purchasedProducts) {
            for (let level = 1; level <= 10; level++) {
                const productsInDB = updatedUser.purchasedProducts[`level${level}`];
                const productsInLocalStorage = JSON.parse(localStorage.getItem(`purchased_${userPhone}_level${level}`) || '[]');
                
                // Si hay datos en localStorage pero no en BD, limpiar localStorage
                if (productsInLocalStorage.length > 0 && (!productsInDB || productsInDB.length === 0)) {
                    console.warn(`Limpiando datos corruptos de localStorage para level${level}`);
                    localStorage.removeItem(`purchased_${userPhone}_level${level}`);
                }
            }
        }
        
        // Obtener saldo y datos del usuario desde la base de datos
        let userBalance, userEarnings, userLevel;
        
        // Priorizar datos de la base de datos (sin fallback a 100)
        if (updatedUser.balance !== undefined) {
            userBalance = updatedUser.balance;
        } else {
            userBalance = parseFloat(localStorage.getItem(`balance_${userPhone}`) || 0);
        }
        
        if (updatedUser.earnings !== undefined) {
            userEarnings = updatedUser.earnings;
        } else {
            userEarnings = parseFloat(localStorage.getItem(`earnings_${userPhone}`) || 0);
        }
        
        if (updatedUser.level !== undefined) {
            userLevel = updatedUser.level;
        } else {
            userLevel = parseInt(localStorage.getItem(`level_${userPhone}`) || 1);
        }
        
        console.log('Saldo inicial:', userBalance);
        console.log('Ganancias iniciales:', userEarnings);
        console.log('Nivel VIP:', userLevel);
        
        updateBalance(userBalance);
        updateEarnings(userEarnings);
        
        // Obtener productos comprados en el nivel actual desde la BD o localStorage
        let purchasedProducts = [];
        if (updatedUser.purchasedProducts && updatedUser.purchasedProducts[`level${userLevel}`]) {
            purchasedProducts = updatedUser.purchasedProducts[`level${userLevel}`];
            console.log('Productos comprados cargados desde BD:', purchasedProducts);
        } else {
            purchasedProducts = JSON.parse(localStorage.getItem(`purchased_${userPhone}_level${userLevel}`) || '[]');
            console.log('Productos comprados cargados desde localStorage:', purchasedProducts);
        }
        
        // Definición de productos por VIP (20 productos por cada VIP) con precios realistas en Bs
    const productsByLevel = {
        1: [ // Total: 600 Bs (20 productos)
            { name: 'Smartphone Samsung A15', basePrice: 50, image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400' },
            { name: 'Laptop HP 15"', basePrice: 55, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400' },
            { name: 'Auriculares JBL', basePrice: 25, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400' },
            { name: 'Reloj Casio', basePrice: 20, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400' },
            { name: 'Cámara Canon EOS', basePrice: 35, image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400' },
            { name: 'Teclado Gaming RGB', basePrice: 28, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400' },
            { name: 'Mouse Logitech', basePrice: 15, image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400' },
            { name: 'Monitor LG 24"', basePrice: 30, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400' },
            { name: 'Tablet Samsung', basePrice: 25, image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400' },
            { name: 'Bocinas JBL', basePrice: 17, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400' },
            { name: 'Cargador Inalámbrico', basePrice: 22, image: 'https://images.unsplash.com/photo-1591290619762-c588f3c6c23a?w=400' },
            { name: 'Cable HDMI 4K', basePrice: 18, image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400' },
            { name: 'Funda Laptop', basePrice: 24, image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400' },
            { name: 'Powerbank 20000mAh', basePrice: 32, image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400' },
            { name: 'Hub USB-C 7 puertos', basePrice: 28, image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400' },
            { name: 'Soporte Laptop', basePrice: 26, image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400' },
            { name: 'Mousepad XXL', basePrice: 19, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400' },
            { name: 'Luz LED Ring', basePrice: 38, image: 'https://images.unsplash.com/photo-1611244806085-c11cae0e7672?w=400' },
            { name: 'Adaptador Multi USB', basePrice: 21, image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400' },
            { name: 'Organizador Cables', basePrice: 12, image: 'https://images.unsplash.com/photo-1621447504864-d8686e12698c?w=400' }
        ],
        2: [ // Total: 1600 Bs (20 productos)
            { name: 'TV Smart LG 50"', basePrice: 120, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400' },
            { name: 'PlayStation 5', basePrice: 150, image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400' },
            { name: 'Drone DJI Mini', basePrice: 110, image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400' },
            { name: 'Apple Watch', basePrice: 90, image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400' },
            { name: 'Router WiFi 6', basePrice: 40, image: 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=400' },
            { name: 'Disco Duro 2TB', basePrice: 30, image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400' },
            { name: 'Webcam Logitech 4K', basePrice: 50, image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400' },
            { name: 'Micrófono Blue Yeti', basePrice: 60, image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400' },
            { name: 'Impresora HP', basePrice: 80, image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400' },
            { name: 'Scanner Epson', basePrice: 70, image: 'https://images.unsplash.com/photo-1586864387634-700214f59e3b?w=400' },
            { name: 'Smartwatch Xiaomi', basePrice: 75, image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400' },
            { name: 'Audífonos Sony XM5', basePrice: 95, image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400' },
            { name: 'Kindle Paperwhite', basePrice: 85, image: 'https://images.unsplash.com/photo-1592503254549-d83d24a4dfab?w=400' },
            { name: 'Chromecast 4K', basePrice: 45, image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400' },
            { name: 'Fire TV Stick', basePrice: 55, image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400' },
            { name: 'SSD 1TB Samsung', basePrice: 88, image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400' },
            { name: 'RAM 16GB Corsair', basePrice: 92, image: 'https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?w=400' },
            { name: 'Tarjeta Gráfica GTX', basePrice: 135, image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400' },
            { name: 'Cooler Master RGB', basePrice: 65, image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400' },
            { name: 'Fuente 750W Modular', basePrice: 95, image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400' }
        ],
        3: [ // Total: 1800 Bs (20 productos)
            { name: 'Refrigerador LG', basePrice: 150, image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400' },
            { name: 'Lavadora Samsung', basePrice: 140, image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400' },
            { name: 'Microondas Panasonic', basePrice: 60, image: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=400' },
            { name: 'Licuadora Oster', basePrice: 40, image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=400' },
            { name: 'Cafetera Nespresso', basePrice: 80, image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400' },
            { name: 'Aspiradora Dyson', basePrice: 120, image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400' },
            { name: 'Ventilador Silence', basePrice: 50, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400' },
            { name: 'Plancha Black+Decker', basePrice: 35, image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400' },
            { name: 'Tostadora Philips', basePrice: 30, image: 'https://images.unsplash.com/photo-1604948501466-4e9c339b9c24?w=400' },
            { name: 'Batidora KitchenAid', basePrice: 95, image: 'https://images.unsplash.com/photo-1578269174936-2709b6aeb913?w=400' },
            { name: 'Freidora de Aire', basePrice: 110, image: 'https://images.unsplash.com/photo-1621424913095-74e96f38f979?w=400' },
            { name: 'Procesador Alimentos', basePrice: 85, image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=400' },
            { name: 'Exprimidor Eléctrico', basePrice: 45, image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400' },
            { name: 'Sandwichera Eléctrica', basePrice: 38, image: 'https://images.unsplash.com/photo-1619519553327-f4c98edf0a7c?w=400' },
            { name: 'Arrocera Oster', basePrice: 52, image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=400' },
            { name: 'Hervidor Eléctrico', basePrice: 42, image: 'https://images.unsplash.com/photo-1565114420942-00c5e08b67cb?w=400' },
            { name: 'Olla Presión Eléctrica', basePrice: 98, image: 'https://images.unsplash.com/photo-1556910585-7089c8fd8be6?w=400' },
            { name: 'Purificador de Agua', basePrice: 125, image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400' },
            { name: 'Dispensador Agua', basePrice: 88, image: 'https://images.unsplash.com/photo-1605098293544-25f4c32344c8?w=400' },
            { name: 'Extractor Cocina', basePrice: 75, image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400' }
        ],
        4: [ // Total: 2000 Bs (20 productos)
            { name: 'Bicicleta Trek MTB', basePrice: 200, image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=400' },
            { name: 'Patineta Eléctrica', basePrice: 150, image: 'https://images.unsplash.com/photo-1547447134-cd3f5c716030?w=400' },
            { name: 'Casco Fox Racing', basePrice: 60, image: 'https://images.unsplash.com/photo-1557438159-51eec7a6c9e8?w=400' },
            { name: 'Mochila North Face', basePrice: 80, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400' },
            { name: 'Carpa 4 Personas', basePrice: 120, image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400' },
            { name: 'Sleeping Bag -10°C', basePrice: 90, image: 'https://images.unsplash.com/photo-1609766149689-f7e37ea57ea0?w=400' },
            { name: 'Linterna Táctica LED', basePrice: 40, image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400' },
            { name: 'Binoculares Nikon', basePrice: 110, image: 'https://images.unsplash.com/photo-1502598284565-cb7791159c0d?w=400' },
            { name: 'Brújula Profesional', basePrice: 50, image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400' },
            { name: 'Cantimplora 2L', basePrice: 100, image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400' },
            { name: 'Cuerda Escalada 50m', basePrice: 95, image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=400' },
            { name: 'Botas Trekking', basePrice: 125, image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=400' },
            { name: 'Bastones Trekking', basePrice: 75, image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400' },
            { name: 'Navaja Suiza', basePrice: 68, image: 'https://images.unsplash.com/photo-1593115998548-ec0832cf3b38?w=400' },
            { name: 'GPS Garmin', basePrice: 145, image: 'https://images.unsplash.com/photo-1551830820-330a71b99659?w=400' },
            { name: 'Colchoneta Inflable', basePrice: 82, image: 'https://images.unsplash.com/photo-1602024242516-fbc9d4fda4b6?w=400' },
            { name: 'Hamaca Camping', basePrice: 55, image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400' },
            { name: 'Estufa Portátil', basePrice: 98, image: 'https://images.unsplash.com/photo-1618215990825-0b8dca05e9bb?w=400' },
            { name: 'Kit Primeros Auxilios', basePrice: 72, image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400' },
            { name: 'Botiquín Completo', basePrice: 85, image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400' }
        ],
        5: [ // Total: 2800 Bs (20 productos)
            { name: 'Guitarra Fender', basePrice: 250, image: 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=400' },
            { name: 'Piano Yamaha', basePrice: 280, image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400' },
            { name: 'Batería Pearl', basePrice: 200, image: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=400' },
            { name: 'Violín Stradivarius', basePrice: 160, image: 'https://images.unsplash.com/photo-1612225330812-0e64a3db0f66?w=400' },
            { name: 'Trompeta Bach', basePrice: 120, image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400' },
            { name: 'Saxofón Yamaha', basePrice: 140, image: 'https://images.unsplash.com/photo-1551898994-05a6b13f0fe9?w=400' },
            { name: 'Flauta Traversa', basePrice: 80, image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400' },
            { name: 'Armónica Hohner', basePrice: 50, image: 'https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=400' },
            { name: 'Maracas Profesional', basePrice: 60, image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400' },
            { name: 'Pandereta Remo', basePrice: 60, image: 'https://images.unsplash.com/photo-1460036521480-ff49c08c2781?w=400' },
            { name: 'Bajo Fender Jazz', basePrice: 230, image: 'https://images.unsplash.com/photo-1556449895-a33c9dba33dd?w=400' },
            { name: 'Ukelele Kala', basePrice: 95, image: 'https://images.unsplash.com/photo-1551127481-43279ba57f2b?w=400' },
            { name: 'Teclado Casio 88', basePrice: 180, image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400' },
            { name: 'Amplificador Marshall', basePrice: 190, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400' },
            { name: 'Pedal Efectos Boss', basePrice: 115, image: 'https://images.unsplash.com/photo-1563330232-57114bb0823c?w=400' },
            { name: 'Metrónomo Digital', basePrice: 48, image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400' },
            { name: 'Afinador Cromático', basePrice: 42, image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400' },
            { name: 'Atril Profesional', basePrice: 55, image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400' },
            { name: 'Cable Instrumento 6m', basePrice: 38, image: 'https://images.unsplash.com/photo-1563330232-57114bb0823c?w=400' },
            { name: 'Estuche Guitarra', basePrice: 125, image: 'https://images.unsplash.com/photo-1510906594845-bc082582c8cc?w=400' }
        ],
        6: [ // Total: 3000 Bs (20 productos)
            { name: 'Sofá 3 Puestos', basePrice: 250, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400' },
            { name: 'Cama Queen Size', basePrice: 220, image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400' },
            { name: 'Mesa Comedor 6 Sillas', basePrice: 180, image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400' },
            { name: 'Silla Gamer RGB', basePrice: 120, image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400' },
            { name: 'Armario 4 Puertas', basePrice: 200, image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400' },
            { name: 'Escritorio Ejecutivo', basePrice: 150, image: 'https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=400' },
            { name: 'Estantería Biblioteca', basePrice: 130, image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=400' },
            { name: 'Espejo Decorativo', basePrice: 80, image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=400' },
            { name: 'Lámpara Pie Moderna', basePrice: 90, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400' },
            { name: 'Alfombra Persa 3x2m', basePrice: 80, image: 'https://images.unsplash.com/photo-1600166898405-da9535204843?w=400' },
            { name: 'Comoda 6 Cajones', basePrice: 160, image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400' },
            { name: 'Mesa Centro Cristal', basePrice: 145, image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400' },
            { name: 'Perchero Moderno', basePrice: 75, image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400' },
            { name: 'Sillón Relax', basePrice: 185, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400' },
            { name: 'Mesa Luz Par', basePrice: 98, image: 'https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=400' },
            { name: 'Cabecera Capitoné', basePrice: 135, image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400' },
            { name: 'Biombo Separador', basePrice: 112, image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400' },
            { name: 'Cuadros Decorativos Set', basePrice: 88, image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400' },
            { name: 'Cortinas Blackout', basePrice: 125, image: 'https://images.unsplash.com/photo-1616046386572-c7f6c072f487?w=400' },
            { name: 'Cojines Decorativos Set', basePrice: 77, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400' }
        ],
        7: [ // Total: 8000 Bs (20 productos)
            { name: 'Collar Oro 18K', basePrice: 600, image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400' },
            { name: 'Anillo Diamante 1ct', basePrice: 800, image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400' },
            { name: 'Pulsera Pandora', basePrice: 350, image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400' },
            { name: 'Aretes Perla', basePrice: 400, image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400' },
            { name: 'Cadena Oro 24K', basePrice: 500, image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400' },
            { name: 'Reloj Rolex', basePrice: 650, image: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=400' },
            { name: 'Gemelos Oro', basePrice: 200, image: 'https://images.unsplash.com/photo-1624364897959-8bbaf8c670f8?w=400' },
            { name: 'Broche Esmeralda', basePrice: 250, image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400' },
            { name: 'Dije Oro Blanco', basePrice: 300, image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400' },
            { name: 'Corona Cristal', basePrice: 450, image: 'https://images.unsplash.com/photo-1542361345-89e58247f2d5?w=400' },
            { name: 'Tobillera Oro Rosa', basePrice: 320, image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400' },
            { name: 'Pendiente Rubí', basePrice: 480, image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400' },
            { name: 'Anillo Zafiro', basePrice: 720, image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400' },
            { name: 'Prendedor Plata 925', basePrice: 380, image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400' },
            { name: 'Choker Oro Blanco', basePrice: 440, image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400' },
            { name: 'Piercing Diamante', basePrice: 290, image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400' },
            { name: 'Brazalete Esmeralda', basePrice: 530, image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400' },
            { name: 'Tiara Platino', basePrice: 680, image: 'https://images.unsplash.com/photo-1542361345-89e58247f2d5?w=400' },
            { name: 'Alianza Oro 24K', basePrice: 410, image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400' },
            { name: 'Set Completo Joyería', basePrice: 750, image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400' }
        ],
        8: [ // Total: 18000 Bs (20 productos)
            { name: 'Traje Hugo Boss', basePrice: 1200, image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400' },
            { name: 'Vestido Versace', basePrice: 1500, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400' },
            { name: 'Zapatos Gucci', basePrice: 900, image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400' },
            { name: 'Cartera Louis Vuitton', basePrice: 1100, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400' },
            { name: 'Perfume Chanel N°5', basePrice: 700, image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400' },
            { name: 'Gafas Ray-Ban', basePrice: 600, image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400' },
            { name: 'Corbata Hermès', basePrice: 800, image: 'https://images.unsplash.com/photo-1589756823695-278bc636f37a?w=400' },
            { name: 'Bufanda Burberry', basePrice: 950, image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400' },
            { name: 'Sombrero Borsalino', basePrice: 750, image: 'https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?w=400' },
            { name: 'Cinturón Ferragamo', basePrice: 500, image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=400' },
            { name: 'Camisa Armani', basePrice: 850, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400' },
            { name: 'Pantalón Prada', basePrice: 920, image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400' },
            { name: 'Chaqueta Cuero Boss', basePrice: 1350, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400' },
            { name: 'Abrigo Burberry', basePrice: 1450, image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400' },
            { name: 'Botas Prada', basePrice: 980, image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400' },
            { name: 'Mochila Montblanc', basePrice: 780, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400' },
            { name: 'Billetera Gucci', basePrice: 620, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400' },
            { name: 'Reloj Cartier', basePrice: 1280, image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400' },
            { name: 'Lentes Dolce Gabbana', basePrice: 720, image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400' },
            { name: 'Gemelos Tiffany', basePrice: 830, image: 'https://images.unsplash.com/photo-1624364897959-8bbaf8c670f8?w=400' }
        ],
        9: [ // Total: 30000 Bs (20 productos)
            { name: 'Motocicleta Harley', basePrice: 2500, image: 'https://images.unsplash.com/photo-1558981852-426c6c22a060?w=400' },
            { name: 'Scooter Vespa', basePrice: 1800, image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=400' },
            { name: 'Bote Yamaha', basePrice: 2200, image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400' },
            { name: 'Jet Ski Sea-Doo', basePrice: 1900, image: 'https://images.unsplash.com/photo-1623683797619-1dfb5409e9d3?w=400' },
            { name: 'Quad Polaris', basePrice: 1600, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400' },
            { name: 'Go Kart Racing', basePrice: 1200, image: 'https://images.unsplash.com/photo-1565024147867-c7c93f28c31d?w=400' },
            { name: 'Kayak Profesional', basePrice: 800, image: 'https://images.unsplash.com/photo-1545224144-b38cd309ef69?w=400' },
            { name: 'Tabla Surf Pro', basePrice: 600, image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=400' },
            { name: 'Snowboard Burton', basePrice: 1000, image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400' },
            { name: 'Paracaídas Completo', basePrice: 1400, image: 'https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?w=400' },
            { name: 'Moto Ducati', basePrice: 2300, image: 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=400' },
            { name: 'Kitesurf Equipo', basePrice: 950, image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400' },
            { name: 'Windsurf Tabla', basePrice: 750, image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=400' },
            { name: 'Bicicleta Eléctrica Premium', basePrice: 1850, image: 'https://images.unsplash.com/photo-1571333250630-f0230c320b6d?w=400' },
            { name: 'Monopatín Eléctrico', basePrice: 680, image: 'https://images.unsplash.com/photo-1588127961768-11f501fce4cf?w=400' },
            { name: 'Hoverboard Pro', basePrice: 520, image: 'https://images.unsplash.com/photo-1603893097309-928a5a8eb972?w=400' },
            { name: 'Segway Max', basePrice: 1450, image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400' },
            { name: 'Esquíes Rossignol', basePrice: 1350, image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400' },
            { name: 'Botas Esquí Atomic', basePrice: 850, image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400' },
            { name: 'Canoa Inflable Pro', basePrice: 1600, image: 'https://images.unsplash.com/photo-1545224144-b38cd309ef69?w=400' }
        ],
        10: [ // Total: 100000 Bs (20 productos)
            { name: 'Mercedes-Benz Clase S', basePrice: 8000, image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400' },
            { name: 'Casa Playa Copacabana', basePrice: 9000, image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=400' },
            { name: 'Yate 40 Pies', basePrice: 7500, image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=400' },
            { name: 'Avión Cessna Citation', basePrice: 6500, image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=400' },
            { name: 'Helicóptero Robinson', basePrice: 5500, image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=400' },
            { name: 'Mansión 5000m²', basePrice: 4500, image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400' },
            { name: 'Isla Privada Caribe', basePrice: 3500, image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400' },
            { name: 'Diamante 5ct', basePrice: 2500, image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400' },
            { name: 'Picasso Original', basePrice: 2000, image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400' },
            { name: 'Cohete SpaceX', basePrice: 1000, image: 'https://images.unsplash.com/photo-1541873676-a18131494184?w=400' },
            { name: 'BMW Serie 8', basePrice: 7200, image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400' },
            { name: 'Lamborghini Huracán', basePrice: 8500, image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400' },
            { name: 'Ferrari 488', basePrice: 9500, image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400' },
            { name: 'Porsche 911 Turbo', basePrice: 6800, image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400' },
            { name: 'Apartamento Penthouse', basePrice: 5800, image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400' },
            { name: 'Viñedo Francia', basePrice: 4200, image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400' },
            { name: 'Rancho Texas 100 Ha', basePrice: 3800, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400' },
            { name: 'Hotel Boutique', basePrice: 7800, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400' },
            { name: 'Galería Arte NYC', basePrice: 6200, image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=400' },
            { name: 'Restaurante Michelin', basePrice: 5700, image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400' }
        ]
    };

    
    // Función para generar un multiplicador según el nivel VIP
    function getRandomPriceMultiplier(level, productName) {
        if (level === 1) {
            return 1.0; // VIP 1: sin cambios
        }
        
        // A partir de VIP 2: incremento fijo de 600% (7x el precio base)
        return 7.0;
    }
    
    // Función para generar productos según el VIP con precios personalizados
    function generateProductsForLevel(level) {
        const levelProducts = productsByLevel[level] || productsByLevel[1];
        
        // Obtener precios personalizados desde la BD o localStorage
        let customPrices = {};
        
        // Priorizar datos de la base de datos
        const currentUserData = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUserData && currentUserData.customPrices && currentUserData.customPrices[`level${level}`]) {
            customPrices = currentUserData.customPrices[`level${level}`];
        } else {
            // Fallback a localStorage
            const customPricesKey = `custom_prices_${userPhone}_level${level}`;
            customPrices = JSON.parse(localStorage.getItem(customPricesKey) || '{}');
        }
        
        return levelProducts.map((template, index) => {
            let finalPrice;
            
            // Si hay precio personalizado, usarlo directamente
            if (customPrices[template.name] !== undefined) {
                finalPrice = parseFloat(customPrices[template.name]);
            } else {
                // Si no hay precio personalizado, aplicar multiplicador aleatorio
                const randomMultiplier = getRandomPriceMultiplier(level, template.name);
                finalPrice = template.basePrice * randomMultiplier;
            }
            
            return {
                id: index + 1,
                name: template.name,
                price: Math.round(finalPrice * 100) / 100, // Redondear a 2 decimales
                image: template.image,
                purchased: purchasedProducts.includes(index + 1)
            };
        });
    }
    
    let products = generateProductsForLevel(userLevel);
    console.log('=== PRODUCTOS GENERADOS ===');
    console.log('Nivel del usuario:', userLevel);
    console.log('Cantidad de productos:', products.length);
    console.log('Productos:', products);
    
    // Porcentaje de ganancia fijo en 120%
    function getEarningsMultiplier(level) {
        return 1.20; // 120% fijo para todos los niveles
    }
    
    // Actualizar UI del nivel
    function updateLevelUI() {
        document.getElementById('currentLevel').textContent = userLevel;
        document.getElementById('levelTitle').textContent = userLevel;
        
        const purchased = purchasedProducts.length;
        const total = 20;
        const percentage = (purchased / total) * 100;
        
        document.getElementById('progressFill').style.width = percentage + '%';
        document.getElementById('progressText').textContent = `${purchased}/${total} productos comprados`;
    }
    
    // Renderizar productos
    function renderProducts() {
        console.log('=== RENDERIZANDO PRODUCTOS ===');
        const productsGrid = document.getElementById('productsGrid');
        console.log('productsGrid element:', productsGrid);
        console.log('Productos a renderizar:', products.length);
        productsGrid.innerHTML = '';
        
        products.forEach(product => {
            console.log('Renderizando producto:', product.name);
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            if (product.purchased) {
                productCard.classList.add('purchased');
            }
            
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.onerror=null; this.src='https://placehold.co/400x300/FFE600/000000?text=${product.name.substring(0, 15)}';">
                <div class="product-name">${product.name}</div>
                <div class="product-price">${product.price.toLocaleString('es-BO')} Bs</div>
                <button class="btn-add-cart" onclick="buyProduct(${product.id})" ${product.purchased ? 'disabled' : ''}>
                    ${product.purchased ? '✓ Comprado' : 'Comprar Ahora'}
                </button>
            `;
            productsGrid.appendChild(productCard);
        });
        console.log('Productos renderizados exitosamente');
    }
    
    // Variable para guardar el producto seleccionado
    let selectedProduct = null;
    
    // Mostrar modal de producto con descripción
    window.buyProduct = function(productId) {
        const product = products.find(p => p.id === productId);
        
        if (!product || product.purchased) {
            showMessage('Producto no disponible o ya comprado', 'error');
            return;
        }
        
        // Guardar el producto seleccionado
        selectedProduct = product;
        
        // Generar descripción del producto
        const description = generateProductDescription(product.name);
        
        // Llenar información del modal
        document.getElementById('modalProductImage').src = product.image;
        document.getElementById('modalProductName').textContent = product.name;
        document.getElementById('modalProductDescription').textContent = description;
        document.getElementById('modalProductPrice').textContent = product.price + ' Bs';
        document.getElementById('modalUserBalance').textContent = userBalance.toFixed(2) + ' Bs';
        
        // Calcular ganancia
        const multiplier = getEarningsMultiplier(userLevel);
        const bonus = product.price * multiplier;
        document.getElementById('modalProductEarnings').textContent = bonus.toFixed(2) + ' Bs';
        
        // Verificar saldo
        const insufficientRow = document.getElementById('insufficientRow');
        const confirmBtn = document.getElementById('confirmBuyBtn');
        const rechargeBtn = document.getElementById('rechargeFromModalBtn');
        
        if (product.price > userBalance) {
            const missingAmount = product.price - userBalance;
            document.getElementById('modalInsufficientAmount').textContent = missingAmount.toFixed(2) + ' Bs';
            insufficientRow.style.display = 'flex';
            confirmBtn.disabled = true;
            rechargeBtn.style.display = 'block';
        } else {
            insufficientRow.style.display = 'none';
            confirmBtn.disabled = false;
            rechargeBtn.style.display = 'none';
        }
        
        // Mostrar modal
        document.getElementById('productModal').classList.add('show');
    };
    
    // Función para generar descripción del producto
    function generateProductDescription(productName) {
        const descriptions = {
            'Smartphone Samsung A15': 'Smartphone moderno con pantalla de 6.5" Super AMOLED, 128GB de almacenamiento, cámara de 50MP y batería de larga duración. Perfecto para el día a día.',
            'Laptop HP 15"': 'Laptop potente con procesador Intel Core i5, 8GB RAM, 256GB SSD. Ideal para trabajo, estudio y entretenimiento con pantalla Full HD.',
            'Auriculares JBL': 'Auriculares inalámbricos con sonido premium, cancelación de ruido y hasta 40 horas de batería. Comodidad y calidad de audio excepcional.',
            'Reloj Casio': 'Reloj clásico resistente al agua con cronómetro, alarma y retroiluminación. Durabilidad y estilo en tu muñeca.',
            'Cámara Canon EOS': 'Cámara digital profesional con sensor de 24MP, grabación de video 4K y múltiples modos creativos. Captura cada momento con calidad profesional.',
            'Teclado Gaming RGB': 'Teclado mecánico para gaming con iluminación RGB personalizable, switches táctiles y diseño ergonómico para largas sesiones de juego.',
            'Mouse Logitech': 'Mouse ergonómico con sensor de alta precisión, botones programables y diseño cómodo para uso prolongado.',
            'Monitor LG 24"': 'Monitor Full HD con panel IPS, colores vibrantes y ángulos de visión amplios. Perfecto para multitarea y entretenimiento.',
            'Tablet Samsung': 'Tablet versátil con pantalla de 10.1", procesador rápido y batería de larga duración. Ideal para leer, navegar y trabajar.',
            'Bocinas JBL': 'Bocinas portátiles con sonido potente y graves profundos. Resistentes al agua y con hasta 12 horas de reproducción.',
            'TV Smart LG 50"': 'Smart TV 4K UHD de 50 pulgadas con tecnología webOS, HDR y aplicaciones de streaming integradas. Entretenimiento inmersivo en casa.',
            'PlayStation 5': 'Consola de videojuegos de última generación con gráficos 4K, carga ultrarrápida y un catálogo de juegos exclusivos increíbles.',
            'Drone DJI Mini': 'Drone compacto con cámara 4K, estabilización de 3 ejes y hasta 30 minutos de vuelo. Captura vistas aéreas espectaculares.',
            'Apple Watch': 'Smartwatch con monitoreo de salud, GPS, resistencia al agua y miles de apps. Tu compañero inteligente en la muñeca.',
            'Router WiFi 6': 'Router de alta velocidad con WiFi 6, cobertura amplia y soporte para múltiples dispositivos simultáneos.',
            'Disco Duro 2TB': 'Disco duro externo portátil con 2TB de capacidad, USB 3.0 y diseño compacto. Almacena todos tus archivos de forma segura.',
            'Consola Xbox Series S': 'Consola de videojuegos compacta con 512GB de almacenamiento, gráficos de nueva generación y Game Pass.',
            'Silla Gamer': 'Silla ergonómica para gaming con soporte lumbar ajustable, reposabrazos 4D y reclinación hasta 180°. Comodidad máxima.',
            'Micrófono USB': 'Micrófono de condensador profesional con calidad de estudio, ideal para streaming, podcasts y grabaciones.',
            'Webcam HD': 'Cámara web Full HD 1080p con enfoque automático, micrófono integrado y corrección de luz. Perfecta para videollamadas.',
            'iPhone 13 Pro': 'Smartphone premium con pantalla ProMotion de 120Hz, chip A15 Bionic, cámara triple de 12MP y grabación ProRes.',
            'MacBook Air M2': 'Laptop ultradelgada con chip M2, pantalla Retina de 13.6", hasta 18 horas de batería. Potencia y portabilidad.',
            'iPad Pro 12.9"': 'Tablet profesional con chip M2, pantalla Liquid Retina XDR y compatibilidad con Apple Pencil y Magic Keyboard.',
            'AirPods Pro': 'Auriculares inalámbricos con cancelación activa de ruido, modo ambiente y audio espacial. Calidad Apple.',
            'GoPro Hero 11': 'Cámara de acción resistente al agua con grabación 5.3K, estabilización HyperSmooth y pantalla táctil.',
            'Impresora HP': 'Impresora multifuncional con WiFi, impresión a color, escaneo y copiado. Perfecta para casa u oficina.',
            'Alexa Echo Dot': 'Altavoz inteligente con Alexa, control de hogar inteligente y sonido mejorado. Tu asistente de voz.',
            'Proyector Epson': 'Proyector Full HD con 3200 lúmenes, tecnología 3LCD y pantalla de hasta 300". Cine en casa.',
            'Aspiradora Robot': 'Aspiradora inteligente con navegación láser, mapeo de habitaciones y control desde app. Limpieza automática.',
            'Cafetera Nespresso': 'Cafetera de cápsulas con 19 bares de presión, calentamiento rápido y diseño elegante. Café perfecto.',
            'Bicicleta Eléctrica': 'Bicicleta eléctrica con motor de 250W, batería de 50km de autonomía y pantalla LCD. Movilidad ecológica.',
            'Tesla Model 3': 'Sedán eléctrico de lujo con autopilot, aceleración de 0-100 km/h en 3.3s y hasta 580km de autonomía.',
            'iMac 27" 5K': 'Computadora de escritorio todo-en-uno con pantalla Retina 5K, chip M1 y diseño icónico. Poder y elegancia.',
            'Nintendo Switch OLED': 'Consola híbrida con pantalla OLED de 7", dock mejorado y audio envolvente. Juega donde quieras.',
            'Samsung Galaxy S23 Ultra': 'Smartphone flagship con cámara de 200MP, S Pen integrado y pantalla Dynamic AMOLED 2X.',
            'Oculus Quest 3': 'Visor de realidad virtual independiente con gráficos de alta resolución, seguimiento sin cables y miles de juegos VR.',
            'Refrigerador LG': 'Refrigerador inteligente con compresor inverter, tecnología Door-in-Door y eficiencia energética A++.',
            'Lavadora Samsung': 'Lavadora automática de 10kg con tecnología EcoBubble, múltiples programas y bajo consumo energético.',
            'Smart Doorbell Ring': 'Timbre inteligente con video HD, visión nocturna, detección de movimiento y audio bidireccional.',
            'Tesla Powerwall': 'Batería doméstica de 13.5 kWh para almacenar energía solar. Respaldo energético y autonomía.',
            'DJI Mavic 3 Pro': 'Drone profesional con cámara Hasselblad de 20MP, grabación 5.1K y hasta 46 minutos de vuelo. Calidad cinematográfica.'
        };
        
        return descriptions[productName] || `Producto de alta calidad disponible en nuestra tienda VIP. Aprovecha esta oportunidad única y obtén un ${(getEarningsMultiplier(userLevel) * 100).toFixed(0)}% de ganancia sobre tu compra.`;
    }
    
    // Confirmar compra desde el modal
    document.getElementById('confirmBuyBtn').addEventListener('click', async function() {
        if (!selectedProduct || selectedProduct.purchased) {
            showMessage('Producto no disponible', 'error');
            return;
        }
        
        // Verificar saldo suficiente
        if (selectedProduct.price > userBalance) {
            showMessage('Saldo insuficiente para esta compra', 'error');
            return;
        }
        
        // Calcular ganancia según el nivel
        const multiplier = getEarningsMultiplier(userLevel);
        const bonus = selectedProduct.price * multiplier;
        
        // Marcar producto como comprado
        selectedProduct.purchased = true;
        purchasedProducts.push(selectedProduct.id);
        
        // Guardar en localStorage (compatibilidad)
        localStorage.setItem(`purchased_${userPhone}_level${userLevel}`, JSON.stringify(purchasedProducts));
        
        // Actualizar saldo
        userBalance -= selectedProduct.price;
        updateBalance(userBalance);
        localStorage.setItem(`balance_${userPhone}`, userBalance);
        
        // Actualizar ganancias
        userEarnings += bonus;
        updateEarnings(userEarnings);
        localStorage.setItem(`earnings_${userPhone}`, userEarnings);
        
        // Actualizar en la base de datos (incluyendo productos comprados)
        try {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (currentUser && currentUser.id) {
                // Obtener estructura actual de productos comprados
                const updatedUserData = await getUserByPhone(userPhone);
                const purchasedProductsObj = updatedUserData.purchasedProducts || {};
                purchasedProductsObj[`level${userLevel}`] = purchasedProducts;
                
                await updateUser(currentUser.id, {
                    balance: userBalance,
                    earnings: userEarnings,
                    level: userLevel,
                    purchasedProducts: purchasedProductsObj
                });
                console.log('Datos actualizados en BD:', { balance: userBalance, earnings: userEarnings, level: userLevel, purchasedProducts: purchasedProductsObj });
            }
        } catch (error) {
            console.error('Error al actualizar BD:', error);
        }
        
        // Cerrar modal
        document.getElementById('productModal').classList.remove('show');
        
        // Verificar si completó el VIP
        if (purchasedProducts.length === 20) {
            if (userLevel < 10) {
                setTimeout(() => {
                    levelUp();
                }, 1000);
            } else {
                showMessage('¡Felicidades! Has completado todos los VIPs 🎉', 'success');
            }
        }
        
        // Actualizar la vista
        updateLevelUI();
        renderProducts();
        
        showMessage(`¡Compra exitosa! ${selectedProduct.name} - ${selectedProduct.price.toLocaleString('es-BO')} Bs | Ganancia: ${bonus.toLocaleString('es-BO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Bs 💰`, 'success');
        
        // Limpiar producto seleccionado
        selectedProduct = null;
    });
    
    // Cerrar modal de producto
    document.getElementById('closeProductModal').addEventListener('click', function() {
        document.getElementById('productModal').classList.remove('show');
        selectedProduct = null;
    });
    
    // Botón de recargar desde el modal de producto
    document.getElementById('rechargeFromModalBtn').addEventListener('click', function() {
        document.getElementById('productModal').classList.remove('show');
        document.getElementById('rechargeModal').classList.add('show');
    });
    
    // Subir de VIP
    async function levelUp() {
        userLevel++;
        localStorage.setItem(`level_${userPhone}`, userLevel);
        
        // Resetear productos comprados para el nuevo VIP
        purchasedProducts = [];
        localStorage.setItem(`purchased_${userPhone}_level${userLevel}`, JSON.stringify(purchasedProducts));
        
        // Actualizar nivel y productos comprados en la base de datos
        try {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (currentUser && currentUser.id) {
                // Obtener estructura actual de productos comprados
                const updatedUserData = await getUserByPhone(userPhone);
                const purchasedProductsObj = updatedUserData.purchasedProducts || {};
                purchasedProductsObj[`level${userLevel}`] = []; // Nuevo nivel sin compras
                
                await updateUser(currentUser.id, { 
                    level: userLevel,
                    purchasedProducts: purchasedProductsObj
                });
                console.log('Nivel actualizado en BD:', userLevel);
            }
        } catch (error) {
            console.error('Error al actualizar nivel en BD:', error);
        }
        
        // Generar nuevos productos para el VIP
        products = generateProductsForLevel(userLevel);
        
        updateLevelUI();
        renderProducts();
        
        // Mostrar modal de nivel completado con ganancias
        showLevelUpModal(userLevel, userEarnings);
    }
    
    // Mostrar modal de nivel completado
    function showLevelUpModal(newLevel, earnings) {
        document.getElementById('newLevelNumber').textContent = `VIP ${newLevel}`;
        document.getElementById('modalEarningsAmount').textContent = `${earnings.toLocaleString('es-BO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Bs`;
        document.getElementById('levelUpModal').classList.add('show');
    }
    
    // Botón retirar ahora desde modal de nivel
    document.getElementById('withdrawNowBtn').addEventListener('click', function() {
        document.getElementById('levelUpModal').classList.remove('show');
        
        // Verificar si tiene ganancias
        if (userEarnings > 0) {
            requestWithdrawal(userEarnings);
        } else {
            showMessage('No tienes ganancias para retirar', 'error');
        }
    });
    
    // Botón continuar comprando
    document.getElementById('continueShoppingBtn').addEventListener('click', function() {
        document.getElementById('levelUpModal').classList.remove('show');
        showMessage(`¡Bienvenido al VIP ${userLevel}! Explora los nuevos productos exclusivos 🎉`, 'success');
    });
    
    // Actualizar saldo en la UI
    function updateBalance(balance) {
        const balanceElement = document.getElementById('userBalance');
        if (balanceElement) {
            balanceElement.textContent = `${balance.toLocaleString('es-BO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Bs`;
        } else {
            console.error('Elemento userBalance no encontrado');
        }
    }
    
    // Actualizar ganancias en la UI
    function updateEarnings(earnings) {
        const earningsElement = document.getElementById('userEarnings');
        if (earningsElement) {
            earningsElement.textContent = `${earnings.toLocaleString('es-BO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Bs`;
        } else {
            console.error('Elemento userEarnings no encontrado');
        }
    }
    
    // Modal de Soporte
    const supportModal = document.getElementById('supportModal');
    const supportBtn = document.getElementById('supportBtn');
    const closeSupportModal = document.getElementById('closeSupportModal');
    
    // Abrir modal de soporte
    supportBtn.addEventListener('click', function() {
        supportModal.classList.add('show');
    });
    
    // Cerrar modal de soporte
    closeSupportModal.addEventListener('click', function() {
        supportModal.classList.remove('show');
    });
    
    // Recargar saldo
    const rechargeModal = document.getElementById('rechargeModal');
    const rechargeAmountInput = document.getElementById('rechargeAmount');
    const confirmRechargeBtn = document.getElementById('confirmRechargeBtn');
    const closeRechargeModal = document.getElementById('closeRechargeModal');
    
    // Abrir modal
    document.getElementById('rechargeBtn').addEventListener('click', function() {
        rechargeModal.classList.add('show');
        rechargeAmountInput.value = '';
        rechargeAmountInput.focus();
    });
    
    // Cerrar modal
    closeRechargeModal.addEventListener('click', function() {
        rechargeModal.classList.remove('show');
    });
    
    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', function(event) {
        if (event.target === rechargeModal) {
            rechargeModal.classList.remove('show');
        }
        if (event.target === supportModal) {
            supportModal.classList.remove('show');
        }
    });
    
    // Botones de montos rápidos
    document.querySelectorAll('.quick-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const amount = this.getAttribute('data-amount');
            rechargeAmountInput.value = amount;
        });
    });
    
    // Confirmar recarga
    confirmRechargeBtn.addEventListener('click', function() {
        const amount = parseFloat(rechargeAmountInput.value);
        
        if (amount && amount > 0) {
            const userName = currentUser.name;
            const userPhone = currentUser.phone;
            
            // Mensaje para WhatsApp
            const message = `Hola, soy ${userName} (${userPhone}) y deseo recargar ${amount} Bs a mi cuenta.`;
            const whatsappNumber = '59175605713';
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
            
            // Abrir WhatsApp
            window.open(whatsappUrl, '_blank');
            
            // Cerrar modal
            rechargeModal.classList.remove('show');
            
            showMessage(`Redirigiendo a WhatsApp para confirmar recarga de ${amount} Bs`, 'success');
        } else {
            showMessage('Por favor ingresa un monto válido', 'error');
        }
    });
    
    // Botón de retiro de ganancias
    document.getElementById('withdrawBtn').addEventListener('click', function() {
        const currentLevel = parseInt(localStorage.getItem(`level_${userPhone}`) || 1);
        const purchasedProducts = JSON.parse(localStorage.getItem(`purchased_${userPhone}_level${currentLevel}`) || '[]');
        const userEarnings = parseFloat(localStorage.getItem(`earnings_${userPhone}`) || 0);
        
        // Verificar si hay ganancias para retirar
        if (userEarnings <= 0) {
            showMessage('No tienes ganancias para retirar', 'error');
            return;
        }
        
        // Verificar restricciones según el nivel VIP
        if (currentLevel === 1) {
            // VIP 1: puede retirar en cualquier momento
            requestWithdrawal(userEarnings);
        } else {
            // VIP 2-10: solo puede retirar si completó las 20 compras del nivel actual
            if (purchasedProducts.length === 20) {
                requestWithdrawal(userEarnings);
            } else {
                const remaining = 20 - purchasedProducts.length;
                showMessage(`Debes completar todas las compras del VIP ${currentLevel} para retirar. Te faltan ${remaining} productos.`, 'error');
            }
        }
    });
    
    // Función para solicitar retiro vía WhatsApp
    function requestWithdrawal(amount) {
        const phone = currentUser.phone.replace('+591', ''); // Remover prefijo para mostrar
        const message = `Hola, soy ${currentUser.name} (teléfono: ${currentUser.phone}). Quiero retirar mis ganancias de ${amount} Bs. Por favor, procesa mi solicitud de retiro.`;
        const whatsappUrl = `https://wa.me/59175605713?text=${encodeURIComponent(message)}`;
        
        window.open(whatsappUrl, '_blank');
        showMessage('Se abrió WhatsApp para solicitar tu retiro. Un administrador procesará tu solicitud.', 'success');
    }
    
    // ========== MODAL DE REFERIDOS ==========
    const referralBtn = document.getElementById('referralBtn');
    const referralModal = document.getElementById('referralModal');
    const closeReferralModal = document.getElementById('closeReferralModal');
    const copyCodeBtn = document.getElementById('copyCodeBtn');
    
    // Cargar datos de referidos del usuario desde la base de datos
    async function loadReferralData() {
        try {
            const user = await getUserByPhone(currentUser.phone);
            if (user) {
                // Mostrar código de referido
                document.getElementById('userReferralCode').textContent = user.referralCode || '------';
                
                // Mostrar total de referidos
                document.getElementById('totalReferrals').textContent = user.totalReferrals || 0;
                
                // Calcular ganancias por referidos (10 Bs por cada uno)
                const referralEarnings = (user.totalReferrals || 0) * 10;
                document.getElementById('referralEarnings').textContent = referralEarnings + ' Bs';
            }
        } catch (error) {
            console.error('Error al cargar datos de referidos:', error);
        }
    }
    
    // Abrir modal de referidos
    referralBtn.addEventListener('click', function() {
        loadReferralData();
        referralModal.style.display = 'flex';
    });
    
    // Cerrar modal de referidos
    closeReferralModal.addEventListener('click', function() {
        referralModal.style.display = 'none';
    });
    
    // Copiar código de referido
    copyCodeBtn.addEventListener('click', function() {
        const code = document.getElementById('userReferralCode').textContent;
        
        if (code && code !== '------') {
            navigator.clipboard.writeText(code).then(function() {
                showMessage('¡Código copiado al portapapeles! 📋', 'success');
                copyCodeBtn.textContent = '✅ Copiado';
                setTimeout(() => {
                    copyCodeBtn.textContent = '📋 Copiar';
                }, 2000);
            }).catch(function(err) {
                console.error('Error al copiar:', err);
                showMessage('Error al copiar el código', 'error');
            });
        }
    });
    
    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', function(event) {
        if (event.target === referralModal) {
            referralModal.style.display = 'none';
        }
    });
    
    // Cerrar sesión
    document.getElementById('logoutBtn').addEventListener('click', function() {
        if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
            localStorage.removeItem('currentUser');
            window.location.href = 'login.html';
        }
    });
    
    // Mostrar mensajes
    function showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'success-message';
        messageDiv.style.background = type === 'error' ? '#ff4757' : '#4caf50';
        messageDiv.textContent = message;
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }
    
    // Inicializar
    console.log('=== INICIALIZANDO TIENDA ===');
    try {
        updateLevelUI();
        console.log('UI del nivel actualizada');
    } catch (err) {
        console.error('Error en updateLevelUI:', err);
    }
    
    try {
        renderProducts();
        console.log('Productos renderizados, tienda lista');
    } catch (err) {
        console.error('Error en renderProducts:', err);
        alert('Error al renderizar productos: ' + err.message);
    }
    
    // FAQ Accordion
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Cerrar todas las FAQs
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Abrir la FAQ clickeada si no estaba activa
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
    
    } catch (error) {
        console.error('Error general en tienda.js:', error);
        alert('Error al cargar la tienda: ' + error.message);
    }
    
    // FALLBACK: Intentar renderizar productos incluso si hubo errores
    setTimeout(() => {
        try {
            console.log('=== FALLBACK: Verificando productos ===');
            const grid = document.getElementById('productsGrid');
            if (grid && grid.children.length === 0) {
                console.log('Grid vacío, forzando renderizado...');
                // Forzar renderizado con productos básicos si no hay nada
                const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                if (currentUser) {
                    const userPhone = currentUser.phone;
                    const userLevel = parseInt(localStorage.getItem(`level_${userPhone}`) || 1);
                    console.log('Forzando renderizado para nivel', userLevel);
                    
                    // Llamar renderProducts si existe
                    if (typeof renderProducts === 'function') {
                        renderProducts();
                    }
                }
            } else {
                console.log('Grid ya tiene productos o no existe');
            }
        } catch (err) {
            console.error('Error en fallback:', err);
        }
    }, 500);
});
