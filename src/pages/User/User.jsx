import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  Wallet,
  Building,
  Briefcase,
  Shield,
  ShieldCheck,
  Lock,
  Fingerprint,
  Smartphone,
  Laptop,
  Tablet,
  Eye,
  EyeOff,
  Edit2,
  Save,
  X,
  Check,
  Copy,
  Download,
  Upload,
  Camera,
  Image,
  FileText,
  Award,
  Star,
  Heart,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  DollarSign,
  BadgePercent,
  Calculator,
  PiggyBank,
  Landmark,
  Sprout,
  Tractor,
  Leaf,
  Clock,
  Bell,
  BellRing,
  BellOff,
  Settings,
  LogOut,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Menu,
  X as XIcon,
  Plus,
  Minus,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  Headphones,
  MessageSquare,
  Mail as MailIcon,
  Phone as PhoneIcon,
  MapPin as MapPinIcon,
  Globe,
  Users,
  Share2,
  QrCode,
  ScanFace,
  Fingerprint as FingerprintIcon,
  Key,
  ShieldAlert,
  ShieldQuestion,
  CreditCard as CreditCardIcon,
  Wallet as WalletIcon,
  Banknote,
  Coins,
  Percent,
  Scale,
  Receipt,
  FileCheck,
  FileWarning,
  FileX,
  FileSignature,
  Stamp,
  BadgeCheck,
  BadgeAlert,
  BadgeInfo,
  BadgeX,
  Medal,
  Trophy,
  Crown,
  Sparkles,
  Rocket,
  Zap,
  Cpu,
  Network,
  Database,
  Cloud,
  Server,
  HardDrive,
  Monitor,
  Printer,
  Scissors,
  Wrench,
  Hammer,
  Target,
  Wifi,
  WifiOff,
  Battery,
  BatteryCharging,
  BatteryWarning,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Camera as CameraIcon,
  CameraOff,
  Video,
  VideoOff
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import './User.css';
import logo from '../../assets/images/Logo/logo.svg';
import defaultAvatar from '../../assets/images/User/default-avatar.jpg';

// Componente de Card de Saldo
const BalanceCard = ({ balance, onHide, isHidden }) => (
  <motion.div 
    className="balance-card"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="balance-header">
      <WalletIcon size={20} className="balance-icon" />
      <h3>Saldo Disponível</h3>
      <button onClick={onHide} className="balance-hide-btn">
        {isHidden ? <Eye size={18} /> : <EyeOff size={18} />}
      </button>
    </div>
    <div className="balance-value">
      <span className="balance-currency">R$</span>
      <span className="balance-amount">{isHidden ? '••••••' : balance.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
    </div>
    <div className="balance-actions">
      <motion.button 
        className="balance-action"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <Plus size={16} />
        <span>Depositar</span>
      </motion.button>
      <motion.button 
        className="balance-action"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <Minus size={16} />
        <span>Transferir</span>
      </motion.button>
    </div>
  </motion.div>
);

// Componente de Card de Produto
const ProductCard = ({ product, index }) => (
  <motion.div 
    className="product-card"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.1 }}
    whileHover={{ y: -5 }}
  >
    <div className="product-icon" style={{ backgroundColor: `${product.color}20` }}>
      {product.icon}
    </div>
    <div className="product-info">
      <h4>{product.name}</h4>
      <p className="product-description">{product.description}</p>
      {product.value && (
        <p className="product-value">
          <span className="value-label">Valor:</span>
          <span className="value-amount">{product.value}</span>
        </p>
      )}
      {product.rate && (
        <p className="product-rate">
          <span className="rate-label">Taxa:</span>
          <span className="rate-value">{product.rate}</span>
        </p>
      )}
    </div>
    <div className="product-status">
      <span className={`status-badge ${product.status}`}>
        {product.status === 'active' && 'Ativo'}
        {product.status === 'pending' && 'Pendente'}
        {product.status === 'completed' && 'Concluído'}
      </span>
    </div>
  </motion.div>
);

