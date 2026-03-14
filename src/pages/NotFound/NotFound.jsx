import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  AlertCircle, 
  ArrowLeft, 
  RefreshCw, 
  Headphones, 
  Mail, 
  Phone, 
  MessageSquare,
  MapPin,
  Clock,
  ChevronRight,
  HelpCircle,
  Wifi,
  WifiOff,
  Shield,
  AlertTriangle,
  Compass,
  Rocket,
  Sparkles,
  Heart,
  Coffee,
  Smile,
  Frown,
  Meh,
  Loader,
  Landmark,
  DollarSign,
  BadgePercent,
  Calculator,
  PiggyBank,
  Wallet,
  Building,
  Briefcase,
  Sprout,
  Tractor,
  LineChart,
  PieChart,
  CreditCard,
  TrendingUp,
  TrendingDown,
  Activity,
  Percent,
  Scale,
  Banknote,
  TreePine,
  Wheat,
  Droplets,
  Combine,
  Calendar,
  X,
  Check,
  Copy,
  ExternalLink,
  Lock,
  ShieldCheck,
  Fingerprint,
  Smartphone,
  Laptop,
  Tablet,
  Database,
  QrCode,
  ScanFace,
  BarChart3,
  Package,
  Truck,
  Navigation,
  Target,
  Compass as CompassIcon,
  Radar,
  Satellite,
  Gauge,
  Wind,
  Recycle,
  Factory,
  ScanLine,
  Blocks,
  Route,
  LocateFixed,
  Infinity,
  Hexagon,
  Boxes,
  Cpu,
  Network,
  Globe,
  Users,
  Award,
  Zap,
  Leaf
} from 'lucide-react';
import './NotFound.css';
import logo from '../../assets/images/Logo/logo.svg';

