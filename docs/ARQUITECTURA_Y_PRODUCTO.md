# Arquitectura y alcance del producto

## 1. Visión

STARKTECH es una empresa colombiana de desarrollo de software que diseña,
construye e integra productos digitales para empresas. La oferta comercial
inicial se concentra en software a medida, aplicaciones web, integraciones,
automatización e inteligencia artificial aplicada.

En paralelo, STARKTECH desarrollará un producto propio de operación financiera
y facturación electrónica para Colombia. Este producto combinará cumplimiento
DIAN con Gaia, un copiloto financiero que convertirá obligaciones fiscales y
tareas administrativas en acciones claras, automatizadas y verificables.

### Líneas de negocio

1. **Servicios disponibles:** consultoría técnica, software a medida,
   aplicaciones web, integraciones y automatización.
2. **Producto próximo:** plataforma de facturación electrónica y operación
   financiera asistida por Gaia.

Objetivos iniciales:

- Permitir que una empresa emita su primera factura el mismo día.
- Aislar datos, archivos, secretos y backups por empresa.
- Reducir trabajo manual desde la venta hasta el cobro.
- Explicar errores DIAN en lenguaje comprensible.
- Preparar datos, eventos y trazabilidad para que Gaia asista cada módulo.
- Crecer como monolito modular antes de considerar microservicios.

## 2. Decisiones arquitectónicas

### Stack

- Frontend: React, TypeScript, Vite, React Router y React Query.
- Backend: Laravel como API REST y monolito modular.
- Tenancy: `stancl/tenancy`, con una base de datos por empresa.
- Datos: PostgreSQL para landlord y tenants.
- Procesamiento asíncrono: Redis, Laravel Queues y Horizon.
- Archivos: almacenamiento compatible con S3.
- Autenticación SPA: Laravel Sanctum.
- IA: capa Gaia desacoplada mediante contratos de proveedor, OCR/visión,
  salidas estructuradas, evaluación y revisión humana.

### Modelo multi-tenant

Se utilizará una base landlord y una base independiente por cada empresa.

```text
Landlord DB
├── tenants
├── domains
├── plans
├── subscriptions
└── provisioning_jobs

Tenant DB: empresa_a
├── users
├── customers
├── products
├── invoices
├── inventory
├── accounting
└── ai_runs / ai_feedback / document_captures
```

La base landlord nunca almacena facturas, contabilidad, clientes ni inventario.
El tenant se resuelve por subdominio antes de autenticar al usuario y ejecutar
el caso de uso.

Cada tenant debe tener:

- Base de datos independiente.
- Prefijo de almacenamiento independiente.
- Backups y restauración independiente.
- Certificados y secretos cifrados.
- Auditoría y usuarios propios.
- Conversaciones, ejecuciones, feedback e índices de IA aislados.
- Versión de migración registrada en landlord.

## 3. Clean Architecture

Regla de dependencias:

```text
Interfaces → Application → Domain
Infrastructure implementa contratos de Domain/Application
Domain no conoce Laravel, Eloquent, HTTP, Redis ni DIAN
```

### Backend

```text
app/
├── Domain/
│   ├── Billing/
│   ├── Inventory/
│   ├── Treasury/
│   ├── Intelligence/
│   └── Tenancy/
├── Application/
│   ├── Billing/Commands/
│   ├── Billing/Queries/
│   └── Shared/DTOs/
├── Infrastructure/
│   ├── Persistence/Eloquent/
│   ├── Tenancy/
│   ├── Dian/
│   ├── Ai/
│   ├── Ocr/
│   ├── Storage/
│   └── Queue/
└── Interfaces/
    ├── Http/Controllers/
    ├── Http/Requests/
    └── Http/Resources/
```

- `Domain`: entidades, Value Objects, reglas, eventos y contratos.
- `Application`: Commands, Queries y casos de uso.
- `Infrastructure`: Eloquent, DIAN, tenancy, Redis, S3, email y pagos.
- La infraestructura de IA implementa contratos reemplazables; el dominio no
  conoce proveedores, modelos ni SDKs de inteligencia artificial.
- `Interfaces`: HTTP, consola y transformación de entrada/salida.

### Frontend

```text
src/
├── app/
│   ├── router/
│   ├── providers/
│   └── layouts/
├── modules/
│   ├── billing/
│   ├── inventory/
│   ├── treasury/
│   └── intelligence/
├── shared/
└── infrastructure/api/
```

El frontend será modular, pero no replicará toda la complejidad del backend.
Las páginas orquestan componentes; los hooks manejan casos de uso de interfaz;
los adaptadores API encapsulan HTTP. Las interfaces de Gaia deben mostrar
fuentes, nivel de confianza y estado de revisión, y distinguir visualmente una
sugerencia de una acción confirmada.

### Flujo de emisión

```text
POST /api/v1/invoices
→ ResolveTenant middleware
→ Authenticate tenant user
→ CreateInvoiceRequest
→ CreateInvoiceController
→ CreateInvoice command/use case
→ InvoiceRepository contract
→ EloquentInvoiceRepository
→ Tenant DB
→ Dispatch SendInvoiceToDian job
```

Los jobs externos deben ser idempotentes, reintentables y observables.

### Arquitectura transversal de Gaia

Gaia consume casos de uso y fuentes autorizadas; nunca accede directamente a la
base de datos para modificar entidades ni reemplaza reglas determinísticas.

```text
Interfaces → casos de uso Gaia → contratos IA/OCR → proveedor reemplazable
                           ↓
             fuentes, permisos, evaluación y feedback
```

Cada módulo debe publicar eventos, conservar referencias estables y registrar
feedback humano. Esto permite activar inteligencia gradualmente sin acoplar el
dominio a un modelo específico.

## 4. Alcance funcional

### MVP: fundación SaaS

- Registro, planes y suscripciones.
- Provisionamiento automático de tenant.
- Subdominio y branding por empresa.
- Usuarios, roles, permisos y autenticación de dos factores.
- Auditoría, observabilidad y centro de soporte.
- Registro de eventos y fuentes para futuros casos de uso de Gaia.
- Políticas de consentimiento, retención y presupuesto de IA por tenant.

### MVP: facturación DIAN

- Facturas, notas crédito y notas débito.
- Resoluciones, rangos, prefijos y consecutivos.
- XML UBL 2.1, CUFE, QR y firma digital.
- Envío DIAN, consulta de estado, reintentos y trazabilidad.
- PDF, email y portal del cliente.
- Diagnóstico comprensible de rechazos DIAN.
- Explicación asistida por Gaia con fuentes y revisión humana.

### MVP: operación comercial

- Clientes y contactos.
- Productos, servicios, unidades base, presentaciones y conversiones.
- Compra y venta por presentación conservando inventario en unidad base.
- Impuestos y listas de precios por presentación.
- Cotizaciones convertibles en factura.
- Bodegas, existencias, kardex y movimientos.
- Alertas de stock.
- Importación masiva desde Excel o CSV.
- Sugerencias asistidas para clasificar importaciones y detectar duplicados.

### MVP: tesorería y cartera

- Cuentas por cobrar y vencimientos.
- Pagos parciales, anticipos y recibos de caja.
- Recordatorios automáticos de cobro.
- Dashboard de caja y cartera.
- Resúmenes y alertas explicadas por Gaia a partir de datos verificables.

### Fase 2

- Proveedores, órdenes de compra y recepciones.
- Cuentas por pagar y egresos.
- Documento soporte electrónico.
- PUC, centros de costo y periodos contables.
- Asientos automáticos configurables.
- Conciliación bancaria y estados financieros.

### Fase 3

- Nómina electrónica.
- POS y facturación offline.
- Producción y materias primas (BOM).
- Activos fijos y depreciaciones.
- Integraciones con e-commerce.
- API pública y marketplace de integraciones.

## 5. Diferenciadores

### Copiloto operativo

Una bandeja priorizada indica qué debe hacer el usuario: corregir rechazos DIAN,
cobrar vencidos, reponer inventario o cerrar periodos.

### Diagnóstico DIAN comprensible

Los errores técnicos deben traducirse a lenguaje claro, señalar el dato que
causó el rechazo y proponer una corrección.

### Automatización sin código

Reglas configurables:

```text
Cuando DIAN acepte una factura:
→ enviar documento al cliente
→ descontar inventario
→ crear asiento contable
→ programar recordatorio de cobro
```

### Salud financiera accionable

La plataforma combinará cartera, pagos, recurrencia y bancos para proyectar
caja a 30, 60 y 90 días y recomendar acciones.

### Copiloto financiero con IA

La inteligencia artificial debe reducir trabajo operativo y apoyar decisiones,
sin ejecutar movimientos contables o fiscales críticos sin confirmación humana.

- Captura de facturas y comprobantes desde foto, PDF o correo.
- Extracción estructurada de proveedor, fecha, impuestos, conceptos y total.
- Detección de duplicados, inconsistencias y variaciones atípicas.
- Resúmenes ejecutivos de ventas, gastos, cartera y flujo de caja.
- Recomendaciones priorizadas con explicación y datos de respaldo.

Los documentos originales, los datos extraídos y las correcciones del usuario
deben conservar trazabilidad. Cada empresa mantiene aislamiento de archivos,
prompts, resultados y contexto usado por el copiloto.

La IA se implementa como capacidad transversal desde la fundación. Primero se
preparan datos, eventos, permisos y evaluación; después se habilitan extracción,
resúmenes y recomendaciones. La especificación completa está en
`ARQUITECTURA_IA_Y_GAIA.md`.

### Aislamiento demostrable

La separación de base, archivos, backups y secretos por empresa será una
característica verificable y comercializable.

### Implementación por industria

Plantillas iniciales para comercio, servicios, manufactura y restaurantes con
roles, impuestos, catálogos y flujos preconfigurados.

## 6. Requisitos no funcionales

- Ningún tenant puede consultar o modificar datos de otro tenant.
- Backups cifrados y restauración probada por empresa.
- Auditoría de operaciones fiscales y administrativas críticas.
- Idempotencia para envíos DIAN, pagos y webhooks.
- Rate limiting y rotación de credenciales.
- Métricas, logs estructurados, trazas y alertas.
- Pruebas unitarias de dominio, integración por adaptador y aislamiento tenant.
- Despliegues con migraciones tenant progresivas y reversibles.
- Evaluaciones de regresión para prompts, modelos y esquemas de salida.
- Presupuestos, métricas de costo, latencia y calidad de IA por tenant.
- Protección contra prompt injection, fuga de PII y mezcla entre tenants.

## 7. Orden de implementación

1. Fundación: tenancy, autenticación, permisos, auditoría, eventos y gobierno IA.
2. Catálogo: productos, unidades base, presentaciones y conversiones.
3. Control: bodegas, kardex, saldos, costos y movimientos.
4. Operación: clientes, cotizaciones, ventas y devoluciones.
5. Facturación: resoluciones, emisión, entrega y DIAN.
6. Cobro y compras: cartera, pagos, proveedores y abastecimiento.
7. Gaia: activar captura, resúmenes y alertas sobre la base transversal de IA.
8. Expansión: contabilidad, nómina, POS, producción e integraciones.

No se deben construir todos los módulos simultáneamente. Cada fase debe validar
uso real, soporte requerido, conversión comercial y ahorro de tiempo antes de
ampliar el alcance.

El diseño detallado de base de datos, conversiones de unidades, casos de uso,
pruebas y entregables por fase se encuentra en `PLAN_DE_CONSTRUCCION.md`.
