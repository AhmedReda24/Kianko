import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, 
  Layers, 
  Cpu, 
  FileText, 
  Calculator, 
  Send, 
  CheckCircle2, 
  Download, 
  ChevronRight, 
  Menu, 
  X, 
  LogIn, 
  LogOut, 
  User, 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  Box
} from 'lucide-react';

// كتالوج المنتجات الفعلي المستخرج من مستندات كيانكو
const PRODUCTS_DATA = [
  {
    id: 'cable-tray',
    category: 'cable-management',
    categoryName: 'أنظمة إدارة الكابلات',
    title: 'حوامل الكابلات المثقبة (Perforated Cable Trays)',
    model: 'K-CT Series',
    standards: 'BS EN ISO 1461, NEMA VE-1, ASTM A123',
    specs: {
      widths: '50mm - 1000mm',
      heights: '50, 75, 85, 100mm',
      thickness: '0.8mm - 2.0mm',
      materials: 'مجلفن على الساخن (HDG)، صلب أسود، ستانلس ستيل 304/316'
    },
    description: 'صواني معدنية مثقوبة لتأمين التهوية وحماية خطوط الكابلات مع شفة عائدة (IRF / ORF / Snap-on).',
    image: 'https://images.pexels.com/photos/2569839/pexels-photo-2569839.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'cable-ladder',
    category: 'cable-management',
    categoryName: 'أنظمة إدارة الكابلات',
    title: 'سلالم الكابلات الصناعية (Cable Ladders)',
    model: 'K-CL Welded / Swaged',
    standards: 'NEMA VE-1 Classes (8A to 20C), BS EN ISO 1461',
    specs: {
      widths: '100mm - 1000mm (4" - 40")',
      heights: '110, 125, 150, 184mm',
      thickness: '1.5mm - 2.5mm',
      rungs: 'درج أنبوبي مكبوس (Swaged) أو قطاع C ملحوم (MIG)'
    },
    description: 'أقوى أنظمة حمل الكابلات للأحمال الضخمة والمسافات الطويلة مع تصريف حراري مثالي ومقاومة انحناء فائقة.',
    image: 'https://images.pexels.com/photos/159298/gears-cogs-machine-machinery-159298.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'cable-duct',
    category: 'cable-management',
    categoryName: 'أنظمة إدارة الكابلات',
    title: 'مجاري التوزيع المغلقة (Cable Trunking & Ducts)',
    model: 'K-CD Series',
    standards: 'BS 4678, Aramco SAES-P-104',
    specs: {
      widths: '50mm - 1000mm',
      heights: '50mm - 200mm',
      thickness: '1.0mm - 2.0mm',
      compartments: '1، 2، أو 3 مقاطع معزولة'
    },
    description: 'أنظمة إخفاء وحماية الأسلاك الكهربائية والبيانات مع أغطية محكمة التثبيت (Screw / Butterfly / Snap-on).',
    image: 'https://images.pexels.com/photos/3862601/pexels-photo-3862601.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'c-channel-supports',
    category: 'cable-management',
    categoryName: 'أنظمة التعليق والتثبيت',
    title: 'قنوات اليونيسترات والكوابيل (C-Channels & Strut)',
    model: 'K-CS 41x41 & 41x21',
    standards: 'BS 6946 / ASTM A1011',
    specs: {
      sizes: '41x41mm, 41x21mm, Back-to-Back 82x41mm',
      lengths: '3000mm - 6000mm',
      accessories: 'صواميل زنبركية (Spring Nuts)، كوابيل جدارية، مشابك كمرات'
    },
    description: 'أنظمة تثبيت معيارية قابلة للتعديل بنسبة 100% دون لحام أو ثقب موقعي، مصممة لأقسى البيئات الإنشائية.',
    image: 'https://images.pexels.com/photos/224924/pexels-photo-224924.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'steel-lintels',
    category: 'blockwork-plaster',
    categoryName: 'ملحقات البناء واللياسة',
    title: 'عتبات الصلب الإنشائية (Steel Lintels)',
    model: 'K-MML Series',
    standards: 'BS EN 845-2:2003, BS 5977 Part 2',
    specs: {
      widths: '100mm, 150mm, 200mm, 250mm',
      thickness: '2.0mm - 4.0mm',
      lengths: '900mm إلى 2400mm',
      bearing: 'ارتكاز طرفي 200 مم على الجانبين'
    },
    description: 'عتبات صلب خفيفة الوزن وعالية المتانة للأبواب والنوافذ، توفر 8 أضعاف زمن تركيب العتب الخرساني التقليدي.',
    image: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'wall-ties-beads',
    category: 'blockwork-plaster',
    categoryName: 'ملحقات البناء واللياسة',
    title: 'زوايا وروابط البناء (Wall Ties & Plaster Beads)',
    model: 'K-Beads & Cramps',
    standards: 'BS EN 13658-1/2, ASTM C847, DIN 1053',
    specs: {
      beads: 'Angle Bead, Plaster Stop, Control Joint 10-19mm',
      ties: 'Double Triangle, Frame Cramps, Ladder Reinforcement'
    },
    description: 'مجموعة متكاملة لمنع تشققات اللياسة وربط حوائط البلوك المعزولة والمفرغة بالأعمدة والخرسانة.',
    image: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [quoteDrawerOpen, setQuoteDrawerOpen] = useState(false);
  
  // حالة المستخدم والمصادقة
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState('login');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authCompanyName, setAuthCompanyName] = useState('');

  // حالة حاسبة حوامل الكابلات
  const [calcSpan, setCalcSpan] = useState(2.4);
  const [calcLoad, setCalcLoad] = useState(75);
  const [calcMaterial, setCalcMaterial] = useState('steel');

  // حالة طلب عرض السعر
  const [selectedProductForQuote, setSelectedProductForQuote] = useState('');
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  const filteredProducts = useMemo(() => {
    if (activeTab === 'all') return PRODUCTS_DATA;
    return PRODUCTS_DATA.filter(p => p.category === activeTab);
  }, [activeTab]);

  const calcResult = useMemo(() => {
    const isSteel = calcMaterial === 'steel';
    let recommendedClass = '8A';
    let maxDeflectionMm = (calcSpan * 1000) / 240;

    if (calcLoad <= 50) {
      recommendedClass = calcSpan <= 2.4 ? '8A' : calcSpan <= 3.7 ? '12A' : '16A';
    } else if (calcLoad <= 75) {
      recommendedClass = calcSpan <= 2.4 ? '8B' : calcSpan <= 3.7 ? '12B' : '16B';
    } else {
      recommendedClass = calcSpan <= 2.4 ? '8C' : calcSpan <= 3.7 ? '12C' : '20C';
    }

    return {
      nemaClass: recommendedClass,
      estimatedDeflection: (maxDeflectionMm * (calcLoad / 100) * (isSteel ? 0.8 : 1.2)).toFixed(1),
      suggestedSupport: calcSpan > 3 ? 'C-Channel 41x41 Back-to-Back' : 'C-Channel 41x41 Single'
    };
  }, [calcSpan, calcLoad, calcMaterial]);

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (authMode === 'login') {
      setUser({
        email: authEmail,
        company: 'شركة النماء للمقاولات والهندسة',
      });
    } else {
      setUser({
        email: authEmail,
        company: authCompanyName || 'شركة مقاولات معتمدة',
      });
    }
    setAuthModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const openQuoteForProduct = (prodTitle) => {
    setSelectedProductForQuote(prodTitle);
    setQuoteDrawerOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans antialiased selection:bg-[#C9252C] selection:text-white" dir="rtl">
      
      {/* 1. الشريط العلوي السريع */}
      <div className="bg-[#12161C] border-b border-slate-800 text-xs text-slate-400 py-2 px-4 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-[#C9252C]" /> +966 12 6532361 / 9200 11 787
            </span>
            <span className="hidden sm:flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-[#C9252C]" /> sales@kianko.com.sa
            </span>
            <span className="hidden md:flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#C9252C]" /> المدينة الصناعية الثانية - المملكة العربية السعودية
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded text-[10px] font-medium">
              ISO 9001:2015 & SASO Certified
            </span>
            {user ? (
              <div className="flex items-center gap-2 text-white">
                <User className="w-3.5 h-3.5 text-[#C9252C]" />
                <span className="text-slate-300 font-medium">{user.company}</span>
                <button 
                  onClick={handleLogout}
                  className="text-slate-400 hover:text-[#C9252C] flex items-center gap-1 mr-2"
                >
                  <LogOut className="w-3 h-3" /> خروج
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setAuthModalOpen(true)}
                className="hover:text-white flex items-center gap-1 text-slate-300 font-medium transition"
              >
                <LogIn className="w-3.5 h-3.5 text-[#C9252C]" /> بوابة العملاء والمهندسين
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. شريط التنقل الرئيسي */}
      <nav className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 md:px-12 flex justify-between items-center h-20">
          
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 flex items-center justify-center bg-white rounded-lg p-1.5 shadow-md group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <rect x="15" y="10" width="16" height="80" fill="#1E232A" />
                <path d="M 35 50 L 78 12 L 60 12 L 35 36 Z" fill="#6B6868" />
                <path d="M 35 50 L 78 88 L 60 88 L 35 64 Z" fill="#6B6868" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight text-[#C9252C]">
                كيانكو <span className="text-white text-lg font-light">للصناعات</span>
              </span>
              <span className="text-[10px] tracking-widest text-[#6B6868] font-bold uppercase">
                KIANKO METAL INDUSTRIES
              </span>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
            <a href="#products" className="text-slate-300 hover:text-[#C9252C] transition">المنتجات والحلول</a>
            <a href="#standards" className="text-slate-300 hover:text-[#C9252C] transition">المواصفات والاعتمادات</a>
            <a href="#calculator" className="text-slate-300 hover:text-[#C9252C] transition flex items-center gap-1.5">
              <Calculator className="w-4 h-4 text-[#C9252C]" /> حاسبة الأحمال الإنشائية
            </a>
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <button 
              onClick={() => setQuoteDrawerOpen(true)}
              className="bg-[#C9252C] hover:bg-[#A81C22] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition flex items-center gap-2 shadow-lg shadow-red-950/40"
            >
              طلب عرض سعر (RFQ)
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="lg:hidden p-2 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-6 py-6 space-y-4">
            <a href="#products" onClick={() => setMobileMenuOpen(false)} className="block text-slate-200">المنتجات</a>
            <a href="#standards" onClick={() => setMobileMenuOpen(false)} className="block text-slate-200">الاعتمادات</a>
            <a href="#calculator" onClick={() => setMobileMenuOpen(false)} className="block text-slate-200">حاسبة الأحمال</a>
            <button 
              onClick={() => { setMobileMenuOpen(false); setQuoteDrawerOpen(true); }}
              className="w-full bg-[#C9252C] text-white py-2.5 rounded-lg text-sm font-bold"
            >
              طلب عرض سعر معتمد
            </button>
          </div>
        )}
      </nav>

      {/* 3. واجهة الهيرو */}
      <section className="relative overflow-hidden pt-16 pb-24 md:py-28 border-b border-slate-800 bg-gradient-to-b from-slate-900 via-[#14181F] to-slate-900">
        <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-medium text-slate-300">
              <ShieldCheck className="w-4 h-4 text-[#C9252C]" />
              مطابق لمعايير أرامكو السعودية والمواصفات العالمية NEMA & BS EN
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
              ريادة في تصنيع <span className="text-[#C9252C]">حوامل الكابلات</span> والأنظمة المعدنية الإنشائية
            </h1>
            <p className="text-slate-400 text-base sm:text-lg max-w-2xl leading-relaxed">
              تنتج <strong className="text-white">كيانكو (Kianko)</strong> منظومة متكاملة من حوامل وسلالم الكابلات الصناعية، قطاعات اليونيسترات الداعمة، وعتبات ومستلزمات المباني المقاومة لأقسى الظروف البيئية بأعلى معايير الدقة الهندسية.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <a 
                href="#products"
                className="bg-[#C9252C] hover:bg-[#A81C22] text-white px-7 py-3 rounded-lg font-bold text-sm transition flex items-center gap-2 shadow-xl shadow-red-900/30"
              >
                تصفح المنتجات الهندسية
                <ChevronRight className="w-4 h-4" />
              </a>
              <a 
                href="#calculator"
                className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white px-7 py-3 rounded-lg font-bold text-sm transition flex items-center gap-2"
              >
                <Calculator className="w-4 h-4 text-[#C9252C]" />
                حاسبة انحناء وأحمال الكابلات
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-800">
              <div>
                <p className="text-2xl font-black text-white">NEMA VE-1</p>
                <p className="text-xs text-slate-400">معيار اختبار الأحمال</p>
              </div>
              <div>
                <p className="text-2xl font-black text-[#C9252C]">100%</p>
                <p className="text-xs text-slate-400">جلفنة غمر ساخن مطابقة</p>
              </div>
              <div>
                <p className="text-2xl font-black text-white">SAES-P-104</p>
                <p className="text-xs text-slate-400">اعتماد الكابلات والتمديدات</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-700 bg-slate-800/50 p-2 shadow-2xl">
              <img 
  src="https://images.pexels.com/photos/2569839/pexels-photo-2569839.jpeg?auto=compress&cs=tinysrgb&w=1200" 
  alt="Kianko Factory"
  className="w-full h-80 sm:h-96 object-cover rounded-xl"
/>
            </div>
          </div>
        </div>
      </section>

      {/* 4. كتالوج المنتجات */}
      <section id="products" className="py-20 max-w-7xl mx-auto px-4 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-[#C9252C] font-bold text-xs uppercase tracking-wider mb-2">
              <Box className="w-4 h-4" /> كتالوج منتجات كيانكو
            </div>
            <h2 className="text-3xl font-extrabold text-white">حلول التمديدات الكهربائية والإنشائية</h2>
          </div>

          <div className="flex flex-wrap gap-2 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition ${activeTab === 'all' ? 'bg-[#C9252C] text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >
              جميع المنتجات
            </button>
            <button
              onClick={() => setActiveTab('cable-management')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition ${activeTab === 'cable-management' ? 'bg-[#C9252C] text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >
              أنظمة الكابلات واليونيسترات
            </button>
            <button
              onClick={() => setActiveTab('blockwork-plaster')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition ${activeTab === 'blockwork-plaster' ? 'bg-[#C9252C] text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >
              العتبات وملحقات البناء
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((prod) => (
            <div 
              key={prod.id}
              className="bg-slate-800/40 rounded-2xl border border-slate-800 hover:border-slate-700 overflow-hidden flex flex-col group transition duration-300"
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={prod.image} 
                  alt={prod.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-3 left-3 bg-[#C9252C] text-white text-[11px] font-bold px-2 py-0.5 rounded">
                  {prod.model}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#C9252C] transition-colors">
                    {prod.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {prod.description}
                  </p>
                </div>

                <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-xs space-y-1.5 text-slate-300">
                  <div className="text-slate-400 text-[11px]">المعايير:</div>
                  <div className="font-mono text-emerald-400 text-[11px]">{prod.standards}</div>
                </div>

                <div className="pt-2 flex gap-2">
                  <button 
                    onClick={() => openQuoteForProduct(prod.title)}
                    className="flex-1 bg-[#C9252C] hover:bg-[#A81C22] text-white py-2.5 rounded-lg text-xs font-bold transition"
                  >
                    تسعير فوري
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. الآلة الحاسبة الهندسية */}
      <section id="calculator" className="py-20 bg-[#141820] border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#C9252C] font-bold text-xs uppercase tracking-wider block mb-2">أداة المهندسين</span>
            <h2 className="text-3xl font-black text-white">حاسبة سعة السلم والانحناء (NEMA Class)</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-800 space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  المسافة بين نقاط التعليق (Span): <span className="text-[#C9252C] font-mono text-sm">{calcSpan} متر</span>
                </label>
                <input 
                  type="range" 
                  min="1.8" 
                  max="6.0" 
                  step="0.3"
                  value={calcSpan}
                  onChange={(e) => setCalcSpan(parseFloat(e.target.value))}
                  className="w-full accent-[#C9252C] bg-slate-800 h-2 rounded cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  حمولة الكابلات الإجمالية: <span className="text-[#C9252C] font-mono text-sm">{calcLoad} كجم/متر</span>
                </label>
                <input 
                  type="range" 
                  min="30" 
                  max="250" 
                  step="5"
                  value={calcLoad}
                  onChange={(e) => setCalcLoad(parseInt(e.target.value))}
                  className="w-full accent-[#C9252C] bg-slate-800 h-2 rounded cursor-pointer"
                />
              </div>
            </div>

            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-[#1b222c] p-6 md:p-8 rounded-2xl border border-slate-700/80 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <span className="text-xs font-bold text-slate-400">التوصية الهندسية:</span>
                <span className="bg-[#C9252C]/20 border border-[#C9252C] text-[#C9252C] text-xs font-black px-2.5 py-1 rounded">
                  NEMA {calcResult.nemaClass}
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-xs text-slate-400">الانحناء التقديري في المنتصف:</span>
                  <div className="text-2xl font-mono font-bold text-emerald-400 mt-0.5">
                    ~{calcResult.estimatedDeflection} مم
                  </div>
                </div>
                <div>
                  <span className="text-xs text-slate-400">نظام التعليق المقترح:</span>
                  <p className="text-xs font-semibold text-slate-200 mt-1">
                    {calcResult.suggestedSupport}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. الفوتر */}
      <footer className="bg-[#0e1217] py-12 border-t border-slate-800 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 md:px-12 text-center">
          <p>© 2026 شركة كيانكو للصناعات الحديدية (Kianko Metal Industries). جميع الحقوق محفوظة.</p>
        </div>
      </footer>

      {/* نافذة تسجيل الدخول */}
      {authModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl p-6 shadow-2xl relative">
            <button 
              onClick={() => setAuthModalOpen(false)}
              className="absolute top-4 left-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white text-center mb-4">بوابة العملاء والمقاولين</h3>

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">البريد الإلكتروني</label>
                <input 
                  type="email"
                  required
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  placeholder="engineer@company.com"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">كلمة المرور</label>
                <input 
                  type="password"
                  required
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-[#C9252C] hover:bg-[#A81C22] text-white py-2.5 rounded-lg text-xs font-bold transition"
              >
                دخول فوري
              </button>
            </form>
          </div>
        </div>
      )}

      {/* درج طلب عرض السعر */}
      {quoteDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-900 border-r border-slate-800 w-full max-w-md h-full overflow-y-auto p-6 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <Send className="w-4 h-4 text-[#C9252C]" /> طلب عرض سعر (RFQ)
                </h3>
                <button 
                  onClick={() => { setQuoteDrawerOpen(false); setQuoteSubmitted(false); }}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {quoteSubmitted ? (
                <div className="py-16 text-center space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h4 className="text-white font-bold text-lg">تم استلام طلبكم بنجاح</h4>
                </div>
              ) : (
                <form 
                  onSubmit={(e) => { e.preventDefault(); setQuoteSubmitted(true); }}
                  className="space-y-4 mt-6 text-xs"
                >
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">المنتج المطلوب</label>
                    <input 
                      type="text" 
                      defaultValue={selectedProductForQuote || 'حوامل وسلالم كابلات'}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">اسم المسؤول</label>
                    <input 
                      type="text" 
                      required 
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">رقم الجوال</label>
                    <input 
                      type="tel" 
                      required 
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-[#C9252C] hover:bg-[#A81C22] text-white py-3 rounded-lg font-bold transition"
                  >
                    إرسال الطلب
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}