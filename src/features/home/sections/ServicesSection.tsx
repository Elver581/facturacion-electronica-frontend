import { HiCloud, HiCodeBracket, HiCog6Tooth, HiDevicePhoneMobile } from 'react-icons/hi2'
import { SectionHeading } from '../../../shared/ui/SectionHeading'
import { ui } from '../../../shared/ui/styles'

const services = [
  { Icon:HiCodeBracket, title:'Software a medida', desc:'Plataformas diseñadas alrededor de tus procesos, usuarios y objetivos comerciales.' },
  { Icon:HiDevicePhoneMobile, title:'Productos web y móviles', desc:'Experiencias digitales rápidas, accesibles y preparadas para crecer con tu negocio.' },
  { Icon:HiCloud, title:'Integraciones y nube', desc:'Conectamos sistemas, APIs y servicios para eliminar reprocesos y centralizar información.' },
  { Icon:HiCog6Tooth, title:'Automatización con IA', desc:'Aplicamos inteligencia artificial donde genera ahorro, control y mejores decisiones.' },
]

export function ServicesSection() {
  return (
    <section id="services" className={`${ui.section} bg-white`}>
      <div className={ui.container}>
        <div className="mb-12"><SectionHeading eyebrow="Servicios" title="Tecnología construida para resolver retos reales" description="Acompañamos desde la definición del producto hasta su desarrollo, integración y evolución." /></div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({Icon,title,desc}) => (
            <article key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100/50">
              <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-blue-100 bg-blue-50"><Icon className="h-6 w-6 text-[#0099ff]" /></span>
              <h3 className="mb-2 font-black text-slate-950">{title}</h3>
              <p className="text-sm leading-relaxed text-slate-500">{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
