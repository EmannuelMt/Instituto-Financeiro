import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Headphones,
  HelpCircle,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertCircle,
  Star,
  Users,
  Globe,
  Shield,
  Heart,
  Sparkles,
  ArrowRight,
  Copy,
  Check,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Github,
  ExternalLink,
  Calendar,
  User,
  FileText,
  Download,
  Upload,
  Image,
  Paperclip,
  Smile,
  ThumbsUp,
  ThumbsDown,
  Search,
  Filter,
  MailOpen,
  MessageCircle,
  PhoneCall,
  PhoneIncoming,
  PhoneOutgoing,
  MessageSquareText,
  LifeBuoy,
  BookOpen,
  Video,
  Mic,
  Camera,
  Settings,
  CreditCard,
  Truck,
  Package,
  TrendingUp,
  Award,
  Target,
  Zap,
  Cpu,
  Network,
  Globe2,
  Building2,
  ShieldCheck,
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
  BarChart,
  PieChart,
  Handshake,
  Lock,
  Fingerprint,
  Smartphone,
  Laptop,
  Tablet,
  Database,
  QrCode,
  ScanFace,
  TrendingUp as TrendingUpIcon,
  TrendingDown,
  Activity,
  Percent,
  Scale,
  Banknote,
  TreePine,
  Wheat,
  Droplets,
  Combine,
  Calendar as CalendarIcon,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './Contato.css';
import logo from '../../assets/images/Logo/logo.svg';
import heroBackground from '../../assets/images/Logo/hero-finance.jpg';

