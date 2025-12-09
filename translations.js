// Sistema de traducciones multilingüe
const translations = {
    es: {
        // Login/Registro
        loginTitle: 'Iniciar Sesión',
        registerTitle: 'Crear Cuenta',
        name: 'Nombre Completo',
        phone: 'Número de Teléfono',
        password: 'Contraseña',
        confirmPassword: 'Confirmar Contraseña',
        referralCode: 'Código de Referido (Opcional)',
        referralHelp: 'Si tienes un código de referido, ingrésalo aquí',
        acceptTerms: 'Acepto los',
        termsLink: 'Términos y Condiciones',
        loginButton: 'Iniciar Sesión',
        createAccount: 'Crear Cuenta',
        noAccount: '¿No tienes cuenta?',
        registerHere: 'Regístrate aquí',
        haveAccount: '¿Ya tienes cuenta?',
        loginHere: 'Inicia sesión aquí',
        rememberMe: 'Recordar mi teléfono',
        
        // Navbar Tienda
        welcome: 'Bienvenido',
        welcomePrefix: 'Bienvenido',
        balance: 'Saldo',
        earnings: 'Ganancias',
        referrals: 'Referidos',
        withdraw: 'Retirar Ganancias',
        support: 'Soporte',
        recharge: 'Recargar Saldo',
        logout: 'Cerrar Sesión',
        
        // Nivel VIP
        vipLevel: 'VIP',
        progress: 'productos comprados',
        earningsPerPurchase: 'Ganancias por compra',
        exclusiveProducts: 'Productos Exclusivos - VIP',
        
        // Modal de Producto
        buyNow: 'Comprar Ahora',
        productPrice: 'Precio del producto',
        currentBalance: 'Tu saldo actual',
        earningsLabel: 'Ganancia (120%)',
        insufficientBalance: 'Saldo faltante',
        rechargeFromModal: 'Recargar Saldo',
        
        // Modal de Referidos
        referralSystem: 'Sistema de Referidos',
        inviteFriends: 'Invita amigos y gana bonos por cada referido',
        yourCode: 'Tu Código de Referido',
        copyCode: 'Copiar',
        copied: 'Copiado',
        shareCode: 'Comparte este código con tus amigos al registrarse',
        totalReferrals: 'Referidos Totales',
        referralEarnings: 'Ganancias por Referidos',
        benefitsTitle: 'Beneficios del Sistema',
        benefit1: 'Recibe <strong>10 Bs</strong> por cada amigo que se registre con tu código',
        benefit2: 'Tu amigo recibe <strong>5 Bs</strong> de bono de bienvenida',
        benefit3: 'Sin límite de referidos - ¡invita a todos tus amigos!',
        
        // Modal de Soporte/FAQ
        supportTitle: 'Soporte Técnico - Preguntas Frecuentes',
        faqSubtitle: 'Encuentra respuestas a las preguntas más comunes',
        faq1Q: '¿Cómo funciona el sistema de VIP?',
        faq1A: 'El sistema tiene 10 niveles VIP. Cada VIP tiene 20 productos exclusivos. Al comprar los 20 productos de un VIP, subes automáticamente al siguiente nivel con nuevos productos.',
        faq2Q: '¿Cómo puedo recargar mi saldo?',
        faq2A: 'Para recargar tu saldo, haz clic en el botón "Recargar Saldo" y contacta con nosotros por WhatsApp al número que aparece en pantalla. Te daremos las instrucciones de pago.',
        faq3Q: '¿Cuándo puedo retirar mis ganancias?',
        faq3A: 'Puedes retirar tus ganancias en cualquier momento haciendo clic en "Retirar Ganancias". Contacta con soporte por WhatsApp para procesar tu retiro.',
        faq4Q: '¿Cómo funcionan las ganancias?',
        faq4A: 'Por cada producto que compres, ganas el 120% de su precio. Por ejemplo, si un producto cuesta 50 Bs, ganas 60 Bs que se acumulan en tu cuenta de ganancias.',
        faq5Q: '¿Los precios cambian según el nivel VIP?',
        faq5A: 'Sí, desde el nivel VIP 2 en adelante, los precios de los productos aumentan de forma aleatoria según el nivel. Mayor nivel VIP = precios más altos pero también mayores ganancias.',
        faq6Q: '¿Puedo bajar de nivel VIP?',
        faq6A: 'No, una vez que subes de nivel VIP, permaneces en ese nivel. Solo puedes subir comprando todos los productos de tu nivel actual.',
        contactSupport: 'Contactar Soporte',
        whatsappContact: 'WhatsApp: +591 75605713',
        
        // Modal de Recarga
        rechargeTitle: 'Recargar Saldo',
        rechargeInstructions: 'Para recargar tu saldo, contacta con nosotros por WhatsApp y te daremos las instrucciones de pago.',
        confirmRecharge: 'Contactar por WhatsApp',
        
        // Modal de Retiro
        withdrawTitle: 'Retirar Ganancias',
        withdrawInstructions: 'Para retirar tus ganancias, contacta con nosotros por WhatsApp y procesaremos tu solicitud.',
        availableEarnings: 'Ganancias disponibles',
        confirmWithdraw: 'Solicitar Retiro',
        
        // Mensajes
        loginSuccess: '¡Bienvenido de nuevo',
        adminWelcome: '¡Bienvenido Administrador!',
        accountCreated: '¡Cuenta creada exitosamente',
        nowLogin: 'Ahora puedes iniciar sesión.',
        referralBonus: '¡Has recibido 5 Bs de bono por usar el código de referido!',
        yourReferralCode: 'Tu código de referido es',
        shareEarn: '¡Compártelo con tus amigos y gana 10 Bs por cada referido!',
        invalidCredentials: 'Credenciales incorrectas',
        phoneRegistered: 'Este número ya está registrado',
        invalidReferralCode: 'El código de referido no es válido',
        purchaseSuccess: '¡Compra exitosa!',
        insufficientFunds: 'Saldo insuficiente',
        levelUp: '¡Felicidades! Has subido al VIP',
        confirmLogout: '¿Estás seguro de que deseas cerrar sesión?',
        
        // Términos y Condiciones
        termsTitle: 'Términos y Condiciones',
        termsAccept: 'Aceptar',
        termsClose: 'Cerrar'
    },
    
    en: {
        // Login/Register
        loginTitle: 'Sign In',
        registerTitle: 'Create Account',
        name: 'Full Name',
        phone: 'Phone Number',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        referralCode: 'Referral Code (Optional)',
        referralHelp: 'If you have a referral code, enter it here',
        acceptTerms: 'I accept the',
        termsLink: 'Terms and Conditions',
        loginButton: 'Sign In',
        createAccount: 'Create Account',
        noAccount: "Don't have an account?",
        registerHere: 'Register here',
        haveAccount: 'Already have an account?',
        loginHere: 'Sign in here',
        rememberMe: 'Remember my phone',
        
        // Store Navbar
        welcome: 'Welcome',
        welcomePrefix: 'Welcome',
        balance: 'Balance',
        earnings: 'Earnings',
        referrals: 'Referrals',
        withdraw: 'Withdraw Earnings',
        support: 'Support',
        recharge: 'Recharge Balance',
        logout: 'Logout',
        
        // VIP Level
        vipLevel: 'VIP',
        progress: 'products purchased',
        earningsPerPurchase: 'Earnings per purchase',
        exclusiveProducts: 'Exclusive Products - VIP',
        
        // Product Modal
        buyNow: 'Buy Now',
        productPrice: 'Product price',
        currentBalance: 'Your current balance',
        earningsLabel: 'Earnings (120%)',
        insufficientBalance: 'Missing balance',
        rechargeFromModal: 'Recharge Balance',
        
        // Referral Modal
        referralSystem: 'Referral System',
        inviteFriends: 'Invite friends and earn bonuses for each referral',
        yourCode: 'Your Referral Code',
        copyCode: 'Copy',
        copied: 'Copied',
        shareCode: 'Share this code with your friends when registering',
        totalReferrals: 'Total Referrals',
        referralEarnings: 'Referral Earnings',
        benefitsTitle: 'System Benefits',
        benefit1: 'Receive <strong>10 Bs</strong> for each friend who registers with your code',
        benefit2: 'Your friend receives <strong>5 Bs</strong> welcome bonus',
        benefit3: 'No referral limit - invite all your friends!',
        
        // Support/FAQ Modal
        supportTitle: 'Technical Support - FAQ',
        faqSubtitle: 'Find answers to the most common questions',
        faq1Q: 'How does the VIP system work?',
        faq1A: 'The system has 10 VIP levels. Each VIP has 20 exclusive products. When you buy all 20 products of a VIP, you automatically move up to the next level with new products.',
        faq2Q: 'How can I recharge my balance?',
        faq2A: 'To recharge your balance, click the "Recharge Balance" button and contact us via WhatsApp at the number shown on screen. We will give you payment instructions.',
        faq3Q: 'When can I withdraw my earnings?',
        faq3A: 'You can withdraw your earnings at any time by clicking "Withdraw Earnings". Contact support via WhatsApp to process your withdrawal.',
        faq4Q: 'How do earnings work?',
        faq4A: 'For each product you buy, you earn 120% of its price. For example, if a product costs 50 Bs, you earn 60 Bs that accumulate in your earnings account.',
        faq5Q: 'Do prices change by VIP level?',
        faq5A: 'Yes, from VIP level 2 onwards, product prices increase randomly according to level. Higher VIP level = higher prices but also higher earnings.',
        faq6Q: 'Can I go down a VIP level?',
        faq6A: 'No, once you level up, you stay at that level. You can only go up by buying all products of your current level.',
        contactSupport: 'Contact Support',
        whatsappContact: 'WhatsApp: +591 75605713',
        
        // Recharge Modal
        rechargeTitle: 'Recharge Balance',
        rechargeInstructions: 'To recharge your balance, contact us via WhatsApp and we will give you payment instructions.',
        confirmRecharge: 'Contact via WhatsApp',
        
        // Withdraw Modal
        withdrawTitle: 'Withdraw Earnings',
        withdrawInstructions: 'To withdraw your earnings, contact us via WhatsApp and we will process your request.',
        availableEarnings: 'Available earnings',
        confirmWithdraw: 'Request Withdrawal',
        
        // Messages
        loginSuccess: 'Welcome back',
        adminWelcome: 'Welcome Administrator!',
        accountCreated: 'Account created successfully',
        nowLogin: 'You can now sign in.',
        referralBonus: 'You received 5 Bs bonus for using the referral code!',
        yourReferralCode: 'Your referral code is',
        shareEarn: 'Share it with your friends and earn 10 Bs per referral!',
        invalidCredentials: 'Invalid credentials',
        phoneRegistered: 'This number is already registered',
        invalidReferralCode: 'The referral code is invalid',
        purchaseSuccess: 'Purchase successful!',
        insufficientFunds: 'Insufficient balance',
        levelUp: 'Congratulations! You leveled up to VIP',
        confirmLogout: 'Are you sure you want to logout?',
        
        // Terms and Conditions
        termsTitle: 'Terms and Conditions',
        termsAccept: 'Accept',
        termsClose: 'Close'
    },
    
    zh: {
        // Login/Register
        loginTitle: '登录',
        registerTitle: '创建账户',
        name: '全名',
        phone: '电话号码',
        password: '密码',
        confirmPassword: '确认密码',
        referralCode: '推荐码（可选）',
        referralHelp: '如果您有推荐码，请在此输入',
        acceptTerms: '我接受',
        termsLink: '条款和条件',
        loginButton: '登录',
        createAccount: '创建账户',
        noAccount: '没有账户？',
        registerHere: '在此注册',
        haveAccount: '已有账户？',
        loginHere: '在此登录',
        rememberMe: '记住我的电话',
        
        // Store Navbar
        welcome: '欢迎',
        welcomePrefix: '欢迎',
        balance: '余额',
        earnings: '收益',
        referrals: '推荐',
        withdraw: '提取收益',
        support: '支持',
        recharge: '充值余额',
        logout: '登出',
        
        // VIP Level
        vipLevel: 'VIP',
        progress: '已购买产品',
        earningsPerPurchase: '每次购买收益',
        exclusiveProducts: '独家产品 - VIP',
        
        // Product Modal
        buyNow: '立即购买',
        productPrice: '产品价格',
        currentBalance: '您的当前余额',
        earningsLabel: '收益（120%）',
        insufficientBalance: '余额不足',
        rechargeFromModal: '充值余额',
        
        // Referral Modal
        referralSystem: '推荐系统',
        inviteFriends: '邀请朋友并为每个推荐获得奖金',
        yourCode: '您的推荐码',
        copyCode: '复制',
        copied: '已复制',
        shareCode: '注册时与朋友分享此代码',
        totalReferrals: '总推荐数',
        referralEarnings: '推荐收益',
        benefitsTitle: '系统优势',
        benefit1: '每位使用您的代码注册的朋友可获得<strong>10玻利维亚诺</strong>',
        benefit2: '您的朋友获得<strong>5玻利维亚诺</strong>欢迎奖金',
        benefit3: '无推荐限制 - 邀请所有朋友！',
        
        // Support/FAQ Modal
        supportTitle: '技术支持 - 常见问题',
        faqSubtitle: '查找最常见问题的答案',
        faq1Q: 'VIP系统如何运作？',
        faq1A: '该系统有10个VIP级别。每个VIP有20个独家产品。当您购买VIP的所有20个产品时，您将自动升级到下一个级别的新产品。',
        faq2Q: '如何充值余额？',
        faq2A: '要充值余额，请点击"充值余额"按钮，并通过屏幕上显示的号码联系我们的WhatsApp。我们将为您提供付款说明。',
        faq3Q: '何时可以提取收益？',
        faq3A: '您可以随时点击"提取收益"提取收益。通过WhatsApp联系支持以处理您的提款。',
        faq4Q: '收益如何运作？',
        faq4A: '您购买的每个产品，您将获得其价格的120%。例如，如果产品成本为50玻利维亚诺，您将获得60玻利维亚诺，累积在您的收益账户中。',
        faq5Q: '价格会根据VIP级别变化吗？',
        faq5A: '是的，从VIP级别2开始，产品价格会根据级别随机增加。更高的VIP级别=更高的价格，但也有更高的收益。',
        faq6Q: '我可以降低VIP级别吗？',
        faq6A: '不可以，一旦您升级，您就会保持在该级别。您只能通过购买当前级别的所有产品来升级。',
        contactSupport: '联系支持',
        whatsappContact: 'WhatsApp：+591 75605713',
        
        // Recharge Modal
        rechargeTitle: '充值余额',
        rechargeInstructions: '要充值余额，请通过WhatsApp联系我们，我们将为您提供付款说明。',
        confirmRecharge: '通过WhatsApp联系',
        
        // Withdraw Modal
        withdrawTitle: '提取收益',
        withdrawInstructions: '要提取收益，请通过WhatsApp联系我们，我们将处理您的请求。',
        availableEarnings: '可用收益',
        confirmWithdraw: '请求提款',
        
        // Messages
        loginSuccess: '欢迎回来',
        adminWelcome: '欢迎管理员！',
        accountCreated: '账户创建成功',
        nowLogin: '您现在可以登录。',
        referralBonus: '您因使用推荐码获得5玻利维亚诺奖金！',
        yourReferralCode: '您的推荐码是',
        shareEarn: '与朋友分享，每次推荐赚取10玻利维亚诺！',
        invalidCredentials: '凭据无效',
        phoneRegistered: '此号码已注册',
        invalidReferralCode: '推荐码无效',
        purchaseSuccess: '购买成功！',
        insufficientFunds: '余额不足',
        levelUp: '恭喜！您已升级到VIP',
        confirmLogout: '您确定要登出吗？',
        
        // Terms and Conditions
        termsTitle: '条款和条件',
        termsAccept: '接受',
        termsClose: '关闭'
    },
    
    pt: {
        // Login/Register
        loginTitle: 'Entrar',
        registerTitle: 'Criar Conta',
        name: 'Nome Completo',
        phone: 'Número de Telefone',
        password: 'Senha',
        confirmPassword: 'Confirmar Senha',
        referralCode: 'Código de Referência (Opcional)',
        referralHelp: 'Se você tiver um código de referência, insira-o aqui',
        acceptTerms: 'Eu aceito os',
        termsLink: 'Termos e Condições',
        loginButton: 'Entrar',
        createAccount: 'Criar Conta',
        noAccount: 'Não tem uma conta?',
        registerHere: 'Registre-se aqui',
        haveAccount: 'Já tem uma conta?',
        loginHere: 'Entre aqui',
        rememberMe: 'Lembrar meu telefone',
        
        // Store Navbar
        welcome: 'Bem-vindo',
        welcomePrefix: 'Bem-vindo',
        balance: 'Saldo',
        earnings: 'Ganhos',
        referrals: 'Referências',
        withdraw: 'Sacar Ganhos',
        support: 'Suporte',
        recharge: 'Recarregar Saldo',
        logout: 'Sair',
        
        // VIP Level
        vipLevel: 'VIP',
        progress: 'produtos comprados',
        earningsPerPurchase: 'Ganhos por compra',
        exclusiveProducts: 'Produtos Exclusivos - VIP',
        
        // Product Modal
        buyNow: 'Comprar Agora',
        productPrice: 'Preço do produto',
        currentBalance: 'Seu saldo atual',
        earningsLabel: 'Ganho (120%)',
        insufficientBalance: 'Saldo insuficiente',
        rechargeFromModal: 'Recarregar Saldo',
        
        // Referral Modal
        referralSystem: 'Sistema de Referências',
        inviteFriends: 'Convide amigos e ganhe bônus por cada indicação',
        yourCode: 'Seu Código de Referência',
        copyCode: 'Copiar',
        copied: 'Copiado',
        shareCode: 'Compartilhe este código com seus amigos ao se registrar',
        totalReferrals: 'Total de Referências',
        referralEarnings: 'Ganhos por Referências',
        benefitsTitle: 'Benefícios do Sistema',
        benefit1: 'Receba <strong>10 Bs</strong> para cada amigo que se registrar com seu código',
        benefit2: 'Seu amigo recebe <strong>5 Bs</strong> de bônus de boas-vindas',
        benefit3: 'Sem limite de referências - convide todos os seus amigos!',
        
        // Support/FAQ Modal
        supportTitle: 'Suporte Técnico - Perguntas Frequentes',
        faqSubtitle: 'Encontre respostas para as perguntas mais comuns',
        faq1Q: 'Como funciona o sistema VIP?',
        faq1A: 'O sistema tem 10 níveis VIP. Cada VIP tem 20 produtos exclusivos. Ao comprar todos os 20 produtos de um VIP, você sobe automaticamente para o próximo nível com novos produtos.',
        faq2Q: 'Como posso recarregar meu saldo?',
        faq2A: 'Para recarregar seu saldo, clique no botão "Recarregar Saldo" e entre em contato conosco pelo WhatsApp no número mostrado na tela. Daremos as instruções de pagamento.',
        faq3Q: 'Quando posso sacar meus ganhos?',
        faq3A: 'Você pode sacar seus ganhos a qualquer momento clicando em "Sacar Ganhos". Entre em contato com o suporte pelo WhatsApp para processar seu saque.',
        faq4Q: 'Como funcionam os ganhos?',
        faq4A: 'Para cada produto que você compra, você ganha 120% do seu preço. Por exemplo, se um produto custa 50 Bs, você ganha 60 Bs que se acumulam em sua conta de ganhos.',
        faq5Q: 'Os preços mudam de acordo com o nível VIP?',
        faq5A: 'Sim, a partir do nível VIP 2, os preços dos produtos aumentam aleatoriamente de acordo com o nível. Nível VIP mais alto = preços mais altos, mas também ganhos maiores.',
        faq6Q: 'Posso baixar de nível VIP?',
        faq6A: 'Não, uma vez que você sobe de nível, permanece nesse nível. Você só pode subir comprando todos os produtos do seu nível atual.',
        contactSupport: 'Contatar Suporte',
        whatsappContact: 'WhatsApp: +591 75605713',
        
        // Recharge Modal
        rechargeTitle: 'Recarregar Saldo',
        rechargeInstructions: 'Para recarregar seu saldo, entre em contato conosco pelo WhatsApp e daremos as instruções de pagamento.',
        confirmRecharge: 'Contatar pelo WhatsApp',
        
        // Withdraw Modal
        withdrawTitle: 'Sacar Ganhos',
        withdrawInstructions: 'Para sacar seus ganhos, entre em contato conosco pelo WhatsApp e processaremos sua solicitação.',
        availableEarnings: 'Ganhos disponíveis',
        confirmWithdraw: 'Solicitar Saque',
        
        // Messages
        loginSuccess: 'Bem-vindo de volta',
        adminWelcome: 'Bem-vindo Administrador!',
        accountCreated: 'Conta criada com sucesso',
        nowLogin: 'Agora você pode entrar.',
        referralBonus: 'Você recebeu 5 Bs de bônus por usar o código de referência!',
        yourReferralCode: 'Seu código de referência é',
        shareEarn: 'Compartilhe com seus amigos e ganhe 10 Bs por indicação!',
        invalidCredentials: 'Credenciais inválidas',
        phoneRegistered: 'Este número já está registrado',
        invalidReferralCode: 'O código de referência é inválido',
        purchaseSuccess: 'Compra bem-sucedida!',
        insufficientFunds: 'Saldo insuficiente',
        levelUp: 'Parabéns! Você subiu para o VIP',
        confirmLogout: 'Tem certeza de que deseja sair?',
        
        // Terms and Conditions
        termsTitle: 'Termos e Condições',
        termsAccept: 'Aceitar',
        termsClose: 'Fechar'
    },
    
    ru: {
        // Login/Register
        loginTitle: 'Войти',
        registerTitle: 'Создать Аккаунт',
        name: 'Полное Имя',
        phone: 'Номер Телефона',
        password: 'Пароль',
        confirmPassword: 'Подтвердить Пароль',
        referralCode: 'Реферальный Код (Необязательно)',
        referralHelp: 'Если у вас есть реферальный код, введите его здесь',
        acceptTerms: 'Я принимаю',
        termsLink: 'Условия использования',
        loginButton: 'Войти',
        createAccount: 'Создать Аккаунт',
        noAccount: 'Нет аккаунта?',
        registerHere: 'Зарегистрируйтесь здесь',
        haveAccount: 'Уже есть аккаунт?',
        loginHere: 'Войдите здесь',
        rememberMe: 'Запомнить мой телефон',
        
        // Store Navbar
        welcome: 'Добро пожаловать',
        welcomePrefix: 'Добро пожаловать',
        balance: 'Баланс',
        earnings: 'Доход',
        referrals: 'Рефералы',
        withdraw: 'Вывести Доход',
        support: 'Поддержка',
        recharge: 'Пополнить Баланс',
        logout: 'Выйти',
        
        // VIP Level
        vipLevel: 'VIP',
        progress: 'товаров куплено',
        earningsPerPurchase: 'Доход за покупку',
        exclusiveProducts: 'Эксклюзивные Товары - VIP',
        
        // Product Modal
        buyNow: 'Купить Сейчас',
        productPrice: 'Цена товара',
        currentBalance: 'Ваш текущий баланс',
        earningsLabel: 'Доход (120%)',
        insufficientBalance: 'Недостаточно средств',
        rechargeFromModal: 'Пополнить Баланс',
        
        // Referral Modal
        referralSystem: 'Реферальная Система',
        inviteFriends: 'Приглашайте друзей и получайте бонусы за каждого реферала',
        yourCode: 'Ваш Реферальный Код',
        copyCode: 'Копировать',
        copied: 'Скопировано',
        shareCode: 'Поделитесь этим кодом с друзьями при регистрации',
        totalReferrals: 'Всего Рефералов',
        referralEarnings: 'Доход от Рефералов',
        benefitsTitle: 'Преимущества Системы',
        benefit1: 'Получите <strong>10 Bs</strong> за каждого друга, зарегистрировавшегося с вашим кодом',
        benefit2: 'Ваш друг получает <strong>5 Bs</strong> приветственного бонуса',
        benefit3: 'Без ограничений по рефералам - приглашайте всех своих друзей!',
        
        // Support/FAQ Modal
        supportTitle: 'Техническая Поддержка - FAQ',
        faqSubtitle: 'Найдите ответы на самые частые вопросы',
        faq1Q: 'Как работает VIP система?',
        faq1A: 'В системе 10 уровней VIP. Каждый VIP имеет 20 эксклюзивных товаров. Когда вы покупаете все 20 товаров VIP, вы автоматически переходите на следующий уровень с новыми товарами.',
        faq2Q: 'Как я могу пополнить свой баланс?',
        faq2A: 'Чтобы пополнить баланс, нажмите кнопку "Пополнить Баланс" и свяжитесь с нами через WhatsApp по номеру, показанному на экране. Мы предоставим инструкции по оплате.',
        faq3Q: 'Когда я могу вывести свой доход?',
        faq3A: 'Вы можете вывести свой доход в любое время, нажав "Вывести Доход". Свяжитесь со службой поддержки через WhatsApp для обработки вашего вывода.',
        faq4Q: 'Как работает доход?',
        faq4A: 'За каждый купленный товар вы зарабатываете 120% от его цены. Например, если товар стоит 50 Bs, вы зарабатываете 60 Bs, которые накапливаются на вашем счете дохода.',
        faq5Q: 'Меняются ли цены в зависимости от уровня VIP?',
        faq5A: 'Да, начиная с уровня VIP 2, цены на товары случайным образом увеличиваются в зависимости от уровня. Более высокий уровень VIP = более высокие цены, но и более высокий доход.',
        faq6Q: 'Могу ли я понизить уровень VIP?',
        faq6A: 'Нет, как только вы повышаете уровень, вы остаетесь на этом уровне. Вы можете только повышать уровень, покупая все товары вашего текущего уровня.',
        contactSupport: 'Связаться с Поддержкой',
        whatsappContact: 'WhatsApp: +591 75605713',
        
        // Recharge Modal
        rechargeTitle: 'Пополнить Баланс',
        rechargeInstructions: 'Чтобы пополнить баланс, свяжитесь с нами через WhatsApp, и мы предоставим инструкции по оплате.',
        confirmRecharge: 'Связаться через WhatsApp',
        
        // Withdraw Modal
        withdrawTitle: 'Вывести Доход',
        withdrawInstructions: 'Чтобы вывести доход, свяжитесь с нами через WhatsApp, и мы обработаем ваш запрос.',
        availableEarnings: 'Доступный доход',
        confirmWithdraw: 'Запросить Вывод',
        
        // Messages
        loginSuccess: 'С возвращением',
        adminWelcome: 'Добро пожаловать, Администратор!',
        accountCreated: 'Аккаунт успешно создан',
        nowLogin: 'Теперь вы можете войти.',
        referralBonus: 'Вы получили 5 Bs бонуса за использование реферального кода!',
        yourReferralCode: 'Ваш реферальный код',
        shareEarn: 'Поделитесь с друзьями и зарабатывайте 10 Bs за реферала!',
        invalidCredentials: 'Неверные учетные данные',
        phoneRegistered: 'Этот номер уже зарегистрирован',
        invalidReferralCode: 'Реферальный код недействителен',
        purchaseSuccess: 'Покупка успешна!',
        insufficientFunds: 'Недостаточно средств',
        levelUp: 'Поздравляем! Вы повысились до VIP',
        confirmLogout: 'Вы уверены, что хотите выйти?',
        
        // Terms and Conditions
        termsTitle: 'Условия использования',
        termsAccept: 'Принять',
        termsClose: 'Закрыть'
    },
    
    it: {
        // Login/Register
        loginTitle: 'Accedi',
        registerTitle: 'Crea Account',
        name: 'Nome Completo',
        phone: 'Numero di Telefono',
        password: 'Password',
        confirmPassword: 'Conferma Password',
        referralCode: 'Codice Referral (Opzionale)',
        referralHelp: 'Se hai un codice referral, inseriscilo qui',
        acceptTerms: 'Accetto i',
        termsLink: 'Termini e Condizioni',
        loginButton: 'Accedi',
        createAccount: 'Crea Account',
        noAccount: 'Non hai un account?',
        registerHere: 'Registrati qui',
        haveAccount: 'Hai già un account?',
        loginHere: 'Accedi qui',
        rememberMe: 'Ricorda il mio telefono',
        
        // Store Navbar
        welcome: 'Benvenuto',
        welcomePrefix: 'Benvenuto',
        balance: 'Saldo',
        earnings: 'Guadagni',
        referrals: 'Referral',
        withdraw: 'Preleva Guadagni',
        support: 'Supporto',
        recharge: 'Ricarica Saldo',
        logout: 'Esci',
        
        // VIP Level
        vipLevel: 'VIP',
        progress: 'prodotti acquistati',
        earningsPerPurchase: 'Guadagni per acquisto',
        exclusiveProducts: 'Prodotti Esclusivi - VIP',
        
        // Product Modal
        buyNow: 'Acquista Ora',
        productPrice: 'Prezzo del prodotto',
        currentBalance: 'Il tuo saldo attuale',
        earningsLabel: 'Guadagno (120%)',
        insufficientBalance: 'Saldo insufficiente',
        rechargeFromModal: 'Ricarica Saldo',
        
        // Referral Modal
        referralSystem: 'Sistema Referral',
        inviteFriends: 'Invita amici e guadagna bonus per ogni referral',
        yourCode: 'Il Tuo Codice Referral',
        copyCode: 'Copia',
        copied: 'Copiato',
        shareCode: 'Condividi questo codice con i tuoi amici durante la registrazione',
        totalReferrals: 'Totale Referral',
        referralEarnings: 'Guadagni da Referral',
        benefitsTitle: 'Vantaggi del Sistema',
        benefit1: 'Ricevi <strong>10 Bs</strong> per ogni amico che si registra con il tuo codice',
        benefit2: 'Il tuo amico riceve <strong>5 Bs</strong> di bonus di benvenuto',
        benefit3: 'Nessun limite di referral - invita tutti i tuoi amici!',
        
        // Support/FAQ Modal
        supportTitle: 'Supporto Tecnico - FAQ',
        faqSubtitle: 'Trova risposte alle domande più comuni',
        faq1Q: 'Come funziona il sistema VIP?',
        faq1A: 'Il sistema ha 10 livelli VIP. Ogni VIP ha 20 prodotti esclusivi. Quando acquisti tutti i 20 prodotti di un VIP, sali automaticamente al livello successivo con nuovi prodotti.',
        faq2Q: 'Come posso ricaricare il mio saldo?',
        faq2A: 'Per ricaricare il saldo, clicca sul pulsante "Ricarica Saldo" e contattaci tramite WhatsApp al numero mostrato sullo schermo. Ti forniremo le istruzioni di pagamento.',
        faq3Q: 'Quando posso prelevare i miei guadagni?',
        faq3A: 'Puoi prelevare i tuoi guadagni in qualsiasi momento cliccando su "Preleva Guadagni". Contatta il supporto tramite WhatsApp per elaborare il tuo prelievo.',
        faq4Q: 'Come funzionano i guadagni?',
        faq4A: 'Per ogni prodotto che acquisti, guadagni il 120% del suo prezzo. Ad esempio, se un prodotto costa 50 Bs, guadagni 60 Bs che si accumulano nel tuo conto guadagni.',
        faq5Q: 'I prezzi cambiano in base al livello VIP?',
        faq5A: 'Sì, dal livello VIP 2 in poi, i prezzi dei prodotti aumentano casualmente in base al livello. Livello VIP più alto = prezzi più alti ma anche guadagni maggiori.',
        faq6Q: 'Posso scendere di livello VIP?',
        faq6A: 'No, una volta salito di livello, rimani a quel livello. Puoi solo salire acquistando tutti i prodotti del tuo livello attuale.',
        contactSupport: 'Contatta Supporto',
        whatsappContact: 'WhatsApp: +591 75605713',
        
        // Recharge Modal
        rechargeTitle: 'Ricarica Saldo',
        rechargeInstructions: 'Per ricaricare il saldo, contattaci tramite WhatsApp e ti forniremo le istruzioni di pagamento.',
        confirmRecharge: 'Contatta tramite WhatsApp',
        
        // Withdraw Modal
        withdrawTitle: 'Preleva Guadagni',
        withdrawInstructions: 'Per prelevare i guadagni, contattaci tramite WhatsApp e elaboreremo la tua richiesta.',
        availableEarnings: 'Guadagni disponibili',
        confirmWithdraw: 'Richiedi Prelievo',
        
        // Messages
        loginSuccess: 'Bentornato',
        adminWelcome: 'Benvenuto Amministratore!',
        accountCreated: 'Account creato con successo',
        nowLogin: 'Ora puoi accedere.',
        referralBonus: 'Hai ricevuto 5 Bs di bonus per aver usato il codice referral!',
        yourReferralCode: 'Il tuo codice referral è',
        shareEarn: 'Condividilo con i tuoi amici e guadagna 10 Bs per referral!',
        invalidCredentials: 'Credenziali non valide',
        phoneRegistered: 'Questo numero è già registrato',
        invalidReferralCode: 'Il codice referral non è valido',
        purchaseSuccess: 'Acquisto riuscito!',
        insufficientFunds: 'Saldo insufficiente',
        levelUp: 'Congratulazioni! Sei salito al VIP',
        confirmLogout: 'Sei sicuro di voler uscire?',
        
        // Terms and Conditions
        termsTitle: 'Termini e Condizioni',
        termsAccept: 'Accetta',
        termsClose: 'Chiudi'
    }
};

