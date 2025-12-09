// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const showRegisterLink = document.getElementById('showRegister');
    const showLoginLink = document.getElementById('showLogin');
    
    // Toggle password visibility
    const togglePassword = document.getElementById('togglePassword');
    const loginPassword = document.getElementById('loginPassword');
    
    if (togglePassword && loginPassword) {
        togglePassword.addEventListener('click', function() {
            const type = loginPassword.getAttribute('type') === 'password' ? 'text' : 'password';
            loginPassword.setAttribute('type', type);
            this.querySelector('.eye-icon').textContent = type === 'password' ? '👁' : '🙈';
        });
    }
    
    // Alternar entre formularios
    if (showRegisterLink) {
        showRegisterLink.addEventListener('click', function(e) {
            e.preventDefault();
            loginForm.classList.remove('form-active');
            loginForm.classList.add('form-hidden');
            registerForm.classList.remove('form-hidden');
            registerForm.classList.add('form-active');
            clearAllErrors();
        });
    }
    
    if (showLoginLink) {
        showLoginLink.addEventListener('click', function(e) {
            e.preventDefault();
            registerForm.classList.remove('form-active');
            registerForm.classList.add('form-hidden');
            loginForm.classList.remove('form-hidden');
            loginForm.classList.add('form-active');
            clearAllErrors();
        });
    }
    
    // ========== FORMULARIO DE LOGIN ==========
    const loginPhone = document.getElementById('loginPhone');
    // loginPassword ya está declarado arriba
    const loginPhoneError = document.getElementById('loginPhoneError');
    const loginPasswordError = document.getElementById('loginPasswordError');
    
    // Validar en tiempo real
    loginPhone.addEventListener('blur', function() {
        validatePhone(loginPhone, loginPhoneError);
    });
    
    loginPassword.addEventListener('blur', function() {
        validatePassword(loginPassword, loginPasswordError, false);
    });
    
    loginPhone.addEventListener('input', function() {
        clearError(loginPhone, loginPhoneError);
    });
    
    loginPassword.addEventListener('input', function() {
        clearError(loginPassword, loginPasswordError);
    });
    
    // Manejar envío del formulario de login
    loginForm.addEventListener('submit', function(e) {
        console.log('=== SUBMIT FORMULARIO LOGIN ===');
        e.preventDefault();
        
        const isPhoneValid = validatePhone(loginPhone, loginPhoneError);
        const isPasswordValid = validatePassword(loginPassword, loginPasswordError, false);
        console.log('Validaciones:', { isPhoneValid, isPasswordValid });
        
        if (isPhoneValid && isPasswordValid) {
            console.log('Validaciones OK, llamando attemptLogin()');
            attemptLogin();
        } else {
            console.log('Validaciones FALLARON, no se llama attemptLogin()');
        }
    });
    
    // ========== FORMULARIO DE REGISTRO ==========
    const registerName = document.getElementById('registerName');
    const registerPhone = document.getElementById('registerPhone');
    const registerPassword = document.getElementById('registerPassword');
    const confirmPassword = document.getElementById('confirmPassword');
    const acceptTerms = document.getElementById('acceptTerms');
    const registerNameError = document.getElementById('registerNameError');
    const registerPhoneError = document.getElementById('registerPhoneError');
    const registerPasswordError = document.getElementById('registerPasswordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const termsError = document.getElementById('termsError');
    
    // Modal de términos y condiciones
    const termsModal = document.getElementById('termsModal');
    const showTermsLink = document.getElementById('showTerms');
    const closeTermsModal = document.getElementById('closeTermsModal');
    const acceptTermsBtn = document.getElementById('acceptTermsBtn');
    
    // Mostrar modal de términos
    showTermsLink.addEventListener('click', function(e) {
        e.preventDefault();
        termsModal.classList.add('show');
    });
    
    // Cerrar modal
    closeTermsModal.addEventListener('click', function() {
        termsModal.classList.remove('show');
    });
    
    acceptTermsBtn.addEventListener('click', function() {
        acceptTerms.checked = true;
        termsModal.classList.remove('show');
        clearError(acceptTerms, termsError);
    });
    
    // Cerrar modal al hacer clic fuera
    termsModal.addEventListener('click', function(e) {
        if (e.target === termsModal) {
            termsModal.classList.remove('show');
        }
    });
    
    // Validar en tiempo real
    registerName.addEventListener('blur', function() {
        validateName();
    });
    
    registerPhone.addEventListener('blur', function() {
        validatePhone(registerPhone, registerPhoneError);
    });
    
    registerPassword.addEventListener('blur', function() {
        validatePassword(registerPassword, registerPasswordError, true);
    });
    
    confirmPassword.addEventListener('blur', function() {
        validateConfirmPassword();
    });
    
    acceptTerms.addEventListener('change', function() {
        if (acceptTerms.checked) {
            clearError(acceptTerms, termsError);
        }
    });
    
    registerName.addEventListener('input', function() {
        clearError(registerName, registerNameError);
    });
    
    registerPhone.addEventListener('input', function() {
        clearError(registerPhone, registerPhoneError);
    });
    
    registerPassword.addEventListener('input', function() {
        clearError(registerPassword, registerPasswordError);
    });
    
    confirmPassword.addEventListener('input', function() {
        clearError(confirmPassword, confirmPasswordError);
    });
    
    // Manejar envío del formulario de registro
    registerForm.addEventListener('submit', function(e) {
        console.log('=== SUBMIT FORMULARIO REGISTRO ===');
        e.preventDefault();
        
        const isNameValid = validateName();
        const isPhoneValid = validatePhone(registerPhone, registerPhoneError);
        const isPasswordValid = validatePassword(registerPassword, registerPasswordError, true);
        const isConfirmValid = validateConfirmPassword();
        const isTermsAccepted = validateTerms();
        console.log('Validaciones:', { isNameValid, isPhoneValid, isPasswordValid, isConfirmValid, isTermsAccepted });
        
        if (isNameValid && isPhoneValid && isPasswordValid && isConfirmValid && isTermsAccepted) {
            console.log('Validaciones OK, llamando attemptRegister()');
            attemptRegister();
        } else {
            console.log('Validaciones FALLARON, no se llama attemptRegister()');
        }
    });
    
    // ========== FUNCIONES DE VALIDACIÓN ==========
    
    // Validar nombre
    function validateName() {
        const name = registerName.value.trim();
        
        if (!name) {
            showError(registerName, registerNameError, 'El nombre es requerido');
            return false;
        }
        
        if (name.length < 3) {
            showError(registerName, registerNameError, 'El nombre debe tener al menos 3 caracteres');
            return false;
        }
        
        clearError(registerName, registerNameError);
        return true;
    }
    
    // Validar teléfono boliviano
    function validatePhone(input, errorElement) {
        const phone = input.value.trim();
        const wrapper = input.closest('.phone-input-wrapper');
        
        console.log('validatePhone called with:', phone);
        
        if (!phone) {
            if (wrapper) wrapper.classList.add('error');
            showError(input, errorElement, 'El número de teléfono es requerido');
            console.log('validatePhone: teléfono vacío');
            return false;
        }
        
        // Permitir cuenta admin
        if (phone === '00000000') {
            if (wrapper) wrapper.classList.remove('error');
            clearError(input, errorElement);
            console.log('validatePhone: admin OK');
            return true;
        }
        
        // Si no tiene wrapper (es login), solo verificar que tenga números
        if (!wrapper) {
            const onlyNumbers = /^\d{7,8}$/;
            if (!onlyNumbers.test(phone)) {
                showError(input, errorElement, 'Ingresa solo números (7-8 dígitos)');
                console.log('validatePhone: formato inválido en login');
                return false;
            }
            clearError(input, errorElement);
            console.log('validatePhone: login OK');
            return true;
        }
        
        // Si tiene wrapper (es registro), validar formato boliviano
        const bolivianPhoneRegex = /^[67]\d{7}$/;
        
        if (!bolivianPhoneRegex.test(phone)) {
            if (wrapper) wrapper.classList.add('error');
            showError(input, errorElement, 'Número inválido. Debe empezar con 6 o 7 (8 dígitos)');
            console.log('validatePhone: formato boliviano inválido');
            return false;
        }
        
        if (wrapper) wrapper.classList.remove('error');
        clearError(input, errorElement);
        console.log('validatePhone: registro OK');
        return true;
    }
    
    // Validar contraseña
    function validatePassword(input, errorElement, isRegister) {
        const password = input.value;
        
        if (!password) {
            showError(input, errorElement, 'La contraseña es requerida');
            return false;
        }
        
        if (password.length < 6) {
            showError(input, errorElement, 'La contraseña debe tener al menos 6 caracteres');
            return false;
        }
        
        clearError(input, errorElement);
        return true;
    }
    
    // Validar confirmación de contraseña
    function validateConfirmPassword() {
        const password = registerPassword.value;
        const confirm = confirmPassword.value;
        
        if (!confirm) {
            showError(confirmPassword, confirmPasswordError, 'Debes confirmar tu contraseña');
            return false;
        }
        
        if (password !== confirm) {
            showError(confirmPassword, confirmPasswordError, 'Las contraseñas no coinciden');
            return false;
        }
        
        clearError(confirmPassword, confirmPasswordError);
        return true;
    }
    
    // Validar aceptación de términos
    function validateTerms() {
        if (!acceptTerms.checked) {
            showError(acceptTerms, termsError, 'Debes aceptar los Términos y Condiciones para continuar');
            return false;
        }
        
        clearError(acceptTerms, termsError);
        return true;
    }
    
    // ========== FUNCIONES DE UTILIDAD ==========
    
    function showError(input, errorElement, message) {
        input.classList.add('error');
        errorElement.textContent = message;
    }
    
    function clearError(input, errorElement) {
        input.classList.remove('error');
        errorElement.textContent = '';
    }
    
    function clearAllErrors() {
        const allInputs = document.querySelectorAll('input');
        const allErrors = document.querySelectorAll('.error-message');
        
        allInputs.forEach(input => input.classList.remove('error'));
        allErrors.forEach(error => error.textContent = '');
    }
    
    // ========== FUNCIONES DE LOGIN Y REGISTRO ==========
    
    async function attemptLogin() {
        console.log('=== INICIO attemptLogin ===');
        const phoneInput = loginPhone.value.trim();
        const password = loginPassword.value;
        console.log('Datos:', { phoneInput, password });
        const rememberCheckbox = document.getElementById('remember');
        const remember = rememberCheckbox ? rememberCheckbox.checked : false;
        
        const loginButton = loginForm.querySelector('.btn-login');
        const originalText = loginButton.textContent;
        console.log('Cambiando botón a "Iniciando sesión..."');
        loginButton.textContent = 'Iniciando sesión...';
        loginButton.disabled = true;
        
        try {
            // Verificar si es admin (sin validación de teléfono boliviano)
            console.log('Verificando credenciales...');
            if (phoneInput === '00000000' && password === 'hondacb160F') {
                console.log('Login como ADMIN');
                const adminUser = {
                    name: 'Administrador',
                    phone: '+59100000000',
                    password: password
                };
                loginSuccess(adminUser, remember, true);
                return;
            }
            
            // Usuario normal - agregar prefijo +591
            console.log('Login como USUARIO NORMAL');
            const phone = '+591' + phoneInput;
            console.log('Teléfono completo:', phone);
            const user = await verifyLogin(phone, password);
            console.log('Resultado verifyLogin:', user);
            
            if (user) {
                console.log('Usuario encontrado, llamando loginSuccess');
                loginSuccess(user, remember, false);
            } else {
                console.log('Usuario NO encontrado, llamando loginFailed');
                loginFailed();
                loginButton.textContent = originalText;
                loginButton.disabled = false;
            }
        } catch (error) {
            console.error('Error en login:', error);
            alert('Error al conectar con el servidor. Verifica que la base de datos esté activa.');
            loginButton.textContent = originalText;
            loginButton.disabled = false;
        }
    }
    
    function loginSuccess(user, remember, isAdmin = false) {
        if (remember) {
            localStorage.setItem('rememberPhone', user.phone);
        }
        
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        const loginBox = document.querySelector('.login-box');
        loginBox.classList.add('success-animation');
        
        if (isAdmin) {
            alert(`¡Bienvenido Administrador!`);
            window.location.href = 'admin.html';
        } else {
            alert(`¡Bienvenido de nuevo, ${user.name}!`);
            window.location.href = 'tienda.html';
        }
    }
    
    function loginFailed() {
        showError(loginPhone, loginPhoneError, 'Credenciales incorrectas');
        showError(loginPassword, loginPasswordError, 'Credenciales incorrectas');
        
        const loginBox = document.querySelector('.login-box');
        loginBox.style.animation = 'shake 0.5s';
        setTimeout(() => {
            loginBox.style.animation = '';
        }, 500);
    }
    
    // Generar código de referido único
    function generateReferralCode(phone) {
        // Usar los últimos 4 dígitos del teléfono + 2 caracteres aleatorios
        const phoneDigits = phone.replace(/\D/g, '').slice(-4);
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let randomChars = '';
        for (let i = 0; i < 2; i++) {
            randomChars += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return phoneDigits + randomChars;
    }

    async function attemptRegister() {
        console.log('=== INICIO attemptRegister ===');
        const name = registerName.value.trim();
        const phone = '+591' + registerPhone.value.trim();
        const password = registerPassword.value;
        const referralCode = document.getElementById('referralCode').value.trim().toUpperCase();
        console.log('Datos registro:', { name, phone, referralCode });
        
        const registerButton = registerForm.querySelector('.btn-login');
        console.log('Cambiando botón a "Creando cuenta..."');
        registerButton.textContent = 'Creando cuenta...';
        registerButton.disabled = true;
        
        try {
            console.log('Intentando registrar usuario:', { name, phone, referralCode });
            
            // Verificar si el teléfono ya está registrado
            console.log('Verificando si teléfono existe...');
            const exists = await phoneExists(phone);
            console.log('Teléfono existe:', exists);
            
            if (exists) {
                showError(registerPhone, registerPhoneError, 'Este número ya está registrado');
                registerButton.textContent = 'Crear Cuenta';
                registerButton.disabled = false;
                return;
            }
            
            // Si hay código de referido, validar que exista
            let referrerUser = null;
            if (referralCode) {
                referrerUser = await getUserByReferralCode(referralCode);
                if (!referrerUser) {
                    alert('El código de referido no es válido');
                    registerButton.textContent = 'Crear Cuenta';
                    registerButton.disabled = false;
                    return;
                }
            }
            
            // Generar código de referido único para el nuevo usuario
            const myReferralCode = generateReferralCode(phone);
            
            // Crear nuevo usuario
            const newUser = {
                name: name,
                phone: phone,
                password: password,
                referralCode: myReferralCode,
                referredBy: referrerUser ? referrerUser.phone : null,
                totalReferrals: 0,
                createdAt: new Date().toISOString()
            };
            
            console.log('Creando usuario:', newUser);
            const savedUser = await createUser(newUser);
            console.log('Usuario creado exitosamente:', savedUser);
            
            // Si fue referido, dar bonos
            if (referrerUser) {
                // Bono para el referente: 10 Bs
                const referrerBalance = parseFloat(localStorage.getItem(`balance_${referrerUser.phone}`) || '0');
                localStorage.setItem(`balance_${referrerUser.phone}`, (referrerBalance + 10).toString());
                
                // Actualizar contador de referidos
                referrerUser.totalReferrals = (referrerUser.totalReferrals || 0) + 1;
                await updateUser(referrerUser.id, { totalReferrals: referrerUser.totalReferrals });
                
                // Bono para el nuevo usuario: 5 Bs
                localStorage.setItem(`balance_${savedUser.phone}`, '5');
                
                console.log(`Bonos aplicados: Referente ${referrerUser.name} (+10 Bs), Nuevo usuario (+5 Bs)`);
            } else {
                // Usuario nuevo sin referido: balance inicial 0
                localStorage.setItem(`balance_${savedUser.phone}`, '0');
            }
            
            // Inicializar datos del usuario
            localStorage.setItem(`level_${savedUser.phone}`, '1');
            localStorage.setItem(`earnings_${savedUser.phone}`, '0');
            
            registerSuccess(savedUser, referrerUser);
            
        } catch (error) {
            console.error('Error detallado en registro:', error);
            alert('Error al crear la cuenta: ' + error.message + '\n\nAsegúrate de que el servidor esté corriendo (npm start)');
            registerButton.textContent = 'Crear Cuenta';
            registerButton.disabled = false;
        }
    }
    
    function registerSuccess(user, referrerUser) {
        const loginBox = document.querySelector('.login-box');
        loginBox.classList.add('success-animation');
        
        let message = `¡Cuenta creada exitosamente, ${user.name}!`;
        
        if (referrerUser) {
            message += `\n\n🎉 ¡Has recibido 5 Bs de bono por usar el código de referido!`;
            message += `\n\nTu código de referido es: ${user.referralCode}`;
            message += `\n¡Compártelo con tus amigos y gana 10 Bs por cada referido!`;
        } else {
            message += `\n\nTu código de referido es: ${user.referralCode}`;
            message += `\n¡Compártelo con tus amigos y gana 10 Bs por cada referido!`;
        }
        
        message += `\n\nAhora puedes iniciar sesión.`;
        
        alert(message);
        
        registerForm.reset();
        
        // Cambiar al formulario de login
        setTimeout(() => {
            showLoginLink.click();
        }, 500);
    }
    
    // Cargar teléfono guardado si existe
    const rememberedPhone = localStorage.getItem('rememberPhone');
    if (rememberedPhone) {
        // Quitar el prefijo +591 para mostrar solo el número
        loginPhone.value = rememberedPhone.replace('+591', '');
        document.getElementById('remember').checked = true;
    }
});

// Añadir animación de sacudida
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
        20%, 40%, 60%, 80% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);
