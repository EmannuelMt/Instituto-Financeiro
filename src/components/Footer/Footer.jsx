import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Heart,
  Handshake,
  Activity,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  Facebook,
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  Send,
  Shield,
  Award,
  TrendingUp,
  Users,
  Globe,
  Zap,
  Leaf,
  ChevronUp,
  Sparkles,
  Cpu,
  Network,
  BadgeCheck,
  Rocket,
  Code,
  Coffee,
  Smartphone,
  Laptop,
  Cloud,
  Lock,
  FileText,
  HelpCircle,
  MessageSquare,
  Headphones,
  BookOpen,
  ExternalLink,
  Download,
  Play,
  CheckCircle,
  AlertCircle,
  Star,
  Layers,
  BarChart3,
  Package,
  Truck,
  Navigation,
  Target,
  Compass,
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
  CpuIcon,
  User,
  Briefcase,
  ChevronRight,
  CheckCircle2,
  ShieldCheck,
  Cookie,
  Apple,
  ExternalLink as ExternalLinkIcon,
  Landmark,
  DollarSign,
  BadgePercent,
  Calculator,
  PiggyBank,
  Wallet,
  Building,
  Sprout,
  Tractor,
  LineChart,
  PieChart,
  CreditCard,
  TrendingUp as TrendingUpIcon,
  TrendingDown,
  Percent,
  Scale,
  Banknote,
  TreePine,
  Wheat,
  Droplets,
  Combine,
  Calendar,
  X,
  Copy,
  Check,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  InstagramIcon,
  YoutubeIcon,
  GithubIcon
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import './Footer.css';
import logo from '../../assets/images/Logo/logo.svg';

