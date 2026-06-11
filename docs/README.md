# Documentación interna

## Fuente de verdad

1. `ARQUITECTURA_Y_PRODUCTO.md`: visión, alcance y decisiones arquitectónicas.
2. `PLAN_DE_CONSTRUCCION.md`: orden de implementación, modelo de datos y pruebas.
3. `ARQUITECTURA_IA_Y_GAIA.md`: arquitectura transversal, seguridad, datos y
   evaluación de inteligencia artificial.

Los componentes antiguos `src/pages/DocsPage.tsx` y
`src/pages/DianGuidePage.tsx` no son documentación normativa ni están expuestos
como rutas públicas. Pueden contener ejemplos o decisiones anteriores que deben
validarse contra los documentos Markdown antes de implementarse.

## Criterio para cambios

Toda nueva funcionalidad debe documentar:

- qué datos estructurados y eventos produce;
- cómo puede asistir Gaia y qué acciones requieren revisión humana;
- permisos, fuentes, retención y aislamiento por tenant;
- métricas y evaluaciones necesarias para habilitar IA con seguridad.
