// Credenciales de administrador
const ADMIN_CREDENTIALS = {
    phone: '+59100000000',
    password: 'admin123'
};

document.addEventListener('DOMContentLoaded', async function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    // Verificar si es admin
    if (!currentUser || currentUser.phone !== ADMIN_CREDENTIALS.phone) {
        alert('Acceso denegado. Solo administradores.');
        window.location.href = 'login.html';
        return;
    }
    
    let allUsers = [];
    let currentEditingUser = null;
    let transactionHistory = JSON.parse(localStorage.getItem('transactionHistory')) || [];
    let currentFilter = 'all';
    
    // Cargar usuarios e historial
    await loadUsers();
    renderHistory();
    
    async function loadUsers() {
        try {
            allUsers = await getAllUsers();
            // Filtrar al admin de la lista
            allUsers = allUsers.filter(u => u.phone !== ADMIN_CREDENTIALS.phone);
            renderUsers(allUsers);
            updateStats();
        } catch (error) {
            console.error('Error al cargar usuarios:', error);
            showMessage('Error al cargar usuarios. Verifica que el servidor esté activo.', 'error');
        }
    }
    
    function renderUsers(users) {
        const tbody = document.getElementById('usersTableBody');
        
        if (users.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 40px; color: #999;">No hay usuarios registrados</td></tr>';
            return;
        }
        
        tbody.innerHTML = '';
        
        users.forEach(user => {
            // Usar datos de la base de datos directamente (ya no usar fallback de 100)
            const balance = user.balance !== undefined ? user.balance : 0;
            const earnings = user.earnings !== undefined ? user.earnings : 0;
            const userLevel = user.level !== undefined ? user.level : 1;
            const date = new Date(user.createdAt).toLocaleDateString('es-BO');
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <div class="user-name">${user.name}</div>
                </td>
                <td>
                    <div class="user-phone">${user.phone}</div>
                </td>
                <td>
                    <span class="balance-amount">${balance.toFixed(2)} Bs</span>
                </td>
                <td>
                    <span class="earnings-amount">${earnings.toFixed(2)} Bs</span>
                </td>
                <td>
                    <span class="vip-badge">VIP ${userLevel}</span>
                </td>
                <td>
                    <span class="date-text">${date}</span>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-action btn-add" onclick="openAddBalanceModal('${user.phone}', '${user.name}', ${balance})">
                            💵 Agregar Saldo
                        </button>
                        <button class="btn-action btn-withdraw" onclick="openWithdrawModal('${user.phone}', '${user.name}', ${earnings})">
                            💸 Retirar Ganancias
                        </button>
                        <button class="btn-action btn-vip" onclick="openVipModal('${user.phone}', '${user.name}', ${userLevel})">
                            🎖️ Cambiar VIP
                        </button>
                        <button class="btn-action btn-products" onclick="openProductsModal('${user.phone}', '${user.name}', ${userLevel})">
                            💰 Editar Precios
                        </button>
                        <button class="btn-action btn-delete" onclick="confirmDeleteUser(${user.id}, '${user.name}', '${user.phone}')">
                            🗑️ Eliminar
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    }    
    function updateStats() {
        const totalUsers = allUsers.length;
        let totalBalance = 0;
        let totalEarnings = 0;
        
        allUsers.forEach(user => {
            totalBalance += parseFloat(localStorage.getItem(`balance_${user.phone}`) || 100);
            totalEarnings += parseFloat(localStorage.getItem(`earnings_${user.phone}`) || 0);
        });
        
        document.getElementById('totalUsers').textContent = totalUsers;
        document.getElementById('totalBalance').textContent = totalBalance.toFixed(2) + ' Bs';
        document.getElementById('totalEarnings').textContent = totalEarnings.toFixed(2) + ' Bs';
    }
    
    // Búsqueda de usuarios
    document.getElementById('searchInput').addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const filteredUsers = allUsers.filter(user => 
            user.name.toLowerCase().includes(searchTerm) || 
            user.phone.includes(searchTerm)
        );
        renderUsers(filteredUsers);
    });
    
    // Modal de agregar saldo
    const addBalanceModal = document.getElementById('addBalanceModal');
    const withdrawModal = document.getElementById('withdrawModal');
    
    window.openAddBalanceModal = function(phone, name, currentBalance) {
        currentEditingUser = phone;
        document.getElementById('modalUserName').textContent = name;
        document.getElementById('modalCurrentBalance').textContent = currentBalance.toFixed(2) + ' Bs';
        document.getElementById('amountToAdd').value = '';
        addBalanceModal.style.display = 'block';
    };
    
    window.openWithdrawModal = function(phone, name, currentEarnings) {
        currentEditingUser = phone;
        document.getElementById('modalUserNameWithdraw').textContent = name;
        document.getElementById('modalCurrentEarnings').textContent = currentEarnings.toFixed(2) + ' Bs';
        document.getElementById('amountToWithdraw').value = '';
        document.getElementById('amountToWithdraw').max = currentEarnings;
        withdrawModal.style.display = 'block';
    };
    
    // Cerrar modales
    const closeButtons = document.getElementsByClassName('close');
    Array.from(closeButtons).forEach(btn => {
        btn.onclick = function() {
            addBalanceModal.style.display = 'none';
            withdrawModal.style.display = 'none';
        };
    });
    
    window.onclick = function(event) {
        if (event.target === addBalanceModal) {
            addBalanceModal.style.display = 'none';
        }
        if (event.target === withdrawModal) {
            withdrawModal.style.display = 'none';
        }
    };
    
    // Confirmar agregar saldo
    document.getElementById('confirmAddBalance').addEventListener('click', async function() {
        const amount = parseFloat(document.getElementById('amountToAdd').value);
        
        if (!amount || amount <= 0) {
            alert('Por favor ingresa una cantidad válida');
            return;
        }
        
        try {
            // Buscar el usuario en la base de datos
            const user = allUsers.find(u => u.phone === currentEditingUser);
            if (!user) {
                alert('Usuario no encontrado');
                return;
            }
            
            // Calcular nuevo saldo (usar 0 si no tiene balance)
            const currentBalance = user.balance || 0;
            const newBalance = currentBalance + amount;
            
            console.log(`Agregando saldo: ${currentBalance} + ${amount} = ${newBalance}`);
            
            // Actualizar en la base de datos
            await updateUser(user.id, { balance: newBalance });
            
            // También actualizar en localStorage por compatibilidad
            localStorage.setItem(`balance_${currentEditingUser}`, newBalance);
            
            // Registrar en historial
            addToHistory('deposit', user.name, currentEditingUser, amount);
            
            addBalanceModal.style.display = 'none';
            showMessage(`Se agregaron ${amount.toFixed(2)} Bs al saldo del usuario`, 'success');
            
            // Recargar lista de usuarios
            await loadUsers();
        } catch (error) {
            console.error('Error al agregar saldo:', error);
            alert('Error al agregar saldo. Verifica que el servidor esté funcionando.');
        }
        
        renderHistory();
    });
    
    // Confirmar retirar ganancias
    document.getElementById('confirmWithdraw').addEventListener('click', async function() {
        const amount = parseFloat(document.getElementById('amountToWithdraw').value);
        
        if (!amount || amount <= 0) {
            alert('Por favor ingresa una cantidad válida');
            return;
        }
        
        try {
            // Buscar el usuario en la base de datos
            const user = allUsers.find(u => u.phone === currentEditingUser);
            if (!user) {
                alert('Usuario no encontrado');
                return;
            }
            
            const currentEarnings = user.earnings || 0;
            
            if (amount > currentEarnings) {
                alert('La cantidad a retirar no puede ser mayor a las ganancias actuales');
                return;
            }
            
            const newEarnings = currentEarnings - amount;
            
            // Actualizar en la base de datos
            await updateUser(user.id, { earnings: newEarnings });
            
            // También actualizar en localStorage por compatibilidad
            localStorage.setItem(`earnings_${currentEditingUser}`, newEarnings);
            
            // Registrar en historial
            addToHistory('withdrawal', user.name, currentEditingUser, amount);
            
            withdrawModal.style.display = 'none';
            showMessage(`Se retiraron ${amount.toFixed(2)} Bs de las ganancias del usuario`, 'success');
            
            // Recargar lista de usuarios
            await loadUsers();
        } catch (error) {
            console.error('Error al retirar ganancias:', error);
            alert('Error al retirar ganancias. Verifica que el servidor esté funcionando.');
        }
        
        renderHistory();
    });
    
    // Cerrar sesión
    document.getElementById('logoutBtn').addEventListener('click', function() {
        if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
            localStorage.removeItem('currentUser');
            window.location.href = 'login.html';
        }
    });
    
    // Agregar transacción al historial
    function addToHistory(type, userName, userPhone, amount) {
        const transaction = {
            id: Date.now(),
            type: type, // 'deposit' o 'withdrawal'
            userName: userName,
            userPhone: userPhone,
            amount: amount,
            date: new Date().toISOString(),
            admin: 'Administrador'
        };
        
        transactionHistory.unshift(transaction); // Agregar al inicio
        localStorage.setItem('transactionHistory', JSON.stringify(transactionHistory));
    }
    
    // Renderizar historial
    function renderHistory() {
        const tbody = document.getElementById('historyTableBody');
        
        // Filtrar transacciones según el filtro actual
        let filteredHistory = transactionHistory;
        if (currentFilter !== 'all') {
            filteredHistory = transactionHistory.filter(t => t.type === currentFilter);
        }
        
        if (filteredHistory.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" class="empty-history">No hay transacciones registradas</td></tr>';
            return;
        }
        
        tbody.innerHTML = '';
        
        filteredHistory.forEach(transaction => {
            const date = new Date(transaction.date);
            const formattedDate = date.toLocaleDateString('es-BO') + ' ' + date.toLocaleTimeString('es-BO', { hour: '2-digit', minute: '2-digit' });
            
            const typeText = transaction.type === 'deposit' ? 'Carga de Saldo' : 'Retiro de Ganancias';
            const typeClass = transaction.type === 'deposit' ? 'type-deposit' : 'type-withdrawal';
            const amountClass = transaction.type === 'deposit' ? 'amount-positive' : 'amount-negative';
            const amountSign = transaction.type === 'deposit' ? '+' : '-';
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${formattedDate}</td>
                <td><span class="transaction-type ${typeClass}">${typeText}</span></td>
                <td>
                    <div class="user-name">${transaction.userName}</div>
                    <div class="user-phone">${transaction.userPhone}</div>
                </td>
                <td><span class="${amountClass}">${amountSign}${transaction.amount.toFixed(2)} Bs</span></td>
                <td>${transaction.admin}</td>
            `;
            tbody.appendChild(row);
        });
    }
    
    // Filtros de historial
    const filterButtons = document.querySelectorAll('.btn-filter');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.filter;
            renderHistory();
        });
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

    // Funciones para cambiar VIP
    window.openVipModal = function(phone, name, currentLevel) {
        currentEditingUser = { phone, name, currentLevel };
        document.getElementById('modalUserNameVip').textContent = name;
        document.getElementById('modalCurrentVip').textContent = `VIP ${currentLevel}`;
        document.getElementById('newVipLevel').value = currentLevel;
        document.getElementById('vipModal').style.display = 'block';
    };

    document.getElementById('closeVipModal').onclick = function() {
        document.getElementById('vipModal').style.display = 'none';
    };

    document.getElementById('confirmVipChange').onclick = async function() {
        const newLevel = parseInt(document.getElementById('newVipLevel').value);
        
        if (newLevel < 1 || newLevel > 10) {
            showMessage('El nivel VIP debe estar entre 1 y 10', 'error');
            return;
        }

        try {
            // Buscar el usuario en la base de datos
            const user = allUsers.find(u => u.phone === currentEditingUser.phone);
            if (!user) {
                alert('Usuario no encontrado');
                return;
            }

            // Resetear productos comprados para el nuevo nivel
            const purchasedProductsObj = user.purchasedProducts || {};
            purchasedProductsObj[`level${newLevel}`] = []; // Nuevo nivel sin compras

            // Actualizar nivel en la base de datos
            await updateUser(user.id, { 
                level: newLevel,
                purchasedProducts: purchasedProductsObj
            });

            // También actualizar localStorage por compatibilidad
            localStorage.setItem(`level_${currentEditingUser.phone}`, newLevel);
            localStorage.setItem(`purchased_${currentEditingUser.phone}_level${newLevel}`, JSON.stringify([]));
            
            // Agregar a historial
            transactionHistory.push({
                date: new Date().toISOString(),
                user: currentEditingUser.name,
                phone: currentEditingUser.phone,
                type: 'vip_change',
                amount: newLevel,
                admin: 'Admin',
                description: `Cambio de VIP ${currentEditingUser.currentLevel} a VIP ${newLevel}`
            });
            localStorage.setItem('transactionHistory', JSON.stringify(transactionHistory));
            
            showMessage(`VIP cambiado exitosamente a VIP ${newLevel}`, 'success');
            document.getElementById('vipModal').style.display = 'none';
            await loadUsers();
        } catch (error) {
            console.error('Error al cambiar VIP:', error);
            alert('Error al cambiar VIP. Verifica que el servidor esté funcionando.');
        }
        
        renderHistory();
    };

    // Funciones para editar precios de productos
    window.openProductsModal = function(phone, name, userLevel) {
        currentEditingUser = { phone, name, userLevel };
        document.getElementById('modalUserNameProducts').textContent = name;
        document.getElementById('modalUserVipProducts').textContent = `VIP ${userLevel}`;
        
        // Cargar productos del nivel actual
        loadUserProducts(phone, userLevel);
        
        document.getElementById('productsModal').style.display = 'block';
    };

    document.getElementById('closeProductsModal').onclick = function() {
        document.getElementById('productsModal').style.display = 'none';
    };

    // Función para generar un multiplicador según el nivel VIP (igual que en tienda.js)
    function getRandomPriceMultiplier(level, productName) {
        if (level === 1) {
            return 1.0;
        }
        
        // A partir de VIP 2: incremento fijo de 600% (7x el precio base)
        return 7.0;
    }

    function loadUserProducts(phone, level) {
        // Buscar el usuario en la base de datos para obtener precios personalizados
        const user = allUsers.find(u => u.phone === phone);
        const customPricesFromDB = (user && user.customPrices && user.customPrices[`level${level}`]) || {};
        
        // Fallback a localStorage si no hay en BD
        const customPricesFromLocalStorage = JSON.parse(localStorage.getItem(`custom_prices_${phone}_level${level}`) || '{}');
        
        // Priorizar BD sobre localStorage
        const customPrices = Object.keys(customPricesFromDB).length > 0 ? customPricesFromDB : customPricesFromLocalStorage;
        
        // Productos por nivel (todos los 10 niveles con 20 productos cada uno)
        const productsByLevel = {
            1: [
                { name: 'Smartphone Samsung A15', basePrice: 50 },
                { name: 'Laptop HP 15"', basePrice: 55 },
                { name: 'Auriculares JBL', basePrice: 25 },
                { name: 'Reloj Casio', basePrice: 20 },
                { name: 'Cámara Canon EOS', basePrice: 35 },
                { name: 'Teclado Gaming RGB', basePrice: 28 },
                { name: 'Mouse Logitech', basePrice: 15 },
                { name: 'Monitor LG 24"', basePrice: 30 },
                { name: 'Tablet Samsung', basePrice: 25 },
                { name: 'Bocinas JBL', basePrice: 17 },
                { name: 'Cargador Inalámbrico', basePrice: 22 },
                { name: 'Cable HDMI 4K', basePrice: 18 },
                { name: 'Funda Laptop', basePrice: 24 },
                { name: 'Powerbank 20000mAh', basePrice: 32 },
                { name: 'Hub USB-C 7 puertos', basePrice: 28 },
                { name: 'Soporte Laptop', basePrice: 26 },
                { name: 'Mousepad XXL', basePrice: 19 },
                { name: 'Luz LED Ring', basePrice: 38 },
                { name: 'Adaptador Multi USB', basePrice: 21 },
                { name: 'Organizador Cables', basePrice: 12 }
            ],
            2: [
                { name: 'TV Smart LG 50"', basePrice: 120 },
                { name: 'PlayStation 5', basePrice: 150 },
                { name: 'Drone DJI Mini', basePrice: 110 },
                { name: 'Apple Watch', basePrice: 90 },
                { name: 'Router WiFi 6', basePrice: 40 },
                { name: 'Disco Duro 2TB', basePrice: 30 },
                { name: 'Webcam Logitech 4K', basePrice: 50 },
                { name: 'Micrófono Blue Yeti', basePrice: 60 },
                { name: 'Impresora HP', basePrice: 80 },
                { name: 'Scanner Epson', basePrice: 70 },
                { name: 'Smartwatch Xiaomi', basePrice: 75 },
                { name: 'Audífonos Sony XM5', basePrice: 95 },
                { name: 'Kindle Paperwhite', basePrice: 85 },
                { name: 'Chromecast 4K', basePrice: 45 },
                { name: 'Fire TV Stick', basePrice: 55 },
                { name: 'SSD 1TB Samsung', basePrice: 88 },
                { name: 'RAM 16GB Corsair', basePrice: 92 },
                { name: 'Tarjeta Gráfica GTX', basePrice: 135 },
                { name: 'Cooler Master RGB', basePrice: 65 },
                { name: 'Fuente 750W Modular', basePrice: 95 }
            ],
            3: [
                { name: 'Refrigerador LG', basePrice: 150 },
                { name: 'Lavadora Samsung', basePrice: 140 },
                { name: 'Microondas Panasonic', basePrice: 60 },
                { name: 'Licuadora Oster', basePrice: 40 },
                { name: 'Cafetera Nespresso', basePrice: 80 },
                { name: 'Aspiradora Dyson', basePrice: 120 },
                { name: 'Ventilador Silence', basePrice: 50 },
                { name: 'Plancha Black+Decker', basePrice: 35 },
                { name: 'Tostadora Philips', basePrice: 30 },
                { name: 'Batidora KitchenAid', basePrice: 95 },
                { name: 'Freidora de Aire', basePrice: 110 },
                { name: 'Procesador Alimentos', basePrice: 85 },
                { name: 'Exprimidor Eléctrico', basePrice: 45 },
                { name: 'Sandwichera Eléctrica', basePrice: 38 },
                { name: 'Arrocera Oster', basePrice: 52 },
                { name: 'Hervidor Eléctrico', basePrice: 42 },
                { name: 'Olla Presión Eléctrica', basePrice: 98 },
                { name: 'Purificador de Agua', basePrice: 125 },
                { name: 'Dispensador Agua', basePrice: 88 },
                { name: 'Extractor Cocina', basePrice: 75 }
            ],
            4: [
                { name: 'Bicicleta Trek MTB', basePrice: 200 },
                { name: 'Patineta Eléctrica', basePrice: 150 },
                { name: 'Casco Fox Racing', basePrice: 60 },
                { name: 'Mochila North Face', basePrice: 80 },
                { name: 'Carpa 4 Personas', basePrice: 120 },
                { name: 'Sleeping Bag -10°C', basePrice: 90 },
                { name: 'Linterna Táctica LED', basePrice: 40 },
                { name: 'Binoculares Nikon', basePrice: 110 },
                { name: 'Brújula Profesional', basePrice: 50 },
                { name: 'Cantimplora 2L', basePrice: 100 },
                { name: 'Cuerda Escalada 50m', basePrice: 95 },
                { name: 'Botas Trekking', basePrice: 125 },
                { name: 'Bastones Trekking', basePrice: 75 },
                { name: 'Navaja Suiza', basePrice: 68 },
                { name: 'GPS Garmin', basePrice: 145 },
                { name: 'Colchoneta Inflable', basePrice: 82 },
                { name: 'Hamaca Camping', basePrice: 55 },
                { name: 'Estufa Portátil', basePrice: 98 },
                { name: 'Kit Primeros Auxilios', basePrice: 72 },
                { name: 'Botiquín Completo', basePrice: 85 }
            ],
            5: [
                { name: 'Guitarra Fender', basePrice: 250 },
                { name: 'Piano Yamaha', basePrice: 280 },
                { name: 'Batería Pearl', basePrice: 200 },
                { name: 'Violín Stradivarius', basePrice: 160 },
                { name: 'Trompeta Bach', basePrice: 120 },
                { name: 'Saxofón Yamaha', basePrice: 140 },
                { name: 'Flauta Traversa', basePrice: 80 },
                { name: 'Armónica Hohner', basePrice: 50 },
                { name: 'Maracas Profesional', basePrice: 60 },
                { name: 'Pandereta Remo', basePrice: 60 },
                { name: 'Bajo Fender Jazz', basePrice: 230 },
                { name: 'Ukelele Kala', basePrice: 95 },
                { name: 'Teclado Casio 88', basePrice: 180 },
                { name: 'Amplificador Marshall', basePrice: 190 },
                { name: 'Pedal Efectos Boss', basePrice: 115 },
                { name: 'Metrónomo Digital', basePrice: 48 },
                { name: 'Afinador Cromático', basePrice: 42 },
                { name: 'Atril Profesional', basePrice: 55 },
                { name: 'Cable Instrumento 6m', basePrice: 38 },
                { name: 'Estuche Guitarra', basePrice: 125 }
            ],
            6: [
                { name: 'Sofá 3 Puestos', basePrice: 250 },
                { name: 'Cama Queen Size', basePrice: 220 },
                { name: 'Mesa Comedor 6 Sillas', basePrice: 180 },
                { name: 'Silla Gamer RGB', basePrice: 120 },
                { name: 'Armario 4 Puertas', basePrice: 200 },
                { name: 'Escritorio Ejecutivo', basePrice: 150 },
                { name: 'Estantería Biblioteca', basePrice: 130 },
                { name: 'Espejo Decorativo', basePrice: 80 },
                { name: 'Lámpara Pie Moderna', basePrice: 90 },
                { name: 'Alfombra Persa 3x2m', basePrice: 80 },
                { name: 'Comoda 6 Cajones', basePrice: 160 },
                { name: 'Mesa Centro Cristal', basePrice: 145 },
                { name: 'Perchero Moderno', basePrice: 75 },
                { name: 'Sillón Relax', basePrice: 185 },
                { name: 'Mesa Luz Par', basePrice: 98 },
                { name: 'Cabecera Capitoné', basePrice: 135 },
                { name: 'Biombo Separador', basePrice: 112 },
                { name: 'Cuadros Decorativos Set', basePrice: 88 },
                { name: 'Cortinas Blackout', basePrice: 125 },
                { name: 'Cojines Decorativos Set', basePrice: 77 }
            ],
            7: [
                { name: 'Collar Oro 18K', basePrice: 600 },
                { name: 'Anillo Diamante 1ct', basePrice: 800 },
                { name: 'Pulsera Pandora', basePrice: 350 },
                { name: 'Aretes Perla', basePrice: 400 },
                { name: 'Cadena Oro 24K', basePrice: 500 },
                { name: 'Reloj Rolex', basePrice: 650 },
                { name: 'Gemelos Oro', basePrice: 200 },
                { name: 'Broche Esmeralda', basePrice: 250 },
                { name: 'Dije Oro Blanco', basePrice: 300 },
                { name: 'Corona Cristal', basePrice: 450 },
                { name: 'Tobillera Oro Rosa', basePrice: 320 },
                { name: 'Pendiente Rubí', basePrice: 480 },
                { name: 'Anillo Zafiro', basePrice: 720 },
                { name: 'Prendedor Plata 925', basePrice: 380 },
                { name: 'Choker Oro Blanco', basePrice: 440 },
                { name: 'Piercing Diamante', basePrice: 290 },
                { name: 'Brazalete Esmeralda', basePrice: 530 },
                { name: 'Tiara Platino', basePrice: 680 },
                { name: 'Alianza Oro 24K', basePrice: 410 },
                { name: 'Set Completo Joyería', basePrice: 750 }
            ],
            8: [
                { name: 'Traje Hugo Boss', basePrice: 1200 },
                { name: 'Vestido Versace', basePrice: 1500 },
                { name: 'Zapatos Gucci', basePrice: 900 },
                { name: 'Cartera Louis Vuitton', basePrice: 1100 },
                { name: 'Perfume Chanel N°5', basePrice: 700 },
                { name: 'Gafas Ray-Ban', basePrice: 600 },
                { name: 'Corbata Hermès', basePrice: 800 },
                { name: 'Bufanda Burberry', basePrice: 950 },
                { name: 'Sombrero Borsalino', basePrice: 750 },
                { name: 'Cinturón Ferragamo', basePrice: 500 },
                { name: 'Camisa Armani', basePrice: 850 },
                { name: 'Pantalón Prada', basePrice: 920 },
                { name: 'Chaqueta Cuero Boss', basePrice: 1350 },
                { name: 'Abrigo Burberry', basePrice: 1450 },
                { name: 'Botas Prada', basePrice: 980 },
                { name: 'Mochila Montblanc', basePrice: 780 },
                { name: 'Billetera Gucci', basePrice: 620 },
                { name: 'Reloj Cartier', basePrice: 1280 },
                { name: 'Lentes Dolce Gabbana', basePrice: 720 },
                { name: 'Gemelos Tiffany', basePrice: 830 }
            ],
            9: [
                { name: 'Motocicleta Harley', basePrice: 2500 },
                { name: 'Scooter Vespa', basePrice: 1800 },
                { name: 'Bote Yamaha', basePrice: 2200 },
                { name: 'Jet Ski Sea-Doo', basePrice: 1900 },
                { name: 'Quad Polaris', basePrice: 1600 },
                { name: 'Go Kart Racing', basePrice: 1200 },
                { name: 'Kayak Profesional', basePrice: 800 },
                { name: 'Tabla Surf Pro', basePrice: 600 },
                { name: 'Snowboard Burton', basePrice: 1000 },
                { name: 'Paracaídas Completo', basePrice: 1400 },
                { name: 'Moto Ducati', basePrice: 2300 },
                { name: 'Kitesurf Equipo', basePrice: 950 },
                { name: 'Windsurf Tabla', basePrice: 750 },
                { name: 'Bicicleta Eléctrica Premium', basePrice: 1850 },
                { name: 'Monopatín Eléctrico', basePrice: 680 },
                { name: 'Hoverboard Pro', basePrice: 520 },
                { name: 'Segway Max', basePrice: 1450 },
                { name: 'Esquíes Rossignol', basePrice: 1350 },
                { name: 'Botas Esquí Atomic', basePrice: 850 },
                { name: 'Canoa Inflable Pro', basePrice: 1600 }
            ],
            10: [
                { name: 'Mercedes-Benz Clase S', basePrice: 8000 },
                { name: 'Casa Playa Copacabana', basePrice: 9000 },
                { name: 'Yate 40 Pies', basePrice: 7500 },
                { name: 'Avión Cessna Citation', basePrice: 6500 },
                { name: 'Helicóptero Robinson', basePrice: 5500 },
                { name: 'Mansión 5000m²', basePrice: 4500 },
                { name: 'Isla Privada Caribe', basePrice: 3500 },
                { name: 'Diamante 5ct', basePrice: 2500 },
                { name: 'Picasso Original', basePrice: 2000 },
                { name: 'Cohete SpaceX', basePrice: 1000 },
                { name: 'BMW Serie 8', basePrice: 7200 },
                { name: 'Lamborghini Huracán', basePrice: 8500 },
                { name: 'Ferrari 488', basePrice: 9500 },
                { name: 'Porsche 911 Turbo', basePrice: 6800 },
                { name: 'Apartamento Penthouse', basePrice: 5800 },
                { name: 'Viñedo Francia', basePrice: 4200 },
                { name: 'Rancho Texas 100 Ha', basePrice: 3800 },
                { name: 'Hotel Boutique', basePrice: 7800 },
                { name: 'Galería Arte NYC', basePrice: 6200 },
                { name: 'Restaurante Michelin', basePrice: 5700 }
            ]
        };

        const products = productsByLevel[level] || [];
        const productsList = document.getElementById('productsList');
        productsList.innerHTML = '';

        products.forEach((product, index) => {
            // Aplicar multiplicador aleatorio al precio base
            const randomMultiplier = getRandomPriceMultiplier(level, product.name);
            const adjustedBasePrice = Math.round(product.basePrice * randomMultiplier * 100) / 100;
            
            // Si hay precio personalizado, usarlo; si no, usar precio ajustado
            const currentPrice = customPrices[product.name] || adjustedBasePrice;
            
            // Calcular porcentaje de aumento
            const percentageIncrease = ((randomMultiplier - 1) * 100).toFixed(0);
            
            const productItem = document.createElement('div');
            productItem.className = 'product-item';
            productItem.innerHTML = `
                <div class="product-info">
                    <div class="product-name">${product.name}</div>
                    <div class="product-original-price">Precio VIP ${level}: ${adjustedBasePrice.toFixed(2)} Bs ${level > 1 ? '(+' + percentageIncrease + '%)' : ''}</div>
                </div>
                <input type="number" 
                       class="product-price-input" 
                       data-product-name="${product.name}"
                       value="${currentPrice.toFixed(2)}" 
                       min="0.01" 
                       step="0.01">
            `;
            productsList.appendChild(productItem);
        });
    }

    document.getElementById('saveProductPrices').onclick = async function() {
        const priceInputs = document.querySelectorAll('.product-price-input');
        const customPrices = {};
        
        let invalidPrices = 0;
        priceInputs.forEach(input => {
            const productName = input.dataset.productName;
            const price = parseFloat(input.value);
            if (price > 0) {
                customPrices[productName] = price;
            } else {
                invalidPrices++;
            }
        });
        
        if (invalidPrices > 0) {
            alert(`Hay ${invalidPrices} productos con precios inválidos. Por favor verifica.`);
            return;
        }
        
        try {
            // Buscar el usuario en la base de datos
            const user = allUsers.find(u => u.phone === currentEditingUser.phone);
            if (!user) {
                alert('Usuario no encontrado');
                return;
            }

            console.log('Usuario encontrado:', user.name);
            console.log('Actualizando precios para VIP', currentEditingUser.userLevel);
            console.log('Total de productos:', Object.keys(customPrices).length);

            // Obtener estructura actual de precios personalizados
            const customPricesObj = user.customPrices || {};
            customPricesObj[`level${currentEditingUser.userLevel}`] = customPrices;

            console.log('Objeto de precios a guardar:', customPricesObj);

            // Actualizar en la base de datos
            const result = await updateUser(user.id, { customPrices: customPricesObj });
            console.log('Resultado de la actualización:', result);

            // También guardar en localStorage por compatibilidad
            localStorage.setItem(`custom_prices_${currentEditingUser.phone}_level${currentEditingUser.userLevel}`, JSON.stringify(customPrices));
            
            // Agregar a historial
            transactionHistory.push({
                date: new Date().toISOString(),
                user: currentEditingUser.name,
                phone: currentEditingUser.phone,
                type: 'price_edit',
                amount: 0,
                admin: 'Admin',
                description: `Precios personalizados aplicados para VIP ${currentEditingUser.userLevel}`
            });
            localStorage.setItem('transactionHistory', JSON.stringify(transactionHistory));
            
            showMessage('Precios actualizados exitosamente', 'success');
            document.getElementById('productsModal').style.display = 'none';
            
            // Recargar usuarios para ver cambios
            await loadUsers();
        } catch (error) {
            console.error('Error detallado al guardar precios:', error);
            alert(`Error al guardar precios: ${error.message}\nRevisa la consola para más detalles.`);
        }
        
        renderHistory();
    };

    // Cerrar sesión
    document.getElementById('logoutBtn').addEventListener('click', function() {
        if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
            localStorage.removeItem('currentUser');
            window.location.href = 'login.html';
        }
    });

    // Función para confirmar y eliminar usuario
    window.confirmDeleteUser = async function(userId, userName, userPhone) {
        const confirmation = confirm(`⚠️ ¿Estás seguro de que deseas ELIMINAR al usuario "${userName}" (${userPhone})?\n\nEsta acción NO se puede deshacer.`);
        
        if (!confirmation) return;
        
        // Segunda confirmación para evitar eliminaciones accidentales
        const doubleConfirm = confirm(`⚠️⚠️ ÚLTIMA CONFIRMACIÓN ⚠️⚠️\n\nSe eliminará PERMANENTEMENTE:\n- Usuario: ${userName}\n- Teléfono: ${userPhone}\n- Todo su saldo, productos y progreso\n\n¿Continuar con la eliminación?`);
        
        if (!doubleConfirm) return;
        
        try {
            console.log('Eliminando usuario ID:', userId);
            await deleteUser(userId);
            
            // Agregar a historial
            transactionHistory.push({
                date: new Date().toISOString(),
                user: userName,
                phone: userPhone,
                type: 'delete',
                amount: 0,
                admin: 'Admin',
                description: `Usuario eliminado permanentemente`
            });
            localStorage.setItem('transactionHistory', JSON.stringify(transactionHistory));
            
            showMessage(`Usuario "${userName}" eliminado exitosamente`, 'success');
            
            // Recargar lista de usuarios
            await loadUsers();
            renderHistory();
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            alert(`Error al eliminar usuario: ${error.message}`);
        }
    };

    // Función para limpiar el historial de transacciones
    document.getElementById('clearHistoryBtn').addEventListener('click', function() {
        const historyCount = transactionHistory.length;
        
        if (historyCount === 0) {
            alert('El historial ya está vacío.');
            return;
        }
        
        const confirmation = confirm(`⚠️ ¿Estás seguro de que deseas ELIMINAR TODO el historial?\n\nSe borrarán ${historyCount} registro(s) de transacciones.\n\nEsta acción NO se puede deshacer.`);
        
        if (!confirmation) return;
        
        // Limpiar el historial
        transactionHistory = [];
        localStorage.setItem('transactionHistory', JSON.stringify(transactionHistory));
        
        // Actualizar la vista
        renderHistory();
        
        showMessage('Historial de transacciones eliminado exitosamente', 'success');
        console.log('Historial limpiado por el administrador');
    });
});
