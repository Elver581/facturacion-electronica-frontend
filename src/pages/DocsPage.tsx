import React from 'react'
import logo from '../assets/logo.jpeg'

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Nav />
      <Hero />
      <ArchitectureDiagram />
      <DesignPattern />
      <MultiTenantDiagram />
      <ERDiagram />
      <TechStack />
      <Footer />
    </div>
  )
}

/* ══════════════════════════════════════════════════════════ NAV */
function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img src={logo} alt="Starktech" className="h-10 w-auto rounded-lg" />
        <span className="text-[#0099FF] font-semibold text-sm">· Docs</span>
      </div>
      <div className="flex gap-5 text-sm text-gray-500 font-medium">
        {[['#arquitectura','Arquitectura'],['#patron','Patrón'],['#multitenant','Multi-tenant'],['#er','ER'],['#stack','Stack']].map(([h,l])=>(
          <a key={h} href={h} className="hover:text-gray-900 transition-colors hidden md:inline">{l}</a>
        ))}
        <a href="/guia-dian" className="text-[#0099FF] hover:text-blue-600 font-semibold transition-colors">Guía DIAN →</a>
        <a href="/" className="text-gray-400 hover:text-gray-700 transition-colors">← Inicio</a>
      </div>
    </nav>
  )
}

/* ══════════════════════════════════════════════════════════ HERO */
function Hero() {
  return (
    <section className="px-6 py-16 max-w-5xl mx-auto text-center">
      <div className="inline-flex items-center gap-2 border border-blue-500/30 bg-blue-500/10 rounded-full px-4 py-1 text-blue-400 text-sm mb-6">
        <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
        Documentación Técnica Interna · v1.0
      </div>
      <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
        Arquitectura del Sistema<br />
        <span style={{color:'#0099FF'}}>Facturación Electrónica</span> DIAN Colombia
      </h1>
      <p className="text-gray-500 max-w-2xl mx-auto text-lg">
        SaaS multi-tenant · Laravel 11 + React 19 · Clean Architecture · UBL 2.1
      </p>
      <div className="mt-8 grid grid-cols-3 md:grid-cols-6 gap-3 max-w-3xl mx-auto">
        {[
          ['21+','Módulos ER'],['6','Capas arq.'],['Multi','Tenant'],
          ['DIAN','Colombia'],['REST','API Laravel'],['UBL 2.1','Estándar'],
        ].map(([v,l])=>(
          <div key={l} className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center shadow-sm">
            <div className="font-black text-lg" style={{color:'#0099FF'}}>{v}</div>
            <div className="text-gray-500 text-[10px] mt-0.5">{l}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════ ARCHITECTURE */
function ArchitectureDiagram() {
  return (
    <section id="arquitectura" className="px-6 py-16 max-w-5xl mx-auto">
      <SectionTitle badge="Arquitectura General" title="Flujo del sistema" sub="Separación en capas: cliente, API, dominio, infraestructura e integración DIAN." />
      <div className="mt-10 flex flex-col items-center gap-0">

        <Layer color="blue" label="Capa Cliente">
          <ABox color="blue" title="Browser / SPA"    lines={['React 19 + Vite','TailwindCSS 4','React Query (cache)','React Router 7']} />
          <ABox color="blue" title="Estado & Formularios" lines={['React Hook Form','Zod (validación)','Axios (HTTP)','SweetAlert2']} />
        </Layer>
        <Arrow label="HTTPS · REST JSON · Bearer Token" />

        <Layer color="indigo" label="Capa HTTP (Laravel)">
          <ABox color="indigo" title="Middleware"     lines={['TenantResolver','Auth:Sanctum','Throttle','CORS']} />
          <ABox color="indigo" title="Controllers"   lines={['Solo HTTP logic','Thin controllers','Form Requests','API Resources']} />
          <ABox color="indigo" title="Autenticación" lines={['Laravel Sanctum','Spatie Roles','Policies','Gates']} />
        </Layer>
        <Arrow label="Inyección de dependencias · Service Container" />

        <Layer color="violet" label="Capa Aplicación / Servicios">
          <ABox color="violet" title="Services"      lines={['Lógica de negocio','Orquestación','Transacciones DB','Dispatch Jobs']} />
          <ABox color="violet" title="Jobs & Queues" lines={['XML UBL 2.1','Firma XAdES-BES','Envío DIAN','PDF + Email']} />
          <ABox color="violet" title="Events"        lines={['FacturaCreada','DianValidada','StockBajo','NominaLiquidada']} />
        </Layer>
        <Arrow label="Eloquent ORM · Repository Pattern" />

        <Layer color="teal" label="Capa Dominio / Datos">
          <ABox color="teal" title="Repositories"   lines={['Abstrae Eloquent','Global Scopes','Interfaces','Cache layer']} />
          <ABox color="teal" title="Models"         lines={['Empresa (tenant)','Relaciones','Observers','Soft Deletes']} />
          <ABox color="teal" title="MySQL / Redis"  lines={['Datos multi-tenant','Cache queries','Sessions','Queue driver']} />
        </Layer>
        <Arrow label="API REST · SOAP · SMTP · S3" />

        <Layer color="emerald" label="Capa Infraestructura Externa">
          <ABox color="emerald" title="DIAN Colombia"   lines={['Validación CUFE','Ambiente habilitación','UBL 2.1 SOAP','Respuesta async']} />
          <ABox color="emerald" title="Storage S3/MinIO" lines={['XML firmados','PDFs generados','Certificados','Logos empresa']} />
          <ABox color="emerald" title="Email / Notif."  lines={['SMTP por empresa','Factura PDF','Alertas stock','Nómina pagada']} />
        </Layer>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════ DESIGN PATTERN */
function DesignPattern() {
  return (
    <section id="patron" className="px-6 py-16 max-w-6xl mx-auto">
      <SectionTitle
        badge="Patrón de Diseño"
        title="Clean Architecture · Capas bien definidas"
        sub="Cada capa solo conoce a la capa inmediata inferior. El dominio no depende del framework."
      />

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* ── Backend ── */}
        <div className="border border-indigo-500/30 bg-indigo-500/5 rounded-2xl overflow-hidden">
          <div className="bg-indigo-700 px-5 py-3 flex items-center gap-2">
            <span className="text-white font-bold">Backend · Laravel 11</span>
            <span className="text-indigo-300 text-xs ml-auto">Clean Architecture + Repository</span>
          </div>
          <div className="p-5 space-y-3">

            <PatternFlow
              step="01" color="#6366f1"
              title="HTTP Layer"
              items={[
                'FormRequest → valida y autoriza entrada',
                'Controller → delega al Service, devuelve Resource',
                'API Resource → transforma Model a JSON',
              ]}
            />
            <PatternArrow />
            <PatternFlow
              step="02" color="#8b5cf6"
              title="Application Layer (Services)"
              items={[
                'Service → orquesta casos de uso',
                'Dispatcher → lanza Events y Jobs',
                'Transactions → DB::transaction() atómico',
              ]}
            />
            <PatternArrow />
            <PatternFlow
              step="03" color="#0d9488"
              title="Domain Layer (Repositories)"
              items={[
                'Interface → contrato del repositorio',
                'EloquentRepository → implementación concreta',
                'GlobalScope → filtra por empresa_id automático',
              ]}
            />
            <PatternArrow />
            <PatternFlow
              step="04" color="#059669"
              title="Infrastructure"
              items={[
                'Models → Eloquent + Observer (audit log)',
                'Jobs → DIAN, PDF, Email (async queue)',
                'MySQL + Redis + S3',
              ]}
            />

            <div className="mt-4 border border-gray-700 rounded-xl p-4 bg-gray-900/60">
              <div className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">Estructura de carpetas Laravel</div>
              <pre className="text-[11px] text-gray-300 leading-relaxed font-mono">{`app/
├── Http/
│   ├── Controllers/Api/V1/
│   │   ├── Facturacion/
│   │   ├── Inventario/
│   │   ├── Contabilidad/
│   │   └── Nomina/
│   ├── Requests/          ← validación
│   ├── Resources/         ← transformación JSON
│   └── Middleware/        ← TenantResolver
├── Services/              ← lógica de negocio
│   ├── Facturacion/
│   │   ├── FacturaService.php
│   │   └── DianService.php
│   ├── Inventario/
│   └── Nomina/
├── Repositories/
│   ├── Contracts/         ← interfaces
│   └── Eloquent/          ← implementaciones
├── Models/                ← Eloquent models
├── Jobs/                  ← async (DIAN, PDF)
├── Events/ & Listeners/
└── Observers/             ← audit logs`}</pre>
            </div>
          </div>
        </div>

        {/* ── Frontend ── */}
        <div className="border border-blue-500/30 bg-blue-500/5 rounded-2xl overflow-hidden">
          <div className="bg-blue-700 px-5 py-3 flex items-center gap-2">
            <span className="text-white font-bold">Frontend · React 19</span>
            <span className="text-blue-300 text-xs ml-auto">Feature-based + Custom Hooks</span>
          </div>
          <div className="p-5 space-y-3">

            <PatternFlow
              step="01" color="#1d4ed8"
              title="Routing Layer"
              items={[
                'React Router 7 → rutas protegidas por rol',
                'Layouts anidados por módulo',
                'Lazy loading por página',
              ]}
            />
            <PatternArrow />
            <PatternFlow
              step="02" color="#0369a1"
              title="Pages (Vista)"
              items={[
                'Page = orquestador de features',
                'Recibe datos de hooks, no llama API directa',
                'Thin pages → delegan a feature components',
              ]}
            />
            <PatternArrow />
            <PatternFlow
              step="03" color="#0891b2"
              title="Custom Hooks (Lógica)"
              items={[
                'useFacturas(), useClientes(), etc.',
                'React Query → cache, loading, error',
                'Separa lógica de presentación',
              ]}
            />
            <PatternArrow />
            <PatternFlow
              step="04" color="#0d9488"
              title="API Services + Axios"
              items={[
                'facturaService.ts → endpoints REST',
                'Interceptor → Bearer Token automático',
                'Interceptor → errores 401/403/422',
              ]}
            />

            <div className="mt-4 border border-gray-700 rounded-xl p-4 bg-gray-900/60">
              <div className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">Estructura de carpetas React</div>
              <pre className="text-[11px] text-gray-300 leading-relaxed font-mono">{`src/
├── pages/                 ← una por ruta
│   ├── facturacion/
│   ├── inventario/
│   ├── contabilidad/
│   └── nomina/
├── features/              ← componentes de feature
│   ├── facturas/
│   │   ├── FacturaForm.tsx
│   │   ├── FacturaTable.tsx
│   │   └── useFacturas.ts ← hook con React Query
│   └── clientes/
├── components/            ← UI compartida
│   ├── ui/  (Button, Input, Modal)
│   └── layout/ (Sidebar, Navbar)
├── services/              ← llamadas API
│   ├── api.ts             ← axios instance
│   ├── facturaService.ts
│   └── authService.ts
├── hooks/                 ← hooks globales
└── types/                 ← TypeScript interfaces`}</pre>
            </div>
          </div>
        </div>
      </div>

      {/* Flujo de un caso de uso completo */}
      <div className="mt-8 border border-gray-200 rounded-2xl p-6 bg-gray-50 shadow-sm">
        <div className="text-sm font-bold text-gray-800 mb-4">Ejemplo: Emitir una Factura Electrónica (flujo completo)</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { n:'1', color:'#3b82f6', title:'Frontend', lines:['Usuario llena FacturaForm','useCrearFactura() hook','facturaService.post(data)','Axios → POST /api/v1/facturas'] },
            { n:'2', color:'#6366f1', title:'Laravel HTTP', lines:['FacturaStoreRequest valida','FacturaController recibe','Delega a FacturaService','Retorna FacturaResource'] },
            { n:'3', color:'#8b5cf6', title:'Service + Job', lines:['FacturaService crea registro','Genera XML UBL 2.1','Dispatch → EnviarDianJob','Responde id + estado: borrador'] },
            { n:'4', color:'#059669', title:'Queue → DIAN', lines:['Worker procesa el Job','Firma XML XAdES-BES','Envía a DIAN API','Guarda CUFE + actualiza estado'] },
          ].map(s=>(
            <div key={s.n} className="rounded-xl border border-gray-200 overflow-hidden bg-white shadow-sm">
              <div className="px-3 py-2 text-xs font-bold bg-gray-50 border-b border-gray-100" style={{borderLeft:`3px solid ${s.color}`}}>
                <span style={{color:s.color}}>Paso {s.n}</span> · {s.title}
              </div>
              <div className="px-3 py-2 space-y-1">
                {s.lines.map(l=>(
                  <div key={l} className="text-[11px] text-gray-500 font-mono flex items-start gap-1">
                    <span className="text-gray-300 shrink-0">›</span>{l}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PatternFlow({ step, color, title, items }: { step:string; color:string; title:string; items:string[] }) {
  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden bg-white shadow-sm">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-100 bg-gray-50">
        <span className="text-[10px] font-black rounded px-1.5 py-0.5 text-white" style={{backgroundColor: color}}>{step}</span>
        <span className="text-sm font-semibold text-gray-800">{title}</span>
      </div>
      <div className="px-3 py-2 space-y-1">
        {items.map(i=>(
          <div key={i} className="text-[11px] text-gray-500 font-mono flex items-start gap-1.5">
            <span className="text-gray-300 shrink-0 mt-0.5">▸</span>{i}
          </div>
        ))}
      </div>
    </div>
  )
}

function PatternArrow() {
  return (
    <div className="flex items-center justify-center gap-2 py-0.5">
      <div className="flex-1 h-px bg-gray-200" />
      <span className="text-gray-400 text-xs">↓ depende de</span>
      <div className="flex-1 h-px bg-gray-200" />
    </div>
  )
}

/* ══════════════════════════════════════════════════════════ MULTI-TENANT */
function MultiTenantDiagram() {
  return (
    <section id="multitenant" className="px-6 py-16 max-w-5xl mx-auto">
      <SectionTitle badge="Arquitectura Multi-tenant" title="La plataforma de STARKTECH es multi-tenant" sub="El propio sistema que construimos soporta N empresas simultáneamente. Cada empresa-cliente (tenant) tiene su NIT, config DIAN, usuarios y datos aislados — todo dentro de un único deployment." />
      <div className="mt-10">
        <div className="flex justify-center mb-0">
          <div className="bg-blue-600 text-white rounded-xl px-8 py-3 text-center shadow-lg shadow-blue-900/40">
            <div className="font-bold">STARKTECH SaaS Platform · starktech.co</div>
            <div className="text-blue-200 text-xs mt-0.5">Nuestro propio sistema · Multi-tenant nativo · Shared DB o DB-per-tenant · empresa_id scope</div>
          </div>
        </div>
        <div className="flex justify-center"><div className="w-px h-6 bg-gray-300" /></div>

        {/* Banner BD compartida */}
        <div className="mb-4 border-2 border-[#0099FF]/30 bg-blue-50 rounded-xl p-4 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🗄️</span>
            <div>
              <div className="font-bold text-gray-900 text-sm">Estrategia de base de datos flexible</div>
              <div className="text-xs text-gray-500">Shared DB (default) · DB por tenant (opcional) · Isolation by <code className="bg-blue-100 text-blue-700 px-1 rounded">empresa_id</code></div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 ml-auto text-xs">
            {['MySQL por defecto','empresa_id en cada tabla','Global Scope automático','DB por empresa: opcional'].map(t=>(
              <span key={t} className="bg-white border border-blue-200 text-blue-700 rounded-full px-2 py-0.5 font-medium">{t}</span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {nit:'900.123.456-7',nombre:'Distribuidora ABC',plan:'Empresarial',docs:'Ilimitado'},
            {nit:'800.987.654-3',nombre:'Comercial XYZ Ltda.',plan:'Pro',docs:'5.000/mes'},
            {nit:'901.555.222-1',nombre:'Servicios DEF S.A.',plan:'Básico',docs:'500/mes'},
          ].map(t=>(
            <div key={t.nit} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <div className="text-xs text-gray-400 uppercase tracking-wider">Tenant</div>
                <div className="font-semibold text-gray-900 mt-0.5">{t.nombre}</div>
                <div className="text-xs font-mono" style={{color:'#0099FF'}}>NIT: {t.nit}</div>
              </div>
              <div className="bg-white px-4 py-3 space-y-1.5 text-xs">
                {[['Plan',t.plan],['Cuota',t.docs],['Resolución DIAN','Propia'],['Certificado digital','Propio'],['Usuarios','N (aislados)'],['empresa_id','Scope automático']].map(([k,v])=>(
                  <div key={k} className="flex justify-between">
                    <span className="text-gray-400">{k}</span>
                    <span className="text-gray-700 font-medium">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="text-sm font-semibold text-gray-700 mb-3">Estrategia de aislamiento</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {[
              {color:'#0099FF',t:'Global Scope Eloquent',d:'Todos los modelos tienen un GlobalScope que filtra por empresa_id del tenant autenticado vía middleware.'},
              {color:'#6366f1',t:'Laravel Policies',d:'Cada acción (crear, ver, editar, eliminar) es validada por una Policy que verifica empresa_id.'},
              {color:'#8b5cf6',t:'Config por Tenant',d:'Certificado DIAN, resolución, logo, SMTP, datos fiscales — todo en configuracion_empresa por empresa.'},
            ].map(({color,t,d})=>(
              <div key={t} className="border border-gray-200 rounded-lg p-3 bg-white shadow-sm">
                <div className="font-semibold mb-1" style={{color}}>{t}</div>
                <p className="text-gray-500 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════ ER DIAGRAM */

type Entity  = { name:string; color:string; pk:string; fks?:string[]; fields:string[] }
type ERModule = { label:string; icon:string; accent:string; textAccent:string; entities:Entity[] }

const CM: Record<string,{border:string;header:string}> = {
  blue:    {border:'border-blue-500/40',    header:'bg-blue-700'},
  sky:     {border:'border-sky-500/40',     header:'bg-sky-700'},
  indigo:  {border:'border-indigo-500/40',  header:'bg-indigo-700'},
  violet:  {border:'border-violet-500/40',  header:'bg-violet-700'},
  cyan:    {border:'border-cyan-500/40',    header:'bg-cyan-700'},
  emerald: {border:'border-emerald-500/40', header:'bg-emerald-800'},
  teal:    {border:'border-teal-500/40',    header:'bg-teal-700'},
  amber:   {border:'border-amber-500/40',   header:'bg-amber-700'},
  rose:    {border:'border-rose-500/40',    header:'bg-rose-800'},
  green:   {border:'border-green-500/40',   header:'bg-green-800'},
  lime:    {border:'border-lime-500/40',    header:'bg-lime-700'},
  yellow:  {border:'border-yellow-500/40',  header:'bg-yellow-700'},
  orange:  {border:'border-orange-500/40',  header:'bg-orange-700'},
  purple:  {border:'border-purple-500/40',  header:'bg-purple-700'},
  pink:    {border:'border-pink-500/40',    header:'bg-pink-800'},
  fuchsia: {border:'border-fuchsia-500/40', header:'bg-fuchsia-800'},
  red:     {border:'border-red-500/40',     header:'bg-red-800'},
  slate:   {border:'border-slate-500/40',   header:'bg-slate-700'},
}

function ERDiagram() {
  const modules: ERModule[] = [
    {
      label:'Core / Tenancy', icon:'🏗️',
      accent:'border-blue-500/25 bg-blue-500/5', textAccent:'text-blue-400',
      entities:[
        { name:'planes',    color:'violet', pk:'id',
          fields:['nombre','max_documentos_mes','precio_mes','activo'] },
        { name:'empresas',  color:'blue',   pk:'id', fks:['plan_id → planes'],
          fields:['nit','razon_social','email','telefono','ciudad','departamento','activo'] },
        { name:'usuarios',  color:'sky',    pk:'id', fks:['empresa_id → empresas'],
          fields:['nombre','email','password','rol (admin|contador|viewer)','activo'] },
        { name:'configuracion_empresa', color:'indigo', pk:'id', fks:['empresa_id → empresas'],
          fields:['logo_path','smtp_host','smtp_user','smtp_pass','cert_dian_path','cert_password','prefijo_factura'] },
        { name:'audit_logs', color:'slate', pk:'id', fks:['empresa_id → empresas','usuario_id → usuarios'],
          fields:['modelo','modelo_id','accion (create|update|delete)','datos_antes','datos_despues','ip','fecha'] },
      ],
    },
    {
      label:'Facturación DIAN', icon:'🧾',
      accent:'border-emerald-500/25 bg-emerald-500/5', textAccent:'text-emerald-400',
      entities:[
        { name:'resoluciones_dian', color:'indigo', pk:'id', fks:['empresa_id → empresas'],
          fields:['prefijo','numero_desde','numero_hasta','consecutivo_actual','fecha_desde','fecha_hasta','tipo (FV|NC|ND)','ambiente (pruebas|produccion)'] },
        { name:'clientes', color:'cyan', pk:'id', fks:['empresa_id → empresas'],
          fields:['tipo_doc (NIT|CC|CE|PP)','numero_doc','razon_social','email','telefono','ciudad','departamento','regimen'] },
        { name:'cotizaciones', color:'teal', pk:'id', fks:['empresa_id → empresas','cliente_id → clientes'],
          fields:['numero','fecha_emision','fecha_vencimiento','subtotal','iva','total','estado (borrador|enviada|aceptada|vencida)','notas'] },
        { name:'facturas', color:'emerald', pk:'id',
          fks:['empresa_id → empresas','cliente_id → clientes','resolucion_id → resoluciones_dian','cotizacion_id → cotizaciones'],
          fields:['prefijo','consecutivo','cufe','qr_code','fecha_emision','fecha_vencimiento','subtotal','descuento','base_iva','iva','total','estado','xml_path','pdf_path'] },
        { name:'detalle_facturas', color:'green', pk:'id',
          fks:['factura_id → facturas','producto_id → productos'],
          fields:['descripcion','cantidad','precio_unitario','descuento_pct','iva_pct','subtotal'] },
        { name:'retenciones_factura', color:'amber', pk:'id',
          fks:['factura_id → facturas'],
          fields:['tipo (retefuente|reteiva|reteica)','base','porcentaje','valor'] },
        { name:'notas_credito', color:'rose', pk:'id',
          fks:['empresa_id → empresas','factura_id → facturas','resolucion_id → resoluciones_dian'],
          fields:['prefijo','consecutivo','cufe','motivo','subtotal','iva','total','estado','xml_path'] },
        { name:'eventos_dian', color:'red', pk:'id',
          fks:['factura_id → facturas'],
          fields:['tipo_evento','codigo_dian','mensaje_dian','respuesta_xml','fecha_evento'] },
      ],
    },
    {
      label:'Productos & Materia Prima (BOM)', icon:'📦',
      accent:'border-green-500/25 bg-green-500/5', textAccent:'text-green-400',
      entities:[
        { name:'categorias_producto', color:'lime', pk:'id', fks:['empresa_id → empresas'],
          fields:['nombre','descripcion','activo'] },
        { name:'unidades_medida', color:'teal', pk:'id', fks:['empresa_id → empresas'],
          fields:['codigo (UND|KG|LT|MT)','nombre','tipo (masa|volumen|longitud|unidad)'] },
        { name:'productos', color:'green', pk:'id',
          fks:['empresa_id → empresas','categoria_id → categorias_producto','unidad_id → unidades_medida'],
          fields:['codigo','nombre','descripcion','tipo (producto|servicio)','precio_venta','precio_costo','iva_pct','es_compuesto','activo'] },
        { name:'materias_primas', color:'yellow', pk:'id',
          fks:['empresa_id → empresas','unidad_id → unidades_medida'],
          fields:['codigo','nombre','descripcion','costo_unitario','stock_actual','stock_minimo','proveedor_principal_id'] },
        { name:'producto_materia_prima', color:'orange', pk:'id',
          fks:['producto_id → productos','materia_prima_id → materias_primas'],
          fields:['cantidad_requerida','merma_pct','unidad_id → unidades_medida','orden_proceso'] },
      ],
    },
    {
      label:'Proveedores & Compras', icon:'🚚',
      accent:'border-orange-500/25 bg-orange-500/5', textAccent:'text-orange-400',
      entities:[
        { name:'proveedores', color:'orange', pk:'id', fks:['empresa_id → empresas'],
          fields:['tipo_doc (NIT|CC)','numero_doc','razon_social','email','telefono','ciudad','plazo_pago_dias','activo'] },
        { name:'ordenes_compra', color:'amber', pk:'id',
          fks:['empresa_id → empresas','proveedor_id → proveedores','usuario_id → usuarios'],
          fields:['numero','fecha_emision','fecha_esperada','subtotal','iva','total','estado (borrador|enviada|recibida|anulada)'] },
        { name:'detalle_ordenes_compra', color:'yellow', pk:'id',
          fks:['orden_compra_id → ordenes_compra','producto_id → productos'],
          fields:['descripcion','cantidad','precio_unitario','iva_pct','subtotal','cantidad_recibida'] },
        { name:'recepciones_compra', color:'lime', pk:'id',
          fks:['empresa_id → empresas','orden_compra_id → ordenes_compra','bodega_id → bodegas'],
          fields:['fecha_recepcion','numero_factura_proveedor','observacion','estado (parcial|completa)'] },
      ],
    },
    {
      label:'Inventario', icon:'🏭',
      accent:'border-purple-500/25 bg-purple-500/5', textAccent:'text-purple-400',
      entities:[
        { name:'bodegas', color:'purple', pk:'id', fks:['empresa_id → empresas'],
          fields:['nombre','ubicacion','responsable','tipo (principal|secundaria|virtual)','activo'] },
        { name:'inventario', color:'violet', pk:'id',
          fks:['empresa_id → empresas','producto_id → productos','bodega_id → bodegas'],
          fields:['stock_actual','stock_minimo','stock_maximo','costo_promedio','ultima_actualizacion'] },
        { name:'movimientos_inventario', color:'pink', pk:'id',
          fks:['empresa_id → empresas','producto_id → productos','bodega_id → bodegas','usuario_id → usuarios','referencia_id (polimórfico)'],
          fields:['tipo (entrada|salida|traslado|ajuste|produccion)','cantidad','costo_unitario','costo_total','referencia_tipo','observacion','fecha'] },
      ],
    },
    {
      label:'Tesorería & Pagos', icon:'💰',
      accent:'border-cyan-500/25 bg-cyan-500/5', textAccent:'text-cyan-400',
      entities:[
        { name:'cuentas_bancarias', color:'cyan', pk:'id', fks:['empresa_id → empresas'],
          fields:['banco','numero_cuenta','tipo (corriente|ahorros)','saldo_actual','moneda','activo'] },
        { name:'pagos_recibidos', color:'teal', pk:'id',
          fks:['empresa_id → empresas','factura_id → facturas','cuenta_bancaria_id → cuentas_bancarias'],
          fields:['fecha','valor','medio_pago (efectivo|transferencia|cheque|credito)','referencia','notas'] },
        { name:'egresos', color:'sky', pk:'id',
          fks:['empresa_id → empresas','proveedor_id → proveedores','cuenta_bancaria_id → cuentas_bancarias','orden_compra_id → ordenes_compra'],
          fields:['fecha','valor','concepto','medio_pago','referencia','comprobante_path'] },
        { name:'conciliaciones_bancarias', color:'indigo', pk:'id',
          fks:['empresa_id → empresas','cuenta_bancaria_id → cuentas_bancarias'],
          fields:['periodo','saldo_extracto','saldo_sistema','diferencia','estado (abierta|cerrada)'] },
      ],
    },
    {
      label:'Contabilidad', icon:'📒',
      accent:'border-fuchsia-500/25 bg-fuchsia-500/5', textAccent:'text-fuchsia-400',
      entities:[
        { name:'periodos_contables', color:'fuchsia', pk:'id', fks:['empresa_id → empresas'],
          fields:['anio','mes','fecha_apertura','fecha_cierre','estado (abierto|cerrado)'] },
        { name:'centros_costo', color:'purple', pk:'id', fks:['empresa_id → empresas'],
          fields:['codigo','nombre','descripcion','activo'] },
        { name:'cuentas_contables', color:'violet', pk:'id',
          fks:['empresa_id → empresas','cuenta_padre_id → cuentas_contables'],
          fields:['codigo_puc','nombre','tipo (activo|pasivo|patrimonio|ingreso|gasto|costo)','nivel','acepta_movimientos','naturaleza (debito|credito)'] },
        { name:'asientos_contables', color:'rose', pk:'id',
          fks:['empresa_id → empresas','periodo_id → periodos_contables','usuario_id → usuarios'],
          fields:['fecha','descripcion','referencia','total_debito','total_credito','estado (borrador|aprobado)','origen (manual|automatico)'] },
        { name:'detalle_asientos', color:'red', pk:'id',
          fks:['asiento_id → asientos_contables','cuenta_id → cuentas_contables','centro_costo_id → centros_costo'],
          fields:['debito','credito','descripcion','tercero_doc','tercero_nombre'] },
      ],
    },
    {
      label:'Nómina', icon:'👷',
      accent:'border-amber-500/25 bg-amber-500/5', textAccent:'text-amber-400',
      entities:[
        { name:'conceptos_nomina', color:'lime', pk:'id', fks:['empresa_id → empresas'],
          fields:['nombre','tipo (devengado|deduccion)','aplica_ley','porcentaje','valor_fijo','activo'] },
        { name:'empleados', color:'amber', pk:'id', fks:['empresa_id → empresas'],
          fields:['tipo_doc','numero_doc','nombre','cargo','departamento','tipo_contrato (indefinido|fijo|obra)','salario_base','fecha_ingreso','activo'] },
        { name:'nominas', color:'orange', pk:'id', fks:['empresa_id → empresas','periodo_id → periodos_contables'],
          fields:['periodo_inicio','periodo_fin','tipo (quincenal|mensual)','total_devengado','total_deducido','total_neto','estado (borrador|liquidada|pagada)'] },
        { name:'detalle_nomina', color:'yellow', pk:'id',
          fks:['nomina_id → nominas','empleado_id → empleados'],
          fields:['salario_base','dias_trabajados','horas_extra_valor','auxilio_transporte','bonificaciones','salud_empleado','pension_empleado','retencion_fuente','otros_descuentos','neto_pagar'] },
      ],
    },
    {
      label:'Activos Fijos & Configuración', icon:'⚙️',
      accent:'border-slate-500/25 bg-slate-500/5', textAccent:'text-slate-400',
      entities:[
        { name:'activos_fijos', color:'slate', pk:'id',
          fks:['empresa_id → empresas','cuenta_contable_id → cuentas_contables'],
          fields:['codigo','nombre','descripcion','valor_compra','fecha_compra','vida_util_meses','metodo_depreciacion','valor_residual','activo'] },
        { name:'depreciaciones', color:'indigo', pk:'id',
          fks:['activo_id → activos_fijos','periodo_id → periodos_contables'],
          fields:['valor_depreciacion','valor_acumulado','valor_en_libros','fecha'] },
        { name:'api_keys', color:'violet', pk:'id', fks:['empresa_id → empresas'],
          fields:['nombre','key_hash','permisos','ultimo_uso','expira_en','activo'] },
        { name:'webhooks', color:'purple', pk:'id', fks:['empresa_id → empresas'],
          fields:['url','eventos (factura.creada|dian.aceptada|stock.bajo)','secreto','activo','ultimo_intento'] },
      ],
    },
  ]

  const totalTables = modules.reduce((s,m)=>s+m.entities.length,0)

  return (
    <section id="er" className="px-6 py-16 max-w-7xl mx-auto">
      <SectionTitle
        badge="Diagrama Entidad-Relación"
        title="Modelo de datos completo"
        sub={`${totalTables} tablas · 9 módulos · Todos los modelos filtran por empresa_id (multi-tenant)`}
      />

      {/* Mapa de relaciones clave */}
      <div className="mt-8 border border-gray-200 rounded-2xl p-5 bg-gray-50 shadow-sm">
        <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Relaciones clave entre módulos</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-[11px] font-mono">
          {[
            ['empresas','→ 1:N','planes','Cada empresa tiene un plan'],
            ['facturas','→ 1:N','detalle_facturas','Líneas de producto'],
            ['detalle_facturas','→ N:1','productos','Producto facturado'],
            ['productos','→ N:M','materias_primas','BOM: composición del producto'],
            ['inventario','→ N:1','bodegas','Stock por bodega'],
            ['movimientos_inventario','→ polimórfico','facturas / ordenes_compra','Referencia según tipo'],
            ['asientos_contables','→ 1:N','detalle_asientos','Partida doble'],
            ['cuentas_contables','→ recursivo','cuentas_contables','Árbol PUC (padre→hijo)'],
            ['nominas','→ 1:N','detalle_nomina','Liquidación por empleado'],
            ['facturas','→ 1:N','retenciones_factura','Retef. / ReteIVA / ReteICA'],
            ['ordenes_compra','→ 1:N','recepciones_compra','Recepción parcial/total'],
            ['cotizaciones','→ 1:1','facturas','Cotización convertida a FE'],
          ].map(([a,rel,b,desc])=>(
            <div key={`${a}${b}`} className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm">
              <span className="shrink-0 font-semibold" style={{color:'#0099FF'}}>{a}</span>
              <span className="text-gray-400">{rel}</span>
              <span className="shrink-0 font-semibold text-emerald-600">{b}</span>
              <span className="text-gray-400 hidden lg:inline">· {desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Módulos */}
      <div className="mt-6 space-y-5">
        {modules.map(mod=>(
          <div key={mod.label} className={`border ${mod.accent} rounded-2xl p-5`}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">{mod.icon}</span>
              <span className="font-bold text-gray-900">{mod.label}</span>
              <span className="text-xs ml-1 text-gray-500">{mod.entities.length} tablas</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {mod.entities.map(e=>(
                <EntityCard key={e.name} entity={e} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Leyenda */}
      <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-yellow-400 inline-block"/>PK — Clave primaria</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-orange-400 inline-block"/>FK — Clave foránea</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-gray-300 inline-block"/>Campo regular</span>
        <span className="ml-auto font-mono text-gray-400">Total: {totalTables} tablas · 9 módulos</span>
      </div>
    </section>
  )
}

function EntityCard({ entity }: { entity: Entity }) {
  const c = CM[entity.color] ?? CM.blue
  return (
    <div className={`border ${c.border} rounded-xl overflow-hidden bg-white shadow-sm`}>
      <div className={`${c.header} px-3 py-2`}>
        <span className="font-mono font-bold text-white text-[11px]">{entity.name}</span>
      </div>
      <div className="px-3 py-2 space-y-0.5">
        <FieldRow label={entity.pk} badge="PK" bc="bg-yellow-50 text-yellow-700 border border-yellow-200"/>
        {entity.fks?.map(fk=><FieldRow key={fk} label={fk} badge="FK" bc="bg-orange-50 text-orange-700 border border-orange-200"/>)}
        {entity.fields.map(f=><FieldRow key={f} label={f}/>)}
      </div>
    </div>
  )
}

function FieldRow({ label, badge, bc }: { label:string; badge?:string; bc?:string }) {
  return (
    <div className="flex items-start gap-1.5 text-[10px] py-px">
      {badge
        ? <span className={`px-1 py-px rounded font-mono font-semibold shrink-0 leading-tight ${bc}`}>{badge}</span>
        : <span className="w-6 shrink-0"/>}
      <span className="font-mono text-gray-600 leading-tight break-all">{label}</span>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════ TECH STACK */
function TechStack() {
  const layers = [
    { title:'Frontend', color:'blue', items:[
      {n:'React 19',d:'UI components'},
      {n:'Vite 8',d:'Build tool'},
      {n:'TailwindCSS 4',d:'Estilos'},
      {n:'React Query',d:'Server state + cache'},
      {n:'React Router 7',d:'Navegación'},
      {n:'React Hook Form',d:'Formularios'},
      {n:'Zod',d:'Validación TS'},
      {n:'Axios',d:'HTTP client'},
    ]},
    { title:'Backend', color:'indigo', items:[
      {n:'Laravel 11',d:'Framework PHP'},
      {n:'Sanctum',d:'Auth API tokens'},
      {n:'Queues + Horizon',d:'Jobs async'},
      {n:'Eloquent ORM',d:'Modelos + Scopes'},
      {n:'Policies',d:'Autorización'},
      {n:'Spatie Permissions',d:'Roles granulares'},
      {n:'PHP UBL 2.1',d:'XML DIAN'},
      {n:'XAdES-BES',d:'Firma digital'},
    ]},
    { title:'Infraestructura', color:'violet', items:[
      {n:'MySQL 8',d:'Base de datos'},
      {n:'Redis',d:'Cache + Queue driver'},
      {n:'S3 / MinIO',d:'XML/PDF/Certs'},
      {n:'Docker + Compose',d:'Contenedores'},
      {n:'Nginx',d:'Web server'},
      {n:'SMTP',d:'Email por empresa'},
    ]},
    { title:'DIAN / Compliance', color:'emerald', items:[
      {n:'UBL 2.1',d:'Estándar XML'},
      {n:'CUFE',d:'Código único FE'},
      {n:'XAdES-BES',d:'Firma digital'},
      {n:'QR Code',d:'Verificación'},
      {n:'Ambiente pruebas',d:'Habilitación'},
      {n:'Ambiente producción',d:'Emisión real'},
    ]},
  ]
  return (
    <section id="stack" className="px-6 py-16 max-w-5xl mx-auto">
      <SectionTitle badge="Tech Stack" title="Tecnologías del sistema" sub="Stack moderno orientado a cumplir la normativa DIAN y escalar como SaaS." />
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
        {layers.map(layer=>{
          const c = CM[layer.color] ?? CM.blue
          return (
            <div key={layer.title} className={`border ${c.border} rounded-xl overflow-hidden`}>
              <div className={`${c.header} px-4 py-2.5`}>
                <span className="font-semibold text-white">{layer.title}</span>
              </div>
              <div className="bg-gray-50 px-4 py-3 grid grid-cols-2 gap-2">
                {layer.items.map(item=>(
                  <div key={item.n} className="flex items-start gap-1.5 text-sm">
                    <span className="text-gray-300 mt-0.5 shrink-0">▸</span>
                    <div><span className="text-gray-800 font-medium">{item.n}</span><span className="text-gray-400 text-xs"> · {item.d}</span></div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════ FOOTER */
function Footer() {
  return (
    <footer className="border-t border-gray-200 px-6 py-8 text-center text-gray-400 text-sm bg-gray-50">
      <p>Starktech Software & Marketing · Documentación técnica interna · {new Date().getFullYear()}</p>
    </footer>
  )
}

/* ══════════════════════════════════════════════════════════ HELPERS */
function SectionTitle({ badge, title, sub }: { badge:string; title:string; sub:string }) {
  return (
    <div className="text-center">
      <span className="text-xs font-bold uppercase tracking-widest text-[#0099FF] bg-blue-50 border border-blue-100 rounded-full px-3 py-1">{badge}</span>
      <h2 className="text-3xl font-black text-gray-900 mt-4 mb-2">{title}</h2>
      <p className="text-gray-500 text-sm max-w-xl mx-auto">{sub}</p>
    </div>
  )
}

function Layer({ color, label, children }: { color:string; label:string; children:React.ReactNode }) {
  const s: Record<string,string> = {
    blue:'border-blue-500/30 bg-blue-500/5 text-blue-400',
    indigo:'border-indigo-500/30 bg-indigo-500/5 text-indigo-400',
    violet:'border-violet-500/30 bg-violet-500/5 text-violet-400',
    teal:'border-teal-500/30 bg-teal-500/5 text-teal-400',
    emerald:'border-emerald-500/30 bg-emerald-500/5 text-emerald-400',
  }
  const cls = s[color] ?? s.blue
  return (
    <div className={`w-full border ${cls.split(' ').slice(0,2).join(' ')} rounded-xl p-4`}>
      <div className={`text-[11px] font-bold uppercase tracking-widest ${cls.split(' ')[2]} mb-3 text-center`}>{label}</div>
      <div className="flex flex-wrap justify-center gap-3">{children}</div>
    </div>
  )
}

function ABox({ color, title, lines }: { color:string; title:string; lines:string[] }) {
  const h: Record<string,string> = {blue:'bg-blue-700',indigo:'bg-indigo-700',violet:'bg-violet-700',teal:'bg-teal-700',emerald:'bg-emerald-800'}
  return (
    <div className="rounded-lg overflow-hidden border border-gray-700 min-w-38.75">
      <div className={`${h[color]??h.blue} px-3 py-1.5 text-white text-xs font-bold text-center`}>{title}</div>
      <div className="bg-gray-900 px-3 py-2 space-y-0.5">
        {lines.filter(Boolean).map(l=><div key={l} className="text-[11px] text-gray-400 font-mono">{l}</div>)}
      </div>
    </div>
  )
}

function Arrow({ label }: { label:string }) {
  return (
    <div className="flex flex-col items-center my-1">
      <div className="w-px h-4 bg-gray-700"/>
      <div className="text-[11px] text-gray-500 bg-gray-900 border border-gray-700 rounded px-2 py-0.5">{label}</div>
      <div className="text-gray-600 text-sm">↓</div>
    </div>
  )
}
