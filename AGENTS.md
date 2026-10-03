# Landing Template: instruções para agentes

Este arquivo (`AGENTS.md`) é lido automaticamente por Codex, Cursor, Copilot e outras ferramentas; o `CLAUDE.md` aponta para ele.

Este repositório é um template. Cada landing nova mantém o mesmo layout, as mesmas ações e as mesmas animações; muda só a configuração.

## Ao criar uma landing para um cliente ou nicho

0. **Antes de editar qualquer arquivo**, leia o `BRIEFING.md`. Se um campo obrigatório (**\***) estiver vazio, ou se faltar algo necessário para as seções marcadas, **pergunte ao usuário e espere a resposta**. Faça todas as perguntas numa única mensagem. Sugira escolhas para o nicho (preset de tema, seções, modo de agendamento, texto do botão) e peça confirmação.
1. Não invente estatísticas, avaliações, preços, nomes ou depoimentos. Se o usuário não tiver um dado opcional, desligue a seção em `sections` ou deixe o placeholder e avise no final.
2. Tema: comece pelo preset mais próximo em `src/config/themes/`, copie-o para `src/config/theme.css` e ajuste as cores para a identidade do cliente. Mantenha cada `*-rgb` igual ao hex correspondente. `--accent` é texto sobre fundo claro e `--accent-light` é acento sobre fundo escuro; os dois precisam de contraste ≥ 4.5:1.
3. Conteúdo: edite só `src/config/site.js`. Atualize `seo.fontsUrl` e `seo.themeColor` junto com o tema. Configure `sections` e `booking`.
4. Imagens: em `public/`, com os tamanhos reais em `photos`. O mosaico (`ambient`) usa exatamente 6 fotos; o bento (`features`), 4.
5. Rode `npm run check`, `npm run lint` e `npm run build` e resolva todos os erros. Liste os avisos restantes para o usuário.

## Regras

- Não edite `src/components/`, `src/App.css` nem `src/lib/` para personalizar um cliente. Se algo não puder ser configurado, torne-o configurável no template (em `site.js` ou `theme.css`), sem criar exceções no projeto do cliente.
- Nenhuma cor, fonte ou texto fixo nos componentes: cores vêm de `theme.css`, textos de `site.js`.
- Motion: todas as durações, distâncias e springs vêm de `src/lib/motion-tokens.js`. Seções usam `whileInView` com `inViewOnce`. `MotionConfig reducedMotion="user"` deve continuar no `App.jsx`.
- Acessibilidade: mantenha os `aria-*`, o foco visível, o focus trap dos diálogos e os textos alternativos.
- Referência completa: `docs/GUIA-DE-DESIGN-E-IMPLEMENTACAO.md`. Skills de apoio em `.agents/skills/`.
