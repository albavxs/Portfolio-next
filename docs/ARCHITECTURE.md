# Arquitetura

O portfólio é uma página única em Next.js (App Router). O código é organizado por
**feature**: cada seção da página é dona dos seus componentes, e o que é reaproveitado
entre seções fica em `shared/`. Conteúdo (textos, projetos, links) fica separado do
código de interface.

```
src/
├── app/                  # Rotas e casca da aplicação (layout, page, providers, globals.css)
├── features/             # Uma pasta por seção da página
│   ├── navigation/       # Nav (montado) e Dock (não montado)
│   ├── hero/             # Hero + scene/ (Three.js: SceneCanvas, GlassPolyhedra, ParticleDust, MouseParallax)
│   ├── about/
│   ├── organization/
│   ├── projects/         # Projects, ProjectCard, ProjectModal
│   ├── contact/
│   ├── footer/
│   ├── experience/       # não montado em page.tsx
│   └── skills/           # não montado em page.tsx
├── shared/               # Peças sem conhecimento de seção
│   ├── motion/           # FadeUp, FadeLeft (Framer Motion)
│   └── ui/               # Marquee, ParallaxBackground
├── content/              # Dados tipados: projects, experience, skills, social (links e e-mail)
└── i18n/                 # LanguageContext + locales/en.json e locales/pt-br.json
```

## Regras de dependência

| Camada      | Pode importar de                         |
| ----------- | ---------------------------------------- |
| `app`       | `features`, `shared`, `i18n`             |
| `features`  | `shared`, `content`, `i18n`, e arquivos da própria feature |
| `shared`    | só bibliotecas externas                  |
| `content`   | nada do projeto (só tipos)               |
| `i18n`      | os próprios `locales/`                   |

Uma feature não importa outra feature. Se duas seções precisarem da mesma peça, ela
sobe para `shared/`. Algo que só uma seção usa (como a cena 3D do Hero) fica dentro
dela.

## Onde mexer

- **Novo projeto no portfólio:** `src/content/projects.ts` + imagem em `public/images/screenshots/`.
- **Texto da página:** `src/i18n/locales/en.json` e `pt-br.json` (sempre os dois).
- **Links sociais / e-mail:** `src/content/social.ts`.
- **Nova seção:** crie `src/features/<nome>/`, monte em `src/app/page.tsx`.
- **Tokens visuais:** `@theme` em `src/app/globals.css`, documentados em [`DESIGN.md`](../DESIGN.md).

## Assets

`public/images/` já está separado por uso: `profile/`, `screenshots/` (projetos),
`certificados/`, `skills/`, `dock/`, `misc/`. Currículos ficam em `public/resume/`.

## Componentes não montados

`features/experience`, `features/skills` e `features/navigation/Dock` existiam antes da
reorganização mas não aparecem em `page.tsx`. Foram mantidos para reaproveitamento; o
`About` já cobre experiência e skills.
