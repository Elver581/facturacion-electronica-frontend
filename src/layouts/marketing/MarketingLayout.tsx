import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { FaFacebookF, FaGithub, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { BrandLogo } from '../../shared/ui/BrandLogo'
import { GaiaChat } from '../../shared/ui/GaiaChat'

const navigation = [
  { href:'#services', label:'Servicios' },
  { href:'#product', label:'Producto próximo' },
  { href:'#contact', label:'Contacto' },
]

const socialNetworks = [
  { Icon:FaInstagram, label:'Instagram' },
  { Icon:FaLinkedinIn, label:'LinkedIn' },
  { Icon:FaFacebookF, label:'Facebook' },
  { Icon:FaGithub, label:'GitHub' },
]

export function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <MarketingNavbar />
      <main>{children}</main>
      <MarketingFooter />
      <GaiaChat />
    </div>
  )
}

function MarketingNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const updateNavbar = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', updateNavbar)
    return () => window.removeEventListener('scroll', updateNavbar)
  }, [])

  const navStyle = scrolled ? 'bg-white shadow-md border-b border-gray-200' : 'bg-[#0d1b2e]/95 backdrop-blur-sm border-b border-white/10'
  const linkStyle = scrolled ? 'text-gray-600 hover:text-gray-900' : 'text-gray-300 hover:text-white'

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${navStyle}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-6">
        <BrandLogo light={!scrolled} />
        <div className={`hidden items-center gap-7 text-sm font-medium transition-colors duration-300 lg:flex ${linkStyle}`}>
          {navigation.map(link => <a key={link.href} href={link.href} className="transition-colors">{link.label}</a>)}
        </div>
        <a href="#contact" className="hidden rounded-lg bg-[#0099FF] px-5 py-2 text-sm font-bold text-white shadow-sm transition-colors hover:bg-blue-600 lg:block">
          Cuéntanos tu proyecto
        </a>
        <button className={`lg:hidden ${scrolled ? 'text-gray-600' : 'text-gray-300'}`} onClick={() => setOpen(current => !current)} aria-label="Abrir navegación">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>}
          </svg>
        </button>
      </div>
      {open && (
        <div className={`flex flex-col gap-3 border-t px-6 pb-4 pt-3 text-sm lg:hidden ${scrolled ? 'border-gray-200 bg-white text-gray-600' : 'border-white/10 bg-[#0d1b2e] text-gray-300'}`}>
          {navigation.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}
          <a href="#contact" className="mt-2 rounded-lg bg-[#0099FF] py-2 text-center font-bold text-white">Cuéntanos tu proyecto</a>
        </div>
      )}
    </nav>
  )
}

function MarketingFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#0d1b2e] px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="mb-5"><BrandLogo /></div>
            <p className="max-w-xs text-sm leading-relaxed text-gray-500">
              Empresa colombiana de desarrollo de software. Creamos productos digitales, integraciones y automatizaciones para empresas.
            </p>
            <div className="mt-5">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-600">Síguenos · Próximamente</p>
              <div className="flex gap-2">
                {socialNetworks.map(({Icon,label}) => (
                  <span key={label} title={`${label} · Próximamente`} aria-label={`${label} de STARKTECH, próximamente`} className="flex h-9 w-9 cursor-not-allowed items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-500">
                    <Icon className="h-4 w-4" />
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Servicios</div>
            <ul className="space-y-2 text-sm text-gray-500">
              {['Software a medida','Aplicaciones web','Integraciones','Automatización'].map(label => <li key={label}><a href="#services" className="transition-colors hover:text-white">{label}</a></li>)}
            </ul>
          </div>
          <div>
            <div className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Starktech</div>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#services" className="transition-colors hover:text-white">Nosotros</a></li>
              <li><a href="#contact" className="transition-colors hover:text-white">Contacto</a></li>
              <li><a href="#product" className="transition-colors hover:text-white">Producto próximo</a></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-6 text-sm text-gray-600 md:flex-row">
          <span>© {new Date().getFullYear()} Starktech Software & Marketing. Todos los derechos reservados.</span>
          <span>Colombia · Desarrollo de software</span>
        </div>
      </div>
    </footer>
  )
}
