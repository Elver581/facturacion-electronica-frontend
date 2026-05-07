import { useState, useEffect } from 'react'
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from 'recharts'
import {
  HiDocumentText, HiDocumentMinus, HiBuildingOffice2,
  HiClipboardDocumentList, HiUsers, HiChartBarSquare,
  HiShieldCheck, HiArrowDownTray, HiCheckCircle,
  HiDocumentPlus, HiCheckBadge,
} from 'react-icons/hi2'
import { FiCheck } from 'react-icons/fi'
import logo from '../assets/logo.jpeg'
import heroPng from '../assets/hero.png'

const monthlyData = [
  { mes:'Ene', facturas:120, notas:15 },{ mes:'Feb', facturas:180, notas:22 },
  { mes:'Mar', facturas:240, notas:31 },{ mes:'Abr', facturas:190, notas:18 },
  { mes:'May', facturas:320, notas:42 },{ mes:'Jun', facturas:410, notas:55 },
  { mes:'Jul', facturas:380, notas:48 },{ mes:'Ago', facturas:520, notas:63 },
  { mes:'Sep', facturas:480, notas:57 },{ mes:'Oct', facturas:610, notas:71 },
  { mes:'Nov', facturas:590, notas:68 },{ mes:'Dic', facturas:720, notas:85 },
]
const moduleData = [
  { modulo:'Facturas', total:4760 },{ modulo:'Notas C.', total:575 },
  { modulo:'Compras',  total:1240 },{ modulo:'Nómina',   total:890 },
  { modulo:'Inventario', total:2100 },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Navbar />
      <Hero />
      <ChartsSection />
      <Features />
      <HowItWorks />
      <Pricing />
      <CtaBanner />
      <Footer />
    </div>
  )
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  const nav  = scrolled ? 'bg-white shadow-md border-b border-gray-200' : 'bg-[#0d1b2e]/95 backdrop-blur-sm border-b border-white/10'
  const link = scrolled ? 'text-gray-600 hover:text-gray-900' : 'text-gray-300 hover:text-white'
  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${nav}`}>
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <img src={logo} alt="Starktech" className="h-12 w-auto rounded-lg" />
        <div className={`hidden md:flex items-center gap-8 text-sm font-medium transition-colors duration-300 ${link}`}>
          {[['#features','Características'],['#how','Cómo funciona'],['#pricing','Planes'],['/docs','Docs'],['/guia-dian','Guía DIAN']].map(([h,l])=>(
            <a key={h} href={h} className="transition-colors">{l}</a>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <button className={`text-sm px-4 py-2 rounded-lg transition-colors ${link}`}>Iniciar sesión</button>
          <button className="text-sm font-bold bg-[#0099FF] hover:bg-blue-600 text-white px-5 py-2 rounded-lg transition-colors shadow-sm">
            Empezar gratis
          </button>
        </div>
        <button className={`md:hidden ${scrolled ? 'text-gray-600' : 'text-gray-300'}`} onClick={()=>setOpen(!open)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>}
          </svg>
        </button>
      </div>
      {open && (
        <div className={`md:hidden px-6 pb-4 flex flex-col gap-3 text-sm border-t pt-3 ${scrolled ? 'bg-white border-gray-200 text-gray-600' : 'bg-[#0d1b2e] border-white/10 text-gray-300'}`}>
          <a href="#features">Características</a><a href="#how">Cómo funciona</a>
          <a href="#pricing">Planes</a><a href="/docs">Docs</a><a href="/guia-dian">Guía DIAN</a>
          <button className="mt-2 bg-[#0099FF] text-white py-2 rounded-lg font-bold">Empezar gratis</button>
        </div>
      )}
    </nav>
  )
}

const twWords = ['STARKTECH', 'SOFTWARE & MARKETING', 'FACTURACIÓN', 'ELECTRÓNICA', 'COLOMBIA']

function Hero() {
  const [twText, setTwText] = useState('')
  const [twIdx, setTwIdx] = useState(0)
  const [twDir, setTwDir] = useState<'typing'|'deleting'>('typing')
  useEffect(() => {
    const word = twWords[twIdx]
    let t: ReturnType<typeof setTimeout>
    if (twDir === 'typing') {
      if (twText.length < word.length) {
        t = setTimeout(() => setTwText(word.slice(0, twText.length + 1)), 100)
      } else {
        t = setTimeout(() => setTwDir('deleting'), 2000)
      }
    } else {
      if (twText.length > 0) {
        t = setTimeout(() => setTwText(twText.slice(0, -1)), 55)
      } else {
        t = setTimeout(() => {
          setTwIdx(i => (i + 1) % twWords.length)
          setTwDir('typing')
        }, 0)
      }
    }
    return () => clearTimeout(t)
  }, [twText, twDir, twIdx])

  return (
    <section className="relative overflow-hidden bg-[#0d1b2e]">
      <style>{`
        @keyframes st-float  { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-18px)} }
        @keyframes st-glow   { 0%,100%{filter:drop-shadow(0 0 12px #0099FF66) drop-shadow(0 0 30px #0099FF22)} 50%{filter:drop-shadow(0 0 28px #0099FFcc) drop-shadow(0 0 60px #0099FF55)} }
        @keyframes st-enter  { from{opacity:0;transform:scale(0.55) translateY(24px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes st-ring1  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes st-ring2  { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
        @keyframes st-dot    { 0%,100%{opacity:.35;transform:scale(1)} 50%{opacity:1;transform:scale(1.5)} }
        @keyframes st-shine  { 0%{background-position:200% center} 100%{background-position:-200% center} }
        .hero-logo      { animation: st-float 5s ease-in-out infinite, st-glow 4s ease-in-out infinite, st-enter 1.1s cubic-bezier(.34,1.56,.64,1) forwards; }
        .hero-ring1     { animation: st-ring1 14s linear infinite; }
        .hero-ring2     { animation: st-ring2 20s linear infinite; }
        .hero-dot1      { animation: st-dot 2.8s ease-in-out infinite; }
        .hero-dot2      { animation: st-dot 2.8s ease-in-out infinite .9s; }
        .hero-dot3      { animation: st-dot 2.8s ease-in-out infinite 1.8s; }
        .hero-logo-tagline { background: linear-gradient(90deg,#ffffff44,#ffffff99,#0099FFcc,#ffffff99,#ffffff44); background-size:200% auto; animation: st-shine 4s linear infinite; -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        @keyframes tw-blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .tw-cursor { animation: tw-blink 1s step-end infinite; }
      `}</style>

      {/* Background: glow blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0" style={{background:'linear-gradient(to bottom, #0d1b2e 0%, #0d1b2e88 40%, #0d1b2e 100%)'}} />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-10 w-48 h-48 bg-blue-400/5 rounded-full blur-2xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 pt-14 pb-6 flex flex-col items-center text-center">

        {/* ── Typewriter ── */}
        <div className="mb-12 flex flex-col items-center select-none" style={{fontFamily:"'Courier New', Courier, monospace"}}>
          <div className="flex items-baseline leading-none mb-4" style={{fontWeight:900,letterSpacing:'0.02em'}}>
            <span style={{fontSize:'clamp(60px,10vw,112px)',color:'#0099FF',textShadow:'0 0 40px #0099FFaa,0 0 80px #0099FF44'}}>STARK</span>
            <span style={{fontSize:'clamp(60px,10vw,112px)',color:'#FF6600',textShadow:'0 0 40px #FF6600aa,0 0 80px #FF660044'}}>TECH</span>
          </div>
<div className="flex items-center justify-center" style={{ minHeight: '4rem' }}>
  <span
    className="text-white font-black leading-tight"
    style={{
      fontSize: 'clamp(28px,5vw,58px)',
      letterSpacing: '-0.02em',
      fontFamily: 'inherit',
      textShadow: '0 0 25px rgba(0,153,255,0.25)',
    }}
  >
    {twText}
  </span>

  <span
    className="tw-cursor font-black ml-1"
    style={{
      fontSize: 'clamp(28px,5vw,58px)',
      color: '#0099FF',
      lineHeight: 1,
    }}
  >
    _
  </span>
</div>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#0099FF]/10 border border-[#0099FF]/30 rounded-full px-4 py-1.5 text-sm text-[#0099FF] mb-6">
          <span className="w-2 h-2 rounded-full bg-[#0099FF] animate-pulse" />
          Colombia · DIAN · UBL 2.1
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-5 max-w-3xl">
          Facturación Electrónica<br />
          <span style={{color:'#0099FF'}}>simple</span>, rápida y{' '}
          <span style={{color:'#FF6600'}}>legal</span>
        </h1>
        <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-2xl">
          Emite facturas electrónicas, notas crédito y débito cumpliendo la normativa DIAN
          desde una sola plataforma. Multi-empresa, firma digital y validación en tiempo real.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <button className="bg-[#0099FF] hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all hover:scale-105 shadow-lg shadow-blue-900/40">
            Empezar gratis — 30 días
          </button>
          <button className="border border-white/20 hover:border-white/40 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all">
            Ver demo →
          </button>
        </div>

        {/* Stats chips */}
        <div className="grid grid-cols-3 gap-3 mb-12 w-full max-w-sm">
          {[{v:'100%',l:'Cumplimiento DIAN'},{v:'<5s',l:'Validación'},{v:'Multi',l:'Empresas'}].map(s=>(
            <div key={s.l} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
              <div className="text-xl font-black text-white">{s.v}</div>
              <div className="text-[11px] text-gray-500 mt-0.5">{s.l}</div>
            </div>
          ))}
        </div>

        {/* Banner 2 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">

          {/* Tarjeta 1 – Factura */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5 shadow-xl text-left">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
              <span className="ml-2 text-[11px] text-gray-500 font-mono">factura #FE-001245</span>
            </div>
            <div className="flex items-center gap-4">
              <img src={heroPng} alt="Factura electrónica" className="w-24 h-24 object-contain shrink-0" />
              <div className="flex-1 space-y-1.5 text-xs font-mono">
                {[['NIT','900.123.456-7'],['Total','$ 4.760.000'],['IVA 19%','$ 760.000'],['CUFE','a3f9b2...d81c']].map(([k,v])=>(
                  <div key={k} className="flex justify-between">
                    <span className="text-gray-500">{k}</span>
                    <span className="text-gray-200">{v}</span>
                  </div>
                ))}
                <div className="flex items-center gap-1.5 pt-1">
                  <HiCheckCircle className="text-green-400 w-3.5 h-3.5 shrink-0" />
                  <span className="text-green-400 text-[10px] font-semibold">Aceptada por la DIAN</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tarjeta 2 – Dashboard */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5 shadow-xl text-left">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <img src={heroPng} alt="" className="w-6 h-6 object-contain opacity-70" />
                <span className="text-xs font-semibold text-gray-300">Documentos este mes</span>
              </div>
              <span className="text-[10px] text-green-400 bg-green-400/10 border border-green-400/20 rounded-full px-2 py-0.5">↑ 23%</span>
            </div>
            <div className="flex items-end gap-6 mb-4">
              <div>
                <div className="text-3xl font-black text-white">720</div>
                <div className="text-[11px] text-gray-500">Facturas emitidas</div>
              </div>
              <div>
                <div className="text-2xl font-black" style={{color:'#FF6600'}}>85</div>
                <div className="text-[11px] text-gray-500">Notas crédito</div>
              </div>
              <div>
                <div className="text-2xl font-black" style={{color:'#10b981'}}>100%</div>
                <div className="text-[11px] text-gray-500">Aceptadas DIAN</div>
              </div>
            </div>
            <div className="flex items-end gap-1 h-10">
              {[30,45,35,60,50,80,65,90,75,100,85,120].map((h,i)=>(
                <div key={i} className="flex-1 rounded-sm transition-all"
                  style={{height:`${(h/120)*100}%`, backgroundColor: i===11 ? '#0099FF' : '#0099FF44'}} />
              ))}
            </div>
            <div className="flex justify-between text-[9px] text-gray-600 mt-1">
              <span>Ene</span><span>Abr</span><span>Ago</span><span>Dic</span>
            </div>
          </div>
        </div>
      </div>

      {/* wave */}
      <div className="relative h-12 overflow-hidden mt-6">
        <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="absolute bottom-0 w-full h-12" fill="white">
          <path d="M0,48 C360,0 1080,0 1440,48 L1440,48 L0,48 Z"/>
        </svg>
      </div>
    </section>
  )
}

function ChartsSection() {
  return (
    <section className="py-16 bg-gray-50 border-y border-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-black text-gray-900 mb-2">Actividad de la plataforma</h2>
          <p className="text-gray-500 text-sm">Documentos emitidos y procesados en tiempo real</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <HiChartBarSquare className="text-[#0099FF] w-5 h-5" />
              <span className="font-semibold text-gray-800 text-sm">Documentos emitidos por mes</span>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={monthlyData} margin={{top:5,right:10,left:-20,bottom:0}}>
                <defs>
                  <linearGradient id="gF" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#0099FF" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#0099FF" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="gN" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#FF6600" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#FF6600" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="mes" tick={{fill:'#94a3b8',fontSize:11}} axisLine={false} tickLine={false}/>
                <YAxis tick={{fill:'#94a3b8',fontSize:11}} axisLine={false} tickLine={false}/>
                <Tooltip contentStyle={{backgroundColor:'#fff',border:'1px solid #e2e8f0',borderRadius:'8px',fontSize:'12px'}} labelStyle={{color:'#1e293b'}}/>
                <Legend wrapperStyle={{fontSize:'12px',color:'#64748b'}}/>
                <Area type="monotone" dataKey="facturas" name="Facturas" stroke="#0099FF" strokeWidth={2} fill="url(#gF)"/>
                <Area type="monotone" dataKey="notas"    name="Notas C." stroke="#FF6600" strokeWidth={2} fill="url(#gN)"/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <HiChartBarSquare className="text-[#FF6600] w-5 h-5" />
              <span className="font-semibold text-gray-800 text-sm">Total documentos por módulo</span>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={moduleData} margin={{top:5,right:10,left:-20,bottom:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="modulo" tick={{fill:'#94a3b8',fontSize:11}} axisLine={false} tickLine={false}/>
                <YAxis tick={{fill:'#94a3b8',fontSize:11}} axisLine={false} tickLine={false}/>
                <Tooltip contentStyle={{backgroundColor:'#fff',border:'1px solid #e2e8f0',borderRadius:'8px',fontSize:'12px'}} labelStyle={{color:'#1e293b'}}/>
                <Bar dataKey="total" name="Total" radius={[6,6,0,0]} fill="#0099FF"/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  )
}

const features = [
  { Icon:HiDocumentText,          color:'#0099FF', title:'Facturas Electrónicas',  desc:'CUFE, QR y firma digital conforme a la DIAN. Envío automático al cliente.' },
  { Icon:HiDocumentMinus,         color:'#0099FF', title:'Notas Crédito y Débito', desc:'Vinculadas a la factura original. Cumplimiento total de la normativa DIAN.' },
  { Icon:HiBuildingOffice2,       color:'#FF6600', title:'Multi-empresa',           desc:'N empresas (NIT) desde un panel. Datos totalmente aislados por tenant.' },
  { Icon:HiClipboardDocumentList, color:'#FF6600', title:'Resoluciones DIAN',       desc:'Prefijos, rangos, vigencias y consecutivos automáticos por empresa.' },
  { Icon:HiUsers,                 color:'#0099FF', title:'Clientes',                desc:'Catálogo con NIT/CC e historial completo de documentos emitidos.' },
  { Icon:HiChartBarSquare,        color:'#FF6600', title:'Reportes',                desc:'Dashboard con totales, IVA y estado de documentos ante la DIAN.' },
  { Icon:HiShieldCheck,           color:'#0099FF', title:'Firma XAdES-BES',         desc:'Firma digital automática del XML. Estándar exigido por la DIAN.' },
  { Icon:HiArrowDownTray,         color:'#FF6600', title:'PDF automático',           desc:'PDF con logo, datos fiscales y QR de verificación DIAN.' },
]

function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0099FF] bg-blue-50 border border-blue-100 rounded-full px-3 py-1">Características</span>
          <h2 className="text-4xl font-black text-gray-900 mt-4 mb-3">Todo lo que necesitas para facturar</h2>
          <p className="text-gray-500 max-w-xl mx-auto">Una plataforma completa para cumplir con la DIAN sin complicaciones técnicas.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map(f=>(
            <div key={f.title} className="bg-gray-50 border border-gray-100 rounded-2xl p-6 hover:shadow-md hover:border-gray-200 transition-all">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{backgroundColor:f.color+'15',border:`1px solid ${f.color}30`}}>
                <f.Icon style={{color:f.color}} className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    { Icon:HiBuildingOffice2, color:'#0099FF', n:'01', title:'Registra tu empresa',
      desc:'NIT, razón social y certificado digital. Configura tu resolución DIAN en minutos.' },
    { Icon:HiDocumentPlus,   color:'#FF6600', n:'02', title:'Crea y emite facturas',
      desc:'Selecciona el cliente, agrega productos y emite. XML UBL 2.1 firmado y enviado a la DIAN.' },
    { Icon:HiCheckBadge,     color:'#0099FF', n:'03', title:'Validación y entrega',
      desc:'La DIAN valida en segundos. Cliente recibe PDF + XML con CUFE y QR por email.' },
  ]
  return (
    <section id="how" className="py-20 bg-gray-50 border-y border-gray-100">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FF6600] bg-orange-50 border border-orange-100 rounded-full px-3 py-1">Cómo funciona</span>
          <h2 className="text-4xl font-black text-gray-900 mt-4 mb-3">Factura en 3 pasos</h2>
          <p className="text-gray-500">Sin conocimientos técnicos. Sin instalar nada. 100% en la nube.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s,i)=>(
            <div key={s.n} className="relative text-center">
              {i < steps.length-1 && <div className="hidden md:block absolute top-8 left-[62%] w-[76%] h-px bg-gray-200" />}
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 bg-white shadow-sm border border-gray-100"
                style={{boxShadow:`0 0 0 4px ${s.color}18`}}>
                <s.Icon style={{color:s.color}} className="w-8 h-8" />
              </div>
              <div className="text-xs font-black mb-1" style={{color:s.color}}>{s.n}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const plans = [
  { name:'Básico',      price:'79.000',    badge:null,          border:'border-gray-200',
    items:['1 empresa (NIT)','500 documentos/mes','Facturas + NC + ND','PDF automático','Envío por email','Soporte email'] },
  { name:'Pro',         price:'189.000',   badge:'Más popular', border:'border-[#0099FF]',
    items:['3 empresas (NIT)','5.000 documentos/mes','Facturas + NC + ND','PDF automático','Reportes avanzados','Soporte prioritario','API access'] },
  { name:'Empresarial', price:'A la medida', badge:null,        border:'border-gray-200',
    items:['Empresas ilimitadas','Documentos ilimitados','Facturas + NC + ND','XML descargable','API + Webhooks','Integraciones ERP','Soporte dedicado','SLA garantizado'] },
]

function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0099FF] bg-blue-50 border border-blue-100 rounded-full px-3 py-1">Planes</span>
          <h2 className="text-4xl font-black text-gray-900 mt-4 mb-3">Precios simples y transparentes</h2>
          <p className="text-gray-500">Sin costos ocultos. Cancela cuando quieras.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map(p=>(
            <div key={p.name} className={`relative border-2 ${p.border} rounded-2xl overflow-hidden ${p.badge ? 'shadow-lg shadow-blue-100' : 'shadow-sm'}`}>
              {p.badge && <div className="bg-[#0099FF] text-white text-xs font-bold tracking-widest uppercase px-4 py-1.5 text-center">{p.badge}</div>}
              <div className="p-7 bg-white">
                <div className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-3">{p.name}</div>
                <div className="flex items-end gap-1 mb-6">
                  {p.price !== 'A la medida'
                    ? <><span className="text-4xl font-black text-gray-900">${p.price}</span><span className="text-gray-400 mb-1 text-sm">/mes COP</span></>
                    : <span className="text-2xl font-black text-gray-900">A la medida</span>}
                </div>
                <ul className="space-y-2.5 mb-8">
                  {p.items.map(item=>(
                    <li key={item} className="flex items-center gap-2.5 text-sm text-gray-600">
                      <FiCheck className="text-[#0099FF] w-4 h-4 shrink-0" />{item}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${p.badge ? 'bg-[#0099FF] hover:bg-blue-600 text-white shadow-md' : 'border-2 border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
                  {p.price === 'A la medida' ? 'Contáctanos' : 'Empezar ahora'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CtaBanner() {
  return (
    <section className="py-20 px-6 bg-[#0d1b2e]">
      <div className="max-w-4xl mx-auto rounded-3xl p-12 text-center relative overflow-hidden border border-white/10"
        style={{background:'linear-gradient(135deg,#0d2a4a 0%,#0d1b2e 60%,#1a1200 100%)'}}>
        <div className="absolute inset-0 pointer-events-none" style={{background:'linear-gradient(135deg,#0099FF18,transparent,#FF660018)'}}/>
        <div className="relative">
          <HiShieldCheck className="w-12 h-12 mx-auto mb-4 text-[#0099FF]" />
          <h2 className="text-4xl font-black text-white mb-4">¿Listo para cumplir con la DIAN?</h2>
          <p className="text-gray-400 mb-8 text-lg">30 días gratis · Sin tarjeta de crédito · Configuración en 10 minutos</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#0099FF] hover:bg-blue-500 text-white font-bold px-10 py-4 rounded-xl text-lg transition-all hover:scale-105">Crear cuenta gratis</button>
            <button className="border border-white/20 hover:border-white/40 text-white font-semibold px-10 py-4 rounded-xl text-lg">Hablar con ventas</button>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-[#0d1b2e] border-t border-white/10 px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div className="md:col-span-2">
            <img src={logo} alt="Starktech" className="h-14 w-auto rounded-lg mb-4" />
            <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
              Solución SaaS de facturación electrónica para Colombia. Cumplimiento total con la DIAN, UBL 2.1 y firma digital XAdES-BES.
            </p>
          </div>
          <div>
            <div className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Producto</div>
            <ul className="space-y-2 text-sm text-gray-500">
              {['Características','Planes','Documentación','API'].map(l=>(
                <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Starktech</div>
            <ul className="space-y-2 text-sm text-gray-500">
              {['Nosotros','Contacto','Términos','Privacidad'].map(l=>(
                <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-2 text-sm text-gray-600">
          <span>© {new Date().getFullYear()} Starktech Software & Marketing. Todos los derechos reservados.</span>
          <span>Bogotá, Colombia · DIAN habilitado</span>
        </div>
      </div>
    </footer>
  )
}
