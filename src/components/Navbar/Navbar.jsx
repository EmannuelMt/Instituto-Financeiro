import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Zap, 
  LayoutDashboard, 
  Info, 
  MessageSquare,
  Sparkles,
  ChevronRight,
  Menu,
  X,
  User,
  LogOut,
  Settings,
  Bell,
  Search,
  Sun,
  Moon,
  ChevronDown,
  Briefcase,
  Users,
  Award,
  TrendingUp,
  Globe,
  Shield,
  Code,
  BookOpen,
  Headphones,
  FileText,
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  CreditCard,
  LogIn,
  Landmark,
  DollarSign,
  BadgePercent,
  Calculator,
  PiggyBank,
  Wallet,
  Building,
  Sprout,
  Leaf,
  Tractor,
  LineChart,
  BarChart,
  PieChart,
  Target,
  Handshake,
  ShieldCheck,
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
  Calendar
} from 'lucide-react';
import './Navbar.css';
import logo from '../../assets/images/Logo/logo.svg';

const Navbar = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [notifications, setNotifications] = useState(3);
  
  const location = useLocation();
  const navigate = useNavigate();
  const searchTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setShowDropdown(null);
    setSearchOpen(false);
  }, [location]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
    document.documentElement.classList.toggle('light');
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (!searchOpen) {
      setTimeout(() => document.getElementById('search-input')?.focus(), 100);
    }
  };

  // Sistema de busca aprimorado
  const [searchResults, setSearchResults] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('instituto_search_history');
    if (saved) {
      try { 
        setSearchHistory(JSON.parse(saved)); 
      } catch { 
        setSearchHistory([]); 
      }
    }
  }, []);

  const saveHistoryToStorage = (hist) => {
    try { 
      localStorage.setItem('instituto_search_history', JSON.stringify(hist)); 
    } catch {}
  };

  const addToHistory = (q) => {
    const normalized = (q || '').trim();
    if (!normalized) return;
    setSearchHistory(prev => {
      const next = [normalized, ...prev.filter(h => h.toLowerCase() !== normalized.toLowerCase())].slice(0, 20);
      saveHistoryToStorage(next);
      return next;
    });
  };

  const clearHistory = () => {
    setSearchHistory([]);
    try { localStorage.removeItem('instituto_search_history'); } catch {}
  };

  const performSearch = (q) => {
    const query = (q || '').trim().toLowerCase();
    if (!query) { 
      setSearchResults([]); 
      return; 
    }

    const nodes = Array.from(document.querySelectorAll('section, div[data-search], h1, h2, h3, h4, p, a, li, .searchable'));
    const results = [];
    const seen = new Set();

    for (const el of nodes) {
      const text = (el.textContent || '').trim();
      if (!text) continue;
      const lower = text.toLowerCase();
      if (lower.includes(query)) {
        const section = el.closest('section');
        const sectionId = section ? section.id : '';
        const heading = section ? (section.querySelector('h2, h1, h3')?.textContent || '') : '';
        const key = (sectionId || heading || '').slice(0, 200) + '::' + text.slice(0, 200);
        if (seen.has(key)) continue;
        seen.add(key);

        results.push({
          title: heading || sectionId || 'Seção',
          snippet: text.slice(0, 150),
          anchor: sectionId ? `#${sectionId}` : '',
          category: section?.getAttribute('data-category') || 'geral',
          icon: getCategoryIcon(section?.getAttribute('data-category'))
        });
        if (results.length >= 15) break;
      }
    }

    setSearchResults(results);
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'credito': return <CreditCard size={14} />;
      case 'agro': return <Sprout size={14} />;
      case 'empresas': return <Briefcase size={14} />;
      case 'contato': return <Mail size={14} />;
      default: return <FileText size={14} />;
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const q = (searchQuery || '').trim();
    if (!q) return;
    addToHistory(q);
    performSearch(q);
  };

  const handleResultClick = (result) => {
    setSearchOpen(false);
    setSearchQuery('');
    if (result && result.anchor) {
      const anchor = result.anchor.startsWith('#') ? result.anchor : `#${result.anchor}`;
      const targetPath = location.pathname.split('#')[0] + anchor;
      navigate(targetPath);
      setTimeout(() => {
        const el = document.getElementById(anchor.replace('#', ''));
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 350);
    }
  };

  // Estrutura de navegação refinada
  const navLinks = [
    { 
      name: 'Início', 
      path: '/', 
      icon: Home,
      description: 'Página principal'
    },
     { 
      name: 'Sobre nós', 
      path: '/about', 
      icon: Landmark,
     
    },
    { 
      name: 'Crédito', 
      path: '/planos', 
      icon: CreditCard,
      badge: 'Simule agora',
    },
    { 
      name: 'Contato', 
      path: '/contato', 
      icon: Mail,
      
    },
   
  ];

  const userLinks = [
    { name: 'Meu Perfil', path: '/perfil', icon: User, description: 'Suas informações' },
    { name: 'Minhas Contas', path: '/contas', icon: Wallet, description: 'Gerencie suas contas' },
    { name: 'Meus Créditos', path: '/creditos', icon: CreditCard, description: 'Acompanhe seus contratos' },
    { name: 'Investimentos', path: '/investimentos', icon: TrendingUpIcon, description: 'Seu portfolio' },
    { name: 'Notificações', path: '/notificacoes', icon: Bell, badge: notifications, description: 'Alertas e mensagens' },
    { name: 'Configurações', path: '/configuracoes', icon: Settings, description: 'Preferências da conta' },
    { name: 'Segurança', path: '/seguranca', icon: Lock, description: 'Proteja sua conta' }
  ];

  const quickActions = [
    
  ];

  // Variants de animação
  const navItemVariants = {
    hover: { 
      y: -2,
      transition: { type: 'spring', stiffness: 400, damping: 17 }
    }
  };

  const dropdownVariants = {
    hidden: { 
      opacity: 0, 
      y: -10,
      transition: { duration: 0.2 }
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring',
        stiffness: 500,
        damping: 30,
        staggerChildren: 0.03
      }
    }
  };

  const dropdownItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${theme}`}>
        <div className="navbar-container">
          
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <div className="logo-wrapper">
              <img src={logo} alt="Instituto Financeiro" className="navbar-logo-img" />
              <div className="logo-glow"></div>
            </div>
            <div className="logo-text-wrapper">
              <span className="logo-text-primary">Instituto</span>
              <span className="logo-text-secondary">Financeiro</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="nav-links-desktop">
            {navLinks.map((link, index) => (
              <div 
                key={link.name}
                className="nav-item-wrapper"
                onMouseEnter={() => setShowDropdown(index)}
                onMouseLeave={() => setShowDropdown(null)}
              >
                <Link
                  to={link.path}
                  className={`nav-item ${location.pathname.startsWith(link.path) ? 'active' : ''}`}
                  onMouseEnter={() => setHoveredItem(index)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <link.icon className="nav-icon" size={18} />
                  <span className="nav-text">{link.name}</span>
                  {link.badge && <span className="nav-badge">{link.badge}</span>}
                  {link.dropdown && <ChevronDown size={14} className="dropdown-arrow" />}
                </Link>

                {/* Dropdown Menu */}
                {link.dropdown && showDropdown === index && (
                  <motion.div 
                    className="dropdown-menu"
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <div className="dropdown-header">
                      <link.icon size={16} />
                      <span>{link.name}</span>
                    </div>
                    <div className="dropdown-grid">
                      {link.dropdown.map((item) => (
                        <motion.div key={item.name} variants={dropdownItemVariants}>
                          <Link to={item.path} className="dropdown-item">
                            <div className="dropdown-item-icon">
                              {item.icon && <item.icon size={16} />}
                            </div>
                            <div className="dropdown-item-content">
                              <span className="dropdown-item-title">
                                {item.name}
                                {item.badge && <span className="dropdown-badge">{item.badge}</span>}
                              </span>
                              {item.description && (
                                <span className="dropdown-item-description">{item.description}</span>
                              )}
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Right Section */}
          <div className="nav-right">
            {/* Quick Actions */}
            <div className="quick-actions">
              {quickActions.map((action, idx) => (
                <button
                  key={idx}
                  className="quick-action-btn"
                  onClick={action.action}
                  title={action.name}
                >
                  <action.icon size={16} />
                </button>
              ))}
            </div>

            {/* Search Button */}
            <button 
              className="nav-icon-button search-toggle"
              onClick={toggleSearch}
              aria-label="Buscar"
            >
              <Search size={18} />
            </button>

            {/* Theme Toggle */}
            <button 
              className="nav-icon-button theme-toggle"
              onClick={toggleTheme}
              aria-label={theme === 'light' ? 'Modo escuro' : 'Modo claro'}
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            {/* User Menu */}
            {isLoggedIn ? (
              <div className="user-menu-wrapper">
                <button 
                  className="user-menu-button"
                  onClick={() => setShowDropdown('user')}
                >
                  <div className="user-avatar-wrapper">
                    <img 
                      src="https://ui-avatars.com/api/?name=Usuario&background=2563EB&color=ffffff&bold=true" 
                      alt="User"
                      className="user-avatar"
                    />
                    {notifications > 0 && (
                      <span className="user-notification-badge">{notifications}</span>
                    )}
                  </div>
                  <span className="user-name">João Silva</span>
                  <ChevronDown size={14} className={`dropdown-arrow ${showDropdown === 'user' ? 'rotated' : ''}`} />
                </button>

                <AnimatePresence>
                  {showDropdown === 'user' && (
                    <motion.div 
                      className="dropdown-menu user-dropdown"
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      <div className="user-dropdown-header">
                        <img 
                          src="https://ui-avatars.com/api/?name=Joao+Silva&background=2563EB&color=ffffff&bold=true" 
                          alt="User"
                          className="user-dropdown-avatar"
                        />
                        <div>
                          <div className="user-dropdown-name">João Silva</div>
                          <div className="user-dropdown-email">joao.silva@email.com</div>
                        </div>
                      </div>
                      
                      {userLinks.map((item) => (
                        <Link key={item.name} to={item.path} className="dropdown-item">
                          <div className="dropdown-item-icon">
                            <item.icon size={16} />
                          </div>
                          <div className="dropdown-item-content">
                            <span className="dropdown-item-title">
                              {item.name}
                              {item.badge && <span className="dropdown-badge">{item.badge}</span>}
                            </span>
                            {item.description && (
                              <span className="dropdown-item-description">{item.description}</span>
                            )}
                          </div>
                        </Link>
                      ))}
                      
                      <div className="dropdown-divider"></div>
                      
                      <button className="dropdown-item logout">
                        <div className="dropdown-item-icon">
                          <LogOut size={16} />
                        </div>
                        <div className="dropdown-item-content">
                          <span className="dropdown-item-title">Sair da conta</span>
                        </div>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/auth?mode=login" className="login-button">
                  <LogIn size={16} />
                  <span>Entrar</span>
                </Link>
                <Link to="/auth?mode=register" className="register-button">
                  <span>Abrir conta</span>
                  <ChevronRight size={14} />
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button 
              className="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Search Overlay */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div 
              className="search-overlay"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: 'spring', damping: 25 }}
            >
              <form onSubmit={handleSearchSubmit} className="search-form">
                <Search size={20} className="search-icon" />
                <input
                  id="search-input"
                  type="text"
                  placeholder="Buscar no Instituto Financeiro..."
                  value={searchQuery}
                  onChange={(e) => {
                    const v = e.target.value;
                    setSearchQuery(v);
                    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
                    searchTimeoutRef.current = setTimeout(() => performSearch(v), 300);
                  }}
                  className="search-input"
                />
                <button type="button" onClick={toggleSearch} className="search-close">
                  <X size={20} />
                </button>

                <div className="search-panel">
                  {searchQuery.trim() === '' ? (
                    <div className="search-history">
                      <div className="search-history-header">
                        <strong>Pesquisas recentes</strong>
                        {searchHistory.length > 0 && (
                          <button className="clear-history" onClick={(ev) => { ev.preventDefault(); clearHistory(); }}>Limpar histórico</button>
                        )}
                      </div>
                      {searchHistory.length === 0 ? (
                        <div className="search-empty">
                          <Search size={24} />
                          <p>Nenhuma pesquisa recente</p>
                        </div>
                      ) : (
                        <ul className="search-history-list">
                          {searchHistory.map((h, i) => (
                            <li key={i}>
                              <button className="history-item" onClick={(ev) => { ev.preventDefault(); setSearchQuery(h); performSearch(h); addToHistory(h); }}>
                                <Search size={14} />
                                <span>{h}</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <div className="search-results">
                      <div className="search-results-header">
                        <strong>Resultados para "{searchQuery}"</strong>
                        <span>{searchResults.length} encontrados</span>
                      </div>
                      {searchResults.length === 0 ? (
                        <div className="search-empty">
                          <AlertCircle size={24} />
                          <p>Nenhum resultado encontrado</p>
                          <span>Tente outros termos</span>
                        </div>
                      ) : (
                        <ul className="search-results-list">
                          {searchResults.map((r, i) => (
                            <li key={i} className="search-result-item">
                              <button className="history-item" onClick={(ev) => { ev.preventDefault(); handleResultClick(r); }}>
                                <div className="result-icon">{r.icon}</div>
                                <div className="result-content">
                                  <strong>{r.title}</strong>
                                  <div className="search-snippet">{r.snippet}</div>
                                  {r.category && (
                                    <span className="result-category">{r.category}</span>
                                  )}
                                </div>
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
          >
            <div className="mobile-menu-header">
              <Link to="/" className="mobile-logo" onClick={() => setIsMobileMenuOpen(false)}>
                <img src={logo} alt="Instituto Financeiro" className="mobile-logo-img" />
                <div className="mobile-logo-text">
                  <span className="mobile-logo-primary">Instituto</span>
                  <span className="mobile-logo-secondary">Financeiro</span>
                </div>
              </Link>
              <button onClick={() => setIsMobileMenuOpen(false)} className="mobile-close">
                <X size={24} />
              </button>
            </div>

            <div className="mobile-menu-content">
              {!isLoggedIn && (
                <div className="mobile-auth-section">
                  <Link to="/auth?mode=login" className="mobile-login" onClick={() => setIsMobileMenuOpen(false)}>
                    <LogIn size={18} />
                    <span>Entrar</span>
                  </Link>
                  <Link to="/auth?mode=register" className="mobile-register" onClick={() => setIsMobileMenuOpen(false)}>
                    <span>Abrir conta gratuita</span>
                    <ChevronRight size={14} />
                  </Link>
                </div>
              )}

              <div className="mobile-quick-actions">
                {quickActions.map((action, idx) => (
                  <button
                    key={idx}
                    className="mobile-quick-action"
                    onClick={() => {
                      action.action();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <action.icon size={18} />
                    <span>{action.name}</span>
                  </button>
                ))}
              </div>

              <div className="mobile-nav-sections">
                {navLinks.map((link) => (
                  <div key={link.name} className="mobile-section">
                    <div className="mobile-section-header">
                      <Link
                        to={link.path}
                        className={`mobile-section-link ${location.pathname.startsWith(link.path) ? 'active' : ''}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <link.icon size={18} />
                        <span>{link.name}</span>
                        {link.badge && <span className="mobile-badge">{link.badge}</span>}
                      </Link>
                    </div>

                    {link.dropdown && (
                      <div className="mobile-submenu">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.name}
                            to={item.path}
                            className="mobile-sub-link"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {item.icon && <item.icon size={14} />}
                            <span>{item.name}</span>
                            {item.badge && <span className="mobile-badge small">{item.badge}</span>}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mobile-menu-footer">
              <button onClick={toggleTheme} className="mobile-theme">
                {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
                <span>{theme === 'light' ? 'Modo Escuro' : 'Modo Claro'}</span>
              </button>
              
              <div className="mobile-contact">
                <a href="tel:40044004">
                  <Phone size={14} />
                  <span>4004-4004</span>
                </a>
                <a href="mailto:atendimento@instituto.com.br">
                  <Mail size={14} />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay para mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;