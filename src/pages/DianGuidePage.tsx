import { useState } from 'react'
import logo from '../assets/logo.jpeg'

export default function DianGuidePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Nav />
      <Hero />
      <DbStrategy />
      <Requisitos />
      <HabilitacionSteps />
      <IntegracionTecnica />
      <FlujoDian />
      <Ambientes />
      <ErroresComunesSection />
      <Footer />
    </div>
  )
}

/* ── NAV ── */
function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img src={logo} alt="Starktech" className="h-10 w-auto rounded-lg" />
        <span className="text-[#0099FF] font-semibold text-sm">· Guía DIAN</span>
      </div>
      <div className="flex gap-5 text-sm text-gray-500 font-medium">
        {[['#bd','BD Strategy'],['#requisitos','Requisitos'],['#habilitacion','Habilitación'],['#tecnico','Técnico'],['#flujo','Flujo'],['#ambientes','Ambientes']].map(([h,l])=>(
          <a key={h} href={h} className="hover:text-gray-900 transition-colors hidden md:inline">{l}</a>
        ))}
        <a href="/docs" className="text-[#0099FF] hover:text-blue-600 transition-colors font-semibold">← Docs</a>
        <a href="/" className="text-gray-400 hover:text-gray-700 transition-colors">Inicio</a>
      </div>
    </nav>
  )
}

