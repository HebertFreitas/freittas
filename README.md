# Landing Template

Base para landing pages de negócios locais (barbearia, clínica, restaurante, academia…).
Telas, ações, animações e transições são as mesmas em todos os projetos. Por cliente, você muda só:

| O quê | Onde |
| --- | --- |
| Cores, fontes, raio das bordas | `src/config/theme.css` (ou copie um preset de `src/config/themes/`) |
| Marca, SEO, textos, seções ligadas, agendamento, serviços, preços, equipe, depoimentos, contato | `src/config/site.js` |
| Logo, fotos, telas do app | `public/` |

Stack: React 19, Vite 8, Motion 13. Sem backend; o build é um site estático.

## Criar uma landing nova

1. No GitHub, clique em **Use this template → Create a new repository** (ou `npx degit HebertFreitas/landing-template nome-do-cliente`).
2. `npm install` e `npm run dev`.
3. **Briefing:** preencha o `BRIEFING.md` e peça à IA: *"Leia o AGENTS.md e crie a landing a partir do BRIEFING.md"*. Ela deve perguntar o que faltar. Os passos 4 a 6 abaixo são o que ela faz (ou o que você faz à mão).
4. **Tema:** copie um preset de `src/config/themes/` para `src/config/theme.css` (ou ajuste as cores à mão). Cada preset informa no topo qual `fontsUrl` e `themeColor` usar no `site.js`.
5. **Conteúdo:** preencha `src/config/site.js` de cima para baixo.
6. **Imagens:** coloque as fotos reais em `public/gallery/`, `public/team/` e `public/app-screens/`, o logo em `public/`, e atualize os caminhos e os tamanhos (largura × altura em pixels) em `site.js`. Prefira `.jpg` com cerca de 1600px no lado maior.
7. `npm run check`: valida o contraste do tema, verifica imagens faltando e aponta placeholders que sobraram.
8. `npm run build` e publique a pasta `dist/` (Vercel, Netlify, GitHub Pages…).

## Opções no `site.js`

- **`sections`**: liga e desliga seções inteiras; o menu se ajusta sozinho.
- **`booking.mode`**: o que os botões "Agendar" fazem.
  - `'app'` abre o modal com App Store e Google Play.
  - `'whatsapp'` abre o WhatsApp de `contact.whatsapp`.
  - `'link'` abre `booking.url` (um sistema de agendamento externo).
  Sem app, use `'whatsapp'` ou `'link'` e desligue `sections.app`.

## Temas prontos

| Preset | Para |
| --- | --- |
| `classico` | Barbearia, tabacaria, bar, alfaiataria |
| `clinica` | Estética, spa, salão feminino |
| `restaurante` | Restaurante, cafeteria, padaria |
| `academia` | Academia, luta, oficina |
| `odonto` | Odontologia, clínica médica, fisioterapia, pet |

Todos passam de 4.5:1 de contraste (WCAG AA) nos pares de texto usados pelo layout.

## O que não mudar por cliente

`src/components/`, `src/App.css`, `src/lib/`. Melhorias de layout ou de efeito entram **neste template** e depois são copiadas para os projetos que precisarem delas.

Guia completo de design e motion: [docs/GUIA-DE-DESIGN-E-IMPLEMENTACAO.md](docs/GUIA-DE-DESIGN-E-IMPLEMENTACAO.md).
