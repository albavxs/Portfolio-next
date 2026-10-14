# Fontes de design

Repositórios de origem de cada fonte de design usada no portfólio, e onde cada uma foi
organizada neste projeto.

| Fonte                 | Repositório no GitHub | Licença | Versão copiada | Onde está aqui |
| --------------------- | --------------------- | ------- | -------------- | -------------- |
| Taste skill           | [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) | MIT | `f624f37` | `.claude/skills/taste-skill/` |
| Image to code         | [Leonxlnx/taste-skill › skills/image-to-code-skill](https://github.com/Leonxlnx/taste-skill/tree/main/skills/image-to-code-skill) | MIT | `f624f37` | `.claude/skills/image-to-code/` |
| Web design guidelines | [vercel-labs/agent-skills › skills/web-design-guidelines](https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines) (regras em [vercel-labs/web-interface-guidelines](https://github.com/vercel-labs/web-interface-guidelines)) | MIT | `063bee9` | `.claude/skills/web-design-guidelines/` |
| Awesome design        | [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md) | MIT | `3b60532` | `docs/design/references/` (apple, linear.app, vercel) e o formato do `DESIGN.md` |
| Playwright CLI        | [microsoft/playwright-cli](https://github.com/microsoft/playwright-cli) | Apache-2.0 | `b85c7a7` | `.claude/skills/playwright-cli/` |

## Para que serve cada uma

- **Taste skill:** direção de arte para criar ou redesenhar seções sem cara de "feito por IA".
- **Image to code:** gera ou recebe uma imagem de referência e implementa a seção fiel a ela.
- **Web design guidelines:** revisão de UI (acessibilidade, UX, formulários, animação) no formato `arquivo:linha`.
- **Awesome design:** DESIGN.md de sistemas visuais reais, usados como referência para o `DESIGN.md` deste projeto.
- **Playwright CLI:** abrir a página num navegador real, interagir e tirar screenshots para validar mudanças.

O fluxo de uso está em [`AGENTS.md`](../../AGENTS.md).

## Atualizar

Clone o repositório de origem, copie de novo a pasta da skill (ou o DESIGN.md) mantendo o
`LICENSE`, e atualize a coluna "Versão copiada".
