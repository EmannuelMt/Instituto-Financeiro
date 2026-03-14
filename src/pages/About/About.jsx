// About.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight,
  Users,
  Target,
  Award,
  Globe,
  TrendingUp,
  Shield,
  Heart,
  Handshake,
  Leaf,
  Rocket,
  Sparkles,
  Zap,
  Cpu,
  Network,
  MapPin,
  Mail,
  Phone,
  Linkedin,
  Twitter,
  Github,
  Instagram,
  ChevronRight,
  ChevronDown,
  Briefcase,
  BookOpen,
  Coffee,
  Smile,
  Star,
  CheckCircle,
  Play,
  Download,
  Quote,
  Building2,
  BarChart3,
  Clock,
  Calendar,
  Eye,
  UserPlus,
  Send,
  MessageSquare,
  Headphones
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './About.css';
import logo from '../../assets/images/Logo/logo.svg';
import heroBackground from '../../assets/images/Logo/logobannerhero.jpg';
import { CreditCard } from 'lucide-react';

// Componente de Partículas
const Particles = React.memo(({ count = 30 }) => {
  const particles = React.useMemo(() => 
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: 15 + Math.random() * 10,
      delay: Math.random() * 5,
      xMove: Math.random() * 200 - 100,
      yMove: Math.random() * 200 - 100
    })), [count]
  );

  return (
    <div className="about-particles">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="particle"
          animate={{
            x: [0, particle.xMove, 0],
            y: [0, particle.yMove, 0],
            opacity: [0, 0.2, 0],
            scale: [0, 1, 0]
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
          }}
        />
      ))}
    </div>
  );
});

// Componente de Card de Membro da Equipe
const TeamMemberCard = React.memo(({ member, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="team-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="team-card-inner">
        <div className="team-image-wrapper">
          <img 
            src={member.image} 
            alt={member.name}
            className="team-image"
          />
          <div className="team-social">
            <motion.a 
              href={member.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
              transition={{ delay: 0.1 }}
            >
              <Linkedin size={16} />
            </motion.a>
            <motion.a 
              href={member.twitter} 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
              transition={{ delay: 0.2 }}
            >
              <Twitter size={16} />
            </motion.a>
            <motion.a 
              href={member.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
              transition={{ delay: 0.3 }}
            >
              <Github size={16} />
            </motion.a>
          </div>
        </div>
        <div className="team-info">
          <h3 className="team-name">{member.name}</h3>
          <p className="team-role">{member.role}</p>
          <p className="team-bio">{member.bio}</p>
        </div>
      </div>
    </motion.div>
  );
});

// Componente de Card de Investidor
const InvestorCard = React.memo(({ investor, index }) => (
  <motion.div
    className="investor-card"
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -8 }}
  >
    <img src={investor.logo} alt={investor.name} className="investor-logo" />
    <h3 className="investor-name">{investor.name}</h3>
    <p className="investor-description">{investor.description}</p>
    <div className="investor-round">
      <span className="round-label">{investor.round}</span>
      <span className="round-year">{investor.year}</span>
    </div>
  </motion.div>
));

// Componente de Card de Vaga
const JobCard = React.memo(({ job, index }) => (
  <motion.div
    className="job-card"
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ x: 5 }}
  >
    <div className="job-icon">
      {job.icon}
    </div>
    <div className="job-content">
      <h3 className="job-title">{job.title}</h3>
      <div className="job-meta">
        <span className="job-location">
          <MapPin size={14} />
          {job.location}
        </span>
        <span className="job-type">
          <Clock size={14} />
          {job.type}
        </span>
        <span className="job-level">
          <TrendingUp size={14} />
          {job.level}
        </span>
      </div>
      <p className="job-description">{job.description}</p>
      <Link to={`/carreiras/${job.id}`} className="job-link">
        Ver vaga
        <ArrowRight size={14} />
      </Link>
    </div>
  </motion.div>
));