// Componente de Partículas Otimizado
const Particles = React.memo(({ count = 40 }) => {
  const particles = React.useMemo(() => 
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: 20 + Math.random() * 15,
      delay: Math.random() * 8,
      xMove: Math.random() * 300 - 150,
      yMove: Math.random() * 300 - 150,
      color: i % 3 === 0 ? '#2563EB' : i % 3 === 1 ? '#F59E0B' : '#FFFFFF'
    })), [count]
  );

  return (
    <div className="contact-particles">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="particle"
          animate={{
            x: [0, particle.xMove, 0],
            y: [0, particle.yMove, 0],
            opacity: [0, 0.25, 0],
            scale: [0, 1.5, 0]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            delay: particle.delay
          }}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`
          }}
        />
      ))}
    </div>
  );
});

// Componente de FAQ Item
const FAQItem = React.memo(({ faq, index, isOpen, onToggle }) => {
  return (
    <motion.div 
      className={`faq-item ${isOpen ? 'open' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <button 
        className="faq-question"
        onClick={() => onToggle(index)}
      >
        <div className="faq-question-content">
          <span className="faq-icon">{faq.icon}</span>
          <h3>{faq.question}</h3>
        </div>
        <motion.div 
          className="faq-toggle"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="faq-answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p>{faq.answer}</p>
            {faq.link && (
              <Link to={faq.link} className="faq-link">
                Saiba mais
                <ArrowRight size={14} />
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

// Componente de Canal de Suporte
const SupportChannel = React.memo(({ channel, index }) => (
  <motion.a
    href={channel.link}
    className="support-channel-card"
    target={channel.external ? '_blank' : undefined}
    rel={channel.external ? 'noopener noreferrer' : undefined}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -5 }}
  >
    <div className="channel-icon-wrapper" style={{ backgroundColor: channel.bgColor }}>
      {channel.icon}
    </div>
    <div className="channel-info">
      <h3>{channel.title}</h3>
      <p>{channel.description}</p>
      <span className="channel-response">
        <Clock size={12} />
        {channel.responseTime}
      </span>
    </div>
    <div className="channel-arrow">
      <ArrowRight size={16} />
    </div>
  </motion.a>
));

const Contato = () => {
  const { scrollY } = useScroll();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    company: '',
    subject: '',
    message: '',
    creditValue: '',
    department: 'geral',
    preferredContact: 'email'
  });
  const [formErrors, setFormErrors] = useState({});
  const [formStatus, setFormStatus] = useState(null);
  const [copied, setCopied] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [activeTab, setActiveTab] = useState('geral');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const heroRef = useRef(null);
  const contactRef = useRef(null);
  const supportRef = useRef(null);
  const faqRef = useRef(null);

  // Animações baseadas no scroll
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.95]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.98]);

  // Dados de contato
  const contactInfo = [
    {
      icon: <Phone size={24} />,
      title: 'Central de Atendimento',
      description: 'Disponível 24/7 para emergências bancárias',
      items: [
        { label: 'Capitais e regiões', value: '4004-4004', link: 'tel:40044004' },
        { label: 'Demais localidades', value: '0800 123 4567', link: 'tel:08001234567' },
        { label: 'WhatsApp', value: '(11) 99999-9999', link: 'https://wa.me/5511999999999' }
      ]
    },
    {
      icon: <Mail size={24} />,
      title: 'E-mail',
      description: 'Respondemos em até 2 horas úteis',
      items: [
        { label: 'Atendimento', value: 'atendimento@instituto.com.br', link: 'mailto:atendimento@instituto.com.br' },
        { label: 'Crédito', value: 'credito@instituto.com.br', link: 'mailto:credito@instituto.com.br' },
        { label: 'Ouvidoria', value: 'ouvidoria@instituto.com.br', link: 'mailto:ouvidoria@instituto.com.br' }
      ]
    },
    {
      icon: <MapPin size={24} />,
      title: 'Nossas Agências',
      description: 'Atendimento presencial com hora marcada',
      items: [
        { label: 'São Paulo - Matriz', value: 'Av. Faria Lima, 3500 - Itaim Bibi' },
        { label: 'Ribeirão Preto', value: 'Av. Presidente Vargas, 2000 - Centro' },
        { label: 'Brasília', value: 'SBS Quadra 2, Bloco E - Asa Sul' }
      ]
    },
    {
      icon: <Clock size={24} />,
      title: 'Horário de Funcionamento',
      description: 'Agências e atendimento telefônico',
      items: [
        { label: 'Segunda a Sexta', value: '09:00 às 18:00' },
        { label: 'Sábado', value: '09:00 às 13:00' },
        { label: 'Plantão 24h', value: 'Emergências via WhatsApp' }
      ]
    }
  ];

  // Departamentos
  const departments = [
    { id: 'geral', label: 'Atendimento Geral', description: 'Informações e dúvidas gerais' },
    { id: 'credito', label: 'Crédito e Financiamento', description: 'Simulações e contratações' },
    { id: 'conta', label: 'Conta Digital', description: 'Suporte para sua conta' },
    { id: 'cartoes', label: 'Cartões', description: 'Segunda via, bloqueio, limites' },
    { id: 'investimentos', label: 'Investimentos', description: 'CDB, LCI, LCA e mais' },
    { id: 'seguros', label: 'Seguros', description: 'Vida, residencial e empresarial' },
    { id: 'agro', label: 'Agronegócio', description: 'Linhas de crédito rural' },
    { id: 'empresas', label: 'Empresas', description: 'Soluções para PJ' },
    { id: 'ouvidoria', label: 'Ouvidoria', description: 'Reclamações e elogios' }
  ];

  // Canais de suporte
  const supportChannels = [
    {
      icon: <MessageCircle size={24} />,
      title: 'Chat Ao Vivo',
      description: 'Converse com um especialista agora',
      responseTime: 'Resposta imediata',
      link: '/chat',
      bgColor: '#2563EB',
      external: false
    },
    {
      icon: <PhoneCall size={24} />,
      title: 'Central Telefônica',
      description: 'Ligue para nossa central',
      responseTime: 'Disponível 24/7',
      link: 'tel:40044004',
      bgColor: '#F59E0B',
      external: true
    },
    {
      icon: <Mail size={24} />,
      title: 'E-mail Prioritário',
      description: 'credito@instituto.com.br',
      responseTime: 'Resposta em até 1h',
      link: 'mailto:credito@instituto.com.br',
      bgColor: '#1E3A8A',
      external: true
    },
    {
      icon: <MessageSquare size={24} />,
      title: 'WhatsApp Business',
      description: 'Atendimento via WhatsApp',
      responseTime: 'Resposta em minutos',
      link: 'https://wa.me/5511999999999',
      bgColor: '#0A2472',
      external: true
    },
    {
      icon: <LifeBuoy size={24} />,
      title: 'Central de Ajuda',
      description: 'FAQ, tutoriais e guias',
      responseTime: 'Autoatendimento 24h',
      link: '/ajuda',
      bgColor: '#D97706',
      external: false
    },
    {
      icon: <Headphones size={24} />,
      title: 'Suporte Técnico',
      description: 'Ajuda com a plataforma',
      responseTime: 'Técnico disponível',
      link: '/suporte-tecnico',
      bgColor: '#B45309',
      external: false
    }
  ];

  // FAQ
  const faqs = {
    geral: [
      {
        icon: <HelpCircle size={20} />,
        question: 'Como abrir uma conta no Instituto Financeiro?',
        answer: 'Você pode abrir sua conta gratuitamente pelo nosso site ou aplicativo. Basta clicar em "Abrir conta", preencher seus dados pessoais, enviar foto do documento e selfie. A aprovação é feita em até 24h úteis.',
        link: '/conta-digital/abrir'
      },
      {
        icon: <CreditCard size={20} />,
        question: 'Quais documentos preciso para solicitar crédito?',
        answer: 'Para pessoa física: RG, CPF, comprovante de renda e comprovante de residência. Para empresas: contrato social, CNPJ, balanços dos últimos 2 anos e documentos dos sócios.',
      },
      {
        icon: <Shield size={20} />,
        question: 'Como funciona a análise de crédito?',
        answer: 'Nossa análise considera seu histórico financeiro, capacidade de pagamento e garantias oferecidas. Utilizamos tecnologia de ponta para oferecer a melhor taxa possível para seu perfil.',
      },
      {
        icon: <Lock size={20} />,
        question: 'Meus dados estão seguros?',
        answer: 'Sim, todos os dados são criptografados e armazenados em servidores seguros. Seguimos rigorosamente a LGPD e as normas do Banco Central do Brasil.',
      }
    ],
    credito: [
      {
        icon: <DollarSign size={20} />,
        question: 'Qual a taxa de juros praticada?',
        answer: 'Nossas taxas variam de acordo com o perfil do cliente e o tipo de crédito. Para crédito consignado, as taxas partem de 1,20% a.m. Para crédito pessoal, a partir de 1,99% a.m. Faça uma simulação gratuita para ver as condições exatas para você.',
        link: '/simulacao'
      },
      {
        icon: <Clock size={20} />,
        question: 'Qual o prazo para aprovação do crédito?',
        answer: 'Para crédito pessoal e consignado, a aprovação pode sair em até 24h. Para crédito empresarial e imobiliário, o prazo médio é de 5 a 10 dias úteis, dependendo da documentação.',
      },
      {
        icon: <Calendar size={20} />,
        question: 'Posso antecipar parcelas?',
        answer: 'Sim, você pode antecipar parcelas a qualquer momento pelo aplicativo ou com seu gerente. Há desconto proporcional de juros nas parcelas antecipadas.',
      }
    ],
    conta: [
      {
        icon: <Smartphone size={20} />,
        question: 'Como acessar minha conta digital?',
        answer: 'Você pode acessar pelo nosso aplicativo (disponível para iOS e Android) ou pelo internet banking no site. Use seu CPF e senha para login.',
      },
      {
        icon: <CreditCard size={20} />,
        question: 'Como solicitar um cartão de crédito?',
        answer: 'No aplicativo, acesse a seção "Cartões" e clique em "Solicitar cartão". A análise é rápida e você acompanha o status pelo app. O cartão chega em até 10 dias úteis.',
      },
      {
        icon: <Lock size={20} />,
        question: 'Esqueci minha senha, e agora?',
        answer: 'Na tela de login, clique em "Esqueci minha senha" e siga as instruções. Você receberá um código por e-mail ou SMS para redefinir sua senha com segurança.',
      }
    ]
  };

  // Validação do formulário
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Nome completo é obrigatório';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'E-mail é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'E-mail inválido';
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'Telefone é obrigatório';
    }
    
    if (!formData.cpf.trim()) {
      errors.cpf = 'CPF é obrigatório';
    } else if (!/^\d{11}$/.test(formData.cpf.replace(/\D/g, ''))) {
      errors.cpf = 'CPF inválido';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Mensagem é obrigatória';
    }
    
    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      setSelectedFile(file);
    } else {
      alert('Arquivo muito grande. Tamanho máximo: 5MB');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setFormStatus({
        type: 'error',
        message: 'Por favor, preencha todos os campos obrigatórios corretamente.'
      });
      return;
    }

    setIsSubmitting(true);
    setFormStatus(null);

    // Simular envio
    setTimeout(() => {
      setFormStatus({
        type: 'success',
        message: 'Mensagem enviada com sucesso! Em breve um especialista entrará em contato.'
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        cpf: '',
        company: '',
        subject: '',
        message: '',
        creditValue: '',
        department: 'geral',
        preferredContact: 'email'
      });
      setSelectedFile(null);
      setIsSubmitting(false);
    }, 1500);
  };

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  // Máscara de CPF
  const formatCPF = (value) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4').slice(0, 14);
  };

  // Máscara de telefone
  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3').slice(0, 15);
  };

  return (
    <div className="contact-page">
      {/* Hero Banner */}
      <section ref={heroRef} className="contact-hero" id="hero">
        <div className="hero-background">
          <img src={heroBackground} alt="Hero Background" className="hero-image" />
          <div className="hero-overlay"></div>
          <div className="hero-gradient"></div>
          <div className="hero-grid"></div>
          <Particles count={50} />
        </div>

        <motion.div 
          className="hero-content"
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-badge"
          >
            <Sparkles size={16} color="#F59E0B" />
            <span>Atendimento Personalizado</span>
          </motion.div>

          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Estamos aqui para <span className="title-gradient-blue">ajudar</span> você a <span className="title-gradient-gold">realizar</span> seus sonhos
          </motion.h1>

          <motion.p 
            className="hero-description"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Nossa equipe de especialistas está pronta para oferecer a melhor solução financeira 
            para você, sua empresa ou seu negócio no campo.
          </motion.p>

          <motion.div 
            className="hero-actions"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <button 
              className="btn-primary"
              onClick={() => scrollToSection('contato')}
            >
              <span>Falar com especialista</span>
              <Send size={20} />
            </button>
            <button 
              className="btn-secondary"
              onClick={() => scrollToSection('canais')}
            >
              <Headphones size={18} />
              <span>Canais de atendimento</span>
            </button>
          </motion.div>

          <motion.div 
            className="hero-scroll-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            onClick={() => scrollToSection('contato')}
          >
            <span>Conheça nossos canais</span>
            <ChevronDown size={16} color="#F59E0B" />
          </motion.div>
        </motion.div>

        <motion.div 
          className="hero-logo"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <img src={logo} alt="Instituto Financeiro" className="logo-white" />
        </motion.div>
      </section>

      {/* Trust Badges */}
      <section className="trust-badges">
        <div className="container">
          <motion.div
            className="trust-badges-grid"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="trust-badge">
              <ShieldCheck size={20} color="#F59E0B" />
              <span>Autorizado pelo Banco Central</span>
            </div>
            <div className="trust-badge">
              <Lock size={20} color="#F59E0B" />
              <span>LGPD e Proteção de Dados</span>
            </div>
            <div className="trust-badge">
              <Headphones size={20} color="#F59E0B" />
              <span>Atendimento 24/7</span>
            </div>
            <div className="trust-badge">
              <Users size={20} color="#F59E0B" />
              <span>+85 mil clientes</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="contact-info-cards">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-badge">
              <Landmark size={16} />
              <span>Nossos Canais</span>
            </span>
            <h2 className="section-title">
              Canais de <span className="title-gradient-blue">atendimento</span> para você
            </h2>
            <p className="section-description">
              Escolha a forma mais conveniente de entrar em contato conosco
            </p>
          </motion.div>

          <div className="info-cards-grid">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                className="info-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="info-card-icon" style={{ color: index % 2 === 0 ? '#2563EB' : '#F59E0B' }}>
                  {info.icon}
                </div>
                <h3>{info.title}</h3>
                <p className="info-description">{info.description}</p>
                <div className="info-items">
                  {info.items.map((item, idx) => (
                    <div key={idx} className="info-item">
                      <span className="info-label">{item.label}:</span>
                      {item.link ? (
                        <a href={item.link} className="info-value">
                          {item.value}
                        </a>
                      ) : (
                        <span className="info-value">{item.value}</span>
                      )}
                      {item.link?.startsWith('mailto:') && (
                        <button 
                          className="copy-button"
                          onClick={() => handleCopy(item.value, `email-${index}-${idx}`)}
                          title="Copiar e-mail"
                        >
                          {copied === `email-${index}-${idx}` ? (
                            <Check size={14} color="#F59E0B" />
                          ) : (
                            <Copy size={14} />
                          )}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section" id="contato" ref={contactRef}>
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-badge">
              <Mail size={16} />
              <span>Fale Conosco</span>
            </span>
            <h2 className="section-title">
              Envie sua <span className="title-gradient-blue">mensagem</span> para um <span className="title-gradient-gold">especialista</span>
            </h2>
            <p className="section-description">
              Preencha o formulário abaixo e retornaremos em até 2 horas úteis
            </p>
          </motion.div>

          <div className="contact-form-wrapper">
            {/* Departamentos Tabs */}
            <div className="departments-tabs">
              {departments.slice(0, 5).map((dept) => (
                <button
                  key={dept.id}
                  className={`tab-button ${activeTab === dept.id ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab(dept.id);
                    setFormData(prev => ({ ...prev, department: dept.id }));
                  }}
                >
                  {dept.label}
                </button>
              ))}
            </div>

            {/* Formulário */}
            <motion.form 
              className="contact-form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Nome completo *</label>
                  <div className="input-wrapper">
                    <User size={16} className="input-icon" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`form-input ${formErrors.name ? 'error' : ''}`}
                      placeholder="Seu nome completo"
                    />
                  </div>
                  {formErrors.name && (
                    <span className="error-message">{formErrors.name}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="email">E-mail *</label>
                  <div className="input-wrapper">
                    <Mail size={16} className="input-icon" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`form-input ${formErrors.email ? 'error' : ''}`}
                      placeholder="seu@email.com"
                    />
                  </div>
                  {formErrors.email && (
                    <span className="error-message">{formErrors.email}</span>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Telefone *</label>
                  <div className="input-wrapper">
                    <Phone size={16} className="input-icon" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange({
                        target: { name: 'phone', value: formatPhone(e.target.value) }
                      })}
                      className={`form-input ${formErrors.phone ? 'error' : ''}`}
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                  {formErrors.phone && (
                    <span className="error-message">{formErrors.phone}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="cpf">CPF *</label>
                  <div className="input-wrapper">
                    <CreditCard size={16} className="input-icon" />
                    <input
                      type="text"
                      id="cpf"
                      name="cpf"
                      value={formData.cpf}
                      onChange={(e) => handleInputChange({
                        target: { name: 'cpf', value: formatCPF(e.target.value) }
                      })}
                      className={`form-input ${formErrors.cpf ? 'error' : ''}`}
                      placeholder="000.000.000-00"
                    />
                  </div>
                  {formErrors.cpf && (
                    <span className="error-message">{formErrors.cpf}</span>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="company">Empresa (opcional)</label>
                  <div className="input-wrapper">
                    <Building2 size={16} className="input-icon" />
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Nome da sua empresa"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="creditValue">Valor desejado (R$) *</label>
                  <div className="input-wrapper">
                    <DollarSign size={16} className="input-icon" />
                    <input
                      type="text"
                      id="creditValue"
                      name="creditValue"
                      value={formData.creditValue}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Ex: 50.000"
                    />
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="department">Departamento</label>
                  <div className="select-wrapper">
                    <select
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      {departments.map(dept => (
                        <option key={dept.id} value={dept.id}>
                          {dept.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="select-arrow" />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="preferredContact">Preferência de contato</label>
                  <div className="select-wrapper">
                    <select
                      id="preferredContact"
                      name="preferredContact"
                      value={formData.preferredContact}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="email">E-mail</option>
                      <option value="phone">Telefone</option>
                      <option value="whatsapp">WhatsApp</option>
                    </select>
                    <ChevronDown size={16} className="select-arrow" />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Assunto</label>
                <div className="input-wrapper">
                  <MessageSquare size={16} className="input-icon" />
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Assunto da mensagem"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Mensagem *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`form-textarea ${formErrors.message ? 'error' : ''}`}
                  rows={5}
                  placeholder="Descreva sua necessidade financeira, dúvida ou solicitação..."
                ></textarea>
                {formErrors.message && (
                  <span className="error-message">{formErrors.message}</span>
                )}
              </div>

              <div className="form-group file-group">
                <label htmlFor="file" className="file-label">
                  <Paperclip size={16} />
                  <span>Anexar documento (RG, comprovante, etc. - máximo 5MB)</span>
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={handleFileChange}
                  className="file-input"
                  accept=".pdf,.doc,.docx,.jpg,.png"
                />
                {selectedFile && (
                  <div className="selected-file">
                    <FileText size={14} color="#2563EB" />
                    <span>{selectedFile.name}</span>
                    <button 
                      type="button" 
                      onClick={() => setSelectedFile(null)}
                      className="remove-file"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
              </div>

              <AnimatePresence>
                {formStatus && (
                  <motion.div 
                    className={`form-status ${formStatus.type}`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    {formStatus.type === 'success' ? (
                      <CheckCircle2 size={18} color="#F59E0B" />
                    ) : (
                      <AlertCircle size={18} color="#EF4444" />
                    )}
                    <span>{formStatus.message}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="form-checkbox">
                <input type="checkbox" id="privacy" required />
                <label htmlFor="privacy">
                  Declaro que li e concordo com a <Link to="/privacidade">Política de Privacidade</Link> e autorizo o uso dos meus dados para análise de crédito e contato.
                </label>
              </div>

              <button 
                type="submit" 
                className="form-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Enviar mensagem</span>
                  </>
                )}
              </button>

              <div className="form-footer">
                <Lock size={14} color="#F59E0B" />
                <span>Seus dados estão protegidos pela LGPD</span>
              </div>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Support Channels Section */}
      <section className="support-channels-section" id="canais" ref={supportRef}>
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-badge">
              <Headphones size={16} />
              <span>Canais de Atendimento</span>
            </span>
            <h2 className="section-title">
              Escolha o <span className="title-gradient-blue">canal</span> mais <span className="title-gradient-gold">prático</span> para você
            </h2>
            <p className="section-description">
              Oferecemos múltiplos canais para garantir que você receba o atendimento que precisa
            </p>
          </motion.div>

          <div className="support-channels-grid">
            {supportChannels.map((channel, index) => (
              <SupportChannel key={index} channel={channel} index={index} />
            ))}
          </div>

          {/* Status do Atendimento */}
          <motion.div 
            className="support-status"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="status-badge online">
              <span className="status-dot"></span>
              <span>Atendimento online agora</span>
            </div>
            <p className="status-text">
              Temos <strong>8 especialistas</strong> disponíveis neste momento.
              Tempo médio de espera: <strong>menos de 3 minutos</strong>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section" id="faq" ref={faqRef}>
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-badge">
              <HelpCircle size={16} />
              <span>Perguntas Frequentes</span>
            </span>
            <h2 className="section-title">
              Dúvidas <span className="title-gradient-blue">frequentes</span> sobre nossos <span className="title-gradient-gold">serviços</span>
            </h2>
            <p className="section-description">
              Encontre respostas rápidas para as principais dúvidas sobre crédito e conta digital
            </p>
          </motion.div>

          {/* FAQ Categories */}
          <div className="faq-categories">
            {Object.keys(faqs).map((category) => (
              <button
                key={category}
                className={`category-button ${activeTab === category ? 'active' : ''}`}
                onClick={() => setActiveTab(category)}
              >
                {category === 'geral' && 'Geral'}
                {category === 'credito' && 'Crédito'}
                {category === 'conta' && 'Conta Digital'}
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="faq-list">
            {faqs[activeTab]?.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                index={index}
                isOpen={openFaqIndex === index}
                onToggle={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
              />
            ))}
          </div>

          {/* FAQ Contact */}
          <motion.div 
            className="faq-contact"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="faq-contact-icon">
              <HelpCircle size={24} color="#F59E0B" />
            </div>
            <div className="faq-contact-content">
              <h3>Não encontrou o que procurava?</h3>
              <p>Nossa equipe está pronta para ajudar com qualquer dúvida específica sobre crédito e serviços financeiros.</p>
            </div>
            <Link to="/contato" className="faq-contact-button">
              <span>Falar com especialista</span>
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-badge">
              <MapPin size={16} />
              <span>Nossas Agências</span>
            </span>
            <h2 className="section-title">
              Estamos <span className="title-gradient-blue">presentes</span> nas principais <span className="title-gradient-gold">regiões</span> do país
            </h2>
          </motion.div>

          <div className="map-container">
            {/* Simulação de mapa */}
            <div className="map-placeholder">
              <div className="map-pin sp">
                <div className="pin-dot"></div>
                <span>São Paulo</span>
              </div>
              <div className="map-pin rp">
                <div className="pin-dot"></div>
                <span>Ribeirão Preto</span>
              </div>
              <div className="map-pin df">
                <div className="pin-dot"></div>
                <span>Brasília</span>
              </div>
              <div className="map-pin bh">
                <div className="pin-dot"></div>
                <span>Belo Horizonte</span>
              </div>
              <div className="map-pin rj">
                <div className="pin-dot"></div>
                <span>Rio de Janeiro</span>
              </div>
              <div className="map-pin poa">
                <div className="pin-dot"></div>
                <span>Porto Alegre</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="final-cta">
        <div className="container">
          <motion.div
            className="cta-card"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="cta-gradient-bg"></div>
            <div className="cta-content">
              <h2 className="cta-title">
                Pronto para <span className="title-gradient-gold">realizar</span> seus projetos?
              </h2>
              <p className="cta-description">
                Simule seu crédito agora mesmo e descubra as melhores condições para você ou sua empresa.
              </p>
              <div className="cta-buttons">
                <Link to="/simulacao" className="cta-button-primary">
                  <span>Simular crédito</span>
                  <Calculator size={18} />
                </Link>
                <Link to="/planos" className="cta-button-secondary">
                  <span>Conhecer produtos</span>
                  <ExternalLink size={18} />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contato;