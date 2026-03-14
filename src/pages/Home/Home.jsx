import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  BarChart3, 
  Shield, 
  Zap, 
  Globe, 
  TrendingUp,
  MapPin, 
  Clock,
  ChevronRight,
  Play,
  CheckCircle2,
  Users,
  Handshake,
  ShieldCheck,
  Leaf,
  MessageSquare,
  Star,
  Send,
  Phone,
  Mail,
  Sparkles,
  Award,
  Target,
  Cpu,
  ChevronDown,
  Gift,
  Rocket,
  Check,
  Plus,
  Coins,
  CreditCard,
  Briefcase,
  X,
  FileText,
  Headphones,
  HelpCircle,
  DollarSign,
  Landmark,
  BadgePercent,
  Building,
  Sprout,
  Tractor,
  Droplets,
  Combine,
  Calendar,
  PiggyBank,
  Wallet,
  Scale,
  Percent,
  Activity,
  Banknote,
  TreePine,
  Wheat,
  Sun,
  Cloud,
  TrendingDown,
  LineChart,
  PieChart,
  BarChart,
  Calculator,
  Smartphone,
  Laptop,
  Tablet,
  Database,
  Lock,
  Fingerprint,
  ScanFace,
  QrCode,
  CreditCard as CreditCardIcon
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
import logo from '../../assets/images/Logo/logo.svg';
import heroBackground from '../../assets/images/Logo/hero-banking.jpg';
import creditAnalysis from '../../assets/images/Home/analise-credito-bancario.jpg';
import digitalBanking from '../../assets/images/Home/digital-banking.jpg';
import agribusinessFinance from '../../assets/images/Home/agro-finance.jpg';
import corporateBanking from '../../assets/images/Home/corporate-banking.jpg';
import sobreInstituto from '../../assets/images/Home/Sobre o Instituto.jpg';

// Componente de Partículas Otimizado
const Particles = React.memo(({ count = 40 }) => {
  const particles = useMemo(() => 
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
    <div className="hero-particles">
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

// Componente de Card de Estatística
const StatCard = React.memo(({ icon, value, label, suffix, index, color = 'blue' }) => (
  <motion.div
    className={`stat-card stat-card-${color}`}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -8 }}
  >
    <div className="stat-icon">{icon}</div>
    <div className="stat-content">
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
      <div className="stat-suffix">{suffix}</div>
    </div>
    <div className="stat-glow"></div>
  </motion.div>
));

// Componente de Card de Timeline
const TimelineItem = React.memo(({ item, index }) => (
  <motion.div
    className="timeline-item"
    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <div className="timeline-year">
      <div className="timeline-year-content">
        <span>{item.year}</span>
        <div className="timeline-year-icon">{item.icon}</div>
      </div>
    </div>
    <div className="timeline-content">
      <h4>{item.title}</h4>
      <p>{item.description}</p>
    </div>
  </motion.div>
));

// Componente de Card de Depoimento
const TestimonialCard = React.memo(({ testimonial, index }) => (
  <motion.div
    className="testimonial-card"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -8 }}
  >
    <div className="testimonial-rating">
      {[...Array(testimonial.rating)].map((_, i) => (
        <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />
      ))}
    </div>
    <p className="testimonial-content">"{testimonial.content}"</p>
    <div className="testimonial-author">
      <img 
        src={testimonial.image} 
        alt={testimonial.name} 
        className="testimonial-avatar"
        loading="lazy"
      />
      <div>
        <div className="testimonial-name">{testimonial.name}</div>
        <div className="testimonial-role">{testimonial.role}</div>
      </div>
    </div>
    <div className="testimonial-company">{testimonial.company}</div>
  </motion.div>
));

