import { FiCheck } from 'react-icons/fi'
import { HiArrowRight, HiArrowTrendingUp, HiBolt, HiSparkles } from 'react-icons/hi2'
import gaia from '../../../assets/gaia.png'
import { TypewriterText } from '../../../shared/ui/TypewriterText'
import { ui } from '../../../shared/ui/styles'

const strengths = ['Arquitectura escalable', 'Integraciones empresariales', 'Acompañamiento técnico']
const disciplines = ['Aplicaciones web', 'Software a medida', 'Integraciones', 'Automatización', 'Inteligencia artificial']
const promises = ['impulsa tu operación.', 'automatiza procesos.', 'convierte ideas en producto.']

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#081525]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="hero-grid absolute inset-0 opacity-40" />
        <div className="absolute -top-32 left-1/3 h-[34rem] w-[34rem] rounded-full bg-blue-500/15 blur-3xl" />
        <div className="absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />
      </div>
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:py-28">
        <div className="hero-copy">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-400/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-blue-300">
            <HiBolt className="h-4 w-4" /> Desarrollo de software para empresas
          </div>
          <h1 className="mb-7 text-[clamp(3rem,6vw,5.8rem)] font-black leading-[0.98] tracking-[-0.055em] text-white">
            Construimos software que{' '}
            <TypewriterText words={promises} className="hero-gradient" />
          </h1>
          <p className="mb-9 max-w-xl text-lg leading-relaxed text-slate-300 lg:text-xl">
            Diseñamos plataformas web, aplicaciones e integraciones a medida para convertir procesos complejos en productos digitales confiables.
          </p>
          <div className="mb-10 flex flex-col gap-3 sm:flex-row">
            <a href="#contact" className={`${ui.primaryButton} px-7 py-4 shadow-lg shadow-blue-950/50`}>Cuéntanos tu proyecto <HiArrowRight className="h-5 w-5" /></a>
            <a href="#services" className="rounded-xl border border-white/15 bg-white/5 px-7 py-4 text-center font-semibold text-white transition-colors hover:bg-white/10">Conocer nuestros servicios</a>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-400">
            {strengths.map(item => <span key={item} className="flex items-center gap-2"><FiCheck className="text-emerald-400" />{item}</span>)}
          </div>
        </div>
        <div className="hero-product relative lg:ml-4">
          <div className="absolute inset-8 rounded-full bg-blue-500/25 blur-3xl" />
          <div className="relative overflow-hidden rounded-[1.8rem] border border-white/15 bg-[#020c21] shadow-2xl shadow-black/40">
            <img src={gaia} alt="Gaia, copiloto financiero de STARKTECH" className="gaia-hero-image aspect-[1.55/1] w-full object-cover object-center" />
            <div className="flex items-center justify-between gap-4 border-t border-white/10 bg-[#07172a] p-5">
              <div>
                <div className="mb-1.5 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-blue-300"><HiSparkles className="text-orange-400" /> Producto propio en desarrollo</div>
                <p className="text-xl font-black tracking-tight text-white">Gaia llegará próximamente.</p>
                <p className="mt-1 text-xs text-slate-400">IA aplicada a la facturación y gestión financiera.</p>
              </div>
              <div className="hidden items-center gap-3 rounded-xl border border-blue-300/15 bg-blue-400/10 px-3 py-2.5 sm:flex">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-400/10"><HiArrowTrendingUp className="h-4 w-4 text-blue-300" /></span>
                <div><p className="text-[11px] font-bold text-white">Acceso anticipado</p><p className="text-[9px] text-blue-300">Únete a la lista de espera</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-5 px-6 py-5 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 lg:justify-between">
          {disciplines.map(item => <span key={item}>{item}</span>)}
        </div>
      </div>
    </section>
  )
}
