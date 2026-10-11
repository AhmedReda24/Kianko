import React, { useState, useEffect, useMemo } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Layers, 
  Calculator, 
  FileText, 
  PhoneCall, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  ChevronRight, 
  Download, 
  Send, 
  User, 
  LogOut, 
  LogIn, 
  Menu, 
  X, 
  ArrowUpRight, 
  Sliders, 
  Award, 
  Clock, 
  Truck, 
  Compass, 
  Sparkles,
  Search,
  Check,
  Package
} from 'lucide-react';

const PRODUCTS_DATA = [
  {
    id: 'rebar-cut-bend',
    category: 'rebar',
    nameAr: 'حديد التسليح المقصوص والمثني (Cut & Bend)',
    nameEn: 'Cut & Bend Rebar Solutions',
    desc: 'تصنيع وتشكيل حديد التسليح وفقاً للمخططات الهندسية بدقة متناهية تقلل الهدر بالموقع لنسبة 0%.',
    specGrade: 'ASTM A615 Gr 60 / BS 4449 B500B',
    diameters: '8mm - 40mm',
    yieldStrength: '≥ 500 N/mm²',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    tags: ['دقة هندسية', 'معتمد للمشاريع الكبرى', 'مطابق SASO']
  },
  {
    id: 'welded-wire-mesh',
    category: 'mesh',
    nameAr: 'شبك حديد التسليح الملحوم (Welded Wire Mesh)',
    nameEn: 'Structural Welded Wire Mesh',
    desc: 'شبك عالي المقاومة للأرضيات الخرسانية والجسور والجدران المسلحة، متاح أسطح ملساء أو مشرشرة.',
    specGrade: 'BS 4483 / ASTM A1064',
    diameters: '5mm - 12mm',
    yieldStrength: '≥ 500 N/mm²',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    tags: ['شبك أسود', 'مجلفن', 'معالج بالإيبوكسي']
  },
  {
    id: 'epoxy-coated-rebar',
    category: 'rebar',
    nameAr: 'حديد التسليح المعالج بالإيبوكسي (FBECR)',
    nameEn: 'Fusion-Bonded Epoxy Coated Rebar',
    desc: 'حماية فائقة ضد التآكل والصدأ في البيئات البحرية والمناطق ذات الرطوبة والأملاح العالية.',
    specGrade: 'ASTM A775 / A775M',
    diameters: '10mm - 32mm',
    yieldStrength: '≥ 500 N/mm²',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=800&q=80',
    tags: ['مقاوم للأملاح', 'معتمد للبنية التحتية', 'حماية كاثودية']
  },
  {
    id: 'straight-bars',
    category: 'rebar',
    nameAr: 'الأسياخ المستقيمة عالية المقاومة (Straight Rebar)',
    nameEn: 'High-Tensile Straight Deformed Bars',
    desc: 'أسياخ مستقيمة قياسية بطول 12 متراً بمواصفات ميكانيكية ومرونة انحناء فائقة للخرسانة المسلحة.',
    specGrade: 'SASO ASTM A615 / DIN 488',
    diameters: '8mm - 32mm',
    yieldStrength: '420 - 550 N/mm²',
    image: 'https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&w=800&q=80',
    tags: ['طول 12م قياسي', 'فحص كيميائي صارم']
  },
  {
    id: 'tie-wires',
    category: 'wires',
    nameAr: 'أسلاك التربيط المخمرة والمجلفنة (Annealed Tie Wire)',
    nameEn: 'Black Annealed & Galvanized Tie Wires',
    desc: 'أسلاك سحب ناعمة ومرنة ذات مرونة ممتازة لسهولة وسرعة التربيط في المواقع الإنشائية.',
    specGrade: 'ASTM A853 / BS 1052',
    diameters: '1.2mm - 1.6mm',
    yieldStrength: '350 - 450 N/mm²',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    tags: ['تخمير حراري تام', 'لفائف متينة']
  },
  {
    id: 'fencing-systems',
    category: 'fencing',
    nameAr: 'أنظمة السياج الأمني والشباك المجلفنة (Fencing Systems)',
    nameEn: 'Heavy Industrial Security Fencing',
    desc: 'منظومات متكاملة لتسييج المشاريع الحيوية والمطارات والمصانع متوافقة مع اشتراطات وزارة النقل.',
    specGrade: 'ASTM F1043 / BS 1722',
    diameters: '3.0mm - 5.0mm',
    yieldStrength: '≥ 450 N/mm²',
    image: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=800&q=80',
    tags: ['جلفنة بالغمر الساخن', 'مقاوم للعوامل الجوية']
  }
];

