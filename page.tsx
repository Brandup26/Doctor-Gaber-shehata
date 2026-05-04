// app/page.tsx - ملف واحد كامل لموقع معمل تحاليل طبي احترافي
"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  FlaskConical,
  Home,
  Syringe,
  Microscope,
  Heart,
  Calendar,
  FileText,
  User,
  ChevronLeft,
  ChevronRight,
  Shield,
  Clock,
  Award,
  Phone,
  Mail,
  MapPin,
  Activity,
  Droplet,
  Brain,
  Bone,
  Stethoscope
} from "lucide-react";

export default function MedicalLabWebsite() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [activePortalTab, setActivePortalTab] = useState<"results" | "appointments" | "profile">("results");
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const services = [
    { icon: Droplet, title: "تحاليل الدم الشاملة", desc: "أكثر من 100 نوع من التحاليل الدقيقة", color: "#0055ff", bg: "bg-blue-50" },
    { icon: Home, title: "سحب عينات المنزل", desc: "خدمة مجانية خلال 60 دقيقة 24/7", color: "#0055ff", bg: "bg-blue-50" },
    { icon: Microscope, title: "الفحص المجهري", desc: "تشخيص دقيق باستخدام أحدث التقنيات", color: "#0055ff", bg: "bg-blue-50" },
    { icon: Heart, title: "رعاية القلب", desc: "باقة متكاملة لصحة القلب والشرايين", color: "#0055ff", bg: "bg-blue-50" },
    { icon: Brain, title: "تحاليل الأعصاب", desc: "تشخيص أمراض الجهاز العصبي", color: "#0055ff", bg: "bg-blue-50" },
    { icon: Bone, title: "تحاليل العظام", desc: "قياس كثافة المعادن والفيتامينات", color: "#0055ff", bg: "bg-blue-50" },
  ];

  const recentResults = [
    { name: "صورة دم كاملة CBC", date: "2024-01-20", status: "Normal", value: "طبيعي", doctor: "د. أحمد علي" },
    { name: "دهون ثلاثية Triglycerides", date: "2024-01-18", status: "Abnormal", value: "مرتفع", doctor: "د. سارة محمود" },
    { name: "هرمون الغدة TSH", date: "2024-01-15", status: "Normal", value: "طبيعي", doctor: "د. محمد إبراهيم" },
    { name: "فيتامين د Vitamin D", date: "2024-01-14", status: "Pending", value: "قيد التحليل", doctor: "—" },
  ];

  const appointments = [
    { test: "سكر صائم FBS", date: "الخميس 25 يناير", time: "08:00 ص", type: "سحب منزلي", status: "confirmed" },
    { test: "وظائف كبد LFT", date: "الأحد 28 يناير", time: "09:30 ص", type: "زيارة معمل", status: "pending" },
    { test: "تحليل بول كامل", date: "الأربعاء 31 يناير", time: "10:00 ص", type: "سحب منزلي", status: "confirmed" },
  ];

  const stats = [
    { value: "+50,000", label: "مريض وثقوا بنا", icon: User },
    { value: "99.7%", label: "دقة النتائج", icon: Activity },
    { value: "24/7", label: "دعم فني", icon: Clock },
    { value: "معتمد", label: "NABL + ISO", icon: Award },
  ];

  const navLinks = ["الرئيسية", "الخدمات", "عن المختبر", "اتصل بنا"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 font-sans" dir="rtl">
      {/* ========== NAVBAR ========== */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-lg border-b border-gray-100"
            : "bg-white/70 backdrop-blur-md shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <motion.div
                whileHover={{ rotate: 10, scale: 1.05 }}
                className="w-10 h-10 bg-gradient-to-br from-[#0055ff] to-[#00a3ff] rounded-xl flex items-center justify-center shadow-md"
              >
                <FlaskConical className="w-5 h-5 text-white" />
              </motion.div>
              <div>
                <span className="font-bold text-xl text-gray-800">معمل<span className="text-[#0055ff]">التحاليل</span></span>
                <p className="text-[10px] text-gray-400 -mt-1">دقة · ثقة · تميز</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={idx}
                  href="#"
                  whileHover={{ scale: 1.05 }}
                  className="text-gray-700 hover:text-[#0055ff] transition-colors font-medium"
                >
                  {link}
                </motion.a>
              ))}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#0055ff] to-[#00a3ff] text-white px-6 py-2.5 rounded-full font-semibold shadow-md hover:shadow-lg transition-all"
              >
                بوابة المرضى
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white/95 backdrop-blur-xl border-t"
            >
              <div className="px-4 py-4 space-y-3">
                {navLinks.map((link, idx) => (
                  <a key={idx} href="#" className="block text-gray-700 hover:text-[#0055ff] py-2 font-medium">
                    {link}
                  </a>
                ))}
                <button className="w-full bg-[#0055ff] text-white py-3 rounded-xl font-semibold">
                  بوابة المرضى
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ========== HERO SECTION ========== */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#0055ff]/5 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#00a3ff]/5 to-transparent rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[#0055ff]/[0.02] rounded-full blur-2xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0055ff]/10 text-[#0055ff] text-sm font-semibold mb-6"
              >
                <Shield className="w-4 h-4" />
                <span>معتمد دولياً · NABL + ISO 15189</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 mb-4"
              >
                دقة التحليل
                <span className="block text-transparent bg-clip-text bg-gradient-to-l from-[#0055ff] to-[#00a3ff]">
                  تلتقي بالتميز الطبي
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-gray-600 mb-8 leading-relaxed"
              >
                أكثر من ٥٠ ألف مريض وثقوا بنا. أحدث التقنيات المخبرية، نتائج دقيقة خلال ٢٤ ساعة، 
                خدمة سحب عينات من المنزل مجاناً.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-[#0055ff] to-[#00a3ff] text-white px-8 py-3.5 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all text-lg flex items-center justify-center gap-2"
                >
                  <Home className="w-5 h-5" />
                  اطلب عينة من المنزل
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-[#0055ff] text-[#0055ff] px-8 py-3.5 rounded-full font-semibold hover:bg-[#0055ff] hover:text-white transition-all text-lg"
                >
                  عرض النتائج
                </motion.button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-gray-200"
              >
                {stats.map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <stat.icon className="w-6 h-6 text-[#0055ff] mx-auto mb-2" />
                    <div className="text-xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Image Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0055ff]/30 to-transparent z-10" />
                <img
                  src="https://images.unsplash.com/photo-1579154204601-0154f3516ac5?w=800&h=600&fit=crop"
                  alt="Medical Lab"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 z-20">
                  <p className="text-white font-semibold text-lg">أحدث أجهزة التحليل</p>
                  <p className="text-white/80 text-sm">دقة وسرعة فائقة</p>
                </div>
              </div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute -top-4 -right-4 bg-white rounded-xl shadow-xl p-3 flex items-center gap-2"
              >
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-bold text-sm">اعتماد دولي</p>
                  <p className="text-[10px] text-gray-500">ISO 15189:2022</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== SERVICES SECTION ========== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0055ff]/10 text-[#0055ff] text-sm font-semibold mb-4">
              <FlaskConical className="w-4 h-4" />
              <span>خدماتنا المتكاملة</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">جميع التحاليل في مكان واحد</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              نقدم أكثر من ٨٠٠ نوع من التحاليل الطبية بأعلى معايير الدقة والجودة
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
                className="relative cursor-pointer group"
              >
                <motion.div
                  animate={{
                    y: hoveredCard === idx ? -8 : 0,
                    boxShadow: hoveredCard === idx ? "0 25px 40px -12px rgba(0,85,255,0.3)" : "0 10px 25px -5px rgba(0,0,0,0.05)"
                  }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-[#0055ff]/30 relative overflow-hidden"
                >
                  <div className={`${service.bg} w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all`}>
                    <service.icon className="w-7 h-7 text-[#0055ff]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.desc}</p>
                  <motion.div
                    animate={{ x: hoveredCard === idx ? 5 : 0 }}
                    className="flex items-center gap-1 text-[#0055ff] font-semibold text-sm mt-4"
                  >
                    <span>اعرف التفاصيل</span>
                    <ChevronLeft className="w-4 h-4" />
                  </motion.div>
                </motion.div>
                {hoveredCard === idx && (
                  <motion.div
                    layoutId="cardGlow"
                    className="absolute inset-0 rounded-2xl border-2 border-[#0055ff]/40 pointer-events-none"
                  />
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <button className="text-[#0055ff] font-semibold hover:text-[#0044cc] inline-flex items-center gap-2">
              عرض جميع الخدمات
              <ChevronLeft className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ========== PATIENT PORTAL SECTION ========== */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0055ff]/10 text-[#0055ff] text-sm font-semibold mb-4">
              <User className="w-4 h-4" />
              <span>بوابة المرضى الإلكترونية</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">لوحة تحكم صحتك</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              تابع نتائج تحاليلك، واعرف مواعيدك القادمة من خلال لوحة تحكم واحدة
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Patient Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="lg:col-span-4"
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="bg-gradient-to-l from-[#0055ff] to-[#00a3ff] p-6 text-white relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full" />
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur">
                      <User className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">أحمد محمود إبراهيم</h3>
                      <p className="text-white/80 text-sm flex items-center gap-1">
                        <Shield className="w-3 h-3" />
                        رقم المريض: M-24589-24
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-500">آخر فحص</span>
                      <span className="font-semibold">٢٠ يناير ٢٠٢٤</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-500">التقارير المعلقة</span>
                      <span className="font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">١</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-500">الزيارات</span>
                      <span className="font-semibold">١٢ زيارة</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-500">درجة الصحة</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="w-[87%] h-full bg-green-500 rounded-full" />
                        </div>
                        <span className="font-semibold text-green-600">٨٧%</span>
                      </div>
                    </div>
                  </di