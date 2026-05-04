"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FlaskConical, Syringe, ShieldCheck, Microscope, Clock, MapPin, Phone, Activity } from 'lucide-react';

export default function MedicalLab() {
  return (
    <div className="min-h-screen bg-white font-sans text-right" dir="rtl">
      {/* Header الفخم */}
      <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-blue-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-200">
              <FlaskConical className="text-white w-7 h-7" />
            </div>
            <span className="text-2xl font-black text-slate-800 tracking-tight">تكنو<span className="text-blue-600">لاب</span></span>
          </div>
          <button className="bg-slate-900 text-white px-7 py-2.5 rounded-full font-bold hover:bg-blue-600 transition-all shadow-md">
            نتائج التحاليل
          </button>
        </div>
      </nav>

      {/* Hero Section - واجهة تفتح النفس */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-6">
              <Activity className="w-4 h-4" /> معتمد دولياً وحاصل على ISO
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[1.1] mb-8">
              دقة تمنحك <br/>
              <span className="text-blue-600 text-6xl">راحة البال</span>
            </h1>
            <p className="text-slate-600 text-xl leading-relaxed mb-10 max-w-lg">
              في معامل تكنولاب، نجمع بين أحدث التكنولوجيا العالمية والخبرة الطبية لتقديم أدق النتائج في أسرع وقت.
            </p>
            <div className="flex flex-wrap gap-5">
              <button className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-transform shadow-xl shadow-blue-200 flex items-center gap-3">
                <Syringe className="w-6 h-6" /> اطلب سحب منزلي
              </button>
              <button className="bg-white border-2 border-slate-100 text-slate-700 px-10 py-5 rounded-2xl font-black text-lg hover:bg-slate-50 transition-colors">
                باقات الفحص
              </button>
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="relative">
            <div className="absolute -inset-4 bg-blue-100 rounded-[50px] rotate-3 blur-sm -z-10"></div>
            <img src="https://images.unsplash.com/photo-1581594632702-fbdc51b2763b?q=80&w=1000" 
                 className="rounded-[40px] shadow-2xl border-4 border-white" alt="Medical Lab" />
          </motion.div>
        </div>
      </section>

      {/* المميزات السريعة */}
      <div className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          {[
            { t: "نتائج سريعة", d: "استلم نتائجك خلال ساعات عبر الواتساب", i: Clock },
            { t: "أحدث الأجهزة", d: "تكنولوجيا ألمانية متطورة لضمان الدقة", i: Microscope },
            { t: "خصوصية تامة", d: "تشفير كامل لبيانات المرضى ونتائجهم", i: ShieldCheck },
          ].map((item, index) => (
            <div key={index} className="bg-white p-8 rounded-3xl border border-slate-100 hover:shadow-xl transition-shadow">
              <item.i className="w-12 h-12 text-blue-600 mb-6" />
              <h3 className="text-xl font-bold mb-3">{item.t}</h3>
              <p className="text-slate-500 leading-relaxed">{item.d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