// Componente de Card de Produto
const ProductCard = React.memo(({ product, index }) => (
  <motion.div
    className={`product-card ${product.featured ? 'product-card-featured' : ''}`}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -8 }}
  >
    {product.badge && (
      <div className="product-badge">
        <span>{product.badge}</span>
      </div>
    )}
    <div className="product-icon">{product.icon}</div>
    <h3 className="product-title">{product.title}</h3>
    <p className="product-description">{product.description}</p>
    <div className="product-features">
      {product.features.map((feature, i) => (
        <div key={i} className="product-feature">
          <Check size={14} color="#F59E0B" />
          <span>{feature}</span>
        </div>
      ))}
    </div>
    <div className="product-footer">
      <div className="product-rate">
        <span className="product-rate-label">Taxa a partir de</span>
        <span className="product-rate-value">{product.rate}</span>
      </div>
      <Link to={product.link} className="product-link">
        <span>Conhecer</span>
        <ArrowRight size={16} />
      </Link>
    </div>
  </motion.div>
));

// Componente de Card de Benefício
const BenefitCard = React.memo(({ icon, title, description, index }) => (
  <motion.div
    className="benefit-card"
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.4, delay: index * 0.05 }}
    whileHover={{ y: -5 }}
  >
    <div className="benefit-icon">{icon}</div>
    <h4 className="benefit-title">{title}</h4>
    <p className="benefit-description">{description}</p>
  </motion.div>
));