// Mapa de banderas e idiomas
const languageData = {
    es: { flag: '🇧🇴', code: 'ES', name: 'Español' },
    en: { flag: '🇺🇸', code: 'EN', name: 'English' },
    zh: { flag: '🇨🇳', code: '中文', name: '中文' },
    pt: { flag: '🇧🇷', code: 'PT', name: 'Português' },
    ru: { flag: '🇷🇺', code: 'RU', name: 'Русский' },
    it: { flag: '🇮🇹', code: 'IT', name: 'Italiano' }
};

// Función para obtener el idioma actual
function getCurrentLanguage() {
    return localStorage.getItem('language') || 'es';
}

// Función para establecer el idioma
function setLanguage(lang) {
    localStorage.setItem('language', lang);
    applyTranslations();
    updateLanguageButton(lang);
}

// Función para actualizar el botón principal con el idioma actual
function updateLanguageButton(lang) {
    const currentFlag = document.getElementById('currentFlag');
    const currentLang = document.getElementById('currentLang');
    
    if (currentFlag && currentLang && languageData[lang]) {
        currentFlag.textContent = languageData[lang].flag;
        currentLang.textContent = languageData[lang].code;
    }
}

// Función para aplicar las traducciones
function applyTranslations() {
    const lang = getCurrentLanguage();
    const t = translations[lang];
    
    if (!t) return;
    
    // Traducir todos los elementos con data-translate
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (t[key]) {
            if (element.tagName === 'INPUT' && element.type !== 'submit') {
                element.placeholder = t[key];
            } else {
                element.innerHTML = t[key];
            }
        }
    });
    
    // Actualizar el idioma seleccionado en el selector
    const langButtons = document.querySelectorAll('.lang-option');
    langButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
}