/* ── HERO ── */
function Hero() {
  return (
    <section className="bg-[#0d1b2e] px-6 py-16 text-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{background:'radial-gradient(ellipse at 30% 50%, #0099FF18, transparent 60%), radial-gradient(ellipse at 70% 50%, #FF660012, transparent 60%)'}} />
      <div className="relative max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-[#0099FF]/10 border border-[#0099FF]/30 rounded-full px-4 py-1.5 text-sm text-[#0099FF] mb-6">
          <span className="w-2 h-2 rounded-full bg-[#0099FF] animate-pulse" />
          Colombia · DIAN · Guía oficial de integración
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
          Guía de Conexión<br />
          <span style={{color:'#0099FF'}}>DIAN</span> paso a paso
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
          Todo lo que necesitas: estrategia de base de datos, requisitos, proceso de habilitación,
          integración técnica UBL 2.1 y firma XAdES-BES.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-xl mx-auto">
          {[['7','Pasos habilitación'],['UBL 2.1','Estándar XML'],['XAdES-BES','Firma digital'],['CUFE','Código único']].map(([v,l])=>(
            <div key={l} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
              <div className="font-black text-lg" style={{color:'#0099FF'}}>{v}</div>
              <div className="text-gray-500 text-[10px] mt-0.5">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── BD STRATEGY ── */
function DbStrategy() {
  const [active, setActive] = useState<'shared'|'perdb'>('shared')
  return (
    <section id="bd" className="py-16 px-6 max-w-5xl mx-auto">
      <SectionTitle
        badge="Estrategia de Base de Datos"
        title="¿Shared DB o BD por empresa?"
        sub="Elige la estrategia de multi-tenant según tus necesidades de aislamiento, escala y presupuesto."
      />
      <div className="mt-8 flex justify-center gap-3 mb-8">
        <button
          onClick={()=>setActive('shared')}
          className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${active==='shared' ? 'text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          style={active==='shared' ? {backgroundColor:'#0099FF'} : {}}
        >Shared Database (recomendado)</button>
        <button
          onClick={()=>setActive('perdb')}
          className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${active==='perdb' ? 'text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          style={active==='perdb' ? {backgroundColor:'#FF6600'} : {}}
        >Base de datos por empresa</button>
      </div>

      {active === 'shared' && (
        <div className="border-2 border-blue-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="bg-blue-600 px-6 py-3 flex items-center justify-between">
            <span className="text-white font-bold">Shared Database · Shared Schema</span>
            <span className="bg-white text-blue-600 text-xs font-bold px-3 py-1 rounded-full">Recomendado para comenzar</span>
          </div>
          <div className="p-6 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-gray-800 mb-3">¿Cómo funciona?</h4>
                <div className="bg-gray-50 rounded-xl p-4 font-mono text-xs text-gray-600 leading-relaxed">
{`-- Una sola base de datos
-- empresa_id en cada tabla

SELECT * FROM facturas
WHERE empresa_id = :tenant_id  ← GlobalScope

-- Laravel: TenantScope automático
class Factura extends Model {
  protected static function booted() {
    static::addGlobalScope(
      new EmpresaScope()
    );
  }
}`}
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Ventajas</h4>
                  {['Fácil de mantener (1 BD)','Migraciones únicas','Menor costo de infraestructura','Backups centralizados','Fácil escalar horizontalmente'].map(v=>(
                    <div key={v} className="flex items-center gap-2 text-sm text-gray-600 py-0.5">
                      <span className="w-4 h-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-[10px] font-bold shrink-0">✓</span>
                      {v}
                    </div>
                  ))}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Consideraciones</h4>
                  {['Requiere GlobalScope en todos los modelos','Un bug puede exponer datos de otra empresa','Índices compuestos con empresa_id'].map(v=>(
                    <div key={v} className="flex items-center gap-2 text-sm text-gray-600 py-0.5">
                      <span className="w-4 h-4 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center text-[10px] font-bold shrink-0">!</span>
                      {v}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4 bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 text-sm text-blue-700">
              <strong>Paquete recomendado:</strong> <code>spatie/laravel-multitenancy</code> con estrategia <code>SwitchTenantDatabase</code> desactivada (shared schema) o implementación propia con GlobalScope.
            </div>
          </div>
        </div>
      )}

      {active === 'perdb' && (
        <div className="border-2 border-orange-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="px-6 py-3 flex items-center justify-between" style={{backgroundColor:'#FF6600'}}>
            <span className="text-white font-bold">Database per Tenant · Aislamiento total</span>
            <span className="bg-white text-orange-600 text-xs font-bold px-3 py-1 rounded-full">Mayor aislamiento</span>
          </div>
          <div className="p-6 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-gray-800 mb-3">¿Cómo funciona?</h4>
                <div className="bg-gray-50 rounded-xl p-4 font-mono text-xs text-gray-600 leading-relaxed">
{`// config/database.php dinámico
// Laravel cambia la conexión por empresa

// stancl/tenancy o spatie/multitenancy
class TenantMiddleware {
  public function handle($request, $next) {
    $empresa = Empresa::findByNit(
      $request->header('X-Empresa')
    );
    // Cambia la conexión de DB
    DB::setDefaultConnection(
      'tenant_' . $empresa->id
    );
    return $next($request);
  }
}

// Cada empresa tiene su BD:
// db_empresa_1, db_empresa_2 ...`}
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Ventajas</h4>
                  {['Aislamiento total de datos','Backup por empresa independiente','Eliminar empresa = drop database','Cumplimiento normativas de privacidad','Sin riesgo de data leak entre tenants'].map(v=>(
                    <div key={v} className="flex items-center gap-2 text-sm text-gray-600 py-0.5">
                      <span className="w-4 h-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-[10px] font-bold shrink-0">✓</span>
                      {v}
                    </div>
                  ))}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Consideraciones</h4>
                  {['Más costoso (N conexiones de BD)','Migraciones deben correr para cada BD','Mayor complejidad operacional','Requiere gestor de conexiones (pool)'].map(v=>(
                    <div key={v} className="flex items-center gap-2 text-sm text-gray-600 py-0.5">
                      <span className="w-4 h-4 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-[10px] font-bold shrink-0">!</span>
                      {v}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4 bg-orange-50 border border-orange-100 rounded-lg px-4 py-3 text-sm text-orange-700">
              <strong>Paquetes recomendados:</strong> <code>stancl/tenancy</code> (automático, DB por tenant) o <code>spatie/laravel-multitenancy</code> con <code>SwitchTenantDatabase</code>. Las migraciones deben ejecutarse con <code>php artisan tenants:migrate</code>.
            </div>
          </div>
        </div>
      )}

      {/* Comparativa */}
      <div className="mt-6 border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
          <span className="font-bold text-gray-700 text-sm">Comparativa rápida</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {['Criterio','Shared DB','BD por empresa'].map(h=>(
                  <th key={h} className="px-4 py-2.5 text-left text-xs font-bold text-gray-500 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Aislamiento de datos','Medio (por scope)','Total (BD separada)'],
                ['Costo infraestructura','Bajo','Alto'],
                ['Complejidad técnica','Baja','Alta'],
                ['Migraciones','Una sola vez','Por cada empresa'],
                ['Backup','Centralizado','Por empresa'],
                ['Escala (N empresas)','Muy fácil','Requiere gestión'],
                ['Recomendado para','Startups / SaaS general','Grandes empresas / compliance'],
              ].map(([c,s,p])=>(
                <tr key={c} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-2.5 font-medium text-gray-700">{c}</td>
                  <td className="px-4 py-2.5 text-blue-600">{s}</td>
                  <td className="px-4 py-2.5 text-orange-600">{p}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

/* ── REQUISITOS ── */
function Requisitos() {
  const items = [
    {
      n:'01', color:'#0099FF', icon:'🏢', title:'RUT actualizado',
      desc:'El RUT de la empresa debe tener activa la responsabilidad de facturación electrónica. Verifica en el portal DIAN (MUISCA).',
      checks:['Responsabilidad 52 - IVA activa','Responsabilidad 11 o 12 según régimen','Datos de contacto actualizados','Email principal registrado en DIAN'],
    },
    {
      n:'02', color:'#FF6600', icon:'🔐', title:'Certificado digital',
      desc:'Firma electrónica emitida por una entidad certificadora habilitada por la ONAC (Colombia).',
      checks:['Certicámara (recomendado)','GSE - Gestión de Seguridad Electrónica','Andes SCD','Vigencia mínima 1 año · Formato .p12 o .pfx'],
    },
    {
      n:'03', color:'#6366f1', icon:'💻', title:'Software de facturación',
      desc:'El software debe estar registrado y habilitado por la DIAN como proveedor tecnológico o facturador directo.',
      checks:['Registro como facturador directo o vía proveedor','NIT del software registrado en DIAN','Capacidad de generar XML UBL 2.1','Implementación de firma XAdES-BES'],
    },
    {
      n:'04', color:'#059669', icon:'📋', title:'Set de pruebas DIAN',
      desc:'Antes de producción debes enviar y aprobar un set mínimo de documentos en el ambiente de habilitación.',
      checks:['Mínimo 35 documentos de prueba','Facturas, notas crédito y débito','Distintos escenarios de IVA y retenciones','Aprobación del equipo técnico DIAN'],
    },
  ]
  return (
    <section id="requisitos" className="py-16 px-6 bg-gray-50 border-y border-gray-100">
      <div className="max-w-5xl mx-auto">
        <SectionTitle badge="Requisitos Previos" title="Qué necesitas antes de empezar" sub="Estos 4 elementos son obligatorios para conectarte con la DIAN como facturador electrónico." />
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
          {items.map(item=>(
            <div key={item.n} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-wider" style={{color:item.color}}>Requisito {item.n}</div>
                  <div className="font-bold text-gray-900">{item.title}</div>
                </div>
              </div>
              <div className="px-5 py-4">
                <p className="text-sm text-gray-500 mb-3 leading-relaxed">{item.desc}</p>
                <div className="space-y-1.5">
                  {item.checks.map(c=>(
                    <div key={c} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 text-white" style={{backgroundColor:item.color}}>✓</span>
                      {c}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── HABILITACIÓN STEPS ── */
function HabilitacionSteps() {
  const steps = [
    {
      n:1, color:'#0099FF', title:'Crear cuenta MUISCA',
      tiempo:'1 día',
      desc:'Registra o verifica tu cuenta en el portal MUISCA de la DIAN con el NIT de la empresa.',
      url:'https://muisca.dian.gov.co',
      items:['Ingresar a muisca.dian.gov.co','Seleccionar "Registrar nuevo usuario"','Completar datos del representante legal','Activar cuenta vía email DIAN'],
    },
    {
      n:2, color:'#2563eb', title:'Registrar como facturador electrónico',
      tiempo:'1-2 días',
      desc:'En el portal DIAN selecciona la opción para habilitarte como facturador electrónico directo.',
      url:'https://catalogo-vpfe-hab.dian.gov.co',
      items:['Menú: Facturación Electrónica → Habilitación','Seleccionar "Facturador Directo"','Ingresar datos del software','Registrar NIT del sistema'],
    },
    {
      n:3, color:'#7c3aed', title:'Configurar certificado digital',
      tiempo:'2-5 días',
      desc:'Adquiere e instala el certificado digital en tu servidor. El archivo .p12 se usa para firmar el XML.',
      url:null,
      items:['Comprar certificado a Certicámara / GSE','Instalar en el servidor (ruta segura)','Configurar contraseña del certificado','Verificar vigencia y datos del titular'],
    },
    {
      n:4, color:'#0891b2', title:'Ambiente de pruebas',
      tiempo:'1 día',
      desc:'La DIAN tiene un ambiente de habilitación (HAB) para pruebas sin efectos tributarios reales.',
      url:'https://vpfe-hab.dian.gov.co/WcfDianCustomerServices.svc',
      items:['URL SOAP habilitación: vpfe-hab.dian.gov.co','Generar XMLs de prueba con datos ficticios','Configurar CUFE con algoritmo DIAN','Firmar con certificado de prueba o producción'],
    },
    {
      n:5, color:'#059669', title:'Enviar set de pruebas',
      tiempo:'3-7 días',
      desc:'Envía el set mínimo de 35 documentos requerido por la DIAN para aprobar la habilitación.',
      url:null,
      items:['Generar facturas de venta (FV)','Generar notas crédito (NC)','Generar notas débito (ND)','Validar CUFE y firmas en cada documento','Enviar al endpoint DIAN HAB'],
    },
    {
      n:6, color:'#d97706', title:'Revisión y aprobación DIAN',
      tiempo:'5-15 días hábiles',
      desc:'El equipo técnico de la DIAN revisa los documentos enviados y notifica vía email si fue aprobado o requiere correcciones.',
      url:null,
      items:['DIAN revisa el set de pruebas','Corrección de errores si los hay','Reenvío del set corregido','Notificación de aprobación por email'],
    },
    {
      n:7, color:'#16a34a', title:'Activar ambiente de producción',
      tiempo:'1 día',
      desc:'Una vez aprobado el set, la DIAN habilita tu NIT para emitir facturas reales con efectos tributarios.',
      url:'https://vpfe.dian.gov.co/WcfDianCustomerServices.svc',
      items:['Cambiar URL a vpfe.dian.gov.co','Verificar resolución de facturación vigente','Emitir primera factura de producción','Guardar CUFE y acuse de recibo DIAN'],
    },
  ]
  return (
    <section id="habilitacion" className="py-16 px-6 max-w-5xl mx-auto">
      <SectionTitle badge="Proceso de Habilitación" title="7 pasos para habilitarte ante la DIAN" sub="Sigue este proceso en orden. El tiempo total estimado es de 2 a 4 semanas." />
      <div className="mt-10 space-y-4">
        {steps.map((s,i)=>(
          <div key={s.n} className="flex gap-4">
            {/* línea vertical */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full text-white font-black text-sm flex items-center justify-center shrink-0 shadow-md" style={{backgroundColor:s.color}}>
                {s.n}
              </div>
              {i < steps.length-1 && <div className="w-0.5 flex-1 mt-2 mb-0" style={{backgroundColor:s.color+'33'}} />}
            </div>
            {/* contenido */}
            <div className="flex-1 pb-6">
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100" style={{borderLeft:`4px solid ${s.color}`}}>
                  <span className="font-bold text-gray-900">{s.title}</span>
                  <span className="text-xs bg-gray-100 text-gray-500 rounded-full px-3 py-1">⏱ {s.tiempo}</span>
                </div>
                <div className="px-5 py-4">
                  <p className="text-sm text-gray-500 mb-3 leading-relaxed">{s.desc}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {s.items.map(item=>(
                      <div key={item} className="flex items-start gap-2 text-xs text-gray-600">
                        <span className="shrink-0 mt-0.5" style={{color:s.color}}>▸</span>{item}
                      </div>
                    ))}
                  </div>
                  {s.url && (
                    <div className="mt-3 bg-gray-50 rounded-lg px-3 py-2 text-xs font-mono text-gray-500 border border-gray-200 flex items-center gap-2">
                      <span className="text-gray-400">URL:</span>
                      <span style={{color:s.color}} className="break-all">{s.url}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── INTEGRACIÓN TÉCNICA ── */
function IntegracionTecnica() {
  const pasos = [
    {
      n:'01', color:'#6366f1', title:'Generar XML UBL 2.1',
      code:`// Estructura básica del XML DIAN
<Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2">
  <cbc:UBLVersionID>UBL 2.1</cbc:UBLVersionID>
  <cbc:CustomizationID>10</cbc:CustomizationID>
  <cbc:ProfileID>DIAN 2.1</cbc:ProfileID>
  <cbc:ID>PREF-000001</cbc:ID>        <!-- prefijo + consecutivo -->
  <cbc:IssueDate>2024-01-15</cbc:IssueDate>
  <cbc:InvoiceTypeCode>01</cbc:InvoiceTypeCode>  <!-- 01=FV, 91=NC, 92=ND -->
  <cbc:DocumentCurrencyCode>COP</cbc:DocumentCurrencyCode>
  <!-- ... AccountingSupplierParty, AccountingCustomerParty, Lines -->
</Invoice>`,
    },
    {
      n:'02', color:'#0891b2', title:'Calcular CUFE',
      code:`// CUFE = SHA-384 de la cadena concatenada
$cadena = $numFac . $fecFac . $horFac . $valFac .
          $codImp1 . $valImp1 . $codImp2 . $valImp2 .
          $codImp3 . $valImp3 . $valTot . $nitOFE .
          $numAdq . $clTec . $tipoAmbie;

$cufe = hash('sha384', $cadena);
// clTec = clave técnica asignada por DIAN al registrar el software`,
    },
    {
      n:'03', color:'#7c3aed', title:'Firmar XML con XAdES-BES',
      code:`// PHP: firma con certificado .p12
$pkcs12 = file_get_contents('/certs/empresa.p12');
openssl_pkcs12_read($pkcs12, $certs, $password);

$privateKey  = $certs['pkey'];
$certificate = $certs['cert'];

// Firma XAdES-BES (no XmlDSig simple)
// Usar librería: robrichards/xmlseclibs o similar
$xmlSec = new XMLSecurityDSig();
$xmlSec->setCanonicalMethod(XMLSecurityDSig::EXC_C14N);
$xmlSec->addReference($xml, XMLSecurityDSig::SHA256, [...]);
$key = new XMLSecurityKey(XMLSecurityKey::RSA_SHA256, ['type'=>'private']);
$key->loadKey($privateKey);
$xmlSec->sign($key);
$xmlSec->add509Cert($certificate);`,
    },
    {
      n:'04', color:'#059669', title:'Enviar a DIAN (SOAP)',
      code:`// Endpoint SOAP DIAN
// Pruebas: https://vpfe-hab.dian.gov.co/WcfDianCustomerServices.svc
// Producción: https://vpfe.dian.gov.co/WcfDianCustomerServices.svc

// Método: SendBillAsync (asíncrono - recomendado)
// Método: SendBillSync (síncrono - para documentos pequeños)

$zipContent = base64_encode(gzcompress($xmlFirmado));
$response   = $soapClient->SendBillAsync([
  'fileName'   => 'PREF000001.xml',
  'contentFile' => $zipContent,
  'accountCode' => $nit,
]);

// Consultar estado después:
$estado = $soapClient->GetStatusZip(['trackId' => $response->trackId]);`,
    },
    {
      n:'05', color:'#d97706', title:'Procesar respuesta DIAN',
      code:`// Respuesta DIAN: ApplicationResponse XML
// statusCode: 00 = Aceptado, 02 = Rechazado

$xmlResponse = base64_decode($response->content);
$dom = new DOMDocument();
$dom->loadXML($xmlResponse);

$statusCode = $dom->getElementsByTagName('ResponseCode')->item(0)->nodeValue;
$cufe       = $dom->getElementsByTagName('UUID')->item(0)->nodeValue;

if ($statusCode === '00') {
  // Factura aceptada - guardar CUFE
  $factura->update(['cufe' => $cufe, 'estado' => 'aceptada']);
} else {
  // Manejar error - ver $dom->getElementsByTagName('Description')
  $factura->update(['estado' => 'rechazada']);
}`,
    },
  ]
  return (
    <section id="tecnico" className="py-16 px-6 bg-gray-50 border-y border-gray-100">
      <div className="max-w-5xl mx-auto">
        <SectionTitle badge="Integración Técnica" title="Código paso a paso" sub="Implementación en PHP/Laravel: XML UBL 2.1, CUFE, firma XAdES-BES y envío SOAP." />
        <div className="mt-10 space-y-5">
          {pasos.map(p=>(
            <div key={p.n} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="flex items-center gap-3 px-5 py-3 border-b border-gray-200 bg-gray-50">
                <span className="text-[10px] font-black text-white px-2 py-0.5 rounded font-mono" style={{backgroundColor:p.color}}>{p.n}</span>
                <span className="font-bold text-gray-800">{p.title}</span>
              </div>
              <pre className="px-5 py-4 text-[11px] text-gray-300 leading-relaxed overflow-x-auto bg-gray-900 font-mono">{p.code}</pre>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── FLUJO DIAN ── */
function FlujoDian() {
  const pasos = [
    {color:'#3b82f6', emoji:'📝', title:'Crear factura',   desc:'Usuario crea factura en el sistema. Se genera el XML UBL 2.1 con todos los campos DIAN.'},
    {color:'#6366f1', emoji:'#️⃣', title:'Calcular CUFE',  desc:'Se calcula el Código Único de Factura Electrónica con SHA-384 según fórmula DIAN.'},
    {color:'#7c3aed', emoji:'🔏', title:'Firmar XML',       desc:'El XML se firma digitalmente con XAdES-BES usando el certificado .p12 de la empresa.'},
    {color:'#0891b2', emoji:'📤', title:'Enviar a DIAN',   desc:'Se comprime el XML en ZIP y se envía al endpoint SOAP de la DIAN (HAB o producción).'},
    {color:'#059669', emoji:'⚡', title:'DIAN valida',      desc:'La DIAN valida estructura UBL, CUFE, firma y datos fiscales. Responde ApplicationResponse.'},
    {color:'#16a34a', emoji:'✅', title:'Guardar CUFE',    desc:'Si es aceptada: se guarda el CUFE, se genera QR y PDF. Si es rechazada: se notifica el error.'},
    {color:'#d97706', emoji:'📧', title:'Enviar al cliente', desc:'El cliente recibe el PDF de la factura con CUFE, QR de verificación y XML adjunto por email.'},
  ]
  return (
    <section id="flujo" className="py-16 px-6 max-w-5xl mx-auto">
      <SectionTitle badge="Flujo de Emisión" title="Ciclo completo de una factura DIAN" sub="7 pasos desde que el usuario crea la factura hasta que el cliente la recibe." />
      <div className="mt-10 grid grid-cols-1 md:grid-cols-7 gap-2">
        {pasos.map((p,i)=>(
          <div key={p.title} className="flex md:flex-col items-center gap-3 md:gap-2 text-center">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 shadow-sm border border-gray-100 bg-white" style={{boxShadow:`0 0 0 3px ${p.color}22`}}>
              {p.emoji}
            </div>
            {i < pasos.length-1 && (
              <div className="hidden md:block w-full h-px mt-0" style={{background:`linear-gradient(to right, ${p.color}, ${pasos[i+1].color})`}} />
            )}
            <div className="md:mt-1">
              <div className="text-[10px] font-black uppercase" style={{color:p.color}}>{i+1}</div>
              <div className="text-xs font-bold text-gray-800 mt-0.5">{p.title}</div>
              <p className="text-[10px] text-gray-500 mt-1 leading-relaxed hidden md:block">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
      {/* móvil: lista */}
      <div className="md:hidden mt-6 space-y-3">
        {pasos.map((p,i)=>(
          <div key={p.title} className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-sm" style={{backgroundColor:p.color+'22'}}>{p.emoji}</div>
            <div>
              <div className="font-bold text-gray-800 text-sm">{i+1}. {p.title}</div>
              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── AMBIENTES ── */
function Ambientes() {
  return (
    <section id="ambientes" className="py-16 px-6 bg-gray-50 border-y border-gray-100">
      <div className="max-w-5xl mx-auto">
        <SectionTitle badge="Ambientes DIAN" title="Pruebas vs Producción" sub="La DIAN tiene dos ambientes separados. Nunca mezcles credenciales entre ellos." />
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              nombre:'Habilitación (HAB)', color:'#FF6600', tag:'Pruebas',
              url:'https://vpfe-hab.dian.gov.co/WcfDianCustomerServices.svc',
              catalogo:'https://catalogo-vpfe-hab.dian.gov.co',
              datos:[
                ['Efecto tributario','Ninguno (no reales)'],
                ['CUFE generado','Solo de prueba'],
                ['Validación','Mismas reglas que producción'],
                ['Set de pruebas','Mínimo 35 documentos'],
                ['Certificado','Puede ser de producción o prueba'],
                ['Tiempo respuesta','Segundos'],
              ],
            },
            {
              nombre:'Producción (PROD)', color:'#0099FF', tag:'Real',
              url:'https://vpfe.dian.gov.co/WcfDianCustomerServices.svc',
              catalogo:'https://catalogo-vpfe.dian.gov.co',
              datos:[
                ['Efecto tributario','SÍ (documentos legales)'],
                ['CUFE generado','Legal y verificable'],
                ['Validación','Estricta con RUT'],
                ['Resolución','Vigente y registrada en DIAN'],
                ['Certificado','Producción obligatorio'],
                ['Tiempo respuesta','Segundos a minutos'],
              ],
            },
          ].map(amb=>(
            <div key={amb.nombre} className="bg-white border-2 rounded-2xl overflow-hidden shadow-sm" style={{borderColor:amb.color+'44'}}>
              <div className="px-5 py-3 flex items-center justify-between border-b border-gray-100">
                <span className="font-bold text-gray-900">{amb.nombre}</span>
                <span className="text-xs font-bold text-white px-3 py-1 rounded-full" style={{backgroundColor:amb.color}}>{amb.tag}</span>
              </div>
              <div className="px-5 py-4 space-y-2">
                <div className="text-xs bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 font-mono text-gray-500 break-all mb-3">
                  <div className="text-gray-400 text-[10px] mb-1">SOAP Endpoint</div>
                  <span style={{color:amb.color}}>{amb.url}</span>
                </div>
                <div className="text-xs bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 font-mono text-gray-500 break-all mb-3">
                  <div className="text-gray-400 text-[10px] mb-1">Portal / Catálogo</div>
                  <span style={{color:amb.color}}>{amb.catalogo}</span>
                </div>
                {amb.datos.map(([k,v])=>(
                  <div key={k} className="flex justify-between text-sm py-0.5 border-b border-gray-50">
                    <span className="text-gray-400">{k}</span>
                    <span className="font-medium text-gray-700">{v}</span>
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

/* ── ERRORES COMUNES ── */
function ErroresComunesSection() {
  const errores = [
    {code:'ZD01',color:'#ef4444',titulo:'Error en firma XAdES-BES',sol:'Verificar que el certificado .p12 no esté vencido y que la contraseña sea correcta. Revisar algoritmo de canonicalización EXC_C14N.'},
    {code:'ZD02',color:'#f97316',titulo:'CUFE inválido',sol:'Verificar la fórmula del CUFE: orden de campos, clave técnica correcta y ambiente (1=prod, 2=hab). Usar SHA-384.'},
    {code:'ZD03',color:'#eab308',titulo:'NIT no habilitado',sol:'El NIT no está registrado como facturador electrónico en la DIAN. Completar el proceso de habilitación en el portal MUISCA.'},
    {code:'ZD04',color:'#6366f1',titulo:'Resolución vencida o no registrada',sol:'Verificar que el prefijo y rango de la resolución estén vigentes y correctamente registrados en la DIAN.'},
    {code:'ZD05',color:'#0891b2',titulo:'Consecutivo fuera de rango',sol:'El número de factura está fuera del rango autorizado por la resolución. Solicitar nueva resolución a la DIAN.'},
    {code:'ZD06',color:'#059669',titulo:'Error en estructura UBL 2.1',sol:'Validar el XML contra el esquema XSD de la DIAN. Revisar campos obligatorios: UBLVersionID, CustomizationID, InvoiceTypeCode.'},
  ]
  return (
    <section className="py-16 px-6 max-w-5xl mx-auto">
      <SectionTitle badge="Errores Comunes" title="Problemas frecuentes y soluciones" sub="Los errores más comunes al integrar con la DIAN y cómo resolverlos." />
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
        {errores.map(e=>(
          <div key={e.code} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
              <span className="font-mono text-xs font-black text-white px-2 py-0.5 rounded" style={{backgroundColor:e.color}}>{e.code}</span>
              <span className="font-semibold text-gray-800 text-sm">{e.titulo}</span>
            </div>
            <div className="px-4 py-3">
              <p className="text-sm text-gray-500 leading-relaxed">{e.sol}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── HELPERS ── */
function SectionTitle({ badge, title, sub }: { badge:string; title:string; sub:string }) {
  return (
    <div className="text-center">
      <span className="text-xs font-bold uppercase tracking-widest text-[#0099FF] bg-blue-50 border border-blue-100 rounded-full px-3 py-1">{badge}</span>
      <h2 className="text-3xl font-black text-gray-900 mt-4 mb-2">{title}</h2>
      <p className="text-gray-500 text-sm max-w-xl mx-auto">{sub}</p>
    </div>
  )
}

function Footer() {
  return (
    <footer className="border-t border-gray-200 px-6 py-8 text-center text-gray-400 text-sm bg-gray-50">
      <p>Starktech Software & Marketing · Guía de Integración DIAN Colombia · {new Date().getFullYear()}</p>
    </footer>
  )
}