const CERTIFICATIONS = [
  { code: 'SASO', title: 'الهيئة السعودية للمواصفات', desc: 'مطابقة صارمة للائحة الفنية لمنتجات حديد التسليح والصلب الإنشائي.' },
  { code: 'ISO 9001:2015', title: 'نظام إدارة الجودة', desc: 'معايير إدارة الجودة العالمية لخطوط الإنتاج وفحص المختبرات.' },
  { code: 'ASTM A615 / A775', title: 'المعايير الأمريكية للصلب', desc: 'فحوصات الشد والانحناء والطلاء الإيبوكسي العازل.' },
  { code: 'ARAMCO Standard', title: 'اعتماد مشاريع الطاقة والنفط', desc: 'تجهيز وتوريد معتمد لمشاريع البنية التحتية والمنشآت الاستراتيجية.' }
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Steel Calculator States
  const [calcDiameter, setCalcDiameter] = useState(16);
  const [calcLength, setCalcLength] = useState(12);
  const [calcQuantity, setCalcQuantity] = useState(100);
  
  // Modals & User State (Supabase Auth Simulator)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [currentUser, setCurrentUser] = useState(null);
  const [authForm, setAuthForm] = useState({ companyName: '', email: '', password: '', phone: '' });
  const [authError, setAuthError] = useState('');
  
  // RFQ Drawer State
  const [isRfqModalOpen, setIsRfqModalOpen] = useState(false);
  const [rfqTargetProduct, setRfqTargetProduct] = useState(null);
  const [rfqSuccess, setRfqSuccess] = useState(false);
  const [rfqForm, setRfqForm] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    city: 'الرياض',
    tons: '50',
    notes: ''
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('kianko_user');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Error parsing stored user', e);
      }
    }
  }, []);

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setAuthError('');
    if (!authForm.email || !authForm.password) {
      setAuthError('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    // Mocking Supabase Auth session
    const mockUser = {
      id: 'usr_' + Math.random().toString(36).substr(2, 9),
      email: authForm.email,
      companyName: authForm.companyName || 'شركة المقاولات الحديثة',
      phone: authForm.phone || '+966500000000',
      created_at: new Date().toISOString()
    };

    setCurrentUser(mockUser);
    localStorage.setItem('kianko_user', JSON.stringify(mockUser));
    setIsAuthModalOpen(false);
    setAuthForm({ companyName: '', email: '', password: '', phone: '' });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('kianko_user');
  };

  // Theoretical weight per meter: W = (D^2) / 162 (kg/m)
  const calculatedWeight = useMemo(() => {
    const d = parseFloat(calcDiameter);
    const l = parseFloat(calcLength);
    const q = parseInt(calcQuantity) || 1;
    if (!d || !l || isNaN(d) || isNaN(l)) return { weightPerMeter: 0, totalWeightKg: 0, totalTons: 0 };
    
    const weightPerMeter = (d * d) / 162;
    const barWeight = weightPerMeter * l;
    const totalKg = barWeight * q;
    const totalTons = totalKg / 1000;

    return {
      weightPerMeter: weightPerMeter.toFixed(3),
      barWeight: barWeight.toFixed(2),
      totalWeightKg: totalKg.toFixed(1),
      totalTons: totalTons.toFixed(2)
    };
  }, [calcDiameter, calcLength, calcQuantity]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((p) => {
      const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
      const matchSearch = p.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const openQuoteModalFor = (product = null) => {
    setRfqTargetProduct(product);
    setIsRfqModalOpen(true);
    setRfqSuccess(false);
  };

  const handleRfqSubmit = (e) => {
    e.preventDefault();
    setRfqSuccess(true);
    setTimeout(() => {
      setIsRfqModalOpen(false);
      setRfqSuccess(false);
      setRfqForm({
        name: '',
        company: '',
        phone: '',
        email: '',
        city: 'الرياض',
        tons: '50',
        notes: ''
      });
    }, 2200);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#0F1216] text-slate-100 font-sans selection:bg-[#C9252C] selection:text-white antialiased">
      
      {}
      <header className="sticky top-0 z-50 bg-[#161A20]/95 backdrop-blur-md border-b border-slate-800 shadow-xl transition-all">
        {/* Top Info Bar */}
        <div className="hidden lg:flex justify-between items-center px-8 py-2 text-xs bg-[#111418] border-b border-slate-800/60 text-slate-400">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#C9252C]" />
              المنطقة الصناعية الكبرى - مصنع كيانكو الرئيسي
            </span>
            <span className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#C9252C]" />
              sales@kianko.com
            </span>
            <span className="flex items-center gap-2">
              <PhoneCall className="w-3.5 h-3.5 text-[#C9252C]" />
              +966 11 000 0000
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              خطوط الإنتاج نشطة على مدار 24/7
            </span>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Section */}
          <div className="flex items-center gap-4">
            <a href="#" className="flex items-center gap-3 group">
              <div className="relative flex items-center justify-center w-12 h-12 bg-white rounded-lg p-1.5 shadow-md shadow-red-950/20">
                {/* SVG Geometric representation of the Kianko Logo Icon */}
                <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
                  {/* Left dark vertical bar of 'K' */}
                  <polygon points="12,10 32,10 32,90 12,90" fill="#1E232A" />
                  {/* Top slanted chevron arm in Slate Gray */}
                  <polygon points="34,50 82,10 60,10 20,44" fill="#6B6868" />
                  {/* Bottom slanted chevron arm in Slate Gray */}
                  <polygon points="20,56 60,90 84,90 34,50" fill="#6B6868" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-white flex items-center gap-1">
                  كيانكـو
                  <span className="w-2 h-2 rounded-full bg-[#C9252C]"></span>
                </span>
                <span className="text-[11px] font-bold text-slate-400 tracking-widest uppercase">
                  Kianko Steel Industries
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#about" className="hover:text-white transition-colors">عن كيانكو</a>
            <a href="#products" className="hover:text-white transition-colors">المنتجات والمواصفات</a>
            <a href="#calculator" className="hover:text-white transition-colors flex items-center gap-1.5">
              <Calculator className="w-4 h-4 text-[#C9252C]" />
              حاسبة الحديد
            </a>
            <a href="#certifications" className="hover:text-white transition-colors">الاعتمادات والجودة</a>
            <a href="#contact" className="hover:text-white transition-colors">تواصل معنا</a>
          </nav>

          {/* Action & Auth Controls */}
          <div className="hidden sm:flex items-center gap-4">
            {currentUser ? (
              <div className="flex items-center gap-3 bg-slate-800/80 border border-slate-700/80 rounded-xl px-3 py-1.5">
                <div className="w-8 h-8 rounded-lg bg-[#C9252C]/20 border border-[#C9252C]/40 flex items-center justify-center text-[#C9252C]">
                  <User className="w-4 h-4" />
                </div>
                <div className="text-right">
                  <div className="text-xs font-semibold text-white leading-tight">{currentUser.companyName}</div>
                  <div className="text-[10px] text-slate-400 leading-none">{currentUser.email}</div>
                </div>
                <button 
                  onClick={handleLogout}
                  title="تسجيل الخروج"
                  className="p-1.5 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-red-400 transition"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => { setAuthMode('login'); setIsAuthModalOpen(true); }}
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white bg-slate-800/70 hover:bg-slate-800 border border-slate-700/70 px-4 py-2.5 rounded-xl transition"
              >
                <LogIn className="w-3.5 h-3.5 text-[#C9252C]" />
                بوابة العملاء
              </button>
            )}

            <button
              onClick={() => openQuoteModalFor(null)}
              className="inline-flex items-center gap-2 text-xs font-bold text-white bg-gradient-to-r from-[#C9252C] to-[#E53935] hover:opacity-95 shadow-lg shadow-red-900/30 px-5 py-2.5 rounded-xl transition transform active:scale-95"
            >
              <span>طلب عرض سعر</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#161A20] border-b border-slate-800 px-6 py-5 space-y-4">
            <a 
              href="#about" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-300 hover:text-[#C9252C] py-2"
            >عن كيانكو</a>
            <a 
              href="#products" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-300 hover:text-[#C9252C] py-2"
            >المنتجات والمواصفات</a>
            <a 
              href="#calculator" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-300 hover:text-[#C9252C] py-2"
            >حاسبة حديد التسليح</a>
            <a 
              href="#certifications" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-300 hover:text-[#C9252C] py-2"
            >شهادات الجودة</a>
            
            <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
              {currentUser ? (
                <div className="flex items-center justify-between bg-slate-800 p-3 rounded-xl">
                  <div>
                    <div className="text-sm font-semibold">{currentUser.companyName}</div>
                    <div className="text-xs text-slate-400">{currentUser.email}</div>
                  </div>
                  <button onClick={handleLogout} className="text-xs text-red-400">خروج</button>
                </div>
              ) : (
                <button
                  onClick={() => { setMobileMenuOpen(false); setAuthMode('login'); setIsAuthModalOpen(true); }}
                  className="w-full text-center py-2.5 rounded-xl border border-slate-700 text-slate-200 text-sm font-bold"
                >
                  تسجيل الدخول / بوابة العملاء
                </button>
              )}
              <button
                onClick={() => { setMobileMenuOpen(false); openQuoteModalFor(null); }}
                className="w-full text-center py-2.5 rounded-xl bg-[#C9252C] text-white text-sm font-bold shadow-md shadow-red-900/30"
              >
                طلب عرض سعر فوري
              </button>
            </div>
          </div>
        )}
      </header>

      {}
      <section className="relative overflow-hidden pt-12 pb-24 md:py-32 bg-gradient-to-b from-[#161A20] via-[#101317] to-[#0A0C0E]">
        {/* Steel Grid Graphic Background */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        
        {/* Glow Accent Sphere */}
        <div className="absolute top-1/4 -right-40 w-96 h-96 bg-[#C9252C]/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 -left-40 w-96 h-96 bg-slate-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Main Text Content */}
            <div className="lg:col-span-7 space-y-6 text-right">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C9252C]/10 border border-[#C9252C]/30 text-[#E53935] text-xs font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>الريادة في صناعة وتشكيل حديد التسليح والصلب</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.2] tracking-tight">
                صرح صناعي راسخ
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-[#C9252C]">
                  بأعلى معايير الجودة العالمية
                </span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
                في <strong className="text-white font-bold">كيانكو</strong> نبتكر حلول تصنيع الصلب، حديد التسليح المقصوص والمثني هندسياً، الشبك الملحوم، والطلاء الإيبوكسي العازل لتأمين أضخم المشاريع الإنشائية والبنى التحتية الكبرى بالمملكة والشرق الأوسط.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <button 
                  onClick={() => openQuoteModalFor(null)}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#C9252C] to-[#BA1B23] text-white font-bold text-sm shadow-xl shadow-red-950/40 hover:shadow-red-600/20 hover:scale-[1.02] active:scale-95 transition flex items-center gap-3"
                >
                  <Send className="w-4 h-4" />
                  <span>طلب تسعيرة للمشاريع</span>
                </button>
                <a 
                  href="#calculator"
                  className="px-7 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-sm hover:text-white transition flex items-center gap-2"
                >
                  <Calculator className="w-4 h-4 text-[#C9252C]" />
                  <span>حاسبة أوزان الحديد</span>
                </a>
              </div>

              {/* Quick Metrics */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-800/80">
                <div className="bg-slate-900/50 p-3.5 rounded-xl border border-slate-800">
                  <div className="text-2xl sm:text-3xl font-black text-white">+500K</div>
                  <div className="text-xs text-slate-400 mt-0.5">طن طاقة إنتاجية سنوية</div>
                </div>
                <div className="bg-slate-900/50 p-3.5 rounded-xl border border-slate-800">
                  <div className="text-2xl sm:text-3xl font-black text-white">0%</div>
                  <div className="text-xs text-slate-400 mt-0.5">نسبة هدر مع القص والتشكيل</div>
                </div>
                <div className="bg-slate-900/50 p-3.5 rounded-xl border border-slate-800">
                  <div className="text-2xl sm:text-3xl font-black text-[#C9252C]">100%</div>
                  <div className="text-xs text-slate-400 mt-0.5">مطابقة مواصفات SASO / ASTM</div>
                </div>
              </div>
            </div>

            {/* Visual Hero Showcase Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-900 shadow-2xl shadow-black/80">
                <img 
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80" 
                  alt="Kianko Steel Plant" 
                  className="w-full h-[430px] object-cover filter brightness-[0.85] contrast-[1.1] hover:scale-105 transition duration-700"
                />
                
                {/* Overlay Badge for Quality Assurance */}
                <div className="absolute top-4 left-4 bg-[#161A20]/90 backdrop-blur-md border border-slate-700 p-3 rounded-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#C9252C]/20 border border-[#C9252C] flex items-center justify-center text-[#C9252C]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">اعتماد هندسي معتمد</div>
                    <div className="text-[10px] text-slate-400">B500B / ASTM A615 Gr 60</div>
                  </div>
                </div>

                {/* Floating Bottom Card */}
                <div className="absolute bottom-4 inset-x-4 bg-slate-950/85 backdrop-blur-md p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-[#C9252C] font-bold block">مختبرات فحص كيميائي وميكانيكي</span>
                    <span className="text-xs text-slate-300 font-semibold">فحص إجهاد الخضوع وقوة الشد والاستطالة</span>
                  </div>
                  <span className="p-2 rounded-lg bg-slate-800 text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {}
      <section id="about" className="py-20 bg-[#12151B] border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[#C9252C] text-xs font-bold uppercase tracking-wider block">عن الشركة</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                هندسة الصلب برؤية متقدمة تدعم النهضة العمرانية
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                تأسست شركة <strong className="text-white">كيانكو للصناعات الحديدية</strong> لتكون شريكاً استراتيجياً لقطاعات المقاولات، التطوير العقاري، والبنية التحتية. ندمج بين أحدث خطوط الإنتاج المؤتمتة أوروبياً وبين أعلى نظم مراقبة الجودة لضمان أمان وديمومة كل مشروع.
              </p>
              <div className="pt-2 space-y-2.5">
                {[
                  'تجهيز وتصنيع حديد التسليح وفق جداول تفريد الحديد (BBS) بدقة مليمترية.',
                  'مختبر متكامل معتمد لإجراء اختبارات الشد والانحناء المستمر.',
                  'أسطول لوجستي متخصص لتوصيل التوريدات في المواعيد المحددة لموقع العمل.'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-[#C9252C] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#181D24] p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition">
                <div className="w-12 h-12 rounded-xl bg-[#C9252C]/10 border border-[#C9252C]/30 flex items-center justify-center text-[#C9252C] mb-4">
                  <Sliders className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">حلول Cut & Bend المبرمجة</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  نقلل تكاليف العمالة في موقع البناء ونلغي نسب الهدر من خلال قص وتشكيل الكانات والأسياخ بالماكينات الرقمية CNC.
                </p>
              </div>

              <div className="bg-[#181D24] p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition">
                <div className="w-12 h-12 rounded-xl bg-slate-700/30 border border-slate-700 flex items-center justify-center text-slate-300 mb-4">
                  <ShieldCheck className="w-6 h-6 text-[#C9252C]" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">معالجة الإيبوكسي المقاومة</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  خطوط طلاء إلكتروستاتيكي حراري للصلب تعزل حديد التسليح تماماً عن الرطوبة وكلوريدات الأملاح لعمر افتراضي يفوق 70 عاماً.
                </p>
              </div>

              <div className="bg-[#181D24] p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition">
                <div className="w-12 h-12 rounded-xl bg-slate-700/30 border border-slate-700 flex items-center justify-center text-slate-300 mb-4">
                  <Truck className="w-6 h-6 text-[#C9252C]" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">توريد لوجستي مرن</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  توزيع منظم يغطي كافة المناطق بمواعيد تسليم دقيقة تتماشى مع مراحل الصب والخرسانة في الجداول الزمنية للمشروع.
                </p>
              </div>

              <div className="bg-[#181D24] p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition">
                <div className="w-12 h-12 rounded-xl bg-slate-700/30 border border-slate-700 flex items-center justify-center text-slate-300 mb-4">
                  <Award className="w-6 h-6 text-[#C9252C]" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">شهادات مطابقة معتمدة</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  كل شحنة تخرج من مصانع كيانكو تكون مرفقة بتقرير فحص المختبر الرسمي (Mill Test Certificate - MTC).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {}
      <section id="products" className="py-20 bg-[#0F1216]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-[#C9252C] text-xs font-bold uppercase tracking-wider block mb-1">دليل المواد والمنتجات</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">منتجات حديد التسليح والصلب الإنشائي</h2>
              <p className="text-slate-400 text-sm mt-2 max-w-xl">
                مجموعة متكاملة من قطاعات الحديد المصنعة طبقاً لأدق المواصفات القياسية العالمية والخليجية.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="ابحث عن منتج، مقاس، أو معيار..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#181D24] border border-slate-700 rounded-xl pr-10 pl-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#C9252C] transition"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2.5 mb-8 pb-2 border-b border-slate-800">
            {[
              { id: 'all', label: 'جميع المنتجات' },
              { id: 'rebar', label: 'حديد التسليح والتشكيل' },
              { id: 'mesh', label: 'شبك التسليح الملحوم' },
              { id: 'wires', label: 'أسلاك السحب والتربيط' },
              { id: 'fencing', label: 'أنظمة السياج والحماية' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  selectedCategory === tab.id
                    ? 'bg-[#C9252C] text-white shadow-md shadow-red-900/30'
                    : 'bg-[#181D24] text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div 
                key={product.id}
                className="group bg-[#161A20] rounded-2xl border border-slate-800 overflow-hidden hover:border-slate-700 hover:shadow-2xl hover:shadow-red-950/20 transition flex flex-col"
              >
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  <img 
                    src={product.image} 
                    alt={product.nameAr}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#161A20] via-transparent to-transparent"></div>
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono text-slate-200 border border-slate-700">
                    {product.specGrade}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white mb-1 group-hover:text-[#C9252C] transition-colors">
                      {product.nameAr}
                    </h3>
                    <p className="text-[11px] font-mono text-slate-400 mb-3">{product.nameEn}</p>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">{product.desc}</p>
                    
                    {/* Technical Specs pill box */}
                    <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-800 text-[11px] space-y-1.5 mb-4">
                      <div className="flex justify-between">
                        <span className="text-slate-400">الأقطار المتاحة:</span>
                        <span className="font-semibold text-white">{product.diameters}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">إجهاد الخضوع:</span>
                        <span className="font-semibold text-white">{product.yieldStrength}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {product.tags.map((tag, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/50">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center gap-2">
                    <button
                      onClick={() => openQuoteModalFor(product)}
                      className="flex-1 py-2.5 rounded-xl bg-[#C9252C] hover:bg-[#B31D24] text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-md shadow-red-950/20"
                    >
                      <Package className="w-3.5 h-3.5" />
                      <span>طلب عرض سعر</span>
                    </button>
                    <button 
                      onClick={() => alert(`تم تنزيل بطاقة المواصفات الفنية لمنتج: ${product.nameAr}`)}
                      title="تحميل النشرة الفنية (Data Sheet)"
                      className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16 bg-[#161A20] rounded-2xl border border-slate-800">
              <p className="text-slate-400 text-sm">لا توجد نتائج مطابقة لبحثك، يرجى تجربة كلمات أخرى.</p>
            </div>
          )}

        </div>
      </section>

      {}
      <section id="calculator" className="py-20 bg-gradient-to-b from-[#12151B] to-[#161A20] border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9252C]/10 text-[#C9252C] border border-[#C9252C]/30 text-xs font-bold mb-3">
              <Calculator className="w-3.5 h-3.5" />
              أداة هندسية تفاعلية
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">حاسبة أوزان وكميات حديد التسليح</h2>
            <p className="text-slate-400 text-sm mt-2">
              احسب الوزن النظري التقريبي لأسياخ الصلب بناءً على القطر والطول والكميات طبقاً للمعادلة الهندسية القياسية <span className="font-mono text-slate-300">W = D² / 162</span> كجم/متر.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Input Controls */}
            <div className="lg:col-span-6 bg-[#1A1F26] p-6 sm:p-8 rounded-2xl border border-slate-700 shadow-xl space-y-6">
              
              {/* Diameter Picker */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  قطر السيخ (بالمليمتر): <span className="text-[#C9252C] font-mono text-base">{calcDiameter} mm</span>
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {[8, 10, 12, 14, 16, 18, 20, 22, 25, 28, 32].map((dia) => (
                    <button
                      key={dia}
                      type="button"
                      onClick={() => setCalcDiameter(dia)}
                      className={`py-2 rounded-lg text-xs font-bold font-mono transition border ${
                        calcDiameter === dia 
                          ? 'bg-[#C9252C] text-white border-[#C9252C] shadow-md shadow-red-950/40' 
                          : 'bg-slate-800/90 text-slate-300 border-slate-700 hover:bg-slate-700'
                      }`}
                    >
                      Ф{dia}
                    </button>
                  ))}
                </div>
              </div>

              {/* Length Slider / Input */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-slate-300">
                    طول السيخ (بالمتر):
                  </label>
                  <span className="text-white font-mono text-sm bg-slate-800 px-3 py-1 rounded-md border border-slate-700">
                    {calcLength} م
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="18"
                  step="0.5"
                  value={calcLength}
                  onChange={(e) => setCalcLength(parseFloat(e.target.value))}
                  className="w-full accent-[#C9252C] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>1 م (كانات وتشكيل)</span>
                  <span>12 م (الطول القياسي)</span>
                  <span>18 م (أطوال مخصصة)</span>
                </div>
              </div>

              {/* Quantity Input */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  عدد الأسياخ المطلوبة:
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="1"
                    max="100000"
                    value={calcQuantity}
                    onChange={(e) => setCalcQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-[#C9252C]"
                  />
                  <div className="flex gap-1.5">
                    {[50, 100, 500, 1000].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setCalcQuantity(preset)}
                        className="px-2.5 py-1.5 text-[11px] rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
                      >
                        +{preset}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Calculation Output Card */}
            <div className="lg:col-span-6 bg-gradient-to-br from-[#1E232B] to-[#14181F] p-6 sm:p-8 rounded-2xl border border-red-950/40 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9252C]/10 rounded-full blur-2xl"></div>
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <span className="text-xs font-bold text-slate-400">النتائج الهندسية الفورية</span>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  SASO ASTM A615
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                  <span className="text-slate-400 text-[11px] block mb-1">الوزن النظري للمتر الطولي</span>
                  <div className="text-xl sm:text-2xl font-black text-white font-mono">
                    {calculatedWeight.weightPerMeter} <span className="text-xs text-slate-400 font-sans">كجم/م</span>
                  </div>
                </div>

                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                  <span className="text-slate-400 text-[11px] block mb-1">وزن السيخ الواحد</span>
                  <div className="text-xl sm:text-2xl font-black text-white font-mono">
                    {calculatedWeight.barWeight} <span className="text-xs text-slate-400 font-sans">كجم</span>
                  </div>
                </div>
              </div>

              {/* Total tonnage highlight */}
              <div className="bg-[#C9252C]/10 border border-[#C9252C]/30 p-5 rounded-xl mb-6 text-center">
                <span className="text-xs text-[#E53935] font-bold block mb-1">إجمالي الوزن المحسوب للكمية المطلوبة</span>
                <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
                  {calculatedWeight.totalTons} <span className="text-base font-sans text-slate-300">طن متري</span>
                </div>
                <div className="text-xs text-slate-400 font-mono mt-1">
                  (ما يعادل {calculatedWeight.totalWeightKg} كيلوجرام تقريباً)
                </div>
              </div>

              <button
                onClick={() => {
                  setRfqForm(prev => ({
                    ...prev,
                    tons: calculatedWeight.totalTons,
                    notes: `استعلام من الحاسبة: قطر ${calcDiameter}mm، طول ${calcLength}م، عدد ${calcQuantity} سيخ.`
                  }));
                  openQuoteModalFor(null);
                }}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C9252C] to-[#E53935] text-white text-xs sm:text-sm font-bold shadow-lg shadow-red-950/40 hover:opacity-95 transition flex items-center justify-center gap-2"
              >
                <span>طلب تسعيرة لهذه الكمية فوراً</span>
                <ChevronRight className="w-4 h-4 rotate-180" />
              </button>

            </div>

          </div>

        </div>
      </section>

      {}
      <section id="certifications" className="py-20 bg-[#0F1216]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#C9252C] text-xs font-bold uppercase tracking-wider block mb-1">ضمان الجودة والأمان</span>
            <h2 className="text-3xl font-extrabold text-white">الاعتمادات والمواصفات القياسية</h2>
            <p className="text-slate-400 text-sm mt-2">
              تخضع كافة منتجات كيانكو لبروتوكولات فحص مخبرية دورية لضمان سلامة وأمان المنشآت الهندسية.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CERTIFICATIONS.map((cert, index) => (
              <div 
                key={index}
                className="bg-[#161A20] p-6 rounded-2xl border border-slate-800 hover:border-[#C9252C]/50 transition group"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-800 group-hover:bg-[#C9252C]/10 border border-slate-700 group-hover:border-[#C9252C]/40 flex items-center justify-center text-white group-hover:text-[#C9252C] mb-4 transition font-mono font-bold text-xs">
                  {cert.code.split(' ')[0]}
                </div>
                <h3 className="text-base font-bold text-white mb-2">{cert.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">{cert.desc}</p>
                <div className="flex items-center gap-1.5 text-[11px] text-[#C9252C] font-semibold">
                  <Check className="w-3.5 h-3.5" />
                  <span>معتمد وفعّال</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {}
      <section id="contact" className="py-20 bg-[#14181F] border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#1E232B] to-[#181D24] rounded-3xl border border-slate-700/80 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8 space-y-4">
                <span className="text-[#C9252C] text-xs font-bold uppercase tracking-wider block">فريق المبيعات والمشاريع</span>
                <h2 className="text-2xl sm:text-3xl font-black text-white">هل لديك مشروع قيد التنفيذ أو مناقصة إنشائية؟</h2>
                <p className="text-slate-300 text-sm max-w-xl leading-relaxed">
                  يقدم مهندسونا دراسة فنية دقيقة لجدول تفريد الحديد (BBS) وحساب الأطنان بدقة مع تقديم أفضل الأسعار التنافسية وجداول التوريد الملتزمة.
                </p>
                <div className="flex flex-wrap gap-6 pt-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <PhoneCall className="w-4 h-4 text-[#C9252C]" />
                    <span>هاتف الإدارة والمبيعات: 011-0000000</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#C9252C]" />
                    <span>البريد الإلكتروني: sales@kianko.com</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-3">
                <button
                  onClick={() => openQuoteModalFor(null)}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#C9252C] to-[#E53935] text-white font-bold text-sm shadow-xl shadow-red-950/40 hover:opacity-95 transition text-center"
                >
                  طلب تسعير فوري لمشروعك
                </button>
                <button
                  onClick={() => { setAuthMode('register'); setIsAuthModalOpen(true); }}
                  className="w-full py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs transition text-center"
                >
                  تسجيل حساب شركة جديد
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {}
      <footer className="bg-[#0B0D10] text-slate-400 text-xs py-12 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800/80">
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xl font-black text-white">كيانكـو</span>
                <span className="w-2 h-2 rounded-full bg-[#C9252C]"></span>
                <span className="text-[10px] font-mono text-slate-500">Kianko Steel</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                حلول حديد التسليح وتشكيل الصلب بأعلى معايير الدقة الهندسية، معتمدون في كبرى مشاريع الإنشاءات والبنية التحتية.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-3">المنتجات</h4>
              <ul className="space-y-2">
                <li><a href="#products" className="hover:text-white transition">حديد التسليح المقصوص والمثني</a></li>
                <li><a href="#products" className="hover:text-white transition">شبك التسليح الملحوم (Mesh)</a></li>
                <li><a href="#products" className="hover:text-white transition">الحديد المعالج بالإيبوكسي</a></li>
                <li><a href="#products" className="hover:text-white transition">أسلاك التربيط والجلفنة</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-3">أدوات وخدمات</h4>
              <ul className="space-y-2">
                <li><a href="#calculator" className="hover:text-white transition">حاسبة أوزان الحديد</a></li>
                <li><button onClick={() => { setAuthMode('login'); setIsAuthModalOpen(true); }} className="hover:text-white transition">بوابة عملاء كيانكو</button></li>
                <li><a href="#certifications" className="hover:text-white transition">شهادات الفحص والمختبر</a></li>
                <li><button onClick={() => openQuoteModalFor(null)} className="hover:text-white transition">طلب عروض الأسعار</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-3">ساعات العمل والتوريد</h4>
              <p className="text-slate-400 text-xs leading-relaxed mb-2">
                الإدارة العامة: الأحد - الخميس (8:00 ص - 5:00 م)
              </p>
              <p className="text-slate-400 text-xs leading-relaxed">
                مصانع الشحن والقص: تعمل على مدار 24 ساعة لتلبية طلبات الصب الليلية.
              </p>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500">
            <div>جميع الحقوق محفوظة © {new Date().getFullYear()} شركة كيانكو للصناعات الحديدية (Kianko Steel Industries).</div>
            <div className="mt-2 sm:mt-0 flex gap-4">
              <span>سياسة الخصوصية</span>
              <span>الشروط والأحكام</span>
              <span>المواصفات الفنية المعتمدة</span>
            </div>
          </div>
        </div>
      </footer>

      {}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#181D24] w-full max-w-md rounded-2xl border border-slate-700 p-6 sm:p-8 shadow-2xl relative">
            <button 
              onClick={() => setIsAuthModalOpen(false)}
              className="absolute top-4 left-4 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#C9252C]/10 border border-[#C9252C]/30 flex items-center justify-center text-[#C9252C] mx-auto mb-3">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">
                {authMode === 'login' ? 'بوابة عملاء كيانكو' : 'إنشاء حساب شركة جديد'}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {authMode === 'login' 
                  ? 'سجل الدخول لمتابعة عروض الأسعار وشحنات الحديد' 
                  : 'انضم لشبكة شركاء ومقاولي شركة كيانكو'}
              </p>
            </div>

            {authError && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400 text-center">
                {authError}
              </div>
            )}

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {authMode === 'register' && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">اسم الشركة / المؤسسة</label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: شركة المقاولات العامة"
                      value={authForm.companyName}
                      onChange={(e) => setAuthForm({ ...authForm, companyName: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#C9252C]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">رقم الجوال أو المشتريات</label>
                    <input
                      type="tel"
                      required
                      placeholder="0500000000"
                      value={authForm.phone}
                      onChange={(e) => setAuthForm({ ...authForm, phone: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#C9252C]"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">البريد الإلكتروني للعمل</label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={authForm.email}
                  onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#C9252C]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">كلمة المرور</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={authForm.password}
                  onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#C9252C]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#C9252C] to-[#E53935] text-white text-xs font-bold shadow-md shadow-red-950/40 hover:opacity-95 transition mt-2"
              >
                {authMode === 'login' ? 'دخول للبوابة' : 'تأكيد التسجيل'}
              </button>
            </form>

            <div className="mt-5 text-center text-xs text-slate-400">
              {authMode === 'login' ? (
                <span>
                  ليس لديك حساب شركة؟{' '}
                  <button 
                    onClick={() => { setAuthMode('register'); setAuthError(''); }}
                    className="text-[#C9252C] font-bold hover:underline"
                  >
                    سجل حساباً جديداً
                  </button>
                </span>
              ) : (
                <span>
                  لديك حساب بالفعل؟{' '}
                  <button 
                    onClick={() => { setAuthMode('login'); setAuthError(''); }}
                    className="text-[#C9252C] font-bold hover:underline"
                  >
                    تسجيل الدخول
                  </button>
                </span>
              )}
            </div>

            {/* Supabase backend connection badge */}
            <div className="mt-6 pt-4 border-t border-slate-800 text-center flex items-center justify-center gap-1.5 text-[10px] text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>نظام موثوق متصل بخوادم وقواعد بيانات Supabase الآمنة</span>
            </div>
          </div>
        </div>
      )}

      {}
      {isRfqModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#181D24] w-full max-w-lg rounded-2xl border border-slate-700 p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setIsRfqModalOpen(false)}
              className="absolute top-4 left-4 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>

            {rfqSuccess ? (
              <div className="text-center py-10 space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">تم استلام طلب التسعيرة بنجاح!</h3>
                <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                  تم توجيه طلبك مباشرة إلى مهندسي المبيعات في شركة كيانكو، وسيتواصل معك ممثل الشركة خلال وقت وجيز مع كشف التسعير المبدئي.
                </p>
              </div>
            ) : (
              <>
                <div className="text-right mb-6">
                  <span className="text-[#C9252C] text-[11px] font-bold block mb-1">قسم المبيعات والمشاريع</span>
                  <h3 className="text-xl font-bold text-white">طلب عرض سعر وتوريد حديد</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {rfqTargetProduct 
                      ? `طلب تسعير لمنتج: ${rfqTargetProduct.nameAr}`
                      : 'املأ تفاصيل الكمية وموقع التسليم للحصول على تسعيرة دقيقة'}
                  </p>
                </div>

                <form onSubmit={handleRfqSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">الاسم المسؤول</label>
                      <input
                        type="text"
                        required
                        placeholder="المهندس / مدير المشتريات"
                        value={rfqForm.name}
                        onChange={(e) => setRfqForm({ ...rfqForm, name: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#C9252C]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">اسم الشركة / المشروع</label>
                      <input
                        type="text"
                        required
                        placeholder="شركة المقاولات"
                        value={rfqForm.company}
                        onChange={(e) => setRfqForm({ ...rfqForm, company: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#C9252C]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">رقم الهاتف للتواصل</label>
                      <input
                        type="tel"
                        required
                        placeholder="05xxxxxxxx"
                        value={rfqForm.phone}
                        onChange={(e) => setRfqForm({ ...rfqForm, phone: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#C9252C]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">مدينة / موقع المشروع</label>
                      <input
                        type="text"
                        required
                        placeholder="الرياض / جدة / الدمام..."
                        value={rfqForm.city}
                        onChange={(e) => setRfqForm({ ...rfqForm, city: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#C9252C]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">الكمية التقديرية (طن)</label>
                      <input
                        type="number"
                        min="1"
                        required
                        placeholder="مثال: 100"
                        value={rfqForm.tons}
                        onChange={(e) => setRfqForm({ ...rfqForm, tons: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#C9252C]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">البريد الإلكتروني</label>
                      <input
                        type="email"
                        required
                        placeholder="name@company.com"
                        value={rfqForm.email}
                        onChange={(e) => setRfqForm({ ...rfqForm, email: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#C9252C]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">ملاحظات أو مواصفات خاصة (BBS / أطوال / درجات الصلب)</label>
                    <textarea
                      rows={3}
                      placeholder="اذكر أي تفاصيل متعلقة بجدول التوريد أو القص والثني..."
                      value={rfqForm.notes}
                      onChange={(e) => setRfqForm({ ...rfqForm, notes: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#C9252C]"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C9252C] to-[#E53935] text-white text-xs font-bold shadow-lg shadow-red-950/40 hover:opacity-95 transition"
                  >
                    إرسال طلب التسعير الرسمي
                  </button>
                </form>
              </>
            )}

          </div>
        </div>
      )}

    </div>
  );
}