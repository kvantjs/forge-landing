# Regras para agentes de IA — FORGE Landing

Leia este arquivo antes de editar. A landing é um produto independente, público e focado em conversão; não deve importar APIs, secrets, sandbox ou dependências do workspace.

- Preserve `VITE_STUDIO_URL` como único contrato de saída para o Studio.
- Não coloque chaves, lógica de IA, scraping ou chamadas privadas neste repositório.
- Siga `BRAND_GUIDELINES.md`, `UI_GUIDELINES.md` e `ICON_GUIDELINES.md`.
- Reutilize padrões já presentes antes de criar abstrações; use TypeScript estrito e a entrada React + Vite.
- Para componentes prontos, prefira shadcn/ui/Radix quando instalados; para novos ícones use Phosphor ou Tabler.
- Não introduza outra biblioteca de UI/ícones sem justificativa documentada.
- Mantenha HTML semântico, foco visível, navegação por teclado, estados de erro e `prefers-reduced-motion`.
- Após editar, rode `npm run lint` e `npm run build`.
