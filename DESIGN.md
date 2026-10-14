---
version: alpha
name: Paulo Guilherme Portfolio
description: Portfólio dark em estilo "iOS glass". Fundo quase preto (#05050a), superfícies de vidro translúcido com blur, um único azul de ação (#007AFF) e uma cena 3D discreta no Hero. A interface recua para que os projetos e o código apareçam.

colors:
  canvas: "#05050a"
  glass: "rgba(255, 255, 255, 0.05)"
  glass-hover: "rgba(255, 255, 255, 0.08)"
  glass-solid: "rgba(20, 20, 30, 0.8)"
  border: "rgba(255, 255, 255, 0.1)"
  text: "#ffffff"
  text-secondary: "rgba(255, 255, 255, 0.7)"
  accent: "#007AFF"
  accent-hover: "#339af0"
  code-bg: "#0d1117"
  code-chrome: "#161b22"

typography:
  family: "-apple-system, BlinkMacSystemFont, SF Pro Text, SF Pro Display, Helvetica Neue, Arial, sans-serif"
  mono: "font-mono do Tailwind (bloco de código do Hero)"
  section-title: { size: "text-3xl / md:text-4xl", weight: 700 }
  body: { size: "text-base", weight: 400 }
  caption: { size: "text-sm / text-xs", weight: 500 }

radius:
  card: "rounded-2xl"
  pill: "rounded-full"

effects:
  glass: "bg-ios-glass + border-ios-border + backdrop-blur-xl"
  divider: ".section-divider — 60px, gradiente do accent, pulso de opacidade"
---

# DESIGN.md

Fonte da verdade visual do portfólio, no formato dos arquivos do
[awesome-design-md](https://github.com/VoltAgent/awesome-design-md). Agentes devem ler
este arquivo antes de gerar ou alterar UI. Os tokens vivem em `@theme` dentro de
`src/app/globals.css` e são usados como classes Tailwind (`bg-ios-bg`,
`text-ios-text-secondary`, `border-ios-border`, `text-ios-accent`...).

## Princípios

1. **Escuro e calmo.** Um único fundo `canvas`; profundidade vem de vidro translúcido e
   blur, não de sombras pesadas nem de cores novas.
2. **Um só accent.** `#007AFF` marca o que é clicável ou ativo. Cores de marca
   (React, Docker...) aparecem só nos ícones e pills de tecnologia.
3. **O trabalho é o herói.** Screenshots dos projetos e o bloco de código do Hero
   carregam a identidade; a interface ao redor recua.
4. **Movimento com propósito.** Entradas com `FadeUp`/`FadeLeft`, parallax suave,
   cena Three.js só no desktop (no mobile entra o `.hero-gradient-mesh`).
5. **Bilíngue sempre.** Todo texto passa pelo `t()` e existe em `en` e `pt-br`.

## Componentes base

- **Card de vidro:** `rounded-2xl border border-ios-border bg-ios-glass backdrop-blur-xl`,
  hover em `bg-ios-glass-hover`.
- **Pill de tecnologia:** `rounded-full`, ícone na cor da marca, brilho com `--brand` no toque (`.skill-pill-tap`).
- **Bloco de código:** janela estilo VSCode com `code-bg`/`code-chrome` e paleta GitHub Dark.
- **Divisor de seção:** `.section-divider` entre seções.

## Referências

Inspirações de sistemas parecidos, copiadas do awesome-design-md em
[`docs/design/references/`](docs/design/references/):

- **apple**: base do vocabulário "iOS" (SF Pro, accent azul, chrome que recua).
- **linear.app**: dark UI de produto para dev, hierarquia de texto em tons de branco.
- **vercel**: portfólio/produto de dev, superfícies neutras e tipografia firme.

Use-as como referência de decisões, não para copiar a marca de outra empresa.

## Observações abertas

- `layout.tsx` carrega Poppins (`--font-poppins`), mas o `body` usa a pilha de fontes
  do sistema e nenhuma classe usa a variável. Ou adotar Poppins de fato, ou remover o
  carregamento.
