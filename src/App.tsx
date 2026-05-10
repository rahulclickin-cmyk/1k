/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Target, 
  TrendingDown, 
  Users, 
  MapPin, 
  PlayCircle, 
  MessageSquare, 
  ShieldCheck, 
  Layout, 
  BarChart3, 
  Calendar, 
  ChevronRight, 
  AlertTriangle,
  Stethoscope,
  Box,
  Zap,
  Info,
  CheckCircle2,
  XCircle,
  ArrowRight,
  TrendingUp,
  Search,
  PieChart
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell,
  Legend,
  AreaChart,
  Area
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Data ---
const cpaData = [
  { name: 'Week 1', cpa: 45, leads: 250 },
  { name: 'Week 2', cpa: 32, leads: 480 },
  { name: 'Week 3', cpa: 28, leads: 720 },
  { name: 'Week 4', cpa: 20, leads: 1050 },
];

const demographicData = [
  { age: '25-34', percentage: 45, label: 'Young Prof.' },
  { age: '35-44', percentage: 35, label: 'Mid-Career' },
  { age: '45-54', percentage: 15, label: 'Established' },
  { age: '55+', percentage: 5, label: 'Senior' },
];

const budgetData = [
  { name: 'Advantage+ Prospecting', value: 13000, color: '#14b8a6' },
  { name: 'Warm Retargeting', value: 5000, color: '#1e3a8a' },
  { name: 'Creative A/B Testing', value: 2000, color: '#ea580c' },
];

const stats = [
  { id: 'leads', icon: Target, label: 'Daily Lead Goal', value: '1,000+', trend: 'Qualified Leads', color: 'text-slate-900', bg: 'bg-white' },
  { id: 'budget', icon: BarChart3, label: 'Daily Budget', value: '₹20K', trend: 'Scaling Framework', color: 'text-slate-900', bg: 'bg-white' },
  { id: 'cpa', icon: TrendingDown, label: 'Target CPA', value: '₹20', trend: 'Cost Per Lead', color: 'text-orange-600', bg: 'bg-white border-orange-200' },
  { id: 'geo', icon: MapPin, label: 'Geo-Target', value: 'Delhi', trend: 'NCR Region Focus', color: 'text-slate-900', bg: 'bg-white' },
];

const creativeFormats = [
  {
    title: 'Contrarian Hook',
    icon: PlayCircle,
    color: 'bg-slate-800',
    hook: '"Everyone says Ashwagandha is enough, but they don\'t know the truth..."',
    body: 'Sparks curiosity by challenging common knowledge. Positions the unique blend as the missing link.',
    cta: '"Click below to see what the experts are actually using."'
  },
  {
    title: 'The Relatable POV',
    icon: AlertTriangle,
    color: 'bg-orange-700',
    hook: '"Does your office stress follow you to the bedroom every single evening?"',
    body: 'Addresses the core issue directly but through a stress-relief lens to comply with policies.',
    cta: '"Rediscover your natural energy today. Discreet delivery guaranteed."'
  },
  {
    title: 'The Expert Authority',
    icon: Stethoscope,
    color: 'bg-teal-700',
    hook: '"The 3 secret Ayurvedic herbs Delhi experts recommend for men\'s wellness..."',
    body: 'Leverages Authority (Doctors in white coats) to build instant trust and scientific backing.',
    cta: '"Book your free consultation with our senior Vaidyas."'
  },
  {
    title: 'The Visual Stop',
    icon: Zap,
    color: 'bg-indigo-700',
    hook: '(Visual hook: No sound) Showing pure resinous Shilajit dissolving in warm water.',
    body: 'Proves purity and quality visually without needing a voiceover. Extremely high retention rate.',
    cta: '"Buy 100% Pure Himalayan Shilajit. Trusted by 4L+ Indians."'
  }
];

const organicPillars = [
  { day: 'Monday', title: 'Myth vs Truth', desc: 'Debunk common misconceptions like "Herbs work instantly" to set realistic expectations and build trust.', icon: ShieldCheck },
  { day: 'Wednesday', title: 'Ingredient Spotlight', desc: 'Deep dive into Gokshura or Shilajit benefits using high-quality educational animations.', icon: Search },
  { day: 'Friday', title: 'Behind the Scenes', desc: 'Show the "Privacy-First" shipping process in our Delhi warehouse. "Brown-box" unboxing.', icon: Box },
  { day: 'Sunday', title: 'Customer Trust', desc: 'Weekly roundup of text reviews or anonymous video testimonials (Social Proof).', icon: Users },
];

