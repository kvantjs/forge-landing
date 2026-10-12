# Arquitetura e deploy

Este repositório contém somente a apresentação pública: metadata, copy, composição visual e formulário de entrada. O formulário usa `NEXT_PUBLIC_STUDIO_URL` para abrir o workspace em `/generation`.

## Deploy

1. Configure `NEXT_PUBLIC_STUDIO_URL` com a origem pública do `forge-studio`.
2. Rode `npm run lint` e `npm run build`.
3. Publique a aplicação em um host Next.js separado.
4. Nunca copie `.env` do Studio para este repositório.

## Limites

Não adicionar API routes privadas, providers de IA, sandbox, scraping ou lógica de geração. Se o contrato de navegação mudar, atualizar este documento e o `forge-studio/docs/ARCHITECTURE.md`.
