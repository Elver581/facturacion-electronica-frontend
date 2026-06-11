import { HiArrowRight, HiArrowTrendingUp, HiCamera, HiDocumentMagnifyingGlass, HiSparkles } from 'react-icons/hi2'
import { SectionHeading } from '../../../shared/ui/SectionHeading'
import { ui } from '../../../shared/ui/styles'

const capabilities = [
  { Icon:HiCamera, title:'Captura de comprobantes', desc:'Permitirá cargar fotos y archivos para identificar proveedor, fecha, impuestos y total.' },
  { Icon:HiDocumentMagnifyingGlass, title:'Resumen financiero ejecutivo', desc:'Consolidará ventas, gastos, cartera y flujo de caja en reportes listos para revisión.' },
  { Icon:HiArrowTrendingUp, title:'Alertas y oportunidades', desc:'Detectará vencimientos, variaciones relevantes y acciones prioritarias para proteger la caja.' },
]

export function ProductPreviewSection() {
  return (
    <section id="product" className={`${ui.section} overflow-hidden border-t border-white/10 bg-[#081525]`}>
      <div className={`${ui.container} grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]`}>
        <div>
          <SectionHeading eyebrow="Próximamente · Producto STARKTECH" title="Facturación electrónica con un copiloto financiero." description="Estamos construyendo una plataforma propia para Colombia que combinará cumplimiento DIAN, captura de comprobantes e inteligencia financiera." align="left" inverted />
          <div className="mt-8 space-y-5">
            {capabilities.map(({Icon,title,desc}) => (
              <div key={title} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-300/15 bg-blue-400/10"><Icon className="h-5 w-5 text-blue-300" /></span>
                <div><h3 className="mb-1 font-bold text-white">{title}</h3><p className="text-sm leading-relaxed text-slate-400">{desc}</p></div>
              </div>
            ))}
          </div>
          <a href="#contact" className={`${ui.primaryButton} mt-8 px-6 py-3`}>Unirme a la lista de espera <HiArrowRight className="h-4 w-4" /></a>
        </div>
        <ProductMockup />
      </div>
    </section>
  )
}

function ProductMockup() {
  return (
    <div className="relative">
      <div className="absolute inset-8 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="relative grid gap-3 sm:grid-cols-[0.72fr_1.28fr]">
        <div className="rotate-[-2deg] rounded-[1.8rem] border border-white/15 bg-[#10253c] p-3 shadow-2xl">
          <div className="flex min-h-[22rem] flex-col rounded-[1.25rem] bg-slate-100 p-3">
            <div className="mb-8 flex justify-between text-[9px] text-slate-500"><span>9:41</span><span>STARK Scan</span></div>
            <div className="relative flex-1 rounded-xl border-2 border-dashed border-blue-400 bg-white p-4">
              <span className="absolute -top-2.5 left-3 rounded-full bg-blue-500 px-2 py-0.5 text-[9px] font-bold text-white">Documento detectado</span>
              <div className="mb-4 border-b border-slate-200 pb-3 text-center"><p className="text-xs font-black text-slate-800">COMERCIAL ANDINA S.A.S.</p><p className="text-[8px] text-slate-400">NIT 901.234.567-8</p></div>
              <div className="space-y-3">{[75,90,66,84].map((width,index) => <div key={index} className="h-1.5 rounded bg-slate-200" style={{width:`${width}%`}} />)}</div>
              <div className="mt-8 flex justify-between border-t border-slate-200 pt-3 text-[10px] font-black text-slate-700"><span>TOTAL</span><span>$1.428.000</span></div>
              <span className="scan-line absolute left-3 right-3 h-px bg-blue-500 shadow-[0_0_10px_#0099ff]" />
            </div>
            <div className="mt-3 flex items-center justify-center gap-2 text-[9px] font-bold text-blue-600"><HiCamera /> Capturando datos fiscales</div>
          </div>
        </div>
        <div className="self-center rounded-2xl border border-white/15 bg-[#10253c]/95 p-5 shadow-2xl">
          <div className="mb-5 flex items-center gap-2"><HiSparkles className="text-orange-400" /><span className="text-sm font-bold text-white">Resumen generado por IA</span></div>
          <div className="mb-4 grid grid-cols-2 gap-2">
            {[['Gastos del mes','$18,4M'],['IVA descontable','$2,9M']].map(([label,value]) => <div key={label} className="rounded-xl border border-white/10 bg-white/5 p-3"><p className="text-[9px] uppercase text-slate-500">{label}</p><p className="mt-1 font-black text-white">{value}</p></div>)}
          </div>
          <div className="mb-3 rounded-xl border border-orange-300/20 bg-orange-400/10 p-4"><p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-orange-300">Hallazgo prioritario</p><p className="text-xs leading-relaxed text-slate-300">Los gastos operativos aumentaron 12% frente al promedio trimestral.</p></div>
          <div className="rounded-xl border border-emerald-300/20 bg-emerald-400/10 p-4"><p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-emerald-300">Acción sugerida</p><p className="text-xs leading-relaxed text-slate-300">Revisar tres proveedores con variaciones superiores al 15%.</p></div>
        </div>
      </div>
    </div>
  )
}
