# FORGE Landing

Landing page pública e independente da FORGE Studio. Este repositório existe para permitir hospedagem, deploy e ciclo de conteúdo separados do workspace que executa IA, sandbox e geração de código.

## Desenvolvimento

```bash
npm install
cp .env.example .env.local
npm run dev
```

`VITE_STUDIO_URL` deve apontar para a URL pública do repositório `forge-studio`. O formulário da landing grava o estado mínimo no `sessionStorage` e abre `/generation` no Studio; os segredos permanecem exclusivamente no backend do Studio.

O projeto usa React 19, TypeScript e Vite. O build de produção é gerado em `dist/` com `npm run build`, e pode ser servido com `npm run start`.

## Deploy

A aplicação é compatível com qualquer hospedagem de arquivos estáticos ou runtime Node que suporte Vite preview. Configure `VITE_STUDIO_URL` no ambiente de build/deploy.

## Documentação para IA

- [Regras de IA](docs/AI_RULES.md)
- [Brand book](docs/BRAND_GUIDELINES.md)
- [UI, componentes e acessibilidade](docs/UI_GUIDELINES.md)
- [Ícones](docs/ICON_GUIDELINES.md)
- [Arquitetura e deploy](docs/ARCHITECTURE.md)