const landingPageOptimizations = [
  { title: 'Ultra-Fast Loading', desc: 'Targeting < 2s load time on mobile networks (5G/4G) to minimize bounce rates.', icon: Zap },
  { title: 'Interactive Quiz', desc: 'Replacing standard forms with a 3-question "Wellness Assessment" to qualify leads.', icon: MessageSquare },
  { title: 'Local Trust Badges', desc: 'Visible AYUSH Ministry & GMP certifications + "Discreet Delivery" stickers.', icon: CheckCircle2 },
  { title: 'WhatsApp Integration', desc: 'Floating "Chat with Doc" button to capture high-intent traffic instantly (98% open rate).', icon: MessageSquare },
];

const implementationSteps = [
  { week: 'Week 1', title: 'Phase 1: Validation', tasks: ['Produce 10 different hooks with 5 base videos', 'Set up Advantage+ Prospecting campaigns', 'Establish baseline CPL targets'] },
  { week: 'Week 2', title: 'Phase 2: Broad Scaling', tasks: ['Scale winning creatives to Pan-India broad targeting', 'Age focus (25-55) with value-based bidding', 'Focus on Tier 2/3 cities for lower CPL'] },
  { week: 'Week 3', title: 'Phase 3: Automation', tasks: ['Connect Meta Conversational Ads to WhatsApp Flows', 'Deploy Server-Side API (CAPI) for better tracking', 'Automate lead scoring into CRM'] },
  { week: 'Week 4', title: 'Phase 4: Optimization', tasks: ['Refresh all creative hooks (Creative Fatigue prevention)', 'Scale winning NCR segments to 1000+ daily', 'Launch retention campaigns for existing leads'] }
];

// --- Components ---

const Card = ({ children, className, id, noGlass }: { children: React.ReactNode; className?: string; id?: string; noGlass?: boolean }) => (
  <motion.div 
    id={id}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={cn(
      "rounded-2xl p-6 overflow-hidden transition-all duration-300",
      !noGlass && "glass-card",
      className
    )}
  >
    {children}
  </motion.div>
);

