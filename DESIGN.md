---
version: beta
name: Paulo Guilherme Portfolio
description: Portfólio escuro e chapado. Fundo quase preto, superfícies opacas um tom acima, um único azul de ação, Geist como única família. O trabalho (projetos reais) aparece logo depois do Hero, e o Hero tem uma coisa viva: uma linha de código para digitar, como no SharkType.

colors:
  canvas: "#05050a"
  surface: "#0f0f17"
  surface-hover: "#171721"
  ink: "#f5f5f7"
  muted: "#a1a1aa"
  accent: "#3d8bff"         # links e texto de ação sobre o fundo
  accent-strong: "#0066d6"  # preenchimento de botão (contraste 4.5:1 com branco)
  danger: "#ff6b6b"         # só para erro de digitação no Hero

typography:
  family: "Geist (next/font/google), com a pilha do sistema como reserva"
  mono: "Geist Mono, só dentro de código literal (o trecho do Hero)"
  display: { size: "clamp(2.75rem, 7.2vw, 6.25rem)", weight: 600, tracking: "-0.04em" }
  heading: { size: "clamp(2rem, 3.8vw, 3rem)", weight: 600 }
  lead: { size: "1.25rem" }
  body: { size: "1.0625rem" }
  small: { size: "0.875rem" }

radius:
  surface: "rounded-lg (8px)"
  action: "rounded-full (botões, tags)"

effects:
  blur: "só na barra de navegação"
  motion: "trecho para digitar no Hero, faixas de stack, carrossel de certificados preso à rolagem e entrada .reveal"
  ambient: "dois brilhos azuis bem suaves fixos atrás da página (shared/ui/Ambient)"
  hero-scene: "no desktop, traços dourados animados (background.svg), poliedros de vidro e poeira em Three.js atrás do Hero; some ao rolar"
---

# DESIGN.md

Fonte da verdade visual do portfólio, no formato dos arquivos do
[awesome-design-md](https://github.com/VoltAgent/awesome-design-md). Agentes devem ler
este arquivo antes de gerar ou alterar UI. Os tokens vivem em `@theme` dentro de
`src/app/globals.css` e viram classes Tailwind (`bg-canvas`, `bg-surface`, `text-ink`,
`text-muted`, `text-accent`, `bg-accent-strong`, `text-display`, `text-heading`,
`text-lead`, `text-body`, `text-small`).

## Ideia

Os projetos do Paulo (AlgoriUI, SharkType, Few Soldiers) giram em torno de aprender a
programar. Neste site, **o ato de programar vira a navegação**: o Hero pede para o
visitante digitar `await portfolio.open("projects")`, mostra velocidade e precisão como
o SharkType, e abre os projetos. Sem JavaScript, a linha aparece inteira e o link
"Pular para os projetos" faz o mesmo papel.

## Princípios

1. **Chapado e calmo.** Um fundo `canvas`. Superfícies são preenchimentos opacos um tom
   acima (`surface`), sem borda, sem sombra, sem gradiente. Blur só na barra do topo.
2. **Um só accent.** Azul marca o que é clicável ou ativo. Títulos são `ink`, nunca azuis.
   Cores de marca aparecem só nos ícones de tecnologia.
3. **Cinco tamanhos de texto.** display, heading, lead, body, small. Nada abaixo de 14px;
   texto corrido em 17px; parágrafos com no máximo ~65 caracteres.
4. **O trabalho primeiro.** Ordem da página: Hero, Projetos, Few Soldiers, Experiência,
   Sobre (bio, stack, certificações), Contato.
5. **Personalidade onde ela conta.** A stack tem pills com ícone que acende na cor da
   marca e brilho no hover (no celular as cores ficam sempre acesas), em faixas que andam
   no desktop. Certificações mostram as imagens reais num carrossel preso à rolagem no
   desktop e em swipe no celular. O Sobre tem perfil fixo com foto e mini navegação.
6. **Movimento com propósito.** Coisa viva no Hero, faixas da stack, carrossel e uma
   entrada discreta presa à rolagem (`.reveal`). Tudo respeita `prefers-reduced-motion`.
7. **Bilíngue sempre.** Todo texto passa pelo `t()` e existe em `en` e `pt-br`.
8. **Sem enfeites de template:** rótulos em caixa alta, eyebrows, mono como "voz técnica",
   linhas divisórias, numeração 01/02, selos "disponível" piscando.

## Componentes base

- **Section** (`shared/ui/Section`): contêiner de 1200px, título `heading` à esquerda,
  introdução opcional em `lead`.
- **Tag** (`shared/ui/Tag`): `rounded-full bg-white/[0.06] text-small text-muted`.
- **Botão principal:** `rounded-full bg-accent-strong text-white`, hover `bg-accent`.
- **Botão secundário:** `rounded-full bg-surface text-ink`, hover `bg-surface-hover`.
- **Superfície:** `rounded-lg bg-surface`, hover `bg-surface-hover` quando clicável.

## Referências

Inspirações de sistemas parecidos, copiadas do awesome-design-md em
[`docs/design/references/`](docs/design/references/):

- **apple**: o chrome recua e o produto aparece grande.
- **linear.app**: profundidade por tom de superfície, hierarquia de texto em tons de branco.
- **vercel**: uma família tipográfica firme (Geist) e superfícies neutras.

Use-as como referência de decisões, não para copiar a marca de outra empresa.

## Verificação

`node .claude/skills/taste-skill/scripts/inspect.mjs http://localhost:3000` deve passar
sem FAIL. O único aviso aceito é a falta de vídeo: não há um clipe honesto do trabalho
que diga mais do que os screenshots reais dos projetos.
