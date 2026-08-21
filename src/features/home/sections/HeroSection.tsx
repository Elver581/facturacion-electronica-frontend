import { FiCheck } from 'react-icons/fi'
import { HiArrowRight, HiBolt } from 'react-icons/hi2'
import { TypewriterText } from '../../../shared/ui/TypewriterText'
import { ui } from '../../../shared/ui/styles'

const strengths = ['Arquitectura escalable', 'Integraciones empresariales', 'Acompañamiento técnico']
const disciplines = ['Aplicaciones web', 'Software a medida', 'Integraciones', 'Automatización', 'Inteligencia artificial']
const promises = ['impulsa tu operación.', 'automatiza procesos.', 'convierte ideas en producto.']

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#081525]">
      <video
        src="/video/starktech.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[#081525]/70">
        <div className="hero-grid absolute inset-0 opacity-40" />
        <div className="absolute -top-32 left-1/3 h-[34rem] w-[34rem] rounded-full bg-blue-500/15 blur-3xl" />
        <div className="absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-4xl px-5 py-20 text-center sm:px-6 lg:py-28">
        <div className="hero-copy">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-400/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-blue-300">
            <HiBolt className="h-4 w-4" /> Desarrollo de software para empresas
          </div>
          <h1 className="mb-7 text-[clamp(3rem,6vw,5.8rem)] font-black leading-[0.98] tracking-[-0.055em] text-white">
            Construimos software que{' '}
            <TypewriterText words={promises} className="hero-gradient" />
          </h1>
          <p className="mx-auto mb-9 max-w-xl text-lg leading-relaxed text-slate-300 lg:text-xl">
            Diseñamos plataformas web, aplicaciones e integraciones a medida para convertir procesos complejos en productos digitales confiables.
          </p>
          <div className="mb-10 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="#contact" className={`${ui.primaryButton} px-7 py-4 shadow-lg shadow-blue-950/50`}>Cuéntanos tu proyecto <HiArrowRight className="h-5 w-5" /></a>
            <a href="#services" className="rounded-xl border border-white/15 bg-white/5 px-7 py-4 text-center font-semibold text-white transition-colors hover:bg-white/10">Conocer nuestros servicios</a>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-slate-400">
            {strengths.map(item => <span key={item} className="flex items-center gap-2"><FiCheck className="text-emerald-400" />{item}</span>)}
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
