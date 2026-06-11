# Arquitectura de inteligencia artificial y Gaia

## 1. Propósito

Gaia será la capa de inteligencia artificial de STARKTECH. Su función es reducir
trabajo operativo, explicar información y recomendar acciones verificables. No
reemplaza las reglas del dominio ni puede confirmar por sí sola operaciones
fiscales, contables, financieras o de inventario.

La IA es una capacidad transversal del producto, no un módulo agregado al final.
Cada fase debe producir datos estructurados, eventos, permisos y trazabilidad
que Gaia pueda utilizar posteriormente.

## 2. Principios

- **Reglas primero:** cálculos de dinero, impuestos, conversiones, stock y DIAN
  pertenecen al dominio determinístico, no al modelo de IA.
- **Humano en control:** toda acción crítica requiere revisión y confirmación.
- **Fuentes visibles:** cada resumen o recomendación indica los documentos y
  datos usados.
- **Aislamiento por tenant:** archivos, contexto, conversaciones, resultados,
  feedback e índices nunca se mezclan entre empresas.
- **Datos mínimos:** solo se envía al proveedor de IA la información necesaria.
- **Salida estructurada:** las extracciones usan esquemas JSON validados antes
  de llegar a un caso de uso.
- **Trazabilidad:** se conserva modelo, versión de prompt, entrada, salida,
  costo, latencia, decisión humana y resultado.
- **Proveedor reemplazable:** el dominio no depende de OpenAI ni de otro
  proveedor específico.

## 3. Casos de uso por módulo

### Catálogo e inventario

- Sugerir categorías, nombres y descripciones durante importaciones.
- Proponer unidades y presentaciones detectadas en facturas de proveedor.
- Detectar productos posiblemente duplicados.
- Explicar variaciones de stock, costo y rotación.
- Recomendar reposición con datos de ventas y existencias.

Gaia puede sugerir que “cubeta x30” equivale a 30 huevos, pero un usuario debe
confirmar esa conversión antes de utilizarla en movimientos.

### Ventas y clientes

- Resumir historial del cliente.
- Sugerir seguimientos y priorizar oportunidades.
- Detectar cartera con riesgo de vencimiento.
- Preparar borradores de cotización y comunicación.

### Facturación DIAN

- Traducir rechazos técnicos a lenguaje comprensible.
- Señalar el campo probablemente incorrecto.
- Sugerir una corrección para revisión humana.
- Resumir estados y trazabilidad de documentos.

Gaia nunca genera CUFE, calcula impuestos ni decide si un documento cumple DIAN;
esas responsabilidades son determinísticas.

### Compras y comprobantes

- Capturar facturas desde foto, PDF o correo.
- Extraer proveedor, fechas, conceptos, impuestos y totales.
- Vincular conceptos con productos existentes.
- Detectar duplicados e inconsistencias.

La extracción crea un borrador. La recepción, compra o contabilización solo se
confirma después de validación humana.

### Finanzas

- Generar resúmenes ejecutivos de ventas, gastos, cartera y caja.
- Explicar variaciones con fuentes.
- Detectar anomalías y oportunidades.
- Recomendar acciones priorizadas.

## 4. Arquitectura

```text
Interfaces
└── Gaia API / Chat / Capture endpoints
    ↓
Application
├── ExtractDocumentData
├── GenerateFinancialSummary
├── ExplainDianRejection
├── SuggestProductMatch
└── RecordAiFeedback
    ↓
Domain
├── AiSuggestion
├── AiReviewDecision
├── SourceReference
└── contratos de políticas y permisos
    ↓
Infrastructure
├── AiProviderGateway
├── OcrProvider
├── PromptRegistry
├── RetrievalAdapter
├── PiiRedactor
└── UsageMeter
```

El proveedor de IA implementa contratos de infraestructura. Los casos de uso no
conocen SDKs, nombres de modelos ni formatos particulares del proveedor.

### Flujo de extracción documental

```text
Usuario carga foto/PDF
→ almacenamiento aislado por tenant
→ antivirus y validación de archivo
→ OCR / visión
→ salida JSON según esquema versionado
→ validaciones determinísticas
→ borrador con nivel de confianza y fuentes
→ revisión humana
→ caso de uso del dominio confirmado
→ feedback registrado
```

### Flujo de recomendación

```text
Evento o solicitud del usuario
→ política de permisos y propósito
→ consulta estructurada de datos del tenant
→ reducción/redacción de datos sensibles
→ generación con fuentes
→ validación de formato y políticas
→ recomendación visible
→ aceptación, rechazo o corrección humana
→ auditoría y métricas
```

## 5. Datos de IA por tenant

```text
ai_prompt_versions
├── id, use_case, version, template_hash, schema_version, active

ai_runs
├── id, use_case, provider, model, prompt_version_id
├── status, input_hash, output_json, confidence
├── tokens_in, tokens_out, cost, latency_ms
├── requested_by, created_at

ai_source_references
├── ai_run_id, source_type, source_id, excerpt_hash

ai_review_decisions
├── ai_run_id, decision (accepted|rejected|corrected)
├── corrected_output_json, reviewed_by, reviewed_at

ai_conversations
├── id, user_id, purpose, status, created_at

ai_messages
├── conversation_id, role, content, source_run_id, created_at

document_captures
├── id, file_path, mime_type, status, extraction_run_id
├── original_hash, uploaded_by, created_at
```

No se deben guardar secretos, certificados digitales ni contraseñas en prompts,
resultados o conversaciones.

## 6. Seguridad y gobierno

- Consentimiento y propósito explícito para cada uso de datos.
- Cifrado en tránsito y reposo.
- Retención configurable de conversaciones y archivos.
- Eliminación verificable por tenant.
- Lista permitida de casos de uso y herramientas disponibles para Gaia.
- Presupuestos y límites de consumo por tenant.
- Protección contra prompt injection en archivos y contenido recuperado.
- Evaluación de proveedores sobre retención y uso de datos para entrenamiento.
- Registro separado entre observabilidad técnica y contenido sensible.

## 7. Evaluación y observabilidad

Cada caso de uso necesita un conjunto de evaluación antes de producción:

- Extracción: precisión por campo, documentos no procesables y confianza.
- Recomendaciones: relevancia, fuente correcta y tasa de aceptación.
- Explicaciones DIAN: exactitud técnica y utilidad para corregir.
- Seguridad: fugas entre tenants, exposición de PII y prompt injection.
- Operación: latencia, costo, errores y disponibilidad por proveedor/modelo.

Un cambio de modelo, prompt o esquema debe ejecutar evaluaciones de regresión.

## 8. Entrega gradual

1. **Preparar:** eventos, auditoría, fuentes y contratos de proveedor.
2. **Asistir:** chat de ayuda y resúmenes sin ejecutar acciones.
3. **Extraer:** borradores desde documentos con revisión humana.
4. **Recomendar:** alertas y acciones explicadas con fuentes.
5. **Automatizar con aprobación:** preparar acciones que un usuario confirma.

No se habilitará autonomía completa para operaciones críticas.
