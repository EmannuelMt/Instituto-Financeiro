import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail,
  Lock,
  User,
  Briefcase,
  Building2,
  Phone,
  MapPin,
  Globe,
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Loader,
  Sparkles,
  Shield,
  TrendingUp,
  Users,
  Rocket,
  Target,
  Zap,
  Clock,
  Calendar,
  Award,
  Star,
  Heart,
  Leaf,
  Cpu,
  Network,
  BarChart3,
  Package,
  Truck,
  Map,
  Navigation,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  LogIn,
  UserPlus,
  Landmark,
  DollarSign,
  BadgePercent,
  Calculator,
  PiggyBank,
  Wallet,
  CreditCard,
  ShieldCheck,
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
  Copy,
  Check,
  X
} from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '../../assets/images/Logo/logo.svg';
import heroBackground from '../../assets/images/Logo/hero-finance.jpg';
import { LineChart } from 'lucide-react';
import { Handshake } from 'lucide-react';
import { Sprout } from 'lucide-react';
import { Tractor } from 'lucide-react';

// Componente de Slide de Benefícios Financeiros
const BenefitSlide = React.memo(({ type }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const benefits = {
    personal: [
      {
        icon: <Wallet size={32} />,
        title: 'Crédito Pessoal',
        description: 'Taxas a partir de 1,99% ao mês. Simulação online e aprovação em até 24h.',
        color: '#2563EB'
      },
      {
        icon: <BadgePercent size={32} />,
        title: 'Crédito Consignado',
        description: 'Condições especiais para aposentados, pensionistas e servidores públicos.',
        color: '#F59E0B'
      },
      {
        icon: <PiggyBank size={32} />,
        title: 'Investimentos',
        description: 'CDB, LCI, LCA e fundos com as melhores rentabilidades do mercado.',
        color: '#1E3A8A'
      },
      {
        icon: <CreditCard size={32} />,
        title: 'Cartão de Crédito',
        description: 'Sem anuidade, com cashback e programa de pontos exclusivo.',
        color: '#2563EB'
      },
      {
        icon: <ShieldCheck size={32} />,
        title: 'Seguros',
        description: 'Proteja seu futuro com nossos planos de seguro de vida e residencial.',
        color: '#F59E0B'
      }
    ],
    business: [
      {
        icon: <Briefcase size={32} />,
        title: 'Crédito Empresarial',
        description: 'Capital de giro e investimento para alavancar seu negócio. Até R$ 5 milhões.',
        color: '#2563EB'
      },
      {
        icon: <Building2 size={32} />,
        title: 'Conta PJ',
        description: 'Gestão financeira completa com transferências gratuitas e cartões corporativos.',
        color: '#F59E0B'
      },
      {
        icon: <TrendingUpIcon size={32} />,
        title: 'Antecipação de Recebíveis',
        description: 'Antecipe suas vendas de cartão e melhore seu fluxo de caixa.',
        color: '#1E3A8A'
      },
      {
        icon: <LineChart size={32} />,
        title: 'Análise de Crédito',
        description: 'Análise personalizada com base no faturamento e histórico da sua empresa.',
        color: '#2563EB'
      },
      {
        icon: <Handshake size={32} />,
        title: 'Parcerias Estratégicas',
        description: 'Acesso a uma rede de parceiros e condições exclusivas para seu negócio.',
        color: '#F59E0B'
      }
    ],
    agro: [
      {
        icon: <Sprout size={32} />,
        title: 'Crédito Rural',
        description: 'Linhas especiais para custeio, investimento e comercialização agrícola.',
        color: '#2563EB'
      },
      {
        icon: <Tractor size={32} />,
        title: 'Financiamento de Máquinas',
        description: 'Adquira tratores, colheitadeiras e implementos com condições diferenciadas.',
        color: '#F59E0B'
      },
      {
        icon: <Combine size={32} />,
        title: 'PRONAF',
        description: 'Linhas de crédito para agricultura familiar com subsídios do governo.',
        color: '#1E3A8A'
      },
      {
        icon: <Leaf size={32} />,
        title: 'Crédito Verde',
        description: 'Incentivo a práticas sustentáveis com taxas reduzidas.',
        color: '#2563EB'
      },
      {
        icon: <Droplets size={32} />,
        title: 'Custeio Agrícola',
        description: 'Financiamento para despesas do plantio à colheita.',
        color: '#F59E0B'
      }
    ]
  };

  const currentBenefits = type === 'personal' ? benefits.personal : 
                         type === 'business' ? benefits.business : 
                         benefits.agro;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % currentBenefits.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentBenefits.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % currentBenefits.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + currentBenefits.length) % currentBenefits.length);
  };

  return (
    <div className="benefits-slider">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="benefit-card"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
        >
          <div className="benefit-icon" style={{ backgroundColor: currentBenefits[currentSlide].color }}>
            {currentBenefits[currentSlide].icon}
          </div>
          <h3 className="benefit-title">{currentBenefits[currentSlide].title}</h3>
          <p className="benefit-description">{currentBenefits[currentSlide].description}</p>
        </motion.div>
      </AnimatePresence>

      <div className="slider-controls">
        <button onClick={prevSlide} className="slider-button">
          <ChevronLeft size={20} />
        </button>
        <div className="slider-dots">
          {currentBenefits.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
        <button onClick={nextSlide} className="slider-button">
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="slider-footer">
        <p className="benefit-counter">
          {currentSlide + 1} / {currentBenefits.length}
        </p>
        <div className="benefit-badge">
          {type === 'personal' && 'Pessoa Física'}
          {type === 'business' && 'Pessoa Jurídica'}
          {type === 'agro' && 'Agronegócio'}
        </div>
      </div>
    </div>
  );
});