const SectionTitle = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="text-center mb-10">
    <h2 className="text-3xl font-bold font-display tracking-tight text-slate-900">{title}</h2>
    {subtitle && <p className="text-slate-600 mt-2 max-w-2xl mx-auto">{subtitle}</p>}
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('kpi');

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="bg-slate-900 text-white sticky top-0 z-50 shadow-lg select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-orange-500 p-1.5 rounded-lg">
                <Zap className="w-5 h-5 text-white fill-current" />
              </div>
              <span className="font-bold text-xl tracking-tight hidden sm:block">
                Project 1K <span className="text-orange-500">Delhi</span>
              </span>
            </div>
            <div className="flex space-x-1 sm:space-x-4 overflow-x-auto no-scrollbar py-2">
              {['KPI', 'Funnel', 'Creatives', 'Budget', 'Plan'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setActiveTab(item.toLowerCase())}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-sm font-medium transition-all whitespace-nowrap",
                    activeTab === item.toLowerCase() ? "bg-slate-700 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  )}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        {/* Header */}
        <header className="text-center max-w-4xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 font-display leading-[1.1]">
              Scaling to <span className="gradient-text">1,000 Leads/Day</span> <br />
              <span className="text-slate-800 text-3xl md:text-5xl">Delhi Men's Wellness Strategy 2026</span>
            </h1>
          </motion.div>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-light">
            Dominating the Delhi NCR Ayurvedic market using Meta's latest <span className="font-semibold text-slate-900 italic">Advantage+ AI</span> algorithms and high-engagement short-form video funnels.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
            <div className="inline-flex items-center space-x-2 bg-orange-50 text-orange-700 px-4 py-2 rounded-full text-sm font-medium border border-orange-100 shadow-sm">
              <AlertTriangle className="w-4 h-4" />
              <span>Policy: Focusing on "Energy & Stamina" to protect ad accounts.</span>
            </div>
          </div>
        </header>

        {/* KPI Grid */}
        <section id="kpi" className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat, i) => (
            <Card key={stat.id} className={cn("flex flex-col items-center text-center group", stat.bg)}>
              <div className="bg-slate-100 p-3 rounded-2xl mb-4 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                <stat.icon className="w-6 h-6" />
              </div>
              <h3 className="text-slate-500 text-[10px] uppercase tracking-[0.2em] font-bold">{stat.label}</h3>
              <p className={cn("text-2xl md:text-4xl font-extrabold mt-1", stat.color)}>{stat.value}</p>
              <p className="text-xs text-slate-500 font-medium mt-2">{stat.trend}</p>
            </Card>
          ))}
        </section>

        {/* Executive Summary */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card noGlass className="md:col-span-2 bg-slate-900 text-white border-0 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-orange-600/30 rounded-full blur-3xl"></div>
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center space-x-2 mb-4">
                <ShieldCheck className="w-6 h-6 text-orange-400" />
                <h3 className="text-xl font-bold text-white">Executive Summary for 2026 Pivot</h3>
              </div>
              <p className="text-slate-200 leading-relaxed text-sm md:text-base mb-6 font-normal">
                "Sir, in 2026, Meta Ads is no longer about manual targeting; it's about <span className="text-white font-bold underline decoration-orange-500 underline-offset-4">Creative Intelligence</span>. By utilizing Advantage+ campaigns tailored specifically for Delhi NCR, and running UGC-style, policy-compliant Reels (focusing on Ayurveda/Stress), we can scale aggressively. With a ₹20k daily spend, optimizing down to a <span className="text-orange-400 font-black">₹20 CPA</span>, we will hit our target of 1,000 qualified phone numbers daily for the sales team to close."
              </p>
              <div className="mt-auto pt-6 flex items-center justify-between border-t border-slate-700/50">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[8px] font-bold text-white">
                    {['RE','AI','V3','D2'][i-1]}
                    </div>
                  ))}
                </div>
                <div className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">Verified Strategy v2.6</div>
              </div>
            </div>
          </Card>
          <Card noGlass className="bg-orange-600 text-white border-0 shadow-xl hover:shadow-orange-500/20 transition-all group">
            <div className="flex flex-col h-full">
              <TrendingUp className="w-8 h-8 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-4 text-white">Success Metrics</h3>
              <ul className="space-y-4">
                <li className="flex items-center justify-between text-sm">
                  <span className="text-orange-100 font-medium">Projected ROAS</span>
                  <span className="font-black text-white">3.2x</span>
                </li>
                <li className="flex items-center justify-between text-sm">
                  <span className="text-orange-100 font-medium">Avg. Click Rate</span>
                  <span className="font-black text-white">2.8%</span>
                </li>
                <li className="flex items-center justify-between text-sm">
                  <span className="text-orange-100 font-medium">Leads/Day Target</span>
                  <span className="font-black text-white">1,000</span>
                </li>
                <li className="flex items-center justify-between text-sm border-t border-orange-500 pt-3 mt-1">
                  <span className="text-orange-100 font-medium">Ad Spend/Lead</span>
                  <span className="font-black text-white text-lg">₹20</span>
                </li>
              </ul>
            </div>
          </Card>
        </section>

        {/* Charts Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="min-h-[400px]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-slate-800">CPA Optimization Curve</h3>
                <p className="text-xs text-slate-500">Learning phase vs Scaling phase (Price per Lead)</p>
              </div>
              <div className="bg-slate-100 p-2 rounded-lg text-[10px] font-bold text-slate-600 flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                <span>TARGET ₹20</span>
              </div>
            </div>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={cpaData}>
                  <defs>
                    <linearGradient id="colorCpa" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ea580c" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ea580c" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} dy={10} />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="cpa" stroke="#ea580c" strokeWidth={3} fillOpacity={1} fill="url(#colorCpa)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="min-h-[400px]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-slate-800">Age Demographics (Delhi)</h3>
                <p className="text-xs text-slate-500">Targeting focus based on NCR competitor analysis</p>
              </div>
              <Users className="w-5 h-5 text-slate-400" />
            </div>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={demographicData} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis dataKey="age" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#1e293b', fontWeight: 600 }} width={60} />
                  <Tooltip 
                     cursor={{fill: '#f8fafc'}}
                     contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="percentage" radius={[0, 4, 4, 0]} barSize={32}>
                    {demographicData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#1e3a8a', '#14b8a6', '#ea580c', '#94a3b8'][index % 4]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </section>

        {/* 2026 Tech Stack & Updates */}
        <section className="space-y-10">
          <SectionTitle 
            title="2026 Meta Platform Updates" 
            subtitle="Harnessing the latest AI-driven features to maintain a competitive edge in the NCR market."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-l-4 border-blue-500">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Zap className="w-5 h-5 text-blue-600" />
                </div>
                <h4 className="font-bold text-slate-900">Advantage+ Creative</h4>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">
                Meta's 2026 AI automatically swaps hooks, music, and text overlays based on real-time engagement in Delhi. We simply provide the "Raw Assets".
              </p>
            </Card>
            <Card className="border-l-4 border-purple-500">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-purple-100 p-2 rounded-lg">
                   <Users className="w-5 h-5 text-purple-600" />
                </div>
                <h4 className="font-bold text-slate-900">AI-Predictive LAL</h4>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">
                Lookalike audiences now use "Value-Based" bidding, targeting users in Delhi NCR most likely to complete a high-value Ayurvedic consultation.
              </p>
            </Card>
            <Card className="border-l-4 border-teal-500">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-teal-100 p-2 rounded-lg">
                  <MessageSquare className="w-5 h-5 text-teal-600" />
                </div>
                <h4 className="font-bold text-slate-900">Conversational AI</h4>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">
                Direct Click-to-WhatsApp integration with Meta's Llama-3 based business agents for 24/7 lead qualification before the human agent calls.
              </p>
            </Card>
          </div>
        </section>

        {/* Strategy: Funnel */}
        <section id="funnel" className="space-y-10">
          <SectionTitle 
            title="The 2026 Conversion Funnel" 
            subtitle="How we turn scrolling attention into qualified Ayurvedic consultations seamlessly within the Meta ecosystem."
          />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
             <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 transform -translate-y-1/2 z-0"></div>
             {[
               { id: 1, color: 'border-orange-500', title: 'Hook & Educate', desc: 'Short-form Reels (15-30s). Relatable Delhi-centric scenarios using native aesthetics.', icon: PlayCircle },
               { id: 2, color: 'border-orange-400', title: 'Advantage+ Targeting', desc: 'Allow Meta AI to find 28-45 yr old men in NCR suffering from fatigue/stress.', icon: Target },
               { id: 3, color: 'border-teal-400', title: 'AI Lead Form', desc: 'Instant Form with conditional logic. Asking age & concerns to filter junk leads.', icon: Layout },
               { id: 4, color: 'border-teal-500', title: 'WhatsApp Speed', desc: 'Automated ping instantly. Tele-caller closes with "Discreet Delivery" promise.', icon: MessageSquare },
             ].map((step) => (
               <div key={step.id} className={cn("glass-card relative z-10 rounded-2xl p-6 border-t-4 shadow-sm group hover:shadow-md transition-shadow", step.color)}>
                  <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center text-sm font-bold mb-4 shadow-lg group-hover:scale-110 transition-transform">
                    {step.id}
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2">{step.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
               </div>
             ))}
          </div>
        </section>

        {/* Strategy: Creatives */}
        <section id="creatives" className="space-y-10">
          <SectionTitle 
            title="Ad Copy & Hook Strategy" 
            subtitle="In 2026, Meta's Andromeda algorithm prioritizes creative signals over interest targeting. Every hook must be a pattern interrupter."
          />
          
          <div className="bg-slate-50 rounded-2xl p-8 mb-12 border border-slate-200">
             <div className="flex items-center space-x-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                <Info className="w-4 h-4" />
                <span>Primary Ad Copy Example</span>
             </div>
             <blockquote className="text-slate-800 italic text-lg border-l-4 border-orange-500 pl-6 leading-relaxed">
               "Don't let fatigue and stress shadow your confidence. 📉 Our AUYSH-certified formula combines 5000-year-old wisdom with modern results. Harness the natural power of Shilajit, Ashwagandha, and Safed Musli. Trusted by 4 Lakh+ Indian men. <span className="font-bold">100% Discreet Delivery from Delhi to Pan-India.</span> Click for a free private consultation."
             </blockquote>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {creativeFormats.map((format, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-all group">
                <div className={cn("p-4 flex items-center space-x-3 text-white", format.color)}>
                  <format.icon className="w-5 h-5" />
                  <h4 className="font-bold text-sm">{format.title}</h4>
                </div>
                <div className="p-5 space-y-4">
                  <div className="space-y-1">
                    <div className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">Hook</div>
                    <p className="text-slate-900 font-semibold text-sm leading-tight italic">
                      {format.hook}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Psychology</div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {format.body}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-50">
                    <p className="text-[10px] font-bold text-teal-600 uppercase mb-1">Call to Action</p>
                    <p className="text-[11px] font-medium text-slate-700">{format.cta}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Organic Strategy */}
        <section className="space-y-10">
          <SectionTitle 
            title="30-Day Organic Trust Strategy" 
            subtitle="Ads capture attention, but organic content builds the trust required for high-ticket consultations."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {organicPillars.map((pillar, idx) => (
              <Card key={idx} className="bg-white border-slate-100 hover:border-orange-200 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{pillar.day}</span>
                  <pillar.icon className="w-5 h-5 text-slate-400" />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">{pillar.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{pillar.desc}</p>
              </Card>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 text-white rounded-2xl p-6 flex items-center space-x-6">
               <div className="bg-orange-500 p-3 rounded-xl shrink-0">
                  <Users className="w-6 h-6" />
               </div>
               <div>
                  <h4 className="font-bold">Daily Polls</h4>
                  <p className="text-xs text-slate-400 mt-1">"How fatigued are you feeling today?" Capture intent via Instagram Story polls to retarget.</p>
               </div>
            </div>
            <div className="bg-slate-900 text-white rounded-2xl p-6 flex items-center space-x-6">
               <div className="bg-teal-500 p-3 rounded-xl shrink-0">
                  <MessageSquare className="w-6 h-6" />
               </div>
               <div>
                  <h4 className="font-bold">Vaidiya Q&A</h4>
                  <p className="text-xs text-slate-400 mt-1">Directly answer anonymous questions from Delhi followers to reduce consultation friction.</p>
               </div>
            </div>
          </div>
        </section>

        {/* Funnel & LP Optimization */}
        <section className="space-y-10">
           <SectionTitle 
            title="Landing Page & Funnel Mastery" 
            subtitle="Every millisecond counts. In 2026, friction-less movement from Ad to WhatsApp is the winning key."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {landingPageOptimizations.map((opt, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="bg-slate-50 p-3 rounded-full mb-4">
                  <opt.icon className="w-6 h-6 text-slate-900" />
                </div>
                <h4 className="font-bold text-sm mb-2">{opt.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{opt.desc}</p>
              </div>
            ))}
          </div>
          <Card className="bg-teal-900 text-white border-0 py-8 relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-r from-teal-800 to-transparent"></div>
             <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-6 gap-8">
                <div className="flex items-center space-x-4">
                   <div className="bg-teal-500 p-3 rounded-full">
                      <Zap className="w-8 h-8 text-white" />
                   </div>
                   <div>
                      <h3 className="text-2xl font-bold italic">Scaling Pro Tip</h3>
                      <p className="text-teal-200 mt-1 max-w-lg">Targeting Tier 2/3 cities (UP, Bihar, MP) alongside Delhi often yields 40% lower CPAs than purely competitive metro markets.</p>
                   </div>
                </div>
                <div className="flex -space-x-3">
                   {[1,2,3,4,5].map(i => (
                     <div key={i} className="w-12 h-12 rounded-full border-4 border-teal-900 bg-teal-800 flex items-center justify-center text-xs font-bold shadow-lg">
                       L{i}
                     </div>
                   ))}
                </div>
             </div>
          </Card>
        </section>

        {/* Budget & Markets */}
        <section id="budget" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <Card className="min-h-[450px] flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-800">Daily Budget Spend (₹20,000)</h3>
                  <p className="text-xs text-slate-500">Allocation across Advantage+ and Retargeting</p>
                </div>
                <PieChart className="w-5 h-5 text-slate-400" />
              </div>
              <div className="flex-1 min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={budgetData}
                      cx="50%"
                      cy="45%"
                      innerRadius={80}
                      outerRadius={110}
                      paddingAngle={8}
                      dataKey="value"
                    >
                      {budgetData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
           </Card>

           <div className="space-y-6">
             <Card className="bg-white border-slate-100 flex flex-col h-full">
               <div className="flex items-center space-x-2 mb-6">
                  <Search className="w-5 h-5 text-slate-400" />
                  <h3 className="font-bold text-slate-800">Competitor Insights (Delhi Market)</h3>
               </div>
               <div className="space-y-6 flex-1">
                 <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Winning Angle: Stress Relief masking</p>
                      <p className="text-xs text-slate-500 mt-1">Top players are labeling performance products as 'Daily Energy/Stress' aids to bypass Meta health policy bans.</p>
                    </div>
                 </div>
                 <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Hindi Overlay Dominance</p>
                      <p className="text-xs text-slate-500 mt-1">Creative testing shows Hinglish (Hinder/English mix) text on reels has 40% higher CTR than English-only ads.</p>
                    </div>
                 </div>
                 <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                      <XCircle className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">The "Bottle Shot" Failure</p>
                      <p className="text-xs text-slate-500 mt-1">Direct static photos of supplement bottles are seeing ₹80+ CPAs. Video faces/storytelling is MANDATORY.</p>
                    </div>
                 </div>
               </div>
             </Card>
           </div>
        </section>

        {/* Implementation Plan */}
        <section id="plan" className="space-y-10">
          <SectionTitle 
            title="30-Day Execution Roadmap" 
            subtitle="Step-by-step milestones to hit the 1,000 leads per day target."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {implementationSteps.map((step, idx) => (
              <Card key={idx} className="border-0 shadow-sm bg-slate-900 text-white flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-orange-400 tracking-widest">{step.week}</span>
                  <Calendar className="w-4 h-4 text-slate-500" />
                </div>
                <h4 className="text-lg font-bold mb-4">{step.title}</h4>
                <ul className="space-y-3 mt-auto">
                  {step.tasks.map((task, tidx) => (
                    <li key={tidx} className="flex items-start text-xs text-slate-400">
                      <ArrowRight className="w-3 h-3 text-orange-400 mt-0.5 mr-2 shrink-0" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </section>

        {/* Compliance Footer */}
        <section className="bg-orange-50 border border-orange-100 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8">
          <div className="bg-orange-600 p-4 rounded-2xl shrink-0">
            <ShieldCheck className="w-10 h-10 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Meta Ads Policy Compliance Framework</h3>
            <p className="text-sm text-slate-600 max-w-3xl">
              To avoid permanent account bans, our ads will strictly follow the "Energy & Wellness" narrative. We use <span className="font-bold">Third-Person Authority</span> (Doctors) or <span className="font-bold">Peer-to-Peer</span> (UGC) testimonials. No explicit nudity, no unproven medical claims, and mandatory "Individual results may vary" disclaimers on every lead form and landing page.
            </p>
          </div>
          <button className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm whitespace-nowrap hover:bg-slate-800 transition-colors shadow-lg">
            View Policy Guide
          </button>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <div className="flex items-center justify-center space-x-2 text-white font-bold text-xl mb-8">
            <Zap className="w-6 h-6 text-orange-500 fill-current" />
            <span>Project 1K <span className="text-orange-500">Delhi</span></span>
          </div>
          <p className="text-xs uppercase tracking-widest font-bold text-slate-600">Confidential Strategy Document v2.6</p>
          <p className="text-sm max-w-xl mx-auto">Scaling Ayurvedic Men's Wellness in the NCR region through data-driven creativity and AI-powered performance marketing.</p>
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px]">
             <p>© 2026 Project 1K. All rights reserved.</p>
             <div className="flex space-x-6">
                <span>Data Visualization: Recharts v2.0+</span>
                <span>Framework: React 19 + Tailwind CSS 4.0</span>
                <span>Model: Strategy v3 Optimized</span>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
}