const About = () => {
  const { scrollY } = useScroll();
  const [activeTab, setActiveTab] = useState('sobre');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    message: '',
    linkedin: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const teamRef = useRef(null);
  const investorsRef = useRef(null);
  const careersRef = useRef(null);

  // Animações baseadas no scroll
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.95]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.98]);
  const heroBlur = useTransform(scrollY, [0, 300], [0, 4]);
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  // Dados da equipe
  const teamMembers = [
    {
      name: 'Ana Silva',
      role: 'CEO & Co-fundadora',
      bio: 'Executiva com 15 anos em finanças e crédito. Experiência em banca e fintechs.',
      image: 'https://ui-avatars.com/api/?name=Ana+Silva&background=1A4D3E&color=ffffff&size=200',
      linkedin: '#',
      twitter: '#',
      github: '#'
    },
    {
      name: 'Carlos Santos',
      role: 'CPO & Co-fundador',
      bio: 'Especialista em produtos financeiros digitais e arquitetura de plataformas de crédito.',
      image: 'https://ui-avatars.com/api/?name=Carlos+Santos&background=2C6B4F&color=ffffff&size=200',
      linkedin: '#',
      twitter: '#',
      github: '#'
    },
    {
      name: 'Mariana Costa',
      role: 'Diretora de Risco e Compliance',
      bio: 'Líder em compliance e gestão de risco com experiência em instituições financeiras.',
      image: 'https://ui-avatars.com/api/?name=Mariana+Costa&background=3D8B6A&color=ffffff&size=200',
      linkedin: '#',
      twitter: '#',
      github: '#'
    },
    {
      name: 'Pedro Oliveira',
      role: 'Head de Tecnologia',
      bio: 'Arquiteto de sistemas com foco em plataformas seguras e escaláveis para serviços financeiros.',
      image: 'https://ui-avatars.com/api/?name=Pedro+Oliveira&background=5B8C7A&color=ffffff&size=200',
      linkedin: '#',
      twitter: '#',
      github: '#'
    },
    {
      name: 'Juliana Mendes',
      role: 'Diretora Comercial',
      bio: 'Executiva com background em vendas B2B e relacionamento com grandes clientes corporativos.',
      image: 'https://ui-avatars.com/api/?name=Juliana+Mendes&background=6B9C87&color=ffffff&size=200',
      linkedin: '#',
      twitter: '#',
      github: '#'
    },
    {
      name: 'Roberto Alves',
      role: 'Head de Data Science',
      bio: 'PhD em ciência de dados, especialista em modelos de score e prevenção à fraude.',
      image: 'https://ui-avatars.com/api/?name=Roberto+Alves&background=8ABFA3&color=ffffff&size=200',
      linkedin: '#',
      twitter: '#',
      github: '#'
    }
  ];

  // Dados dos investidores
  const investors = [
    {
      name: 'Monashees',
      logo: 'https://via.placeholder.com/150x50/1A4D3E/ffffff?text=Monashees',
      description: 'Fundo de venture capital líder na América Latina',
      round: 'Série A',
      year: '2021'
    },
    {
      name: 'Kaszek',
      logo: 'https://via.placeholder.com/150x50/2C6B4F/ffffff?text=Kaszek',
      description: 'Um dos maiores fundos de tecnologia da região',
      round: 'Série B',
      year: '2022'
    },
    {
      name: 'SoftBank',
      logo: 'https://via.placeholder.com/150x50/3D8B6A/ffffff?text=SoftBank',
      description: 'Fundo global com foco em inovação tecnológica',
      round: 'Série C',
      year: '2023'
    },
    {
      name: 'Valor Capital',
      logo: 'https://via.placeholder.com/150x50/5B8C7A/ffffff?text=Valor+Capital',
      description: 'Bridge entre Brasil e Silicon Valley',
      round: 'Seed',
      year: '2019'
    }
  ];

  // Dados das vagas
  const jobs = [
    {
      id: 1,
      title: 'Analista de Crédito',
      location: 'São Paulo (Híbrido)',
      type: 'Tempo Integral',
      level: 'Pleno',
      description: 'Avaliar propostas de crédito e analisar capacidade de pagamento.',
      icon: <BarChart3 size={24} />
    },
    {
      id: 2,
      title: 'Analista de Compliance',
      location: 'Remoto',
      type: 'Tempo Integral',
      level: 'Pleno',
      description: 'Garantir conformidade regulatória e processos de KYC/AML.',
      icon: <Shield size={24} />
    },
    {
      id: 3,
      title: 'Product Manager - Crédito',
      location: 'São Paulo (Presencial)',
      type: 'Tempo Integral',
      level: 'Sênior',
      description: 'Definir produtos de crédito e interface com áreas comerciais.',
      icon: <Target size={24} />
    },
    {
      id: 4,
      title: 'Cientista de Dados',
      location: 'Remoto',
      type: 'Tempo Integral',
      level: 'Sênior',
      description: 'Desenvolver modelos de score, prevenção à fraude e análise de risco.',
      icon: <Cpu size={24} />
    },
    {
      id: 5,
      title: 'Engenheiro Backend',
      location: 'São Paulo (Híbrido)',
      type: 'Tempo Integral',
      level: 'Pleno',
      description: 'Construir APIs seguras e integrações para serviços financeiros.',
      icon: <Network size={24} />
    },
    {
      id: 6,
      title: 'Customer Success - Finanças',
      location: 'Remoto',
      type: 'Tempo Integral',
      level: 'Júnior',
      description: 'Apoiar clientes na adoção de produtos de crédito e serviços.',
      icon: <Users size={24} />
    }
  ];

  // Estatísticas da empresa
  const stats = [
    { value: '120k', label: 'Empréstimos aprovados', icon: <CreditCard size={24} /> },
    { value: '95%', label: 'Taxa de aprovação', icon: <CheckCircle size={24} /> },
    { value: '850+', label: 'Clientes', icon: <Building2 size={24} /> },
    { value: '7', label: 'Anos de mercado', icon: <Calendar size={24} /> },
    { value: '98%', label: 'Satisfação', icon: <Star size={24} /> },
    { value: '0.8%', label: 'Inadimplência média', icon: <Shield size={24} /> }
  ];

  // Valores da empresa
  const values = [
    { icon: <Shield size={24} />, title: 'Integridade', description: 'Ética, transparência e conformidade regulatória' },
    { icon: <Cpu size={24} />, title: 'Inovação', description: 'Modelos e dados para decisões de crédito mais justas' },
    { icon: <Leaf size={24} />, title: 'Sustentabilidade', description: 'Crédito responsável com foco em impacto positivo' },
    { icon: <Users size={24} />, title: 'Diversidade', description: 'Cultura inclusiva que valoriza diferentes perspectivas' },
    { icon: <Heart size={24} />, title: 'Compromisso', description: 'Trabalhamos para o sucesso financeiro dos nossos clientes' },
    { icon: <Handshake size={24} />, title: 'Parceria', description: 'Soluções integradas e atendimento próximo ao cliente' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData, selectedFile);
    // Implementar lógica de envio
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

  return (
    <div className="about-page">
      {/* Hero Banner */}
      <section ref={heroRef} className="about-hero" id="hero">
        <div className="hero-background">
          <img src={heroBackground} alt="Hero Background" className="hero-image" />
          <div className="hero-overlay"></div>
          <div className="hero-gradient"></div>
          <Particles count={40} />
        </div>

        <motion.div 
          className="hero-content"
          style={{ opacity: heroOpacity, scale: heroScale, filter: `blur(${heroBlur}px)` }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-badge"
          >
            <Sparkles size={16} />
            <span>Quem Somos</span>
          </motion.div>

          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Crédito inteligente para um <span className="title-gradient">futuro</span> mais justo
          </motion.h1>

          <motion.p 
            className="hero-description"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            O Grupo Almeida Capital integra tecnologia, análise de risco e atendimento humano para
            entregar soluções de crédito responsáveis a pessoas e empresas.
          </motion.p>

          <motion.div 
            className="hero-actions"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <button 
              className="btn-primary"
              onClick={() => scrollToSection('sobre')}
            >
              <span>Conheça nossa história</span>
              <ArrowRight size={20} />
            </button>
            <button 
              className="btn-secondary"
              onClick={() => scrollToSection('vagas')}
            >
              <Briefcase size={18} />
              <span>Trabalhe conosco</span>
            </button>
          </motion.div>

          <motion.div 
            className="hero-scroll-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            onClick={() => scrollToSection('sobre')}
          >
            <span>Conheça mais</span>
            <ChevronDown size={16} />
          </motion.div>
        </motion.div>

          <motion.div 
            className="hero-logo"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <img src={logo} alt="Grupo Almeida Capital" className="logo-white" />
          </motion.div>
      </section>

      {/* Sobre Section */}
      <section className="about-section" id="sobre">
        <div className="container">
          <div className="about-grid">
            <motion.div 
              className="about-content-left"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-badge">
                <Heart size={16} />
                Nossa História
              </span>
              
              <h2 className="section-title">
                Mais que uma <span className="title-gradient">empresa</span>,
                <br />um propósito
              </h2>

              <div className="about-text">
                <p>
                  O Grupo Almeida Capital nasceu em 2018 com o propósito de ampliar o acesso
                  ao crédito de forma responsável. Nossos fundadores uniram experiência em
                  finanças e tecnologia para construir soluções que atendem pessoas e empresas.
                </p>
                <p>
                  Nossa missão é combinar ciência de dados, modelagem de risco e atendimento
                  humano para oferecer crédito justo, transparente e com impacto positivo.
                </p>
              </div>

              <div className="about-features">
                <div className="feature-item">
                  <div className="feature-icon">
                    <Target size={20} />
                  </div>
                  <div>
                    <h4>Missão</h4>
                    <p>Revolucionar a logística com IA acessível e eficiente</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <Eye size={20} />
                  </div>
                  <div>
                    <h4>Visão</h4>
                    <p>Ser líder global em soluções logísticas inteligentes até 2028</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="about-content-right"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="stats-grid-mini">
                {stats.slice(0, 3).map((stat, index) => (
                  <div key={index} className="stat-mini-card">
                    <div className="stat-mini-icon">{stat.icon}</div>
                    <div>
                      <div className="stat-mini-value">{stat.value}</div>
                      <div className="stat-mini-label">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="about-image-wrapper">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80" 
                  alt="Equipe Grupo Almeida Capital"
                  className="about-image"
                />
                <div className="about-image-caption">
                  <Quote size={16} />
                  <span>Nossa equipe em 2024</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Valores */}
          <motion.div 
            className="values-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="values-title">Nossos Valores</h3>
            <div className="values-grid">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  className="value-card"
                  whileHover={{ y: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="value-icon">{value.icon}</div>
                  <h4>{value.title}</h4>
                  <p>{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section" ref={statsRef}>
        <div className="container">
          <div className="stats-grid-full">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-full-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="stat-full-icon">{stat.icon}</div>
                <div className="stat-full-value">{stat.value}</div>
                <div className="stat-full-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipe Section */}
      <section className="team-section" id="equipe" ref={teamRef}>
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-badge">
              <Users size={16} />
              Nosso Time
            </span>
            <h2 className="section-title">
              Conheça os <span className="title-gradient">especialistas</span>
            </h2>
            <p className="section-description">
              Profissionais apaixonados por tecnologia e inovação
            </p>
          </motion.div>

          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <TeamMemberCard key={index} member={member} index={index} />
            ))}
          </div>

          <motion.div 
            className="team-cta"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link to="/carreiras" className="cta-link">
              <span>Faça parte do nosso time</span>
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Investidores Section */}
      <section className="investors-section" id="investidores" ref={investorsRef}>
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
              Investidores
            </span>
            <h2 className="section-title">
              Quem <span className="title-gradient">acredita</span> no nosso potencial
            </h2>
            <p className="section-description">
              Fundos de venture capital que apoiam nossa jornada
            </p>
          </motion.div>

          <div className="investors-grid">
            {investors.map((investor, index) => (
              <InvestorCard key={index} investor={investor} index={index} />
            ))}
          </div>

          <motion.div 
            className="investment-cta"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="investment-text">
              Interessado em investir no Grupo Almeida Capital?
            </p>
            <Link to="/contato" className="investment-link">
              <span>Fale com nosso time de RI</span>
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Trabalhe Conosco Section */}
      <section className="careers-section" id="vagas" ref={careersRef}>
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-badge">
              <Briefcase size={16} />
              Carreiras
            </span>
            <h2 className="section-title">
              Venha <span className="title-gradient">transformar</span> o mundo conosco
            </h2>
            <p className="section-description">
              Vagas abertas para pessoas talentosas e apaixonadas
            </p>
          </motion.div>

          {/* Benefits */}
          <motion.div 
            className="benefits-grid"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="benefit-card">
              <div className="benefit-icon">
                <Heart size={24} />
              </div>
              <h4>Saúde e Bem-estar</h4>
              <p>Plano de saúde, odontológico e gympass</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <Coffee size={24} />
              </div>
              <h4>Alimentação</h4>
              <p>Vale refeição e alimentação, snack liberado</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <BookOpen size={24} />
              </div>
              <h4>Desenvolvimento</h4>
              <p>Verba de educação e cursos gratuitos</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">
                <Smile size={24} />
              </div>
              <h4>Flexibilidade</h4>
              <p>Home office, horários flexíveis</p>
            </div>
          </motion.div>

          {/* Vagas */}
          <div className="jobs-grid">
            {jobs.map((job, index) => (
              <JobCard key={job.id} job={job} index={index} />
            ))}
          </div>

          {/* Formulário de Contato para Vagas */}
          <motion.div 
            className="careers-form-container"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="form-title">Não encontrou a vaga ideal?</h3>
            <p className="form-subtitle">
              Envie seu currículo e conte-nos um pouco sobre você. Ficaremos felizes em conhecer seu perfil.
            </p>

            <form onSubmit={handleSubmit} className="careers-form">
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
                    placeholder="E-mail *"
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Telefone *"
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    placeholder="Cargo de interesse"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <input
                  type="url"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleInputChange}
                  placeholder="LinkedIn (opcional)"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Conte um pouco sobre você, suas experiências e por que gostaria de trabalhar conosco *"
                  rows={5}
                  className="form-textarea"
                  required
                ></textarea>
              </div>

              <div className="form-group file-input-group">
                <label htmlFor="resume" className="file-label">
                  <Download size={16} />
                  <span>{selectedFile ? selectedFile.name : 'Anexar currículo (PDF, DOC)'}</span>
                </label>
                <input
                  type="file"
                  id="resume"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="file-input"
                />
              </div>

              <button type="submit" className="form-submit">
                <Send size={16} />
                <span>Enviar candidatura</span>
              </button>

              <p className="form-disclaimer">
                Ao enviar, você concorda com nossa Política de Privacidade.
              </p>
            </form>
          </motion.div>
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
            <h2 className="cta-title">
              Pronto para <span className="title-gradient">transformar</span> sua logística?
            </h2>
            <p className="cta-description">
              Junte-se a mais de 850 empresas que já estão revolucionando suas operações.
            </p>
            <div className="cta-buttons">
              <Link to="/contato" className="cta-button-primary">
                <span>Falar com especialista</span>
                <Headphones size={18} />
              </Link>
              <Link to="/planos" className="cta-button-secondary">
                <span>Conhecer planos</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;