const NotFound = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [copied, setCopied] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 10,
        y: (e.clientY / window.innerHeight - 0.5) * 10
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  // Canais de atendimento - Versão Financeira
  const contactChannels = [
    { 
      icon: <Headphones size={18} />, 
      title: 'Central de Atendimento', 
      description: 'Disponível 24/7 para emergências bancárias',
      action: '4004-4004',
      link: 'tel:40044004',
      color: '#2563EB',
      badge: 'Capitais'
    },
    { 
      icon: <Mail size={18} />, 
      title: 'E-mail Prioritário', 
      description: 'atendimento@instituto.com.br',
      action: 'Enviar mensagem',
      link: 'mailto:atendimento@instituto.com.br',
      color: '#F59E0B',
      badge: 'Resposta em 2h'
    },
    { 
      icon: <Phone size={18} />, 
      title: 'WhatsApp Business', 
      description: 'Atendimento via WhatsApp',
      action: 'Iniciar conversa',
      link: 'https://wa.me/5511999999999',
      color: '#1E3A8A',
      badge: '24h'
    },
    { 
      icon: <MessageSquare size={18} />, 
      title: 'Chat ao Vivo', 
      description: 'Fale com um especialista agora',
      action: 'Iniciar chat',
      link: '/chat',
      color: '#D97706',
      badge: 'Online'
    }
  ];

  // Links rápidos - Versão Financeira
  const quickLinks = [
    { name: 'Página Inicial', path: '/', icon: Home, description: 'Voltar ao início' },
    { name: 'Crédito Pessoal', path: '/credito-pessoal', icon: Wallet, description: 'Taxas a partir de 1,99%' },
    { name: 'Crédito Empresarial', path: '/empresarial', icon: Briefcase, description: 'Capital de giro' },
    { name: 'Crédito Agro', path: '/agro', icon: Sprout, description: 'Soluções para o campo' },
    { name: 'Conta Digital', path: '/conta-digital', icon: Smartphone, description: 'Banco digital completo' },
    { name: 'Investimentos', path: '/investimentos', icon: LineChart, description: 'CDB, LCI, LCA' },
    { name: 'Atendimento', path: '/contato', icon: Headphones, description: 'Fale conosco' },
    { name: 'Sobre Nós', path: '/sobre', icon: Landmark, description: 'Conheça nossa história' }
  ];

  // Sugestões de produtos
  const productSuggestions = [
    { icon: <Wallet size={16} />, name: 'Crédito Pessoal', rate: 'a partir de 1,99%' },
    { icon: <BadgePercent size={16} />, name: 'Crédito Consignado', rate: 'a partir de 1,20%' },
    { icon: <Sprout size={16} />, name: 'Crédito Agro', rate: 'taxas especiais' },
    { icon: <LineChart size={16} />, name: 'Investimentos', rate: 'até 110% do CDI' }
  ];

  return (
    <div className="not-found-page">
      {/* Background Elements */}
      <div className="not-found-background">
        <div className="gradient-orb orb-blue"></div>
        <div className="gradient-orb orb-gold"></div>
        <div className="gradient-orb orb-dark"></div>
        <div className="grid-pattern"></div>
        
        {/* Floating Particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="floating-particle"
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              opacity: [0, 0.2, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: 999999,
              delay: Math.random() * 5
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              background: i % 3 === 0 ? '#2563EB' : i % 3 === 1 ? '#F59E0B' : '#FFFFFF'
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="not-found-container">
        {/* Logo */}
        <motion.div 
          className="logo-wrapper"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/" className="logo-link">
            <div className="logo-container">
              <img src={logo} alt="Instituto Financeiro" className="logo-image" />
              <div className="logo-glow"></div>
            </div>
            <div className="logo-text">
              <span className="logo-text-primary">Instituto</span>
              <span className="logo-text-secondary">Financeiro</span>
            </div>
          </Link>
        </motion.div>

        {/* Error Card */}
        <motion.div 
          className="error-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            transform: `perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`
          }}
        >
          {/* Status Code */}
          <div className="error-code-wrapper">
            <motion.div 
              className="error-code"
              animate={{ 
                rotate: [0, 2, -2, 0],
                scale: [1, 1.02, 1]
              }}
                transition={{ 
                duration: 8,
                repeat: 999999,
                ease: "easeInOut"
              }}
            >
              <span className="code-digit code-4">4</span>
              <motion.span 
                className="code-digit code-0"
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 20,
                  repeat: 999999,
                  ease: "linear"
                }}
              >
                0
              </motion.span>
              <span className="code-digit code-4">4</span>
            </motion.div>
            
            <div className="error-status">
              <AlertTriangle size={18} color="#F59E0B" />
              <span>Página não encontrada</span>
            </div>
          </div>

          {/* Message */}
          <motion.div 
            className="message-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="message-main">
              A página que você está procurando pode ter sido movida, removida ou estar temporariamente indisponível.
            </p>

            <p className="message-secondary">
              Enquanto isso, que tal conhecer nossas soluções financeiras ou falar com um especialista?
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            className="action-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <motion.button
              onClick={() => navigate(-1)}
              className="btn-primary"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={18} />
              <span>Voltar</span>
            </motion.button>

            <Link to="/" className="btn-home">
              <Home size={18} />
              <span>Página Inicial</span>
            </Link>

            <motion.button
              onClick={handleRefresh}
              className="btn-secondary"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader size={18} className="spinning" />
              ) : (
                <RefreshCw size={18} />
              )}
              <span>{isLoading ? 'Atualizando...' : 'Tentar novamente'}</span>
            </motion.button>
          </motion.div>

          {/* Auto Redirect Info */}
          <motion.div 
            className="redirect-info"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Wifi size={14} className={countdown > 0 ? 'wifi-icon' : 'wifi-off'} />
            <span>
              {countdown > 0 
                ? `Redirecionando para a página inicial em ${countdown} segundos...` 
                : 'Redirecionando agora...'}
            </span>
          </motion.div>
        </motion.div>

        {/* Product Suggestions */}
        <motion.div 
          className="product-suggestions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <h3 className="suggestions-title">
            <Sparkles size={16} color="#F59E0B" />
            <span>Soluções que podem te interessar</span>
          </h3>

          <div className="suggestions-grid">
            {productSuggestions.map((product, index) => (
              <motion.div
                key={index}
                className="suggestion-item"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="suggestion-icon">{product.icon}</div>
                <div className="suggestion-info">
                  <span className="suggestion-name">{product.name}</span>
                  <span className="suggestion-rate">{product.rate}</span>
                </div>
                <ChevronRight size={14} className="suggestion-arrow" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Channels */}
        <motion.div 
          className="contact-channels"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h3 className="channels-title">
            <Headphones size={18} color="#F59E0B" />
            <span>Canais de Atendimento</span>
          </h3>

          <p className="channels-description">
            Precisa de ajuda? Nossa equipe está disponível 24/7 para auxiliá-lo.
          </p>

          <div className="channels-grid">
            {contactChannels.map((channel, index) => (
              <motion.a
                key={index}
                href={channel.link}
                className="channel-card"
                target={channel.link.startsWith('http') ? '_blank' : undefined}
                rel={channel.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                whileHover={{ scale: 1.02, y: -3 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
              >
                <div className="channel-icon-wrapper" style={{ backgroundColor: `${channel.color}20` }}>
                  {channel.icon}
                </div>
                <div className="channel-info">
                  <h4>{channel.title}</h4>
                  <p>{channel.description}</p>
                  <div className="channel-footer">
                    <span className="channel-action">{channel.action}</span>
                    {channel.badge && (
                      <span className="channel-badge">{channel.badge}</span>
                    )}
                  </div>
                </div>
                <ChevronRight size={14} className="channel-arrow" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div 
          className="quick-links"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <h3 className="quick-links-title">Navegue pelo site</h3>
          <div className="quick-links-grid">
            {quickLinks.map((link, index) => (
              <motion.div
                key={link.name}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: 1.3 + index * 0.03 }}
              >
                <Link to={link.path} className="quick-link">
                  <link.icon size={14} />
                  <div className="quick-link-content">
                    <span className="quick-link-name">{link.name}</span>
                    <span className="quick-link-description">{link.description}</span>
                  </div>
                  <ChevronRight size={12} className="quick-link-arrow" />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div 
          className="not-found-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
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
              <MapPin size={14} color="#F59E0B" />
              <span>São Paulo • Ribeirão Preto • Brasília</span>
            </div>
          </div>

          <div className="footer-made-with">
            <span>Feito com</span>
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                duration: 1.5,
                repeat: 999999,
                ease: "easeInOut"
              }}
            >
              <Heart size={12} className="heart-icon" fill="#F59E0B" color="#F59E0B" />
            </motion.div>
            <span>no Brasil • Instituto Financeiro © {new Date().getFullYear()}</span>
          </div>

          <div className="footer-cnpj">
            <span>CNPJ: 12.345.678/0001-90</span>
            <button 
              className="copy-cnpj"
              onClick={() => handleCopy('12.345.678/0001-90', 'cnpj')}
              title="Copiar CNPJ"
            >
              {copied === 'cnpj' ? <Check size={10} /> : <Copy size={10} />}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;