const Home = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const [activeProduct, setActiveProduct] = useState('all');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    birthDate: '',
    creditType: '',
    creditValue: '',
    message: ''
  });
  
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const productsRef = useRef(null);
  
  // Animações baseadas no scroll
  const smoothY1 = useSpring(useTransform(scrollY, [0, 500], [0, 150]), { stiffness: 100, damping: 30 });
  const smoothY2 = useSpring(useTransform(scrollY, [0, 500], [0, -150]), { stiffness: 100, damping: 30 });
  const heroOpacity = useSpring(useTransform(scrollY, [0, 300], [1, 0.95]), { stiffness: 100, damping: 30 });
  const heroScale = useSpring(useTransform(scrollY, [0, 300], [1, 0.98]), { stiffness: 100, damping: 30 });

  // Stats Financeiros (removidos conforme solicitado)
  const stats = useMemo(() => [], []);

  // Timeline Institucional (removida conforme solicitado)
  const journey = useMemo(() => [], []);

  // Depoimentos
  const testimonials = useMemo(() => [
    {
      name: "Ricardo Almeida",
      role: "Empresário",
      content: "Consegui o crédito para expandir minha empresa em 48h. Taxas muito competitivas e atendimento excepcional.",
      rating: 5,
      image: "https://ui-avatars.com/api/?name=Ricardo+Almeida&background=2563EB&color=ffffff",
      company: "Rede de Farmácias"
    },
    {
      name: "Mariana Santos",
      role: "Produtora Rural",
      content: "Linha de crédito agro que me ajudou a modernizar toda a produção. Parceiros de longo prazo.",
      rating: 5,
      image: "https://ui-avatars.com/api/?name=Mariana+Santos&background=2563EB&color=ffffff",
      company: "Fazenda Boa Esperança"
    },
    {
      name: "Dr. Carlos Mendes",
      role: "Servidor Público",
      content: "Crédito consignado com as melhores taxas. Processo transparente e sem burocracia.",
      rating: 5,
      image: "https://ui-avatars.com/api/?name=Carlos+Mendes&background=2563EB&color=ffffff",
      company: "Cliente desde 2010"
    },
    {
      name: "Patrícia Oliveira",
      role: "Arquiteta",
      content: "Financiamento imobiliário aprovado rapidamente. Realizei o sonho da casa própria.",
      rating: 5,
      image: "https://ui-avatars.com/api/?name=Patricia+Oliveira&background=2563EB&color=ffffff",
      company: "Cliente"
    }
  ], []);

  // Produtos Financeiros
  const financialProducts = useMemo(() => [
    {
      id: 'personal',
      title: 'Crédito Pessoal',
      description: 'Solução flexível para realizar seus projetos com taxas a partir de 1.99% ao mês.',
      icon: <Wallet size={32} />,
      features: ['Até R$ 50 mil', 'Parcelas fixas', 'Aprovação em 24h', 'Sem burocracia'],
      rate: '1,99% a.m.',
      link: '/credito-pessoal',
      badge: 'Mais contratado',
      featured: true
    },
    {
      id: 'payroll',
      title: 'Crédito Consignado',
      description: 'Taxas especiais para aposentados, pensionistas e servidores públicos.',
      icon: <BadgePercent size={32} />,
      features: ['Taxas a partir de 1.20%', 'Até 96 meses', 'Margem consignável', 'Portabilidade'],
      rate: '1,20% a.m.',
      link: '/consignado',
      badge: 'Melhores taxas'
    },
    {
      id: 'business',
      title: 'Crédito Empresarial',
      description: 'Capital de giro e investimento para alavancar seu negócio.',
      icon: <Briefcase size={32} />,
      features: ['Até R$ 5 milhões', 'Prazo estendido', 'Análise personalizada', 'Garantias flexíveis'],
      rate: 'a partir de 1,5% a.m.',
      link: '/empresarial',
      featured: true
    },
    {
      id: 'agro',
      title: 'Crédito Agro',
      description: 'Soluções financeiras para o agronegócio, do plantio à comercialização.',
      icon: <Sprout size={32} />,
      features: ['Custeio agrícola', 'Investimento', 'PRONAF', 'Crédito verde'],
      rate: 'Condições especiais',
      link: '/agro',
      badge: 'Especializado'
    },
    {
      id: 'realestate',
      title: 'Crédito Imobiliário',
      description: 'Realize o sonho da casa própria com condições diferenciadas.',
      icon: <Building size={32} />,
      features: ['Até 80% do imóvel', 'Até 35 anos', 'SAC e Price', 'Refinanciamento'],
      rate: 'a partir de 8,5% a.a.',
      link: '/imobiliario'
    },
    {
      id: 'vehicle',
      title: 'Financiamento de Veículos',
      description: 'Crédito para aquisição de veículos novos, usados e pesados.',
      icon: <Tractor size={32} />,
      features: ['Até 60 meses', 'Taxas competitivas', 'Veículos pesados', 'Renovação de frota'],
      rate: 'a partir de 1,4% a.m.',
      link: '/veiculos'
    }
  ], []);

  // Benefícios
  const benefits = useMemo(() => [
    {
      icon: <Lock size={24} />,
      title: 'Segurança',
      description: 'Dados protegidos com criptografia de ponta a ponta e conformidade com LGPD.'
    },
    {
      icon: <Zap size={24} />,
      title: 'Agilidade',
      description: 'Aprovação de crédito em até 24 horas com análise automatizada.'
    },
    {
      icon: <ShieldCheck size={24} />,
      title: 'Transparência',
      description: 'Todas as taxas e condições claras desde a simulação.'
    },
    {
      icon: <Headphones size={24} />,
      title: 'Suporte',
      description: 'Atendimento humano especializado de segunda a sábado.'
    },
    {
      icon: <Smartphone size={24} />,
      title: 'App Exclusivo',
      description: 'Acompanhe seu contrato e parcelas pelo celular.'
    },
    {
      icon: <Percent size={24} />,
      title: 'Taxas Competitivas',
      description: 'As melhores taxas do mercado para cada perfil.'
    }
  ], []);

 
  const partners = useMemo(() => [], []);

  const handleProductSelect = useCallback((productId) => {
    setActiveProduct(productId);
  }, []);

  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  const handleFormChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleFormSubmit = useCallback((e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({
      name: '',
      email: '',
      phone: '',
      cpf: '',
      birthDate: '',
      creditType: '',
      creditValue: '',
      message: ''
    });
    alert('Solicitação enviada com sucesso! Um especialista entrará em contato em até 2 horas.');
  }, [formData]);

  const openVideoModal = useCallback(() => {
    setIsVideoModalOpen(true);
  }, []);

  const closeVideoModal = useCallback(() => {
    setIsVideoModalOpen(false);
  }, []);

  const simulateCredit = useCallback(() => {
    navigate('/about');
  }, [navigate]);

  return (
    <div className="home">
      {/* Hero Section */}
      <section ref={heroRef} className="hero" id="home">
        <div className="hero-background">
          <div className="hero-overlay"></div>
          <img 
            src={heroBackground} 
            alt="Hero Background" 
            className="hero-background-image"
            loading="eager"
          />
          <div className="hero-gradient"></div>
          <div className="hero-grid"></div>
          <Particles count={50} />
        </div>

        <motion.div 
          className="hero-content"
          style={{ 
            opacity: heroOpacity, 
            scale: heroScale
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-badge"
          >
            <Sparkles size={16} color="#FBBF24" />
            <span>Instituição Financeira Autorizada pelo BACEN</span>
          </motion.div>

          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Soluções <span className="hero-title-gradient">Financeiras</span>
            <br />para <span className="hero-title-accent">Pessoas e Empresas</span>
          </motion.h1>

          <motion.p 
            className="hero-description"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Mais de R$ 3 bilhões em operações de crédito realizadas com tecnologia, 
            transparência e atendimento humanizado.
          </motion.p>

          <motion.div 
            className="hero-actions"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <button onClick={simulateCredit} className="btn-primary">
              <Landmark size={20} />
              Sobre nós
            </button>
            <Link to="/planos" className="btn-secondary">
              Conhecer Produtos
              <ArrowRight size={18} />
            </Link>
          </motion.div>

          <motion.div 
            className="hero-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            {stats.slice(0, 3).map((stat, index) => (
              <div key={index} className="hero-stat">
                <div className={`hero-stat-icon hero-stat-icon-${stat.color}`}>{stat.icon}</div>
                <div>
                  <div className="hero-stat-value">{stat.value}</div>
                  <div className="hero-stat-label">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="hero-scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          onClick={() => scrollToSection('produtos')}
        >
          <span>Conheça nossas soluções</span>
          <ChevronDown size={16} color="#F59E0B" />
        </motion.div>
      </section>

    
      {/* Sobre Nós */}
      <section className="about" id="sobre">
        <div className="container">
          <div className="about-grid">
            <motion.div 
              className="about-content"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-badge">
                <Landmark size={16} />
                <span>Sobre o Instituto</span>
              </span>
              
              <h2 className="section-title">
                Mais de 15 anos <span className="section-title-gradient-blue">transformando</span> o mercado financeiro
              </h2>
              
              <p className="about-description">
                Fundado em 2008, o Instituto Financeiro nasceu com a missão de democratizar o acesso ao crédito 
                no Brasil. Combinamos solidez institucional, tecnologia avançada e um profundo entendimento das 
                necessidades financeiras de pessoas físicas, empresas e produtores rurais.
              </p>

              <div className="about-features">
                <div className="about-feature">
                  <div className="about-feature-icon">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h4>Autorizado pelo BACEN</h4>
                    <p>Operamos como Sociedade de Crédito Direto (SCD)</p>
                  </div>
                </div>
                <div className="about-feature">
                  <div className="about-feature-icon">
                    <Building size={20} />
                  </div>
                  <div>
                    <h4>24 Unidades</h4>
                    <p>Presente em 12 estados brasileiros</p>
                  </div>
                </div>
                <div className="about-feature">
                  <div className="about-feature-icon">
                    <Users size={20} />
                  </div>
                  <div>
                    <h4>+300 Colaboradores</h4>
                    <p>Equipe altamente qualificada</p>
                  </div>
                </div>
                <div className="about-feature">
                  <div className="about-feature-icon">
                    <TrendingUp size={20} />
                  </div>
                  <div>
                    <h4>R$ 3,2 Bi em ativos</h4>
                    <p>Crescimento sustentável</p>
                  </div>
                </div>
              </div>

              <div className="about-values">
                <div className="value-tag">
                  <ShieldCheck size={16} />
                  <span>Transparência</span>
                </div>
                <div className="value-tag">
                  <Users size={16} />
                  <span>Ética</span>
                </div>
                <div className="value-tag">
                  <Target size={16} />
                  <span>Inovação</span>
                </div>
                <div className="value-tag">
                  <Handshake size={16} />
                  <span>Parceria</span>
                </div>
                <div className="value-tag">
                  <Award size={16} />
                  <span>Excelência</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="about-image"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="about-image-card">
                <img src={sobreInstituto} alt="Sobre o Instituto" className="about-side-image" loading="lazy" />
                <div className="about-image-content">
                  <div className="about-image-stats">
                    <div className="about-image-stat">
                      <span className="about-image-stat-value">24</span>
                      <span className="about-image-stat-label">Unidades</span>
                    </div>
                    <div className="about-image-stat">
                      <span className="about-image-stat-value">85k+</span>
                      <span className="about-image-stat-label">Clientes</span>
                    </div>
                    <div className="about-image-stat">
                      <span className="about-image-stat-value">15</span>
                      <span className="about-image-stat-label">Anos</span>
                    </div>
                  </div>
                  <div className="about-image-quote">
                    <p>"Compromisso com o desenvolvimento econômico e social do Brasil"</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Produtos Section */}
      <section className="products" id="produtos" ref={productsRef}>
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-badge">
              <Wallet size={16} />
              <span>Nossas Soluções</span>
            </span>
            <h2 className="section-title">
              Linhas de crédito para <span className="section-title-gradient-blue">todos</span> os <span className="section-title-gradient-gold">momentos</span>
            </h2>
            <p className="section-description">
              Soluções personalizadas para cada necessidade, com taxas competitivas e aprovação ágil
            </p>
          </motion.div>

          <div className="products-filter">
            <button 
              className={`filter-btn ${activeProduct === 'all' ? 'active' : ''}`}
              onClick={() => setActiveProduct('all')}
            >
              Todos
            </button>
            <button 
              className={`filter-btn ${activeProduct === 'personal' ? 'active' : ''}`}
              onClick={() => setActiveProduct('personal')}
            >
              Pessoa Física
            </button>
            <button 
              className={`filter-btn ${activeProduct === 'business' ? 'active' : ''}`}
              onClick={() => setActiveProduct('business')}
            >
              Pessoa Jurídica
            </button>
            <button 
              className={`filter-btn ${activeProduct === 'agro' ? 'active' : ''}`}
              onClick={() => setActiveProduct('agro')}
            >
              Agronegócio
            </button>
          </div>

          <div className="products-grid">
            {financialProducts
              .filter(product => {
                if (activeProduct === 'all') return true;
                if (activeProduct === 'personal') return ['personal', 'payroll', 'realestate', 'vehicle'].includes(product.id);
                if (activeProduct === 'business') return ['business'].includes(product.id);
                if (activeProduct === 'agro') return ['agro'].includes(product.id);
                return true;
              })
              .map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
          </div>

          <motion.div 
            className="products-cta"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p>Não encontrou o que precisa? Fale com um especialista</p>
            <Link to="/contato" className="btn-outline">
              <span>Falar agora</span>
              <Headphones size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Análise de Crédito */}
      <section className="credit-analysis">
        <div className="container">
          <div className="analysis-grid">
            <motion.div
              className="analysis-image"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="analysis-image-wrapper">
                <img src={creditAnalysis} alt="Análise de Crédito" loading="lazy" />
                <div className="analysis-overlay">
                  <div className="analysis-badge">
                    <Zap size={16} />
                    <span>Aprovação em até 24h</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="analysis-content"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-badge">
                <Cpu size={16} />
                <span>Tecnologia e Inovação</span>
              </span>

              <h2 className="section-title">
                Análise de crédito <span className="section-title-gradient-blue">inteligente</span> e <span className="section-title-gradient-gold">personalizada</span>
              </h2>

              <p className="section-description">
                Utilizamos machine learning e mais de 500 variáveis para oferecer decisões de crédito mais 
                rápidas, precisas e justas. Nossa tecnologia considera não apenas o histórico tradicional, 
                mas também dados alternativos que revelam o real potencial de cada cliente.
              </p>

              <div className="analysis-stats">
                <div className="analysis-stat">
                  <span className="analysis-stat-value">500+</span>
                  <span className="analysis-stat-label">Variáveis analisadas</span>
                </div>
                <div className="analysis-stat">
                  <span className="analysis-stat-value">24h</span>
                  <span className="analysis-stat-label">Tempo médio de aprovação</span>
                </div>
                <div className="analysis-stat">
                  <span className="analysis-stat-value">97%</span>
                  <span className="analysis-stat-label">Satisfação dos clientes</span>
                </div>
              </div>

              <div className="analysis-features">
                <div className="analysis-feature">
                  <CheckCircle2 size={20} color="#F59E0B" />
                  <span>Score proprietário exclusivo</span>
                </div>
                <div className="analysis-feature">
                  <CheckCircle2 size={20} color="#F59E0B" />
                  <span>Análise de dados alternativos</span>
                </div>
                <div className="analysis-feature">
                  <CheckCircle2 size={20} color="#F59E0B" />
                  <span>Modelos preditivos avançados</span>
                </div>
                <div className="analysis-feature">
                  <CheckCircle2 size={20} color="#F59E0B" />
                  <span>Decisão em tempo real</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Digital Banking */}
      <section className="digital-banking">
        <div className="container">
          <div className="banking-grid">
            <motion.div
              className="banking-content"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-badge">
                <Smartphone size={16} />
                <span>Conta Digital</span>
              </span>

              <h2 className="section-title">
                Banco digital <span className="section-title-gradient-blue">completo</span> e <span className="section-title-gradient-gold">integrado</span>
              </h2>

              <p className="section-description">
                Gerencie suas finanças, realize pagamentos, transferências e acompanhe seus investimentos 
                tudo em um só lugar, com a segurança e praticidade que você merece.
              </p>

              <div className="banking-features-grid">
                <div className="banking-feature-item">
                  <div className="banking-feature-icon">
                    <Check size={16} color="#F59E0B" />
                  </div>
                  <div>
                    <h4>Transferências gratuitas</h4>
                    <p>Pix, TED e DOC ilimitados</p>
                  </div>
                </div>
                <div className="banking-feature-item">
                  <div className="banking-feature-icon">
                    <Check size={16} color="#F59E0B" />
                  </div>
                  <div>
                    <h4>Cartão de crédito</h4>
                    <p>Sem anuidade e com pontos</p>
                  </div>
                </div>
                <div className="banking-feature-item">
                  <div className="banking-feature-icon">
                    <Check size={16} color="#F59E0B" />
                  </div>
                  <div>
                    <h4>Investimentos</h4>
                    <p>CDB, LCI, LCA e mais</p>
                  </div>
                </div>
                <div className="banking-feature-item">
                  <div className="banking-feature-icon">
                    <Check size={16} color="#F59E0B" />
                  </div>
                  <div>
                    <h4>Seguros</h4>
                    <p>Vida, residencial e empresarial</p>
                  </div>
                </div>
              </div>

              <Link to="/conta-digital" className="btn-primary">
                <span>Abrir conta gratuita</span>
                <ArrowRight size={16} />
              </Link>
            </motion.div>

            <motion.div
              className="banking-image"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="banking-image-wrapper">
                <img src={digitalBanking} alt="Digital Banking" loading="lazy" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Agronegócio */}
      <section className="agribusiness">
        <div className="container">
          <div className="agro-grid">
            <motion.div
              className="agro-image"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="agro-image-wrapper">
                <img src={agribusinessFinance} alt="Agronegócio" loading="lazy" />
              </div>
            </motion.div>

            <motion.div
              className="agro-content"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-badge">
                <Sprout size={16} />
                <span>Agronegócio</span>
              </span>

              <h2 className="section-title">
                Crédito para <span className="section-title-gradient-blue">impulsionar</span> sua <span className="section-title-gradient-gold">produção</span>
              </h2>

              <p className="section-description">
                Entendemos as particularidades do agronegócio. Oferecemos linhas de crédito específicas 
                para cada fase do ciclo produtivo, com prazos ajustados à safra e taxas competitivas.
              </p>

              <div className="agro-products">
                <div className="agro-product">
                  <Sprout size={20} color="#F59E0B" />
                  <div>
                    <h4>Custeio Agrícola</h4>
                    <p>Para despesas do plantio à colheita</p>
                  </div>
                </div>
                <div className="agro-product">
                  <Tractor size={20} color="#F59E0B" />
                  <div>
                    <h4>Investimento</h4>
                    <p>Aquisição de máquinas e equipamentos</p>
                  </div>
                </div>
                <div className="agro-product">
                  <Combine size={20} color="#F59E0B" />
                  <div>
                    <h4>Comercialização</h4>
                    <p>Para escoamento da produção</p>
                  </div>
                </div>
                <div className="agro-product">
                  <Leaf size={20} color="#F59E0B" />
                  <div>
                    <h4>Crédito Verde</h4>
                    <p>Incentivo a práticas sustentáveis</p>
                  </div>
                </div>
              </div>

              <Link to="/agro" className="btn-secondary">
                <span>Conhecer linhas agro</span>
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="benefits">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-badge">
              <Award size={16} />
              <span>Diferenciais</span>
            </span>
            <h2 className="section-title">
              Por que escolher o <span className="section-title-gradient-blue">Instituto</span> <span className="section-title-gradient-gold">Financeiro</span>
            </h2>
            <p className="section-description">
              Mais de 85 mil clientes confiam em nossa experiência e solidez
            </p>
          </motion.div>

          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <BenefitCard key={index} {...benefit} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-badge">
              <MessageSquare size={16} />
              <span>Depoimentos</span>
            </span>
            <h2 className="section-title">
              O que nossos <span className="section-title-gradient-blue">clientes</span> dizem sobre <span className="section-title-gradient-gold">nós</span>
            </h2>
            <p className="section-description">
              Histórias reais de quem realizou seus projetos conosco
            </p>
          </motion.div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} index={index} />
            ))}
          </div>
        </div>
      </section>

      

      {/* CTA Final */}
      <section className="cta-final">
        <div className="container">
          <motion.div
            className="cta-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="cta-gradient-bg"></div>
            
            <div className="cta-content">
              <h2 className="cta-title">
                Pronto para <span className="cta-title-gradient">realizar</span> seus projetos?
              </h2>
              <p className="cta-description">
                Simule seu crédito agora mesmo e descubra as melhores condições para você ou sua empresa.
              </p>

              <div className="cta-buttons">
                <button onClick={simulateCredit} className="btn-primary cta-btn">
                  <span>Simular crédito</span>
                  <Calculator size={20} />
                </button>
                <Link to="/fale-conosco" className="btn-outline cta-btn">
                  <span>Falar com especialista</span>
                  <Headphones size={18} />
                </Link>
              </div>

              <div className="cta-features">
                <div className="cta-feature">
                  <CheckCircle2 size={18} color="#F59E0B" />
                  <span>Simulação online</span>
                </div>
                <div className="cta-feature">
                  <CheckCircle2 size={18} color="#F59E0B" />
                  <span>Sem burocracia</span>
                </div>
                <div className="cta-feature">
                  <CheckCircle2 size={18} color="#F59E0B" />
                  <span>Resposta em 24h</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="contact" id="contato">
        <div className="container">
          <div className="contact-grid">
            <motion.div
              className="contact-info"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-badge">
                <Mail size={16} />
                <span>Fale Conosco</span>
              </span>
              
              <h2 className="contact-title">
                Estamos aqui para <span className="section-title-gradient-blue">ajudar</span>
              </h2>
              
              <p className="contact-description">
                Nossos especialistas estão prontos para esclarecer dúvidas e oferecer a melhor solução 
                para suas necessidades financeiras.
              </p>

              <div className="contact-methods">
                <div className="contact-method">
                  <div className="contact-method-icon">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4>Central de Atendimento</h4>
                    <p>4004-4004 (capitais)</p>
                    <p>0800 123 4567 (demais regiões)</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="contact-method-icon">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4>Email</h4>
                    <p>atendimento@instituto.com.br</p>
                    <p>credito@instituto.com.br</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="contact-method-icon">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4>Horário de Atendimento</h4>
                    <p>Segunda a Sexta: 8h às 20h</p>
                    <p>Sábado: 9h às 13h</p>
                  </div>
                </div>
              </div>

              <div className="contact-locations">
                <div className="location-card">
                  <div className="location-icon">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4>Matriz - São Paulo</h4>
                    <p>Av. Faria Lima, 3500</p>
                    <p>Itaim Bibi, São Paulo - SP</p>
                    <p>CEP: 04538-132</p>
                  </div>
                </div>

                <div className="location-card">
                  <div className="location-icon">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4>Regional - Ribeirão Preto</h4>
                    <p>Av. Presidente Vargas, 2000</p>
                    <p>Centro, Ribeirão Preto - SP</p>
                    <p>CEP: 14015-000</p>
                  </div>
                </div>
              </div>

              <div className="contact-social">
                <h4>Redes Sociais</h4>
                <div className="social-links">
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <path fill="currentColor" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <path fill="currentColor" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.405a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
                    </svg>
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-link">
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <path fill="currentColor" d="M23.5 6.2c-.3-1-1-1.8-2-2.1-1.9-.5-9.5-.5-9.5-.5s-7.6 0-9.5.5c-1 .3-1.7 1.1-2 2.1-.5 1.9-.5 5.8-.5 5.8s0 3.9.5 5.8c.3 1 1 1.8 2 2.1 1.9.5 9.5.5 9.5.5s7.6 0 9.5-.5c1-.3 1.7-1.1 2-2.1.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.5 15.5v-8l8 4-8 4z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="contact-form-container"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="contact-form-card">
                <h3 className="form-title">Solicitar análise de crédito</h3>
                <p className="form-subtitle">Preencha os dados e um especialista entrará em contato</p>

                <form className="form" onSubmit={handleFormSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        placeholder="Nome completo *" 
                        className="form-input" 
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        placeholder="Email *" 
                        className="form-input" 
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <input 
                        type="text" 
                        name="cpf"
                        value={formData.cpf}
                        onChange={handleFormChange}
                        placeholder="CPF *" 
                        className="form-input" 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <input 
                        type="text" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleFormChange}
                        placeholder="Telefone *" 
                        className="form-input" 
                        required 
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <input 
                        type="text" 
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleFormChange}
                        placeholder="Data de nascimento *" 
                        className="form-input" 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <select 
                        name="creditType"
                        value={formData.creditType}
                        onChange={handleFormChange}
                        className="form-select" 
                        required
                      >
                        <option value="" disabled>Tipo de crédito *</option>
                        <option value="personal">Crédito Pessoal</option>
                        <option value="payroll">Crédito Consignado</option>
                        <option value="business">Crédito Empresarial</option>
                        <option value="agro">Crédito Agro</option>
                        <option value="realestate">Crédito Imobiliário</option>
                        <option value="vehicle">Financiamento de Veículos</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <input 
                      type="text" 
                      name="creditValue"
                      value={formData.creditValue}
                      onChange={handleFormChange}
                      placeholder="Valor desejado (R$) *" 
                      className="form-input" 
                      required
                    />
                  </div>

                  <div className="form-group">
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleFormChange}
                      rows={3} 
                      placeholder="Mensagem (opcional)"
                      className="form-textarea"
                    ></textarea>
                  </div>

                  <div className="form-checkbox">
                    <input type="checkbox" id="privacy" required />
                    <label htmlFor="privacy">
                      Concordo com a <a href="/privacidade">Política de Privacidade</a> e autorizo o uso dos meus dados para análise de crédito
                    </label>
                  </div>

                  <button type="submit" className="form-submit">
                    <span>Solicitar análise</span>
                    <Send size={18} />
                  </button>

                  <div className="form-footer">
                    <Lock size={14} />
                    <span>Seus dados estão protegidos pela LGPD</span>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default Home;