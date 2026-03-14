// Plans.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2,
  XCircle,
  Zap,
  Rocket,
  Award,
  Star,
  Sparkles,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  CreditCard,
  Shield,
  Users,
  Briefcase,
  TrendingUp,
  Globe,
  Cpu,
  Network,
  Package,
  Coins,
  Gift,
  Plus,
  Infinity,
  Clock,
  Headphones,
  FileText,
  BarChart3,
  Layers,
  Target,
  Heart,
  Leaf,
  Truck,
  MapPin,
  Calendar,
  Download,
  Upload,
  RefreshCw,
  Lock,
  Unlock,
  Bell,
  MessageSquare,
  Settings,
  Wifi,
  WifiOff,
  Cloud,
  Database,
  Server,
  HardDrive,
  Smartphone,
  Laptop,
  Tablet,
  Monitor,
  Check,
  X,
  AlertCircle,
  Info,
  ThumbsUp,
  ThumbsDown,
  HelpCircle as HelpIcon,
  BookOpen,
  Video,
  FileQuestion
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './Planos.css';
import logo from '../../assets/images/Logo/logo.svg';
import heroBackground from '../../assets/images/Logo/logobannerhero.jpg';

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
    <div className="plans-particles">
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
            repeat: 0,
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

// Componente de Card de Plano
const PlanCard = React.memo(({ plan, index, isSelected, onSelect, billingCycle }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`plan-card ${plan.popular ? 'popular' : ''} ${isSelected ? 'selected' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => onSelect(plan.id)}
    >
      {plan.popular && (
        <div className="popular-badge">
          <Sparkles size={14} />
          <span>Mais Popular</span>
        </div>
      )}
      
      <div className="plan-header">
        <div className="plan-icon-wrapper">
          {plan.icon}
        </div>
        <h3 className="plan-name">{plan.name}</h3>
        <p className="plan-description">{plan.description}</p>
      </div>

      <div className="plan-price">
        <div className="price-wrapper">
          <span className="rate-label">Taxa</span>
          <span className="price-value">{plan.apr}%</span>
          <span className="price-period">APR (mensal)</span>
        </div>
        <div className="amount-range">
          <span>R$ {plan.minAmount.toLocaleString()} - R$ {plan.maxAmount.toLocaleString()}</span>
        </div>
      </div>

      <ul className="plan-features">
        {plan.features.map((feature, idx) => (
          <li key={idx} className="feature-item">
            {feature.included ? (
              <CheckCircle2 size={18} className="feature-icon included" />
            ) : (
              <XCircle size={18} className="feature-icon excluded" />
            )}
            <span className={feature.included ? '' : 'excluded'}>{feature.name}</span>
            {feature.tooltip && (
              <div className="feature-tooltip">
                <Info size={14} />
                <span className="tooltip-text">{feature.tooltip}</span>
              </div>
            )}
          </li>
        ))}
      </ul>

      <div className="plan-actions">
        <Link to={`/simular?product=${plan.id}`} className="plan-button">
          <span>{plan.cta}</span>
          <ArrowRight size={16} />
        </Link>
        <button className="plan-details-button" onClick={(e) => {
          e.stopPropagation();
          // Abrir modal de detalhes
        }}>
          Ver detalhes
        </button>
      </div>
    </motion.div>
  );
});

// Componente de Card de Token
const TokenCard = React.memo(({ token, index, isSelected, onSelect }) => {
  return (
    <motion.div
      className={`token-card ${token.popular ? 'popular' : ''} ${isSelected ? 'selected' : ''}`}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      onClick={() => onSelect(token.id)}
    >
      {token.popular && (
        <div className="token-badge">
          <Gift size={14} />
          <span>Mais vantajoso</span>
        </div>
      )}
      
      <div className="token-icon-wrapper">
        {token.icon}
      </div>

      <div className="token-content">
        <h3 className="token-name">{token.name}</h3>
        
        <div className="token-amount">
          <span className="token-value">{token.tokens.toLocaleString()}</span>
          <span className="token-label">tokens</span>
        </div>

        {token.bonus > 0 && (
          <div className="token-bonus">
            <Plus size={14} />
            <span>{token.bonus}% BÔNUS</span>
          </div>
        )}

        <div className="token-price">
          <span className="token-price-value">R$ {token.price}</span>
        </div>

        <div className="token-actions">
          <button className="token-buy-button">
            Comprar agora
            <ArrowRight size={14} />
          </button>
          <button className="token-info-button">
            <Info size={14} />
          </button>
        </div>

        {token.features && (
          <ul className="token-features">
            {token.features.map((feature, idx) => (
              <li key={idx}>
                <Check size={12} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
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
          <span className="faq-category-badge">{faq.category}</span>
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

// Componente de Comparação de Planos
const PlanComparison = React.memo(({ plans, billingCycle }) => {
  const [showComparison, setShowComparison] = useState(false);

  return (
    <div className="plan-comparison">
      <button 
        className="comparison-toggle"
        onClick={() => setShowComparison(!showComparison)}
      >
        <BarChart3 size={18} />
        <span>Comparar todos os planos</span>
        <ChevronDown size={16} className={`arrow ${showComparison ? 'open' : ''}`} />
      </button>

      <AnimatePresence>
        {showComparison && (
          <motion.div 
            className="comparison-table"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <table>
              <thead>
                <tr>
                  <th>Recursos</th>
                  {plans.map(plan => (
                    <th key={plan.id}>
                      <div className="comparison-plan-header">
                        <span className="plan-icon-small">{plan.icon}</span>
                        <span>{plan.name}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Taxa (APR)</td>
                  {plans.map(plan => (
                    <td key={plan.id}>{plan.apr}%</td>
                  ))}
                </tr>
                <tr>
                  <td>Faixa de valores</td>
                  {plans.map(plan => (
                    <td key={plan.id}>R$ {plan.minAmount.toLocaleString()} - R$ {plan.maxAmount.toLocaleString()}</td>
                  ))}
                </tr>
                <tr>
                  <td>Prazos disponíveis</td>
                  {plans.map(plan => (
                    <td key={plan.id}>{plan.termOptions.join(', ')} meses</td>
                  ))}
                </tr>
                <tr>
                  <td>Principais recursos</td>
                  {plans.map(plan => (
                    <td key={plan.id}>{plan.features.map(f => f.name).join(', ')}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

const Plans = () => {
  const { scrollY } = useScroll();
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [selectedPlan, setSelectedPlan] = useState('personal');
  const [selectedToken, setSelectedToken] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [faqCategory, setFaqCategory] = useState('geral');
  const [showAnnualSavings, setShowAnnualSavings] = useState(true);
  
  const heroRef = useRef(null);
  const plansRef = useRef(null);
  const tokensRef = useRef(null);
  const faqRef = useRef(null);

  // Animações baseadas no scroll
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.95]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.98]);
  const heroBlur = useTransform(scrollY, [0, 300], [0, 4]);

  // Dados dos produtos de empréstimo
  const plans = [
    {
      id: 'personal',
      name: 'Empréstimo Pessoal',
      description: 'Crédito rápido para necessidades pessoais',
      icon: <CreditCard size={24} />,
      apr: 1.9, // taxa mensal aproximada (%)
      minAmount: 1000,
      maxAmount: 50000,
      termOptions: [6, 12, 24, 36],
      popular: true,
      cta: 'Simular',
      features: [
        { name: 'Aprovação rápida', included: true },
        { name: 'Parcelas flexíveis', included: true },
        { name: 'Contratação 100% digital', included: true }
      ]
    },
    {
      id: 'payroll',
      name: 'Consignado / Folha',
      description: 'Condições especiais para consignados',
      icon: <Users size={24} />,
      apr: 1.2,
      minAmount: 500,
      maxAmount: 100000,
      termOptions: [12, 24, 36, 48, 60],
      popular: false,
      cta: 'Solicitar proposta',
      features: [
        { name: 'Taxas reduzidas', included: true },
        { name: 'Prazo estendido', included: true },
        { name: 'Descontos na folha', included: true }
      ]
    },
    {
      id: 'business',
      name: 'Crédito Empresarial',
      description: 'Capital de giro e investimentos para empresas',
      icon: <Briefcase size={24} />,
      apr: 2.5,
      minAmount: 5000,
      maxAmount: 1000000,
      termOptions: [6, 12, 24, 36, 60],
      popular: false,
      cta: 'Falar com especialista',
      features: [
        { name: 'Linhas para capital de giro', included: true },
        { name: 'Análise de crédito personalizada', included: true },
        { name: 'Soluções para MEI e PME', included: true }
      ]
    }
  ];

  // Dados dos tokens
  const tokenPlans = [
    {
      id: 'token-500',
      name: 'Pacote Básico',
      tokens: 500,
      price: 49,
      bonus: 0,
      popular: false,
      icon: <Zap size={24} />,
      features: [
        'Válido por 12 meses',
        'Uso em qualquer serviço',
        'Suporte básico'
      ]
    },
    {
      id: 'token-2000',
      name: 'Pacote Profissional',
      tokens: 2000,
      price: 149,
      bonus: 15,
      popular: true,
      icon: <Rocket size={24} />,
      features: [
        'Válido por 12 meses',
        'Uso em qualquer serviço',
        'Suporte prioritário',
        '15% de bônus incluso'
      ]
    },
    {
      id: 'token-5000',
      name: 'Pacote Avançado',
      tokens: 5000,
      price: 349,
      bonus: 20,
      popular: false,
      icon: <TrendingUp size={24} />,
      features: [
        'Válido por 12 meses',
        'Uso em qualquer serviço',
        'Suporte prioritário',
        '20% de bônus incluso',
        'Relatórios exclusivos'
      ]
    },
    {
      id: 'token-10000',
      name: 'Pacote Enterprise',
      tokens: 10000,
      price: 599,
      bonus: 30,
      popular: false,
      icon: <Award size={24} />,
      features: [
        'Válido por 12 meses',
        'Uso em qualquer serviço',
        'Suporte VIP',
        '30% de bônus incluso',
        'Relatórios exclusivos',
        'Gerente dedicado'
      ]
    }
  ];

  // FAQ
  const faqs = {
    geral: [
      {
        category: 'Geral',
        question: 'Posso mudar de plano depois?',
        answer: 'Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento. O valor é ajustado proporcionalmente aos dias restantes do ciclo de faturamento atual. Upgrades são imediatos, enquanto downgrades entram em vigor no próximo ciclo.',
        link: '/ajuda/mudar-plano'
      },
      {
        category: 'Geral',
        question: 'Como funciona o período de teste?',
        answer: 'Oferecemos 14 dias de teste gratuito para todos os planos, sem necessidade de cartão de crédito. Durante o período, você terá acesso a todas as funcionalidades do plano escolhido. Ao final, você pode optar por assinar ou cancelar sem custo.',
        link: '/ajuda/teste-gratis'
      },
      {
        category: 'Geral',
        question: 'Quais são as formas de pagamento?',
        answer: 'Aceitamos cartões de crédito (Visa, Mastercard, Elo, American Express), boleto bancário, PIX e transferência bancária. Para planos anuais, oferecemos parcelamento em até 12x no cartão.',
        link: '/ajuda/pagamentos'
      },
      {
        category: 'Geral',
        question: 'Existe contrato de fidelidade?',
        answer: 'Não, todos os nossos planos são mensais e podem ser cancelados a qualquer momento. Para planos anuais, o compromisso é de 12 meses, mas você pode cancelar e receber o proporcional aos meses não utilizados.',
      }
    ],
    planos: [
      {
        category: 'Planos',
        question: 'Qual a diferença entre os produtos?',
        answer: 'Os produtos diferem em taxa (APR), faixa de valores, prazos disponíveis e requisitos de análise. Escolha entre empréstimo pessoal, consignado e crédito empresarial conforme sua necessidade.',
        link: '/comparar-planos'
      },
      {
        category: 'Planos',
        question: 'O crédito empresarial é customizável?',
        answer: 'Sim, o crédito empresarial pode ser estruturado conforme o porte da empresa, com prazos e garantias negociáveis. Entre em contato com nosso time comercial para uma proposta personalizada.',
        link: '/contato/vendas'
      },
      {
        category: 'Planos',
        question: 'Como funciona a contratação e pagamentos?',
        answer: 'A contratação pode ser online ou via atendimento. As formas de pagamento incluem débito, cartão e cobranças conforme o contrato. Para crédito empresarial, condições são definidas na proposta.',
      }
    ],
    tokens: [
      {
        category: 'Tokens',
        question: 'O que são tokens?',
        answer: 'Tokens são créditos que você pode comprar para usar serviços específicos da plataforma sem precisar de uma assinatura mensal. Cada serviço consome uma quantidade de tokens, que você pode gerenciar no dashboard.',
        link: '/ajuda/tokens'
      },
      {
        category: 'Tokens',
        question: 'Os tokens expiram?',
        answer: 'Sim, os tokens têm validade de 12 meses a partir da data da compra. Você pode acompanhar o saldo e a data de validade no dashboard. Oferecemos alertas por e-mail quando o saldo está baixo ou próximo do vencimento.',
      },
      {
        category: 'Tokens',
        question: 'Posso transferir tokens para outra conta?',
        answer: 'Não, os tokens são vinculados à conta que realizou a compra e não podem ser transferidos. No entanto, você pode usar os tokens em nome de seus clientes através da nossa API.',
      },
      {
        category: 'Tokens',
        question: 'Como funciona o bônus?',
        answer: 'Oferecemos bônus progressivos em pacotes maiores. Por exemplo, no pacote de 2.000 tokens você ganha 15% de bônus, recebendo 2.300 tokens pelo preço de 2.000. O bônus é creditado automaticamente na compra.',
      }
    ],
    technical: [
      {
        category: 'Técnico',
        question: 'A plataforma tem API?',
        answer: 'Sim, todos os planos incluem acesso à nossa API RESTful completa. A documentação está disponível no portal do desenvolvedor, com exemplos em várias linguagens. O plano Básico tem limite diário de chamadas, enquanto os demais têm acesso ilimitado.',
        link: '/api-docs'
      },
      {
        category: 'Técnico',
        question: 'Como funciona a segurança?',
        answer: 'Utilizamos criptografia de ponta a ponta, certificação SSL, autenticação em dois fatores e conformidade com LGPD. Todos os dados são armazenados em servidores no Brasil com backups diários e replicação em tempo real.',
        link: '/seguranca'
      }
    ]
  };

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
  };

  const handleTokenSelect = (tokenId) => {
    setSelectedToken(tokenId);
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
    <div className="plans-page">
      {/* Hero Banner */}
      <section ref={heroRef} className="plans-hero" id="hero">
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
            <Award size={16} />
            <span>Empréstimos e Taxas</span>
          </motion.div>

          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Encontre o empréstimo <span className="title-gradient">ideal</span>
            <br />para suas necessidades
          </motion.h1>

          <motion.p 
            className="hero-description"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Soluções de crédito flexíveis para pessoas e empresas. Compare taxas e prazos.
          </motion.p>

          <motion.div 
            className="hero-actions"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <button 
              className="btn-primary"
              onClick={() => scrollToSection('planos')}
            >
              <span>Ver empréstimos</span>
              <ArrowRight size={20} />
            </button>
            <button 
              className="btn-secondary"
              onClick={() => scrollToSection('tokens')}
            >
              <Coins size={18} />
              <span>Simular empréstimo</span>
            </button>
          </motion.div>

          <motion.div 
            className="hero-scroll-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            onClick={() => scrollToSection('planos')}
          >
            <span>Conheça nossas opções</span>
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

      {/* Plans Section */}
      <section className="plans-section" id="planos" ref={plansRef}>
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-badge">
              <Rocket size={16} />
              Empréstimos Disponíveis
            </span>
            <h2 className="section-title">
              Crédito para <span className="title-gradient">pessoas e empresas</span>
            </h2>
            <p className="section-description">
              Compare prazos, taxas e condições para escolher a melhor opção
            </p>
          </motion.div>

          {/* Billing Toggle */}
          <div className="billing-toggle">
            <div className="toggle-wrapper">
              <button
                className={`toggle-option ${billingCycle === 'monthly' ? 'active' : ''}`}
                onClick={() => setBillingCycle('monthly')}
              >
                Curto Prazo
              </button>
              <button
                className={`toggle-option ${billingCycle === 'yearly' ? 'active' : ''}`}
                onClick={() => setBillingCycle('yearly')}
              >
                Longo Prazo
                <span className="savings-badge">Taxas reduzidas para prazos maiores</span>
              </button>
            </div>
          </div>

          {/* Plans Grid */}
          <div className="plans-grid">
            {plans.map((plan, index) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                index={index}
                isSelected={selectedPlan === plan.id}
                onSelect={handlePlanSelect}
                billingCycle={billingCycle}
              />
            ))}
          </div>

          {/* Plan Comparison */}
          <PlanComparison plans={plans} billingCycle={billingCycle} />

          {/* Garantias */}
          <motion.div 
            className="guarantees"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="guarantee-item">
              <div className="guarantee-icon">
                <RefreshCw size={20} />
              </div>
              <div className="guarantee-content">
                <h4>Cancele quando quiser</h4>
                <p>Sem multas ou taxas de cancelamento</p>
              </div>
            </div>
            <div className="guarantee-item">
              <div className="guarantee-icon">
                <Lock size={20} />
              </div>
              <div className="guarantee-content">
                <h4>Pagamento seguro</h4>
                <p>Dados criptografados e certificados</p>
              </div>
            </div>
            <div className="guarantee-item">
              <div className="guarantee-icon">
                <Headphones size={20} />
              </div>
              <div className="guarantee-content">
                <h4>Suporte especializado</h4>
                <p>Equipe pronta para ajudar</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tokens Section */}
      <section className="tokens-section" id="tokens" ref={tokensRef}>
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-badge">
              <Coins size={16} />
              Simulador
            </span>
            <h2 className="section-title">
              Calcule sua <span className="title-gradient">parcela</span> em segundos
            </h2>
            <p className="section-description">
              Use o simulador para estimar parcelas e comparar prazos e taxas
            </p>
          </motion.div>

          {/* Token Info Bar */}
          <motion.div 
            className="token-info-bar"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="info-item">
              <CheckCircle2 size={18} className="info-icon" />
              <span>Estime parcelas e CET</span>
            </div>
            <div className="info-item">
              <CheckCircle2 size={18} className="info-icon" />
              <span>Compare prazos e taxas</span>
            </div>
            <div className="info-item">
              <CheckCircle2 size={18} className="info-icon" />
              <span>Simulação sem compromisso</span>
            </div>
            <div className="info-item">
              <CheckCircle2 size={18} className="info-icon" />
              <span>Suporte para contratação</span>
            </div>
          </motion.div>

          {/* Tokens Grid */}
          <div className="tokens-grid">
            {tokenPlans.map((token, index) => (
              <TokenCard
                key={token.id}
                token={token}
                index={index}
                isSelected={selectedToken === token.id}
                onSelect={handleTokenSelect}
              />
            ))}
          </div>

          {/* Token Usage Examples */}
          <motion.div 
            className="token-usage"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="usage-title">Exemplos de uso de tokens</h3>
            <div className="usage-grid">
              <div className="usage-item">
                <div className="usage-icon">
                  <MapPin size={20} />
                </div>
                <div className="usage-details">
                  <span className="usage-name">Otimização de rota</span>
                  <span className="usage-cost">10 tokens</span>
                </div>
              </div>
              <div className="usage-item">
                <div className="usage-icon">
                  <BarChart3 size={20} />
                </div>
                <div className="usage-details">
                  <span className="usage-name">Relatório avançado</span>
                  <span className="usage-cost">25 tokens</span>
                </div>
              </div>
              <div className="usage-item">
                <div className="usage-icon">
                  <Cpu size={20} />
                </div>
                <div className="usage-details">
                  <span className="usage-name">Análise preditiva</span>
                  <span className="usage-cost">50 tokens</span>
                </div>
              </div>
              <div className="usage-item">
                <div className="usage-icon">
                  <Download size={20} />
                </div>
                <div className="usage-details">
                  <span className="usage-name">Exportação de dados</span>
                  <span className="usage-cost">5 tokens</span>
                </div>
              </div>
            </div>
            <Link to="/precos-tokens" className="usage-link">
              Ver tabela completa de preços
              <ArrowRight size={14} />
            </Link>
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
              FAQ
            </span>
            <h2 className="section-title">
              Perguntas <span className="title-gradient">frequentes</span>
            </h2>
            <p className="section-description">
              Tire suas dúvidas sobre planos, tokens e assinaturas
            </p>
          </motion.div>

          {/* FAQ Categories */}
          <div className="faq-categories">
            {Object.keys(faqs).map((category) => (
              <button
                key={category}
                className={`category-button ${faqCategory === category ? 'active' : ''}`}
                onClick={() => setFaqCategory(category)}
              >
                {category === 'geral' && 'Geral'}
                {category === 'planos' && 'Planos'}
                {category === 'tokens' && 'Tokens'}
                {category === 'technical' && 'Técnico'}
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="faq-list">
            {faqs[faqCategory]?.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                index={index}
                isOpen={openFaqIndex === index}
                onToggle={setOpenFaqIndex}
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
              <Headphones size={24} />
            </div>
            <div className="faq-contact-content">
              <h3>Ainda tem dúvidas?</h3>
              <p>Nossa equipe está pronta para ajudar você a escolher o melhor plano.</p>
            </div>
            <Link to="/contato" className="faq-contact-button">
              <span>Falar com especialista</span>
              <ArrowRight size={16} />
            </Link>
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
            <div className="cta-content">
              <h2 className="cta-title">
                Pronto para <span className="title-gradient">começar</span>?
              </h2>
              <p className="cta-description">
                Experimente grátis por 14 dias, sem compromisso. Comece agora mesmo!
              </p>
              <div className="cta-buttons">
                <Link to="/registro" className="cta-button-primary">
                  <span>Criar conta gratuita</span>
                  <ArrowRight size={18} />
                </Link>
                <Link to="/contato" className="cta-button-secondary">
                  <span>Falar com vendas</span>
                  <Headphones size={18} />
                </Link>
              </div>
              <p className="cta-disclaimer">
                Sem cartão de crédito necessário • Cancele quando quiser
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Plans;