// Componente de Card de Transação
const TransactionCard = ({ transaction, index }) => (
  <motion.div 
    className={`transaction-card ${transaction.type}`}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3, delay: index * 0.05 }}
    whileHover={{ x: 5 }}
  >
    <div className="transaction-icon" style={{ backgroundColor: `${transaction.color}20` }}>
      {transaction.type === 'income' ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
    </div>
    <div className="transaction-info">
      <h4>{transaction.description}</h4>
      <p className="transaction-date">{transaction.date}</p>
    </div>
    <div className="transaction-amount">
      <span className={`amount-value ${transaction.type}`}>
        {transaction.type === 'income' ? '+' : '-'} R$ {transaction.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </span>
    </div>
  </motion.div>
);

// Componente de Card de Notificação
const NotificationCard = ({ notification, index, onDismiss }) => (
  <motion.div 
    className={`notification-card ${notification.type}`}
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.3, delay: index * 0.05 }}
    whileHover={{ x: -5 }}
  >
    <div className="notification-icon" style={{ backgroundColor: `${notification.color}20` }}>
      {notification.type === 'success' && <CheckCircle2 size={18} />}
      {notification.type === 'warning' && <AlertCircle size={18} />}
      {notification.type === 'info' && <HelpCircle size={18} />}
      {notification.type === 'promo' && <Sparkles size={18} />}
    </div>
    <div className="notification-info">
      <h4>{notification.title}</h4>
      <p>{notification.message}</p>
      <span className="notification-time">{notification.time}</span>
    </div>
    <button onClick={() => onDismiss(notification.id)} className="notification-dismiss">
      <X size={14} />
    </button>
  </motion.div>
);

// Componente de Card de Meta
const GoalCard = ({ goal, index }) => (
  <motion.div 
    className="goal-card"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.1 }}
    whileHover={{ y: -5 }}
  >
    <div className="goal-header">
      <div className="goal-icon" style={{ backgroundColor: `${goal.color}20` }}>
        {goal.icon}
      </div>
      <h4>{goal.title}</h4>
    </div>
    <div className="goal-progress">
      <div className="progress-bar">
        <motion.div 
          className="progress-fill"
          initial={{ width: 0 }}
          animate={{ width: `${goal.progress}%` }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{ backgroundColor: goal.color }}
        />
      </div>
      <div className="progress-values">
        <span className="progress-current">R$ {goal.current.toLocaleString('pt-BR')}</span>
        <span className="progress-target">R$ {goal.target.toLocaleString('pt-BR')}</span>
      </div>
    </div>
  </motion.div>
);

// Componente de Card de Documento
const DocumentCard = ({ document, index, onDownload }) => (
  <motion.div 
    className="document-card"
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3, delay: index * 0.05 }}
    whileHover={{ y: -3 }}
  >
    <div className="document-icon" style={{ backgroundColor: `${document.color}20` }}>
      <FileText size={20} />
    </div>
    <div className="document-info">
      <h4>{document.name}</h4>
      <p>{document.date}</p>
    </div>
    <div className="document-actions">
      <button onClick={() => onDownload(document)} className="document-action">
        <Download size={14} />
      </button>
    </div>
  </motion.div>
);

const UserProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [isBalanceHidden, setIsBalanceHidden] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(3);
  const [userData, setUserData] = useState({
    name: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '(11) 99999-9999',
    cpf: '123.456.789-00',
    birthDate: '15/05/1985',
    address: 'Av. Paulista, 1000 - apto 123, São Paulo - SP',
    occupation: 'Empresário',
    company: 'Tech Solutions Ltda',
    memberSince: '2018',
    avatar: null
  });

  const [formData, setFormData] = useState({ ...userData });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Esconde a navbar enquanto a página de usuário estiver montada
    document.body.classList.add('hide-navbar');
    return () => {
      document.body.classList.remove('hide-navbar');
    };
  }, []);

  // Dados do usuário
  const userStats = {
    balance: 15750.89,
    invested: 45000.00,
    credit: 50000.00,
    score: 820
  };

  // Produtos do usuário
  const userProducts = [
    { 
      icon: <CreditCard size={20} />, 
      name: 'Cartão Black', 
      description: 'Limite de R$ 15.000',
      value: 'R$ 15.000,00',
      status: 'active',
      color: '#2563EB'
    },
    { 
      icon: <Wallet size={20} />, 
      name: 'Conta Digital', 
      description: 'Conta corrente completa',
      status: 'active',
      color: '#F59E0B'
    },
    { 
      icon: <PiggyBank size={20} />, 
      name: 'CDB 110% CDI', 
      description: 'Investimento de R$ 15.000',
      value: 'R$ 15.000,00',
      rate: '110% CDI',
      status: 'active',
      color: '#1E3A8A'
    },
    { 
      icon: <BadgePercent size={20} />, 
      name: 'Crédito Consignado', 
      description: 'Solicitação em análise',
      value: 'R$ 25.000,00',
      status: 'pending',
      color: '#D97706'
    },
    { 
      icon: <Sprout size={20} />, 
      name: 'Crédito Agro', 
      description: 'Linha especial',
      value: 'R$ 50.000,00',
      status: 'completed',
      color: '#2563EB'
    },
    { 
      icon: <Building size={20} />, 
      name: 'Financiamento Imobiliário', 
      description: 'Pago em 2023',
      status: 'completed',
      color: '#F59E0B'
    }
  ];

  // Transações recentes
  const recentTransactions = [
    { 
      description: 'Salário', 
      date: '05/03/2026', 
      amount: 8500.00, 
      type: 'income',
      color: '#10B981'
    },
    { 
      description: 'Pagamento de fatura', 
      date: '03/03/2026', 
      amount: 2340.50, 
      type: 'expense',
      color: '#EF4444'
    },
    { 
      description: 'Transferência recebida', 
      date: '01/03/2026', 
      amount: 1200.00, 
      type: 'income',
      color: '#10B981'
    },
    { 
      description: 'Investimento CDB', 
      date: '28/02/2026', 
      amount: 5000.00, 
      type: 'expense',
      color: '#EF4444'
    },
    { 
      description: 'Cashback cartão', 
      date: '25/02/2026', 
      amount: 85.90, 
      type: 'income',
      color: '#10B981'
    }
  ];

  // Notificações
  const notificationsList = [
    { 
      id: 1,
      type: 'success',
      title: 'Pagamento confirmado',
      message: 'Sua fatura foi paga com sucesso.',
      time: 'há 2 horas',
      color: '#10B981'
    },
    { 
      id: 2,
      type: 'warning',
      title: 'Limite próximo do fim',
      message: 'Você utilizou 85% do seu limite de crédito.',
      time: 'há 5 horas',
      color: '#F59E0B'
    },
    { 
      id: 3,
      type: 'promo',
      title: 'Oferta especial',
      message: 'Taxa zero para transferências este mês!',
      time: 'há 1 dia',
      color: '#2563EB'
    },
    { 
      id: 4,
      type: 'info',
      title: 'Documento disponível',
      message: 'Seu extrato anual está pronto.',
      time: 'há 2 dias',
      color: '#3B82F6'
    }
  ];

  // Metas financeiras
  const financialGoals = [
    { 
      title: 'Reserva de emergência', 
      current: 15000, 
      target: 30000, 
      progress: 50,
      icon: <Shield size={18} />,
      color: '#2563EB'
    },
    { 
      title: 'Viagem internacional', 
      current: 8500, 
      target: 20000, 
      progress: 42.5,
      icon: <Globe size={18} />,
      color: '#F59E0B'
    },
    { 
      title: 'Entrada do imóvel', 
      current: 45000, 
      target: 100000, 
      progress: 45,
      icon: <Building size={18} />,
      color: '#1E3A8A'
    }
  ];

  // Documentos
  const documents = [
    { 
      name: 'Contrato Cartão Black', 
      date: '15/01/2026',
      color: '#2563EB'
    },
    { 
      name: 'Extrato Anual 2025', 
      date: '10/01/2026',
      color: '#F59E0B'
    },
    { 
      name: 'Comprovante de Rendimentos', 
      date: '28/02/2025',
      color: '#1E3A8A'
    },
    { 
      name: 'Contrato Financiamento', 
      date: '20/12/2024',
      color: '#D97706'
    }
  ];

  // Variantes de animação
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const scaleVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    setUserData(formData);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setFormData(userData);
    setIsEditing(false);
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const handleDismissNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleDownloadDocument = (doc) => {
    console.log('Downloading:', doc.name);
  };

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: <Activity size={16} /> },
    { id: 'products', label: 'Meus Produtos', icon: <CreditCard size={16} /> },
    { id: 'transactions', label: 'Transações', icon: <Receipt size={16} /> },
    { id: 'goals', label: 'Metas', icon: <Target size={16} /> },
    { id: 'documents', label: 'Documentos', icon: <FileText size={16} /> },
    { id: 'security', label: 'Segurança', icon: <Shield size={16} /> }
  ];

  return (
    <div className="user-page">
      {/* Background Elements */}
      <div className="user-background">
        <div className="gradient-orb orb-blue"></div>
        <div className="gradient-orb orb-gold"></div>
        <div className="gradient-orb orb-dark"></div>
        <div className="grid-pattern"></div>
      </div>

      {/* Main Content */}
      <div className="user-container">
        {/* Header */}
        <motion.div 
          className="user-header"
          variants={fadeInUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6 }}
        >
          <div className="header-left">
            <Link to="/" className="header-logo">
              <div className="logo-container">
                <img src={logo} alt="Instituto Financeiro" className="logo-image" />
                <div className="logo-glow"></div>
              </div>
              <div className="logo-text">
                <span className="logo-text-primary">Instituto</span>
                <span className="logo-text-secondary">Financeiro</span>
              </div>
            </Link>
          </div>

          <div className="header-right">
            <motion.button 
              className="header-btn notification-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell size={18} />
              {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
            </motion.button>

            <motion.button 
              className="header-btn settings-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/configuracoes')}
            >
              <Settings size={18} />
            </motion.button>

            <motion.div 
              className="user-menu"
              whileHover={{ scale: 1.02 }}
            >
              <div className="user-avatar">
                <img 
                  src={previewUrl || userData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=2563EB&color=ffffff&bold=true`} 
                  alt={userData.name}
                />
              </div>
              <div className="user-info">
                <span className="user-name">{userData.name}</span>
                <span className="user-role">Cliente desde {userData.memberSince}</span>
              </div>
              <ChevronDown size={16} className="user-arrow" />
            </motion.div>
          </div>
        </motion.div>

        {/* Notifications Panel */}
        <AnimatePresence>
          {showNotifications && (
            <motion.div 
              className="notifications-panel"
              variants={scaleVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="panel-header">
                <h3>Notificações</h3>
                <button onClick={() => setShowNotifications(false)} className="close-btn">
                  <X size={16} />
                </button>
              </div>
              <div className="notifications-list">
                {notificationsList.map((notification, index) => (
                  <NotificationCard 
                    key={notification.id}
                    notification={notification}
                    index={index}
                    onDismiss={handleDismissNotification}
                  />
                ))}
              </div>
              <div className="panel-footer">
                <button className="mark-all-read">Marcar todas como lidas</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Grid */}
        <div className="user-grid">
          {/* Left Column - Profile Info */}
          <motion.div 
            className="profile-card"
            variants={fadeInUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="profile-header">
              <h2>Perfil</h2>
              <motion.button 
                className="edit-btn"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? <X size={16} /> : <Edit2 size={16} />}
              </motion.button>
            </div>

            <div className="profile-avatar-section">
              <div className="profile-avatar">
                <img 
                  src={previewUrl || userData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=2563EB&color=ffffff&bold=true`} 
                  alt={userData.name}
                />
                {isEditing && (
                  <motion.label 
                    className="avatar-upload"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Camera size={14} />
                    <input type="file" accept="image/*" onChange={handleFileChange} hidden />
                  </motion.label>
                )}
              </div>
              {!isEditing ? (
                <div className="profile-name">
                  <h3>{userData.name}</h3>
                  <p>{userData.occupation}</p>
                </div>
              ) : (
                <div className="profile-name-edit">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Nome completo"
                    className="edit-input"
                  />
                  <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleInputChange}
                    placeholder="Profissão"
                    className="edit-input"
                  />
                </div>
              )}
            </div>

            <div className="profile-info">
              <div className="info-item">
                <Mail size={16} className="info-icon" />
                {!isEditing ? (
                  <span>{userData.email}</span>
                ) : (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="E-mail"
                    className="edit-input"
                  />
                )}
              </div>

              <div className="info-item">
                <Phone size={16} className="info-icon" />
                {!isEditing ? (
                  <span>{userData.phone}</span>
                ) : (
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Telefone"
                    className="edit-input"
                  />
                )}
              </div>

              <div className="info-item">
                <CreditCard size={16} className="info-icon" />
                {!isEditing ? (
                  <span>{userData.cpf}</span>
                ) : (
                  <input
                    type="text"
                    name="cpf"
                    value={formData.cpf}
                    onChange={handleInputChange}
                    placeholder="CPF"
                    className="edit-input"
                  />
                )}
              </div>

              <div className="info-item">
                <Calendar size={16} className="info-icon" />
                {!isEditing ? (
                  <span>{userData.birthDate}</span>
                ) : (
                  <input
                    type="text"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleInputChange}
                    placeholder="Data de nascimento"
                    className="edit-input"
                  />
                )}
              </div>

              <div className="info-item">
                <MapPin size={16} className="info-icon" />
                {!isEditing ? (
                  <span>{userData.address}</span>
                ) : (
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Endereço"
                    className="edit-input"
                  />
                )}
              </div>

              <div className="info-item">
                <Briefcase size={16} className="info-icon" />
                {!isEditing ? (
                  <span>{userData.company}</span>
                ) : (
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Empresa"
                    className="edit-input"
                  />
                )}
              </div>
            </div>

            {isEditing && (
              <div className="profile-actions">
                <motion.button 
                  className="save-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSaveProfile}
                >
                  <Save size={14} />
                  <span>Salvar</span>
                </motion.button>
                <motion.button 
                  className="cancel-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCancelEdit}
                >
                  <X size={14} />
                  <span>Cancelar</span>
                </motion.button>
              </div>
            )}
          </motion.div>

          {/* Right Column - Stats and Balance */}
          <motion.div 
            className="stats-card"
            variants={fadeInUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <BalanceCard 
              balance={userStats.balance}
              isHidden={isBalanceHidden}
              onHide={() => setIsBalanceHidden(!isBalanceHidden)}
            />

            <div className="stats-grid">
              <div className="stat-item">
                <PiggyBank size={20} className="stat-icon" />
                <div className="stat-info">
                  <span className="stat-label">Investido</span>
                  <span className="stat-value">R$ {userStats.invested.toLocaleString('pt-BR')}</span>
                </div>
              </div>

              <div className="stat-item">
                <CreditCard size={20} className="stat-icon" />
                <div className="stat-info">
                  <span className="stat-label">Crédito Disponível</span>
                  <span className="stat-value">R$ {userStats.credit.toLocaleString('pt-BR')}</span>
                </div>
              </div>

              <div className="stat-item">
                <Award size={20} className="stat-icon" />
                <div className="stat-info">
                  <span className="stat-label">Score de Crédito</span>
                  <span className="stat-value">{userStats.score}</span>
                </div>
              </div>

              <div className="stat-item">
                <Star size={20} className="stat-icon" />
                <div className="stat-info">
                  <span className="stat-label">Cliente desde</span>
                  <span className="stat-value">{userData.memberSince}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs Navigation */}
        <motion.div 
          className="tabs-nav"
          variants={fadeInUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <motion.div 
          className="tab-content"
          variants={fadeInUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="overview-tab">
              <div className="recent-transactions">
                <h3>Transações Recentes</h3>
                <div className="transactions-list">
                  {recentTransactions.map((transaction, index) => (
                    <TransactionCard key={index} transaction={transaction} index={index} />
                  ))}
                </div>
                <Link to="/transacoes" className="view-all">
                  Ver todas
                  <ChevronRight size={14} />
                </Link>
              </div>

              <div className="quick-actions">
                <h3>Ações Rápidas</h3>
                <div className="actions-grid">
                  <motion.button 
                    className="quick-action"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Plus size={18} />
                    <span>Depositar</span>
                  </motion.button>
                  <motion.button 
                    className="quick-action"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Minus size={18} />
                    <span>Transferir</span>
                  </motion.button>
                  <motion.button 
                    className="quick-action"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <CreditCard size={18} />
                    <span>Pagar fatura</span>
                  </motion.button>
                  <motion.button 
                    className="quick-action"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Calculator size={18} />
                    <span>Simular crédito</span>
                  </motion.button>
                </div>
              </div>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="products-tab">
              <div className="products-grid">
                {userProducts.map((product, index) => (
                  <ProductCard key={index} product={product} index={index} />
                ))}
              </div>
            </div>
          )}

          {/* Transactions Tab */}
          {activeTab === 'transactions' && (
            <div className="transactions-tab">
              <div className="transactions-filters">
                <select className="filter-select">
                  <option>Todos os períodos</option>
                  <option>Este mês</option>
                  <option>Últimos 3 meses</option>
                  <option>Último ano</option>
                </select>
                <select className="filter-select">
                  <option>Todos os tipos</option>
                  <option>Receitas</option>
                  <option>Despesas</option>
                </select>
                <button className="filter-btn">
                  <Download size={14} />
                  <span>Exportar</span>
                </button>
              </div>

              <div className="transactions-list">
                {[...recentTransactions, ...recentTransactions].map((transaction, index) => (
                  <TransactionCard key={index} transaction={transaction} index={index} />
                ))}
              </div>
            </div>
          )}

          {/* Goals Tab */}
          {activeTab === 'goals' && (
            <div className="goals-tab">
              <div className="goals-header">
                <h3>Metas Financeiras</h3>
                <motion.button 
                  className="add-goal-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Plus size={14} />
                  <span>Nova meta</span>
                </motion.button>
              </div>

              <div className="goals-grid">
                {financialGoals.map((goal, index) => (
                  <GoalCard key={index} goal={goal} index={index} />
                ))}
              </div>
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === 'documents' && (
            <div className="documents-tab">
              <div className="documents-grid">
                {documents.map((doc, index) => (
                  <DocumentCard 
                    key={index} 
                    document={doc} 
                    index={index}
                    onDownload={handleDownloadDocument}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="security-tab">
              <div className="security-section">
                <h3>Autenticação</h3>
                <div className="security-item">
                  <div className="security-info">
                    <Lock size={18} />
                    <div>
                      <h4>Senha</h4>
                      <p>Última alteração: há 30 dias</p>
                    </div>
                  </div>
                  <motion.button 
                    className="security-action"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Alterar
                  </motion.button>
                </div>

                <div className="security-item">
                  <div className="security-info">
                    <Fingerprint size={18} />
                    <div>
                      <h4>Autenticação biométrica</h4>
                      <p>Login com digital ou face</p>
                    </div>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="security-item">
                  <div className="security-info">
                    <Smartphone size={18} />
                    <div>
                      <h4>Autenticação de dois fatores</h4>
                      <p>Proteção adicional via SMS</p>
                    </div>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              <div className="security-section">
                <h3>Dispositivos</h3>
                <div className="device-item">
                  <div className="device-info">
                    <Smartphone size={18} />
                    <div>
                      <h4>iPhone 14 Pro</h4>
                      <p>São Paulo • Último acesso há 2 horas</p>
                    </div>
                  </div>
                  <span className="device-badge">Este dispositivo</span>
                </div>

                <div className="device-item">
                  <div className="device-info">
                    <Laptop size={18} />
                    <div>
                      <h4>MacBook Pro</h4>
                      <p>São Paulo • Último acesso há 2 dias</p>
                    </div>
                  </div>
                  <motion.button 
                    className="device-action"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Remover
                  </motion.button>
                </div>
              </div>

              <div className="security-section">
                <h3>Sessões ativas</h3>
                <div className="session-item">
                  <div className="session-info">
                    <Globe size={18} />
                    <div>
                      <h4>Chrome • Windows</h4>
                      <p>IP: 191.34.56.78 • São Paulo</p>
                    </div>
                  </div>
                  <span className="session-badge">Atual</span>
                </div>

                <div className="session-item">
                  <div className="session-info">
                    <Globe size={18} />
                    <div>
                      <h4>Safari • iPhone</h4>
                      <p>IP: 191.34.56.79 • São Paulo</p>
                    </div>
                  </div>
                  <motion.button 
                    className="session-action"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Encerrar
                  </motion.button>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Footer */}
        <motion.div 
          className="user-footer"
          variants={fadeInUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="footer-content">
            <div className="footer-section">
              <ShieldCheck size={14} color="#F59E0B" />
              <span>Autorizado pelo Banco Central</span>
            </div>
            
            <div className="footer-section">
              <Lock size={14} color="#F59E0B" />
              <span>LGPD • Proteção de dados</span>
            </div>
            
            <div className="footer-section">
              <Headphones size={14} color="#F59E0B" />
              <span>Atendimento 24/7</span>
            </div>
          </div>

          <div className="footer-made-with">
            <span>© {new Date().getFullYear()} Instituto Financeiro - Todos os direitos reservados</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserProfile;