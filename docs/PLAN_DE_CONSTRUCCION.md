# Plan de construcción del producto STARKTECH

## 1. Principios de implementación

El producto se construirá como un monolito modular multi-tenant. Cada empresa
tendrá una base de datos operativa independiente y la base landlord conservará
únicamente información SaaS como tenants, dominios, planes y provisionamiento.

Reglas que deben mantenerse desde el primer módulo:

- El dominio no depende de Laravel, HTTP, Eloquent, Redis ni DIAN.
- Todos los casos de uso reciben el tenant ya resuelto.
- Dinero, cantidades y factores de conversión usan `decimal`, nunca `float`.
- Los documentos confirmados conservan snapshots de precios, impuestos,
  unidades y factores; no dependen de la configuración futura del producto.
- Cada movimiento de inventario es inmutable y tiene una referencia e
  identificador idempotente.
- Ninguna acción fiscal, contable o de inventario crítico se ejecuta solamente
  por una sugerencia de IA.
- Cada módulo publica eventos y conserva fuentes que Gaia pueda explicar.
- Toda salida de IA usa un esquema versionado, registra su ejecución y puede
  recibir aceptación, rechazo o corrección humana.
- La IA accede únicamente a datos del tenant, usuario y propósito autorizados.

Gaia se prepara transversalmente desde la fase 0 y se activa gradualmente. La
arquitectura, seguridad y evaluación están definidas en
`ARQUITECTURA_IA_Y_GAIA.md`.

## 2. Decisión central de inventario: unidad base y presentaciones

Cada producto inventariable tiene una **unidad base**. Las existencias siempre
se almacenan en esa unidad base, aunque el producto se compre o venda usando
otras presentaciones.

### Ejemplo: huevos y cubetas

```text
Producto: Huevo tipo A
Unidad base: UND (huevo)

Presentaciones:
- Unidad:  1 UND
- Cubeta: 30 UND

Existencia almacenada: 95 UND
Visualización posible: 3 cubetas + 5 huevos

Venta de 2 cubetas:
2 × 30 = 60 UND descontadas
Existencia final: 35 UND
```

La cubeta no es otro producto ni una receta de producción. Es una presentación
del mismo producto con un factor de conversión.

Solo se usará una BOM o composición cuando exista transformación real o deban
controlarse componentes por separado. Por ejemplo, si también se controla el
inventario del empaque vacío, ese empaque será otro producto y el proceso de
armado de cubetas podrá modelarse posteriormente como producción.

### Reglas de conversión

- `cantidad_base = cantidad_ingresada × factor_a_base`.
- El factor debe ser mayor que cero.
- Una presentación pertenece a un solo producto.
- Cada producto tiene exactamente una presentación base con factor `1`.
- La unidad y el factor usados se copian a líneas de factura y movimientos.
- Cambiar una conversión no modifica documentos ni movimientos históricos.
- El stock negativo se configura por empresa o bodega; por defecto se bloquea.
- `entered_quantity` y `base_quantity` se guardan positivas; `direction`
  determina si el movimiento suma o resta.
- Una transferencia crea una salida y una entrada enlazadas por la misma
  referencia; nunca modifica saldos directamente.
- Si `allows_fraction = false`, la cantidad base resultante debe ser entera.

## 3. Modelo de base de datos

### Base landlord

```text
tenants
domains
plans
subscriptions
provisioning_jobs
tenant_migration_versions
```

La base landlord nunca guarda productos, movimientos, facturas o clientes.

### Base de cada tenant: catálogo e inventario

#### `measurement_units`

```text
id
code                 -- UND, KG, G, LT, ML, MT
name
dimension            -- count, mass, volume, length
decimal_scale
active
```

#### `products`

```text
id
category_id
base_unit_id         -- FK measurement_units
code
name
description
type                 -- inventory, service
tracks_inventory
allows_fraction
tax_category_id
active
created_at
updated_at
```

#### `product_presentations`

```text
id
product_id
unit_id
name                 -- Unidad, cubeta x30, caja x12
sku
barcode
factor_to_base       -- decimal(20, 8)
sale_price
purchase_enabled
sale_enabled
is_base
active
created_at
updated_at
```

Restricciones recomendadas:

- `unique(product_id, sku)`.
- `unique(product_id, barcode)` cuando el código no sea nulo.
- Una sola presentación `is_base = true` por producto.
- `factor_to_base > 0`.
- La presentación base usa `factor_to_base = 1`.

#### `warehouses`

```text
id
name
location
allows_negative_stock
active
```

#### `inventory_balances`

```text
product_id
warehouse_id
quantity_base        -- decimal(20, 8)
average_cost_base    -- decimal(20, 6)
updated_at
```

Clave primaria compuesta: `(product_id, warehouse_id)`.

#### `inventory_movements`

```text
id
product_id
warehouse_id
presentation_id
movement_type        -- opening, purchase, sale, return, transfer, adjustment
direction            -- in, out
entered_quantity
factor_to_base_snapshot
base_quantity
unit_cost_base
reference_type
reference_id
idempotency_key
occurred_at
created_by
created_at
```

`inventory_movements` es el kardex y no se edita ni elimina. Una corrección crea
un movimiento compensatorio.

### Líneas comerciales

Las líneas de cotización, compra y factura deben conservar:

```text
product_id
presentation_id
description_snapshot
entered_quantity
factor_to_base_snapshot
base_quantity
unit_price_snapshot
tax_snapshot
subtotal
```

Esto permite mostrar “2 cubetas” al usuario y descontar “60 huevos” de forma
consistente.

### Base de cada tenant: inteligencia artificial

Las tablas completas se detallan en `ARQUITECTURA_IA_Y_GAIA.md`. El núcleo
mínimo incluye:

```text
ai_prompt_versions
ai_runs
ai_source_references
ai_review_decisions
ai_conversations
ai_messages
document_captures
```

Las tablas de IA guardan trazabilidad y feedback, pero no reemplazan productos,
facturas, movimientos ni otras entidades del dominio.

## 4. Preparación transversal para Gaia

Cada módulo debe entregar:

1. Eventos de dominio versionados.
2. Datos estructurados y validados.
3. Referencias estables a documentos y registros fuente.
4. Permisos que distingan consultar, sugerir, revisar y confirmar.
5. Auditoría de decisiones humanas.
6. Casos de evaluación con resultados esperados.

### Contratos iniciales de infraestructura

```text
AiProviderGateway
OcrProvider
PromptRegistry
StructuredOutputValidator
PiiRedactor
AiUsageMeter
AiEvaluationRunner
```

Estos contratos permiten cambiar de modelo o proveedor sin modificar el
dominio. Los modelos generativos no calculan impuestos, conversiones, stock,
CUFE ni saldos financieros.

### Niveles de autonomía

```text
Nivel 0: información y ayuda
Nivel 1: resumen o explicación con fuentes
Nivel 2: borrador estructurado para revisión
Nivel 3: acción preparada que requiere confirmación
```

Las operaciones críticas no superan el nivel 3.

## 5. Casos de uso mínimos para conversiones

### Crear producto inventariable

```text
CreateProduct
→ valida unidad base
→ crea producto
→ crea presentación base con factor 1
```

### Agregar presentación

```text
AddProductPresentation
→ valida producto y unidad
→ valida factor > 0
→ evita SKU/código de barras duplicado
→ guarda presentación
```

### Registrar entrada

```text
ReceiveInventory(product, presentation, entered_quantity)
→ calcula base_quantity
→ crea movimiento de entrada
→ actualiza saldo dentro de la misma transacción
```

### Confirmar venta

```text
ConfirmSale
→ valida stock base por cada línea
→ bloquea saldos necesarios
→ crea movimientos de salida idempotentes
→ actualiza saldos
→ confirma documento
```

Las operaciones sobre saldo deben usar transacción y bloqueo de fila para evitar
que dos ventas simultáneas consuman la misma existencia.

## 6. Orden de construcción

### Fase 0: decisiones y entorno

1. Crear una estructura raíz con `apps/web`, `apps/api` y `docs`.
2. Configurar PostgreSQL, Redis, almacenamiento S3 compatible y colas.
3. Configurar CI con lint, pruebas y análisis estático.
4. Definir ADRs para tenancy, autenticación, dinero, inventario, idempotencia,
   proveedor de IA, retención y revisión humana.
5. Crear contratos de IA, registro de prompts y ejecutor de evaluaciones sin
   habilitar todavía acciones de negocio.

```text
starktech-platform/
├── apps/
│   ├── web/              -- React
│   └── api/              -- Laravel
├── docs/                 -- arquitectura, ADRs y plan
└── infrastructure/       -- desarrollo local y despliegue
```

Resultado: entorno reproducible y decisiones críticas documentadas.

### Fase 1: fundación multi-tenant

1. Crear base landlord y modelos `tenant`, `domain` y provisionamiento.
2. Crear automáticamente una base por empresa.
3. Resolver tenant por subdominio antes de autenticar.
4. Implementar usuarios, roles, permisos y auditoría.
5. Probar aislamiento: un tenant nunca puede consultar otro.
6. Implementar backup, restauración y migraciones por tenant.
7. Implementar tablas de ejecuciones, fuentes, feedback y conversaciones de IA.
8. Implementar consentimiento, presupuestos, permisos y retención por tenant.
9. Probar que Gaia no puede recuperar contexto de otra empresa.

Resultado: empresa provisionada, autenticada y aislada, con gobierno de IA
preparado.

### Fase 2: catálogo, unidades y conversiones

1. Crear unidades de medida.
2. Crear categorías y productos.
3. Crear presentación base automáticamente.
4. Permitir presentaciones con factores de conversión.
5. Implementar listas de precios por presentación.
6. Agregar importación CSV con validación previa.
7. Probar casos: unidad/cubeta, gramo/kilogramo y mililitro/litro.
8. Publicar eventos de catálogo y conservar referencias de importación.
9. Añadir sugerencias opcionales de categoría, unidad, presentación y posible
   duplicado; toda conversión sugerida requiere confirmación humana.

Resultado: catálogo capaz de comprar y vender en distintas presentaciones sin
corromper existencias.

### Fase 3: inventario y bodegas

1. Crear bodegas, saldos y kardex inmutable.
2. Implementar entradas, salidas, ajustes y transferencias.
3. Implementar costo promedio y política de stock negativo.
4. Añadir alertas de stock y conteos físicos.
5. Probar concurrencia e idempotencia.
6. Publicar eventos de movimientos y cambios de costo para análisis de Gaia.
7. Preparar explicaciones de variaciones usando únicamente kardex confirmado.

Resultado: inventario confiable expresado siempre en unidad base.

### Fase 4: operación comercial

1. Crear clientes, impuestos, listas de precios y cotizaciones.
2. Confirmar ventas usando presentaciones y conversiones.
3. Mantener snapshots en líneas comerciales.
4. Convertir cotización en factura sin duplicar movimientos.
5. Implementar devoluciones mediante movimientos compensatorios.
6. Publicar eventos y fuentes para resumen de cliente y seguimiento comercial.
7. Permitir que Gaia prepare borradores sin confirmar ventas.

Resultado: venta completa conectada al inventario.

### Fase 5: facturación electrónica DIAN

1. Configurar resoluciones, prefijos, rangos y certificados.
2. Generar XML UBL 2.1 y firma XAdES-BES.
3. Enviar documentos de forma asíncrona e idempotente.
4. Guardar CUFE, estados, respuestas y trazabilidad.
5. Generar PDF y entregar documentos al cliente.
6. Implementar notas crédito y débito.
7. Crear catálogo verificable de errores DIAN y sus fuentes técnicas.
8. Permitir que Gaia explique rechazos y sugiera correcciones para revisión.

Resultado: factura electrónica válida conectada a venta e inventario.

### Fase 6: compras, proveedores y cartera

1. Crear proveedores, órdenes y recepciones parciales.
2. Recibir inventario usando cualquier presentación de compra.
3. Implementar cuentas por cobrar, pagos parciales y recordatorios.
4. Implementar cuentas por pagar y egresos.
5. Preparar captura documental como borrador estructurado con confianza.
6. Generar alertas de cartera y abastecimiento con fuentes.

Resultado: ciclo operativo desde abastecimiento hasta cobro.

### Fase 7: activación ampliada de Gaia

1. Activar captura de facturas desde foto, PDF o correo sin contabilización
   automática.
2. Activar extracción y vinculación de productos para confirmación humana.
3. Activar detección de duplicados, anomalías y vencimientos.
4. Activar resúmenes financieros con fuentes verificables.
5. Activar chat contextual limitado por permisos y propósito.
6. Medir calidad, costo, latencia, aceptación y correcciones.
7. Ejecutar evaluaciones antes de cada cambio de modelo, prompt o esquema.

Resultado: copiloto útil y trazable, no una caja negra que modifica datos.

## 7. Pruebas obligatorias

### Dominio

- `2 cubetas × 30 = 60 huevos`.
- `1.5 kg × 1000 = 1500 gramos`.
- No se permiten factores cero o negativos.
- Un servicio no genera movimientos de inventario.
- Una devolución revierte exactamente la cantidad base original.

### Integración

- Confirmar venta crea un solo movimiento aunque se reintente la solicitud.
- Dos ventas simultáneas no consumen el mismo stock.
- Cambiar el factor actual no altera una factura histórica.
- Transferencia conserva el total global y cambia saldos por bodega.
- Una salida y entrada de transferencia conservan la misma referencia.
- El tenant A no puede leer productos o saldos del tenant B.

### Inteligencia artificial

- Gaia nunca sugiere una conversión como confirmada sin revisión humana.
- Una extracción inválida no crea una compra, recepción ni factura.
- Cada recomendación financiera contiene referencias a sus fuentes.
- Cambiar un prompt o modelo ejecuta evaluaciones de regresión.
- El contenido de un tenant no aparece en respuestas de otro tenant.
- Prompt injection dentro de un PDF no concede herramientas ni permisos.
- Una salida que no cumple el esquema JSON se rechaza.
- Se registran costo, latencia, modelo, prompt y decisión humana.

### Aceptación del ejemplo de cubetas

```text
Dado un producto Huevo con unidad base UND
Y una presentación Cubeta con factor 30
Y un saldo inicial de 95 UND
Cuando se venden 2 cubetas
Entonces la línea comercial muestra 2 cubetas
Y el kardex registra una salida de 60 UND
Y el saldo final es 35 UND
```

## 8. Qué no construir al inicio

- Microservicios.
- Contabilidad completa.
- Producción/BOM para resolver conversiones de empaque.
- IA que confirme transacciones sin revisión.
- Entrenamiento de modelos propios antes de validar datos, calidad y retorno.
- Agentes con acceso general a base de datos o herramientas administrativas.
- POS offline antes de estabilizar catálogo, inventario y ventas.
- Personalizaciones por cliente dentro del núcleo compartido sin validar que
  resuelvan una necesidad repetible.
