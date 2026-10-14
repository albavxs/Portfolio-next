# AGENTS.md

Guia para agentes de código (Claude Code, Codex, Cursor...) neste repositório.

## Antes de mexer

- Arquitetura e regras de import: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
- Sistema visual e tokens: [`DESIGN.md`](DESIGN.md)
- Validar: `npm run lint` e `npm run build`

## Skills de design e QA

As skills ficam em `.claude/skills/` (Claude Code). `.agents/skills` é um link para a
mesma pasta, para agentes que seguem esse padrão (Codex e outros).

| Quando                                            | Skill                     | Fonte |
| ------------------------------------------------- | ------------------------- | ----- |
| Criar ou redesenhar uma seção com direção de arte  | `taste-skill`             | [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) (MIT) |
| Transformar uma imagem/mockup em código            | `image-to-code`           | [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill/tree/main/skills/image-to-code-skill) (MIT) |
| Revisar UI (acessibilidade, UX, boas práticas)     | `web-design-guidelines`   | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) (MIT) |
| Referência de sistemas visuais (DESIGN.md)         | `docs/design/references/` | [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md) (MIT) |
| Abrir a página no navegador, testar, screenshots   | `playwright-cli`          | [microsoft/playwright-cli](https://github.com/microsoft/playwright-cli) (Apache-2.0) |

### Fluxo sugerido para mudanças visuais

1. **Referência:** leia `DESIGN.md`; se precisar de inspiração, compare com `docs/design/references/`.
2. **Direção:** use `taste-skill` para novas seções/redesign, ou `image-to-code` quando houver uma imagem de referência.
3. **Implementação:** dentro de `src/features/<seção>/`, usando os tokens de `globals.css`.
4. **Revisão:** rode `web-design-guidelines` nos arquivos alterados.
5. **Verificação real:** `npm run dev` e `playwright-cli` para navegar e tirar screenshots em 1440 / 768 / 390 px.

A taste-skill tem regras próprias (sem gradientes, sem mono, sem eyebrow labels...)
que o estilo atual já segue (veja `DESIGN.md`). Quando
houver conflito, `DESIGN.md` vence, a não ser que a tarefa seja justamente redesenhar.

### Requisitos das ferramentas

- `taste-skill`: Node 22+ e Chrome/Chromium instalado; grava em `.taste-skill/` (ignorado no git).
- `playwright-cli`: `npm install -g @playwright/cli@latest` (ou `npx playwright cli` se já houver Playwright local); grava em `.playwright-cli/` (ignorado no git).
- `web-design-guidelines`: busca as regras atualizadas na web a cada revisão.

### Atualizar as skills

São cópias vendorizadas. Versões copiadas: taste-skill `f624f37`, agent-skills `063bee9`,
playwright-cli `b85c7a7`, awesome-design-md `3b60532`. Para atualizar, copie de novo a pasta
da skill do repositório de origem, mantendo o `LICENSE`.