// Inicializar traducciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Forzar actualización de la bandera de Bolivia si el idioma es español
    const selectedLang = getCurrentLanguage();
    if (selectedLang === 'es') {
        const currentFlag = document.getElementById('currentFlag');
        if (currentFlag) {
            currentFlag.textContent = '🇧🇴';
        }
    }
    
    applyTranslations();
    
    // Actualizar el botón principal con el idioma actual
    updateLanguageButton(selectedLang);
    
    // Toggle del dropdown
    const langToggle = document.getElementById('langToggle');
    const langDropdown = document.getElementById('langDropdown');
    
    if (langToggle && langDropdown) {
        langToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            langToggle.classList.toggle('active');
            langDropdown.classList.toggle('show');
        });
        
        // Cerrar dropdown al hacer clic fuera
        document.addEventListener('click', function(e) {
            if (!langToggle.contains(e.target) && !langDropdown.contains(e.target)) {
                langToggle.classList.remove('active');
                langDropdown.classList.remove('show');
            }
        });
    }
    
    // Agregar event listeners a los botones de idioma
    document.querySelectorAll('.lang-option').forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            setLanguage(lang);
            
            // Cerrar dropdown después de seleccionar
            if (langToggle && langDropdown) {
                langToggle.classList.remove('active');
                langDropdown.classList.remove('show');
            }
        });
    });
});
