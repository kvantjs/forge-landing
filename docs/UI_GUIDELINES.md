# Regras de UI, componentes e acessibilidade

- Use Next.js App Router e mantenha a landing leve; não traga dependências do workspace sem necessidade.
- Para componentes prontos, prefira shadcn/ui com Radix UI; adapte tokens em vez de reescrever primitives.
- Use Tailwind quando presente e CSS local para a linguagem visual da landing; evite estilos globais além do reset mínimo.
- Toda interação deve ter hover, focus-visible, active e disabled quando aplicável.
- Use HTML semântico, labels associados, `aria-labelledby`/`aria-describedby` e navegação por teclado.
- Mantenha o formulário funcional em mobile, com mensagens de validação claras e sem perder o texto digitado.
- Respeite `prefers-reduced-motion`; animação deve apoiar hierarquia, não distrair.
- Antes de adicionar uma nova biblioteca de UI, verifique se shadcn/Radix resolve o caso e documente a decisão.