// Componente de Força de Senha
const PasswordStrength = React.memo(({ password }) => {
  const getStrength = () => {
    let score = 0;
    if (!password) return 0;
    if (password.length >= 8) score++;
    if (password.match(/[a-z]/)) score++;
    if (password.match(/[A-Z]/)) score++;
    if (password.match(/[0-9]/)) score++;
    if (password.match(/[^a-zA-Z0-9]/)) score++;
    return score;
  };

  const strength = getStrength();
  const strengthText = ['Muito fraca', 'Fraca', 'Média', 'Forte', 'Muito forte'];
  const strengthColor = ['#EF4444', '#F59E0B', '#F59E0B', '#10B981', '#10B981'];

  if (!password) return null;

  return (
    <div className="password-strength">
      <div className="strength-bars">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="strength-bar"
            style={{
              backgroundColor: i < strength ? strengthColor[strength - 1] : 'var(--glass-border)',
              opacity: i < strength ? 1 : 0.3
            }}
          />
        ))}
      </div>
      <span className="strength-text" style={{ color: strengthColor[strength - 1] }}>
        {strengthText[strength - 1]}
      </span>
    </div>
  );
});

const Login = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login'); // 'login' ou 'register'
  const [userType, setUserType] = useState('personal'); // 'personal', 'business', 'agro'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    companyName: '',
    cnpj: '',
    cpf: '',
    phone: '',
    birthDate: '',
    terms: false,
    newsletter: false
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Validação em tempo real
  useEffect(() => {
    if (mode === 'register') {
      validateForm();
    }
  }, [formData, mode, userType]);

  const validateForm = () => {
    const newErrors = {};

    // Email
    if (!formData.email) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }

    // Senha
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mínimo de 6 caracteres';
    }

    // Confirmar senha (apenas no registro)
    if (mode === 'register') {
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'As senhas não coincidem';
      }

      // Campos específicos por tipo
      if (userType === 'personal') {
        if (!formData.name) newErrors.name = 'Nome completo é obrigatório';
        if (!formData.cpf) newErrors.cpf = 'CPF é obrigatório';
        if (!formData.birthDate) newErrors.birthDate = 'Data de nascimento é obrigatória';
      } else if (userType === 'business') {
        if (!formData.companyName) newErrors.companyName = 'Nome da empresa é obrigatório';
        if (!formData.cnpj) newErrors.cnpj = 'CNPJ é obrigatório';
      } else if (userType === 'agro') {
        if (!formData.name) newErrors.name = 'Nome completo é obrigatório';
        if (!formData.cpf) newErrors.cpf = 'CPF é obrigatório';
        if (!formData.companyName) newErrors.companyName = 'Nome da propriedade é obrigatório';
      }

      if (!formData.phone) newErrors.phone = 'Telefone é obrigatório';
      if (!formData.terms) newErrors.terms = 'Você precisa aceitar os termos';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simular chamada API
    setTimeout(() => {
      setIsLoading(false);
      navigate('/user');
    }, 1500);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/user');
    }, 1500);
  };

  const toggleMode = () => {
    setMode(prev => prev === 'login' ? 'register' : 'login');
    setErrors({});
    setTouched({});
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      companyName: '',
      cnpj: '',
      cpf: '',
      phone: '',
      birthDate: '',
      terms: false,
      newsletter: false
    });
  };

  // Máscaras
  const formatCPF = (value) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4').slice(0, 14);
  };

  const formatCNPJ = (value) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5').slice(0, 18);
  };

  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3').slice(0, 15);
  };

  const formatBirthDate = (value) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3').slice(0, 10);
  };

  return (
    <div className="login-page">
      {/* Left Column - Form */}
      <div className="login-form-column">
        <div className="form-container">
          {/* Logo */}
          <Link to="/" className="form-logo">
            <div className="logo-wrapper">
              <img src={logo} alt="Instituto Financeiro" className="form-logo-img" />
              <div className="logo-glow"></div>
            </div>
            <div className="logo-text-wrapper">
              <span className="logo-text-primary">Instituto</span>
              <span className="logo-text-secondary">Financeiro</span>
            </div>
          </Link>

          {/* Header */}
          <div className="form-header">
            <h1 className="form-title">
              {mode === 'login' ? 'Bem-vindo de volta!' : 'Abra sua conta'}
            </h1>
            <p className="form-subtitle">
              {mode === 'login' 
                ? 'Acesse sua conta para gerenciar seus produtos financeiros'
                : 'Preencha seus dados para começar a usar nossos serviços'}
            </p>
          </div>

          {/* User Type Toggle (apenas no registro) */}
          {mode === 'register' && (
            <div className="user-type-toggle">
              <button
                className={`type-button ${userType === 'personal' ? 'active' : ''}`}
                onClick={() => setUserType('personal')}
              >
                <User size={18} />
                <span>Pessoa Física</span>
              </button>
              <button
                className={`type-button ${userType === 'business' ? 'active' : ''}`}
                onClick={() => setUserType('business')}
              >
                <Building2 size={18} />
                <span>Pessoa Jurídica</span>
              </button>
              <button
                className={`type-button ${userType === 'agro' ? 'active' : ''}`}
                onClick={() => setUserType('agro')}
              >
                <Sprout size={18} />
                <span>Agronegócio</span>
              </button>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="form">
            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <div className={`input-wrapper ${touched.email && errors.email ? 'error' : ''}`}>
                <Mail size={18} className="input-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur('email')}
                  placeholder="seu@email.com"
                  className="form-input"
                />
              </div>
              {touched.email && errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            {/* Senha */}
            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <div className={`input-wrapper ${touched.password && errors.password ? 'error' : ''}`}>
                <Lock size={18} className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur('password')}
                  placeholder="••••••••"
                  className="form-input"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {touched.password && errors.password && (
                <span className="error-message">{errors.password}</span>
              )}
              {mode === 'register' && (
                <PasswordStrength password={formData.password} />
              )}
            </div>

            {/* Confirmar Senha (apenas registro) */}
            {mode === 'register' && (
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirmar senha</label>
                <div className={`input-wrapper ${touched.confirmPassword && errors.confirmPassword ? 'error' : ''}`}>
                  <Lock size={18} className="input-icon" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur('confirmPassword')}
                    placeholder="••••••••"
                    className="form-input"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {touched.confirmPassword && errors.confirmPassword && (
                  <span className="error-message">{errors.confirmPassword}</span>
                )}
              </div>
            )}

            {/* Campos específicos por tipo (apenas registro) */}
            {mode === 'register' && (
              <>
                {userType === 'personal' ? (
                  <>
                    {/* Nome Completo */}
                    <div className="form-group">
                      <label htmlFor="name">Nome completo</label>
                      <div className={`input-wrapper ${touched.name && errors.name ? 'error' : ''}`}>
                        <User size={18} className="input-icon" />
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          onBlur={() => handleBlur('name')}
                          placeholder="Seu nome completo"
                          className="form-input"
                        />
                      </div>
                      {touched.name && errors.name && (
                        <span className="error-message">{errors.name}</span>
                      )}
                    </div>

                    {/* CPF */}
                    <div className="form-group">
                      <label htmlFor="cpf">CPF</label>
                      <div className={`input-wrapper ${touched.cpf && errors.cpf ? 'error' : ''}`}>
                        <CreditCard size={18} className="input-icon" />
                        <input
                          type="text"
                          id="cpf"
                          name="cpf"
                          value={formData.cpf}
                          onChange={(e) => handleInputChange({
                            target: { name: 'cpf', value: formatCPF(e.target.value) }
                          })}
                          onBlur={() => handleBlur('cpf')}
                          placeholder="000.000.000-00"
                          className="form-input"
                        />
                      </div>
                      {touched.cpf && errors.cpf && (
                        <span className="error-message">{errors.cpf}</span>
                      )}
                    </div>

                    {/* Data de Nascimento */}
                    <div className="form-group">
                      <label htmlFor="birthDate">Data de nascimento</label>
                      <div className={`input-wrapper ${touched.birthDate && errors.birthDate ? 'error' : ''}`}>
                        <Calendar size={18} className="input-icon" />
                        <input
                          type="text"
                          id="birthDate"
                          name="birthDate"
                          value={formData.birthDate}
                          onChange={(e) => handleInputChange({
                            target: { name: 'birthDate', value: formatBirthDate(e.target.value) }
                          })}
                          onBlur={() => handleBlur('birthDate')}
                          placeholder="DD/MM/AAAA"
                          className="form-input"
                        />
                      </div>
                      {touched.birthDate && errors.birthDate && (
                        <span className="error-message">{errors.birthDate}</span>
                      )}
                    </div>
                  </>
                ) : userType === 'business' ? (
                  <>
                    {/* Razão Social */}
                    <div className="form-group">
                      <label htmlFor="companyName">Razão social</label>
                      <div className={`input-wrapper ${touched.companyName && errors.companyName ? 'error' : ''}`}>
                        <Building2 size={18} className="input-icon" />
                        <input
                          type="text"
                          id="companyName"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          onBlur={() => handleBlur('companyName')}
                          placeholder="Nome da empresa"
                          className="form-input"
                        />
                      </div>
                      {touched.companyName && errors.companyName && (
                        <span className="error-message">{errors.companyName}</span>
                      )}
                    </div>

                    {/* CNPJ */}
                    <div className="form-group">
                      <label htmlFor="cnpj">CNPJ</label>
                      <div className={`input-wrapper ${touched.cnpj && errors.cnpj ? 'error' : ''}`}>
                        <Building2 size={18} className="input-icon" />
                        <input
                          type="text"
                          id="cnpj"
                          name="cnpj"
                          value={formData.cnpj}
                          onChange={(e) => handleInputChange({
                            target: { name: 'cnpj', value: formatCNPJ(e.target.value) }
                          })}
                          onBlur={() => handleBlur('cnpj')}
                          placeholder="00.000.000/0000-00"
                          className="form-input"
                        />
                      </div>
                      {touched.cnpj && errors.cnpj && (
                        <span className="error-message">{errors.cnpj}</span>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    {/* Nome do Produtor */}
                    <div className="form-group">
                      <label htmlFor="name">Nome do produtor</label>
                      <div className={`input-wrapper ${touched.name && errors.name ? 'error' : ''}`}>
                        <User size={18} className="input-icon" />
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          onBlur={() => handleBlur('name')}
                          placeholder="Seu nome completo"
                          className="form-input"
                        />
                      </div>
                      {touched.name && errors.name && (
                        <span className="error-message">{errors.name}</span>
                      )}
                    </div>

                    {/* CPF */}
                    <div className="form-group">
                      <label htmlFor="cpf">CPF</label>
                      <div className={`input-wrapper ${touched.cpf && errors.cpf ? 'error' : ''}`}>
                        <CreditCard size={18} className="input-icon" />
                        <input
                          type="text"
                          id="cpf"
                          name="cpf"
                          value={formData.cpf}
                          onChange={(e) => handleInputChange({
                            target: { name: 'cpf', value: formatCPF(e.target.value) }
                          })}
                          onBlur={() => handleBlur('cpf')}
                          placeholder="000.000.000-00"
                          className="form-input"
                        />
                      </div>
                      {touched.cpf && errors.cpf && (
                        <span className="error-message">{errors.cpf}</span>
                      )}
                    </div>

                    {/* Nome da Propriedade */}
                    <div className="form-group">
                      <label htmlFor="companyName">Nome da propriedade</label>
                      <div className={`input-wrapper ${touched.companyName && errors.companyName ? 'error' : ''}`}>
                        <Sprout size={18} className="input-icon" />
                        <input
                          type="text"
                          id="companyName"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          onBlur={() => handleBlur('companyName')}
                          placeholder="Nome da fazenda/sítio"
                          className="form-input"
                        />
                      </div>
                      {touched.companyName && errors.companyName && (
                        <span className="error-message">{errors.companyName}</span>
                      )}
                    </div>
                  </>
                )}

                {/* Telefone (comum para todos) */}
                <div className="form-group">
                  <label htmlFor="phone">Telefone</label>
                  <div className={`input-wrapper ${touched.phone && errors.phone ? 'error' : ''}`}>
                    <Phone size={18} className="input-icon" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange({
                        target: { name: 'phone', value: formatPhone(e.target.value) }
                      })}
                      onBlur={() => handleBlur('phone')}
                      placeholder="(11) 99999-9999"
                      className="form-input"
                    />
                  </div>
                  {touched.phone && errors.phone && (
                    <span className="error-message">{errors.phone}</span>
                  )}
                </div>
              </>
            )}

            {/* Esqueci senha (apenas login) */}
            {mode === 'login' && (
              <div className="forgot-password">
                <Link to="/recuperar-senha">Esqueceu sua senha?</Link>
              </div>
            )}

            {/* Termos (apenas registro) */}
            {mode === 'register' && (
              <>
                <div className={`terms-group ${touched.terms && errors.terms ? 'error' : ''}`}>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="terms"
                      checked={formData.terms}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur('terms')}
                    />
                    <span className="checkbox-text">
                      Li e aceito os{' '}
                      <Link to="/termos">Termos de Uso</Link> e{' '}
                      <Link to="/privacidade">Política de Privacidade</Link>
                    </span>
                  </label>
                  {touched.terms && errors.terms && (
                    <span className="error-message">{errors.terms}</span>
                  )}
                </div>

                {/* Newsletter (opcional) */}
                <div className="newsletter-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="newsletter"
                      checked={formData.newsletter}
                      onChange={handleInputChange}
                    />
                    <span className="checkbox-text">
                      Desejo receber ofertas e novidades sobre produtos financeiros
                    </span>
                  </label>
                </div>
              </>
            )}

            {/* Botão de submit */}
            <button 
              type="submit" 
              className="submit-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader size={18} className="spinner" />
                  <span>Processando...</span>
                </>
              ) : (
                <>
                  {mode === 'login' ? <LogIn size={18} /> : <UserPlus size={18} />}
                  <span>
                    {mode === 'login' ? 'Entrar' : 'Criar conta'}
                  </span>
                </>
              )}
            </button>

            {/* Divider */}
            <div className="divider">
              <span>ou</span>
            </div>

            {/* Google Login */}
            <button
              type="button"
              className="google-button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <FcGoogle size={20} />
              <span>
                {mode === 'login' 
                  ? 'Continuar com Google' 
                  : 'Cadastrar com Google'
                }
              </span>
            </button>

            {/* Toggle between login/register */}
            <div className="toggle-mode">
              <span>
                {mode === 'login' 
                  ? 'Ainda não tem uma conta?' 
                  : 'Já tem uma conta?'
                }
              </span>
              <button
                type="button"
                onClick={toggleMode}
                className="toggle-button"
              >
                {mode === 'login' ? 'Cadastre-se' : 'Fazer login'}
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Segurança */}
            <div className="security-badge">
              <Shield size={12} />
              <span>Seus dados estão protegidos pela LGPD</span>
            </div>
          </form>
        </div>
      </div>

      {/* Right Column - Benefits Slider */}
      <div className="login-benefits-column">
        <div className="benefits-background">
          <img 
            src={heroBackground} 
            alt="Background" 
            className="benefits-background-image"
          />
          <div className="benefits-overlay"></div>
          <div className="benefits-gradient"></div>
          <div className="benefits-grid"></div>
        </div>

        <div className="benefits-content">
          <div className="benefits-header">
            <span className="benefits-badge">
              <Sparkles size={16} color="#F59E0B" />
              <span>Instituto Financeiro</span>
            </span>
            <h2 className="benefits-main-title">
              Soluções financeiras para <span className="title-gradient-blue">todos</span> os <span className="title-gradient-gold">momentos</span>
            </h2>
            <p className="benefits-main-description">
              {userType === 'personal' && 'Crédito pessoal, investimentos e muito mais para você realizar seus sonhos'}
              {userType === 'business' && 'Soluções completas para alavancar seu negócio com as melhores condições'}
              {userType === 'agro' && 'Linhas de crédito especiais para impulsionar sua produção no campo'}
            </p>
          </div>

          <BenefitSlide type={userType} />

          <div className="benefits-stats">
            <div className="benefits-stat">
              <span className="benefits-stat-value">+85k</span>
              <span className="benefits-stat-label">Clientes ativos</span>
            </div>
            <div className="benefits-stat">
              <span className="benefits-stat-value">R$3,2B</span>
              <span className="benefits-stat-label">Em operações</span>
            </div>
            <div className="benefits-stat">
              <span className="benefits-stat-value">15</span>
              <span className="benefits-stat-label">Anos de história</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;