// Importando ícones de redes sociais adicionais
import { FaTiktok, FaDiscord, FaWhatsapp, FaTelegram, FaMedium, FaDev, FaProductHunt } from 'react-icons/fa';
import { SiBuymeacoffee, SiKofi } from 'react-icons/si';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [copied, setCopied] = useState(null);
  
  const location = useLocation();
  const { scrollY } = useScroll();
  
  const footerOpacity = useTransform(scrollY, [0, 300], [0, 1]);
  const footerScale = useTransform(scrollY, [0, 300], [0.95, 1]);
  const footerY = useTransform(scrollY, [0, 300], [20, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    setFormErrors({});
    
    if (!email) {
      setFormErrors({ email: 'O e-mail é obrigatório' });
      return;
    }
    
    if (!validateEmail(email)) {
      setFormErrors({ email: 'Por favor, insira um e-mail válido' });
      return;
    }
    
    // Simular envio
    setIsSubscribed(true);
    setTimeout(() => setIsSubscribed(false), 3000);
    setEmail('');
    setFormErrors({});
  };

  const toggleAccordion = (section) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  // Links organizados por categoria - Versão Financeira
  const footerLinks = {
    institucional: [
      { name: 'Sobre Nós', path: '/sobre', icon: <Landmark size={16} />, description: 'Conheça nossa história' },
      { name: 'Nossa História', path: '/historia', icon: <Award size={16} />, description: '15 anos de trajetória' },
      { name: 'Carreiras', path: '/carreiras', icon: <Briefcase size={16} />, description: 'Trabalhe conosco', badge: '5 vagas' },
      { name: 'Imprensa', path: '/imprensa', icon: <FileText size={16} />, description: 'Sala de imprensa' },
      { name: 'Sustentabilidade', path: '/sustentabilidade', icon: <Leaf size={16} />, description: 'ESG e crédito verde' },
    ],
    produtos: [
      { name: 'Crédito Pessoal', path: '/credito-pessoal', icon: <Wallet size={16} />, description: 'Taxas a partir de 1,99%' },
      { name: 'Crédito Consignado', path: '/consignado', icon: <BadgePercent size={16} />, description: 'Para servidores e aposentados' },
      { name: 'Crédito Empresarial', path: '/empresarial', icon: <Briefcase size={16} />, description: 'Capital de giro' },
      { name: 'Crédito Agro', path: '/agro', icon: <Sprout size={16} />, description: 'Soluções para o campo' },
      { name: 'Crédito Imobiliário', path: '/imobiliario', icon: <Building size={16} />, description: 'Financiamento de imóveis' },
      { name: 'Conta Digital', path: '/conta-digital', icon: <Smartphone size={16} />, description: 'Banco digital completo' },
    ],
    investimentos: [
      { name: 'CDB', path: '/investimentos/cdb', icon: <LineChart size={16} />, description: 'Renda fixa' },
      { name: 'LCI/LCA', path: '/investimentos/lci-lca', icon: <PieChart size={16} />, description: 'Investimentos isentos' },
      { name: 'Fundos', path: '/investimentos/fundos', icon: <Activity size={16} />, description: 'Gestão profissional' },
      { name: 'Previdência', path: '/investimentos/previdencia', icon: <Shield size={16} />, description: 'Planeje seu futuro' },
      { name: 'Tesouro Direto', path: '/investimentos/tesouro', icon: <DollarSign size={16} />, description: 'Títulos públicos' },
    ],
    suporte: [
      { name: 'Central de Ajuda', path: '/ajuda', icon: <HelpCircle size={16} />, description: 'Tire suas dúvidas' },
      { name: 'FAQ', path: '/faq', icon: <MessageSquare size={16} />, description: 'Perguntas frequentes' },
      { name: 'Fale Conosco', path: '/contato', icon: <Mail size={16} />, description: 'Entre em contato' },
      { name: 'Ouvidoria', path: '/ouvidoria', icon: <Headphones size={16} />, description: 'Reclamações e elogios' },
      { name: 'Agências', path: '/agencias', icon: <MapPin size={16} />, description: 'Atendimento presencial' },
    ],
    legal: [
      { name: 'Termos de Uso', path: '/termos', icon: <FileText size={16} /> },
      { name: 'Política de Privacidade', path: '/privacidade', icon: <Lock size={16} /> },
      { name: 'Política de Cookies', path: '/cookies', icon: <Cookie size={16} /> },
      { name: 'LGPD', path: '/lgpd', icon: <Shield size={16} /> },
      { name: 'Segurança', path: '/seguranca', icon: <ShieldCheck size={16} /> },
    ],
  };

  // Redes sociais
  const socialLinks = [
    { icon: <Github size={18} />, url: 'https://github.com/institutofinanceiro', label: 'GitHub', color: '#333' },
    { icon: <Linkedin size={18} />, url: 'https://linkedin.com/company/instituto-financeiro', label: 'LinkedIn', color: '#0077b5' },
    { icon: <Twitter size={18} />, url: 'https://twitter.com/institutofin', label: 'Twitter', color: '#1da1f2' },
    { icon: <Instagram size={18} />, url: 'https://instagram.com/institutofinanceiro', label: 'Instagram', color: '#e4405f' },
    { icon: <Youtube size={18} />, url: 'https://youtube.com/@institutofinanceiro', label: 'YouTube', color: '#ff0000' },
    { icon: <Facebook size={18} />, url: 'https://facebook.com/institutofinanceiro', label: 'Facebook', color: '#1877f2' },
    { icon: <FaTiktok size={18} />, url: 'https://tiktok.com/@institutofin', label: 'TikTok', color: '#000000' },
    { icon: <FaWhatsapp size={18} />, url: 'https://wa.me/5511999999999', label: 'WhatsApp', color: '#25d366' },
  ];

  // Contatos
  const contacts = [
    { icon: <Phone size={16} />, text: '4004-4004', link: 'tel:40044004', description: 'Capitais e regiões metropolitanas' },
    { icon: <Phone size={16} />, text: '0800 123 4567', link: 'tel:08001234567', description: 'Demais localidades' },
    { icon: <Mail size={16} />, text: 'atendimento@instituto.com.br', link: 'mailto:atendimento@instituto.com.br', description: 'Atendimento geral' },
    { icon: <Mail size={16} />, text: 'ouvidoria@instituto.com.br', link: 'mailto:ouvidoria@instituto.com.br', description: 'Ouvidoria' },
    { icon: <MapPin size={16} />, text: 'Av. Faria Lima, 3500 - São Paulo, SP', link: 'https://maps.google.com/?q=Av.+Faria+Lima+3500+São+Paulo', description: 'Matriz' },
    { icon: <Clock size={16} />, text: 'Segunda a Sexta, 9h às 18h', description: 'Horário de atendimento' },
  ];

  // Selos e certificações - Versão Financeira
  const badges = [
    { icon: <ShieldCheck size={20} />, text: 'Autorizado BACEN', description: 'Instituição financeira autorizada' },
    { icon: <Lock size={20} />, text: 'LGPD Compliant', description: 'Proteção de dados' },
    { icon: <BadgeCheck size={20} />, text: 'ISO 27001', description: 'Segurança da informação' },
    { icon: <Award size={20} />, text: '5 anos ABBC', description: 'Associação Brasileira de Bancos' },
  ];

  // Métodos de pagamento
  const paymentMethods = [
    { icon: '💳', name: 'Visa' },
    { icon: '💳', name: 'Mastercard' },
    { icon: '💳', name: 'American Express' },
    { icon: '💳', name: 'Elo' },
    { icon: '📱', name: 'Pix' },
    { icon: '📱', name: 'Boleto' },
    { icon: '💰', name: 'Transferência' },
    { icon: '🏦', name: 'Débito em conta' },
  ];

  return (
    <motion.footer 
      className="footer"
      style={{ opacity: footerOpacity, scale: footerScale, y: footerY }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="footer-container">
        {/* Grid Principal */}
        <div className="footer-grid">
          
          {/* Coluna 1 - Brand e Selos */}
          <div className="footer-column brand-column">
            <Link to="/" className="footer-logo">
              <div className="logo-wrapper">
                <img src={logo} alt="Instituto Financeiro" className="footer-logo-img" />
                <div className="logo-glow"></div>
              </div>
              <div className="logo-text-wrapper">
                <span className="logo-text-primary">Instituto</span>
                <span className="logo-text-secondary">Financeiro</span>
              </div>
            </Link>
            
            <p className="brand-description">
              Soluções financeiras inteligentes para pessoas, empresas e agronegócio. 
              Mais de 15 anos transformando sonhos em realidade com crédito responsável e tecnologia de ponta.
            </p>

            <div className="brand-badges">
              {badges.map((badge, index) => (
                <motion.div 
                  key={index} 
                  className="badge-item"
                  whileHover={{ scale: 1.05, y: -2 }}
                  onMouseEnter={() => setActiveTooltip(`badge-${index}`)}
                  onMouseLeave={() => setActiveTooltip(null)}
                >
                  <span className="badge-icon">{badge.icon}</span>
                  <span className="badge-text">{badge.text}</span>
                  
                  {activeTooltip === `badge-${index}` && (
                    <motion.div 
                      className="badge-tooltip"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {badge.description}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="payment-methods">
              <h4 className="payment-title">Formas de Pagamento</h4>
              <div className="payment-grid">
                {paymentMethods.map((method, index) => (
                  <div key={index} className="payment-item" title={method.name}>
                    <span className="payment-icon">{method.icon}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Coluna 2 - Institucional */}
          <div className="footer-column">
            <h4 className="column-title" onClick={() => toggleAccordion('institucional')}>
              Institucional
              <ChevronRight className={`accordion-icon ${activeAccordion === 'institucional' ? 'rotated' : ''}`} size={16} />
            </h4>
            <ul className={`footer-links ${activeAccordion === 'institucional' ? 'active' : ''}`}>
              {footerLinks.institucional.map((link) => (
                <motion.li 
                  key={link.name}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Link 
                    to={link.path} 
                    className={`footer-link ${location.pathname === link.path ? 'active' : ''}`}
                    onMouseEnter={() => setActiveTooltip(link.name)}
                    onMouseLeave={() => setActiveTooltip(null)}
                  >
                    <span className="link-icon">{link.icon}</span>
                    <span className="link-text">{link.name}</span>
                    {link.badge && <span className="link-badge">{link.badge}</span>}
                    
                    {activeTooltip === link.name && link.description && (
                      <motion.span 
                        className="link-tooltip"
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        {link.description}
                      </motion.span>
                    )}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Coluna 3 - Produtos */}
          <div className="footer-column">
            <h4 className="column-title" onClick={() => toggleAccordion('produtos')}>
              Produtos
              <ChevronRight className={`accordion-icon ${activeAccordion === 'produtos' ? 'rotated' : ''}`} size={16} />
            </h4>
            <ul className={`footer-links ${activeAccordion === 'produtos' ? 'active' : ''}`}>
              {footerLinks.produtos.map((link) => (
                <motion.li 
                  key={link.name}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Link 
                    to={link.path} 
                    className={`footer-link ${location.pathname === link.path ? 'active' : ''}`}
                    onMouseEnter={() => setActiveTooltip(link.name)}
                    onMouseLeave={() => setActiveTooltip(null)}
                  >
                    <span className="link-icon">{link.icon}</span>
                    <span className="link-text">{link.name}</span>
                    
                    {activeTooltip === link.name && link.description && (
                      <motion.span 
                        className="link-tooltip"
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        {link.description}
                      </motion.span>
                    )}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Coluna 4 - Investimentos e Suporte */}
          <div className="footer-column">
            <h4 className="column-title" onClick={() => toggleAccordion('investimentos')}>
              Investimentos
              <ChevronRight className={`accordion-icon ${activeAccordion === 'investimentos' ? 'rotated' : ''}`} size={16} />
            </h4>
            <ul className={`footer-links ${activeAccordion === 'investimentos' ? 'active' : ''}`}>
              {footerLinks.investimentos.map((link) => (
                <motion.li 
                  key={link.name}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Link 
                    to={link.path} 
                    className={`footer-link ${location.pathname === link.path ? 'active' : ''}`}
                    onMouseEnter={() => setActiveTooltip(link.name)}
                    onMouseLeave={() => setActiveTooltip(null)}
                  >
                    <span className="link-icon">{link.icon}</span>
                    <span className="link-text">{link.name}</span>
                    
                    {activeTooltip === link.name && link.description && (
                      <motion.span 
                        className="link-tooltip"
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        {link.description}
                      </motion.span>
                    )}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Coluna 5 - Suporte e Legal */}
          <div className="footer-column">
            <h4 className="column-title" onClick={() => toggleAccordion('suporte')}>
              Suporte
              <ChevronRight className={`accordion-icon ${activeAccordion === 'suporte' ? 'rotated' : ''}`} size={16} />
            </h4>
            <ul className={`footer-links ${activeAccordion === 'suporte' ? 'active' : ''}`}>
              {footerLinks.suporte.map((link) => (
                <motion.li 
                  key={link.name}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Link 
                    to={link.path} 
                    className={`footer-link ${location.pathname === link.path ? 'active' : ''}`}
                    onMouseEnter={() => setActiveTooltip(link.name)}
                    onMouseLeave={() => setActiveTooltip(null)}
                  >
                    <span className="link-icon">{link.icon}</span>
                    <span className="link-text">{link.name}</span>
                    
                    {activeTooltip === link.name && link.description && (
                      <motion.span 
                        className="link-tooltip"
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        {link.description}
                      </motion.span>
                    )}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <h4 className="column-title" style={{ marginTop: '24px' }} onClick={() => toggleAccordion('legal')}>
              Legal
              <ChevronRight className={`accordion-icon ${activeAccordion === 'legal' ? 'rotated' : ''}`} size={16} />
            </h4>
            <ul className={`footer-links ${activeAccordion === 'legal' ? 'active' : ''}`}>
              {footerLinks.legal.map((link) => (
                <motion.li 
                  key={link.name}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Link to={link.path} className="footer-link">
                    <span className="link-icon">{link.icon}</span>
                    <span className="link-text">{link.name}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contatos Section */}
        <div className="footer-contacts">
          <h4 className="contacts-title">Canais de Atendimento</h4>
          <div className="contacts-grid">
            {contacts.map((contact, index) => (
              <div key={index} className="contact-item">
                <div className="contact-icon-wrapper">
                  {contact.icon}
                </div>
                <div className="contact-info">
                  {contact.link ? (
                    <a href={contact.link} className="contact-link">
                      {contact.text}
                    </a>
                  ) : (
                    <span className="contact-text">{contact.text}</span>
                  )}
                  <span className="contact-description">{contact.description}</span>
                </div>
                {contact.link?.startsWith('mailto:') && (
                  <button 
                    className="contact-copy"
                    onClick={() => handleCopy(contact.text, `contact-${index}`)}
                    title="Copiar"
                  >
                    {copied === `contact-${index}` ? (
                      <Check size={14} color="#F59E0B" />
                    ) : (
                      <Copy size={14} />
                    )}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter e Redes Sociais */}
        <div className="footer-newsletter-social">
          {/* Newsletter */}
          <div className="footer-newsletter">
            <h4 className="newsletter-title">Receba Nossas Ofertas</h4>
            <p className="newsletter-description">
              Inscreva-se para receber novidades sobre crédito, investimentos e condições especiais.
            </p>
            
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <div className="input-wrapper">
                <Mail size={18} className="input-icon" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Seu melhor e-mail"
                  className={`newsletter-input ${formErrors.email ? 'error' : ''}`}
                  aria-label="E-mail para newsletter"
                />
                <motion.button
                  type="submit"
                  className="newsletter-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Inscrever-se"
                >
                  <Send size={18} />
                </motion.button>
              </div>
              
              <AnimatePresence>
                {formErrors.email && (
                  <motion.div 
                    className="form-error"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <AlertCircle size={12} />
                    <span>{formErrors.email}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {isSubscribed && (
                  <motion.div 
                    className="subscribe-success"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <CheckCircle2 size={14} color="#F59E0B" />
                    <span>Inscrito com sucesso! Em breve você receberá nossas novidades.</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <p className="newsletter-disclaimer">
                Ao informar meus dados, eu concordo com a <Link to="/privacidade">Política de Privacidade</Link>.
              </p>
            </form>
          </div>

          {/* Redes Sociais */}
          <div className="footer-social">
            <h4 className="social-title">Siga-nos nas Redes Sociais</h4>
            <div className="social-grid">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                  title={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>

            {/* App Downloads */}
            <div className="app-downloads">
              <h5 className="download-title">Baixe nosso App</h5>
              <div className="download-buttons">
                <motion.a 
                  href="#" 
                  className="download-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Apple size={20} />
                  <span>App Store</span>
                </motion.a>
                <motion.a 
                  href="#" 
                  className="download-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Smartphone size={20} />
                  <span>Google Play</span>
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-container">
          <div className="bottom-content">
            <p className="copyright">
              © {new Date().getFullYear()} Instituto Financeiro SCD S.A. 
              <span className="separator">•</span>
              <span className="cnpj">CNPJ: 12.345.678/0001-90</span>
            </p>
            
            <div className="bottom-links">
              <Link to="/termos" className="bottom-link">Termos de Uso</Link>
              <span className="separator">•</span>
              <Link to="/privacidade" className="bottom-link">Política de Privacidade</Link>
              <span className="separator">•</span>
              <Link to="/cookies" className="bottom-link">Cookies</Link>
              <span className="separator">•</span>
              <Link to="/lgpd" className="bottom-link">LGPD</Link>
            </div>

            </div>
          </div>
        </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            className="scroll-top"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Voltar ao topo"
          >
            <ChevronUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.footer>
  );
};

export default Footer;