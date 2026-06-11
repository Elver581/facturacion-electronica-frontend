import { HiRocketLaunch } from 'react-icons/hi2'
import { ui } from '../../../shared/ui/styles'

export function ContactSection() {
  return (
    <section id="contact" className="bg-[#0d1b2e] px-6 py-20">
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-white/10 p-12 text-center" style={{background:'linear-gradient(135deg,#0d2a4a 0%,#0d1b2e 60%,#1a1200 100%)'}}>
        <div className="pointer-events-none absolute inset-0" style={{background:'linear-gradient(135deg,#0099FF18,transparent,#FF660018)'}}/>
        <div className="relative">
          <HiRocketLaunch className="mx-auto mb-4 h-12 w-12 text-[#0099FF]" />
          <h2 className="mb-4 text-4xl font-black text-white">Construyamos el software que tu empresa necesita.</h2>
          <p className="mb-8 text-lg text-gray-400">Analizamos el reto, definimos una ruta técnica y desarrollamos una solución preparada para evolucionar.</p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button className={`${ui.primaryButton} px-10 py-4 text-lg`}>Solicitar una conversación</button>
            <a href="#services" className="rounded-xl border border-white/20 px-10 py-4 text-lg font-semibold text-white hover:border-white/40">Conocer servicios</a>
          </div>
        </div>
      </div>
    </section>
  )
}
