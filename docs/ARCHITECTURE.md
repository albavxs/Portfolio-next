# Arquitetura

O portfólio é uma página única em Next.js (App Router). O código é organizado por
**feature**: cada seção da página é dona dos seus componentes, e o que é reaproveitado
entre seções fica em `shared/`. Conteúdo (textos, projetos, links) fica separado do
código de interface.

```
src/
├── app/                  # Rotas e casca da aplicação (layout, page, providers, globals.css)
├── features/             # Uma pasta por seção da página, na ordem em que aparecem
│   ├── navigation/       # Nav (barra fixa do topo)
│   ├── hero/             # Hero + TypeToOpen (linha para digitar) + scene/ (Three.js, só desktop)
│   ├── projects/         # Projects, ProjectCard, ProjectModal
│   ├── organization/     # Comunidade Few Soldiers
│   ├── experience/
│   ├── about/            # Bio, stack e certificações
│   ├── contact/
│   └── footer/
├── shared/               # Peças sem conhecimento de seção
│   └── ui/               # Section, Tag
├── content/              # Dados tipados: projects, experience, skills, certificates, social
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
sobe para `shared/`. Algo que só uma seção usa (como o `TypeToOpen` do Hero) fica dentro
dela.

## Onde mexer

- **Novo projeto no portfólio:** `src/content/projects.ts` + imagem em `public/images/screenshots/`.
- **Texto da página:** `src/i18n/locales/en.json` e `pt-br.json` (sempre os dois).
- **Links sociais / e-mail:** `src/content/social.ts`.
- **Nova seção:** crie `src/features/<nome>/`, monte em `src/app/page.tsx`.
- **Tokens visuais:** `@theme` em `src/app/globals.css`, documentados em [`DESIGN.md`](../DESIGN.md).

## Assets

`public/images/` já está separado por uso: `profile/`, `screenshots/` (projetos),
`certificados/`, `skills/`. Currículos ficam em `public/resume/`.
