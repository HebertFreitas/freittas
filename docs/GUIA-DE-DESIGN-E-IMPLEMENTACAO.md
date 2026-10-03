# Guia de design e implementação de landing pages

**Referência:** Barbearia Baruque · React 19, Vite 8, Motion 13  
**Objetivo:** registrar as decisões desta página e oferecer um roteiro reutilizável para novos projetos.  
**Como ler:** “Atual” descreve o código existente; “Padrão recomendado” é um critério para próximas páginas, não uma funcionalidade já entregue.

## 1. Princípio central

Comece pela identidade real do negócio, pela pessoa que vai visitar a página e pela ação que ela deve tomar. Na Baruque, o site traduz paredes grafite, couro conhaque e luz quente em cor, fotografia e movimento. A ação principal é agendar pelo aplicativo. Para outro cliente, preserve o método, não a estética literal.

Antes de desenhar, defina em uma frase: **“Esta página ajuda [público] a [ação] por meio de [prova/benefício].”** Reúna endereço, contatos, horários, serviços, preços, fotos próprias, depoimentos autorizados e destino dos botões. Escolha uma ação principal e deixe as secundárias subordinadas a ela.

## 2. Arquitetura da página

**Atual:** header fixo → hero de tela cheia → indicadores e processo → diferenciais em bento → equipe → preços → fotos do ambiente → depoimentos → aplicativo → visita/mapa → footer. Há botão flutuante de WhatsApp, indicador de progresso de rolagem e botão de retorno ao topo.

**Regra reutilizável:** organize a sequência como promessa → contexto → prova → oferta → redução de dúvidas → ação. Não copie seções sem função comercial. Cada seção precisa responder a uma pergunta do visitante; cada CTA deve levar a um destino real. Repita a ação principal após as seções que resolvem uma objeção, sem transformar todos os blocos em anúncio.

| Bloco | Papel na Baruque | Decisão para outra página |
| --- | --- | --- |
| Hero | Identidade, promessa e agendamento | Mostrar o elemento mais característico da marca e uma ação clara. |
| Indicadores/processo | Experiência e funcionamento | Usar números verificáveis e etapas somente se houver sequência real. |
| Diferenciais/fotos | Demonstrar atmosfera e serviço | Priorizar imagens autênticas e legendas úteis. |
| Equipe | Humanizar o atendimento | Exigir retratos, nomes e funções confirmados. |
| Preços | Diminuir incerteza | Mostrar preços atualizados ou explicar como pedir orçamento. |
| Depoimentos | Prova social | Usar autorização, fonte e dados atualizados. |
| Aplicativo/contato | Converter | Dar o caminho mais curto para agendar ou falar. |
| Visita/footer | Resolver localização e confiança | Repetir dados de contato consistentes. |

## 3. Sistema visual atual

### Cores

Os valores abaixo vêm de `src/config/theme.css`. Em outro cliente, mantenha os papéis sem reutilizar automaticamente os hexadecimais.

| Token | Valor | Uso |
| --- | --- | --- |
| `--dark` | `#111519` | Header, hero, seção do app, footer. |
| `--dark-2` | `#1b2127` | Superfícies escuras e fundo de fotos. |
| `--neutral` | `#56626b` | Ícones e detalhes frios. |
| `--surface` | `#eceeed` | Seções alternadas com moldura sutil. |
| `--base` | `#f9f9f7` | Fundo claro principal. |
| `--text` / `--muted` | `#171b1f` / `#5d666d` | Texto principal e secundário. |
| `--accent` | `#97502b` | Regras, etiquetas e preço destacado. |
| `--accent-light` | `#d6a060` | Acentos no escuro, progresso e sublinhado. |
| `--on-dark` | `#f1eee9` | Texto sobre superfícies escuras. |

**Padrão recomendado:** escolha 4 a 6 cores principais com funções claras; valide contraste de texto e foco no contexto real. Use superfícies alternadas para marcar mudança de assunto, não apenas para decorar. Na Baruque, a moldura discreta das seções claras ecoa a boiserie da loja.

### Tipografia e ritmo

- **Atual:** `Bodoni Moda` para títulos, nomes e preços; `Hanken Grotesk` para texto, navegação e controles. Fontes carregadas pelo Google Fonts com `preconnect`.
- **Atual:** H1 `clamp(52px, 9vw, 112px)`, altura de linha `0.98`, espaçamento `-0.03em`; H2 `clamp(38px, 5vw, 56px)`, altura `1.04`; texto de destaque até `48ch`; parágrafo de apoio até `46ch` com altura `1.75`.
- **Atual:** segunda linha de alguns títulos em itálico; pequenas regras coloridas criam continuidade visual. Usar esse recurso apenas onde ele reforça a hierarquia.
- **Padrão recomendado:** contraste claro entre título e corpo, linhas legíveis, frases curtas e uma única voz de marca. Evite rótulos, numerações e ornamentos repetidos sem propósito. Escreva o CTA como ação concreta.

### Espaçamento e composição

- **Atual:** container até `1200px`, respiro lateral `clamp(16px, 5vw, 48px)`; versão estreita até `760px`.
- **Atual:** seções padrão `clamp(72px, 10vw, 128px)` e compactas `clamp(64px, 8vw, 104px)`.
- **Atual:** header `88px` no desktop e `72px` até `640px`; âncoras compensadas por `scroll-padding-top`.
- **Atual:** raio comum de `10px`, com exceções intencionais para pílulas, controles circulares e modal.
- **Padrão recomendado:** estabeleça escala de espaçamento antes dos componentes. Alinhe títulos, texto e CTAs aos mesmos eixos; reserve o maior contraste de tamanho e espaço para a mensagem principal.

## 4. Imagens e componentes

**Hero atual:** foto em `cover`, filtro de saturação/contraste, duas camadas de gradiente escuro para proteger a leitura; ocupa ao menos `100svh`. O primeiro arquivo do slideshow recebe `preload` em `index.html`. O H1 permanece texto HTML, não parte da imagem.

**Grades atuais:** bento em 4 colunas com cartões maiores e largura dupla; mosaico de ambiente em 4 colunas. Os cartões usam `object-fit: cover`, legenda e abertura de lightbox. Retratos da equipe usam proporção `3:4`. Em telas estreitas, os grades passam para 2 e depois 1 coluna; o texto oculto no hover do bento fica visível no celular.

**Botões atuais:** CTA em formato pílula com preenchimento que cresce do centro, seta que aparece em hover/foco e pressão de escala. Botões de loja levam ao destino externo. Modal de agendamento apresenta as lojas; WhatsApp fica disponível de modo persistente.

**Padrão recomendado:** fotografe pessoas, local e produto reais; escolha recortes para cada proporção; preserve dimensões para evitar salto de layout; use `alt` descritivo quando a imagem informa algo, e vazio quando é decorativa e já há texto equivalente. Comprima imagens e carregue fora da primeira tela sob demanda. Mostre ações importantes sem depender de hover.

## 5. Movimento: tokens e comportamentos

**Fonte de verdade atual:** `src/lib/motion-tokens.js`. Animações em React usam `motion/react`; algumas interações visuais usam CSS em `src/App.css`. Os tempos abaixo estão em segundos.

| Token | Valor | Uso típico |
| --- | --- | --- |
| Distâncias | `18`, `28`, `42`, `80px` | Entradas, deslizamentos e deslocamentos. |
| Escalas | `0.98`, `0.97`, `1.03`, `1.08` | Estado sutil, pressão, destaque, zoom. |
| Durações | `0.22`, `0.5`, `0.72`, `1.2`, `7s` | Rápida, normal, lenta, cinematográfica, intervalo do slide. |
| Easing suave | `[0.22, 1, 0.36, 1]` | Entradas e saídas delicadas. |
| Easing entrada/saída | `[0.65, 0, 0.35, 1]` | Sublinhado desenhado. |
| Stagger | `0.06`, `0.08`, `0.10s` | Sequência de itens. |
| Spring suave | stiffness `80`, damping `18` | Menu e modal. |
| Spring rápido | stiffness `360`, damping `24` | Feedback e marcadores. |
| Spring de layout | stiffness `260`, damping `30` | Foto compartilhada com lightbox. |

**Padrão atual de entrada:** `fadeUp` parte de `opacity: 0` e `y: 28px`, chegando a `opacity: 1` e `y: 0` em `0.72s`. Revelações de seção ocorrem uma vez (`once: true`, margem `-80px`). Este é um padrão do projeto, não uma exigência universal; em outra página, escolha poucos momentos de entrada para manter o conteúdo estável e evitar repetição.

| Elemento | Comportamento atual | Regra para reutilizar |
| --- | --- | --- |
| Header | Entra de cima; após `40px` de scroll, ganha fundo escuro translúcido, blur e linha. | A mudança deve melhorar contraste e orientação. |
| Navegação | `IntersectionObserver` destaca seção ativa; sublinhado migra com `layoutId`. | Destaque deve refletir a seção realmente visível. |
| Menu móvel | Fade do painel; links entram da esquerda em sequência; linhas do ícone giram para “X”. | Toda entrada precisa de saída; fechar por Escape e após navegação. |
| Hero | Título entra linha a linha; regra escala; traço SVG é desenhado. | Orquestrar a primeira impressão sem atrasar a leitura ou o CTA. |
| Slideshow | Troca a cada `7s`; fade de `1.8s`, zoom de `1.08` até `1` em `9s`; indicadores permitem troca manual. | Dar controle ao usuário; pausar movimento automático para quem solicita redução. |
| Hero no scroll | Imagem desloca `0–18%`; conteúdo perde opacidade até `70%` do progresso da seção. | Parallax é complementar; não pode prejudicar legibilidade. |
| Números/processo | Contagem até o valor em `1.68s`; trilho vertical preenche conforme rolagem. | Animar apenas números verdadeiros; mostrar valor final sem movimento. |
| Fotos | Hover/foco: zoom `1.07`, mais cor, moldura interna e ícone; clique abre lightbox. | Replicar indicação no foco e oferecer estado útil no toque. |
| Lightbox | Foto aberta usa `layoutId`; navegação desliza conforme direção; arrasto acima de `80px` troca a foto. | Preservar proporção, legenda, Escape, setas e botão de fechar. |
| Depoimentos | `AnimatePresence mode="wait"`; saída/entrada horizontal de `42px`, duração `0.5s`; ponto ativo muda de largura. | Trocar conteúdo com anúncio acessível e controle explícito. |
| App | Maquete do celular move `+60` a `-60px` e gira `-6°` a `4°` ao rolar. | Usar só se acrescentar profundidade sem competir com CTA. |
| Modal | Backdrop em fade `0.22s`; painel em opacidade, escala `0.97` e `y: 18px` com spring suave. | Foco dentro, Escape, bloqueio de scroll e retorno ao controle anterior. |
| Ações flutuantes | Progresso com `scaleX`; topo aparece após `700px`; WhatsApp entra com escala e atraso. | Não encobrir conteúdo nem controles em telas pequenas. |

**Movimento reduzido atual:** `MotionConfig reducedMotion="user"`, `useReducedMotion` no slideshow e na contagem, além de CSS que desativa a rolagem suave e quase zera transições CSS. **Padrão recomendado:** testar a página inteira com `prefers-reduced-motion: reduce`, inclusive parallax, transformação no scroll e rolagem programática. A configuração atual não substitui uma revisão manual de todos esses efeitos.

### Inventário completo das transições CSS atuais

Valores de `src/App.css`; “ease” significa a curva CSS padrão. Alterar um componente exige revisar também seus estados `:hover`, `:focus-visible` e as regras móveis.

| Seletor / interação | Propriedades e duração | Estado de chegada |
| --- | --- | --- |
| `.pill` | cor e borda `0.35s ease` | Cor invertida no hover/foco; preenchimento e seta são animados pelo Motion. |
| `.header` | fundo, sombra e blur `0.4s ease` | Fundo `rgba(17,21,25,.92)`, blur `14px` após `40px` de rolagem ou menu aberto. |
| `.header__nav a` | cor `0.25s ease` | Texto claro no hover ou seção ativa. |
| `.header__cta` | fundo `0.25s ease` | `--accent-light` no hover. |
| `.burger span` | posição superior e rotação `0.35s ease` | Linhas a `21px`, giradas `+45°` e `-45°`. |
| `.hero__link` | cor e borda inferior `0.25s ease` | `--accent-light` no hover. |
| `.steps__num` | borda e cor `0.3s ease` | `--accent` no hover da etapa. |
| `.photo-tile img` | escala `1.1s cubic-bezier(.22,1,.36,1)`; filtro `0.8s ease` | Escala `1.07`, saturação `1.05`, brilho `1`. |
| `.photo-tile::after` | opacidade `0.5s ease` | Muda no mosaico; o overlay da foto fica mais forte no hover. |
| `.photo-tile__panel` | opacidade `0.5s ease`; escala `0.6s cubic-bezier(.22,1,.36,1)` | Moldura aparece de `scale(1.04)` para `1`. |
| `.photo-tile__zoom` | opacidade e deslocamento `0.35s ease` | Ícone surge de `y: -6px` para `0`. |
| `.bento__text` | altura máxima `0.5s ease`; opacidade `0.4s ease` | Texto abre até `80px` no hover/foco; em mobile fica visível. |
| `.member__photo img` | escala `1s cubic-bezier(.22,1,.36,1)`; grayscale `0.6s ease` | Escala `1.05`, cinza `0`; acionado pelo hover do cartão. |
| `.prices li` | fundo `0.3s ease` | Fundo `--base` no hover. |
| `.mosaic__caption` | opacidade e deslocamento `0.4s ease` | Legenda sobe de `8px` e aparece no hover/foco. |
| `.reviews__controls > button` | borda, fundo e cor `0.25s ease` | Botão escuro no hover. |
| `.reviews__dots button` | largura `0.35s ease` | Indicador ativo cresce de `10px` para `26px`. |
| `.store` | fundo e borda `0.25s ease` | Estado varia entre versões clara/escura. |
| `.visit__map iframe` | filtro `0.6s ease` | Grayscale `1` → `0.2` no hover. |
| `.footer a` | cor `0.25s ease` | `--accent-light` no hover. |
| `.modal__close` | fundo `0.25s ease` | Fundo plaster no hover. |
| `.lightbox__btn` | fundo e cor `0.25s ease` | Controle claro no hover. |

Também há `scroll-behavior: smooth` no HTML para âncoras; a regra de movimento reduzido o altera para `auto`. O botão “Voltar ao topo” solicita `window.scrollTo(..., behavior: 'smooth')` diretamente no componente, portanto precisa de revisão específica para movimento reduzido.

### Inventário completo das animações Motion atuais

| Componente | Propriedades, gatilho e valores |
| --- | --- |
| `Header` | Entrada `y: -80px → 0` e opacidade `0 → 1`; `0.72s`, easing suave, atraso `0.2s`. CTA: hover `scale(1.03)` e pressão `scale(0.97)`, spring rápido. Sublinhado da seção ativa: `layoutId="nav-underline"`, spring rápido. |
| `Header` móvel | Painel abre/fecha com opacidade em `0.22s`; links entram de `x: -28px` e opacidade `0` com spring suave, `stagger 0.06s` e atraso inicial `0.08s`; nav usa variante de saída `hidden`. |
| `Hero` | Container: `stagger 0.10s`, atraso `0.35s`. Linhas, texto e ações: opacidade `0 → 1`, `y: 0.6em → 0`, `1.2s` suave. Regra: `scaleX: 0 → 1` em `0.72s`. Traço SVG: `pathLength: 0 → 1` e opacidade, `1.2s` inOut, atraso `0.5s`. |
| `Hero` fotos | Nova imagem entra com opacidade `0 → 1` em `1.8s`, escala `1.08 → 1` em `9s` linear; anterior sai com opacidade `1 → 0`. Troca automática após `7s`, suspensa por `useReducedMotion`; o indicador ativo usa `layoutId="hero-dot"`. |
| `Hero` rolagem | Progresso da seção de `start start` até `end start`: mídia `y: 0% → 18%`; conteúdo opacidade `1 → 0` entre progresso `0` e `0.7`. |
| `SectionHeading` | `fadeUp` e regra `scaleX: 0 → 1` em `0.72s`, com `0.15s` de atraso. |
| `PillButton` | Preenchimento `scale: 0 → 1` e opacidade `0 → 1` em `0.5s`; seta `x: -6px → 0`, largura `0 → auto` e opacidade `0 → 1` com spring rápido; pressão `scale(0.97)`. Ativado por hover/foco. |
| `Intro` | Estatísticas usam `fadeUp` com `stagger 0.08s`; contagem de `0` ao valor em `1.68s`, ou imediata com `useReducedMotion`. Linha das etapas usa `scaleY: 0 → 1` conforme scroll entre `start 75%` e `end 55%`. Etapas usam `fadeUp` e atraso por índice de `0.08s`. |
| `Features`, `Team`, `Pricing`, `Ambient` | Títulos e itens usam `fadeUp` uma vez em viewport. Bento/equipe: `stagger 0.08s`; preços/mosaico: `0.06s`. |
| `PhotoTile` / `Lightbox` | Moldura da foto e foto ampliada compartilham `layoutId="grupo-índice"`, com spring de layout. Overlay da lightbox entra/sai por opacidade em `0.22s`. Após navegar, slide usa opacidade e `x: ±80px` com spring de layout; `AnimatePresence mode="popLayout"`. Legenda entra de `y: 9px` e opacidade `0`, sai por opacidade; não há duração explícita para essa legenda. Arrasto horizontal troca de foto após `80px`. |
| `Reviews` | `AnimatePresence mode="wait"`; depoimento entra de `x: ±42px`, sai na direção oposta, com opacidade e `0.5s` suave. Controles pressionam `scale(0.97)`; ponto ativo compartilha `layoutId="review-dot"` com spring rápido. |
| `AppSection` | O celular usa progresso de rolagem entre `start end` e `end start`: `y: +60 → -60px`, rotação `-6° → +4°`. Textos/benefícios seguem `fadeUp` e `stagger 0.08s`. Botões de loja: hover `y: -2px`, pressão `scale(0.97)`, spring rápido. |
| `Visit` | Mapa entra de opacidade `0` e escala `0.98` até estado final em `0.72s` suave; detalhes usam `fadeUp` com `stagger 0.08s`. |
| `AppModal` | Container opacidade em `0.22s`; painel entra/sai de opacidade `0`, escala `0.97` e `y: 18px`, spring suave. |
| `FloatingActions` | Barra superior ligada ao progresso global `scaleX: 0 → 1`. Após `700px`, botão de topo entra/sai com opacidade, `scale: 0.97` e `y: 18px`, spring rápido; hover sobe `3px`. WhatsApp entra de `scale: 0.6` e opacidade `0` com atraso `1.2s`, spring rápido; hover escala `1.03 × 1.03 = 1.0609`; pressão `0.97`. |

**Observação de precisão:** alguns elementos Motion sem `transition` explícita usam os padrões internos da biblioteca. O guia registra o efeito e marca onde o código não fixa um tempo; para reproduzir exatamente entre versões, declare a transição no componente.

## 6. Responsividade e acessibilidade

**Breakpoints atuais:** até `1080px` a navegação vira menu; até `900px` grids de introdução, app e visita viram uma coluna, bento/mosaico/rodapé passam a duas; até `640px` bento e equipe viram uma coluna, altura do header diminui e controles da lightbox mudam de posição. O layout aceita largura mínima de `320px`.

**Contrato de interação atual:** foco visível com contorno `--accent-light` de `2px` e deslocamento de `4px`; botões têm nomes acessíveis; modal e lightbox usam diálogo, `aria-modal`, captura/restauração de foco, Escape e bloqueio de rolagem. A lightbox aceita setas do teclado e arrasto. Depoimentos anunciam mudanças com `aria-live`; imagens de galeria têm descrição no botão e na foto ampliada.

**Padrão recomendado para toda entrega:** conferir teclado sem mouse; ordem de foco; toque em alvos confortáveis; contraste em imagem e fundo; headings em ordem; rótulos de botões; menu e modais abertos/fechados; ausência de corte horizontal em `320px`, `375px`, tablet e desktop. Testar com movimento reduzido. Não declarar “acessível” apenas porque há atributos ARIA.

## 7. Conteúdo, SEO e credibilidade

**Atual:** `index.html` é preenchido a partir de `seo` e `brand` em `src/config/site.js` (título, meta description, Open Graph, favicon, fontes e pré-carregamento da foto inicial) por um plugin em `vite.config.js`. A página traz endereço, horários, telefone, WhatsApp, mapa e, se `booking.mode` for `app`, links das lojas.

**Antes de publicar em outro projeto:** confirmar nome comercial, cidade, endereço, telefone, horários, preços, imagens e avaliações com o cliente. Manter esses dados idênticos entre site e Perfil da Empresa no Google. Criar título e descrição específicos, URL canônica, imagem social com URL absoluta, `robots.txt`, `sitemap.xml` e dados estruturados apropriados quando houver domínio e dados oficiais. Conectar domínio ao Search Console e validar indexação. Esses itens são tarefas de publicação; não constam todos no projeto atual.

**Antes de publicar:** rode `npm run check`. Estatísticas, avaliações, preços e nomes devem ser reais e confirmados com o cliente antes de virar prova comercial. A nota visual de cinco estrelas dos depoimentos precisa corresponder à fonte apresentada. Mapa embutido não equivale a integrar o site ao Perfil da Empresa no Google.

## 8. Organização do código

| Arquivo | Responsabilidade |
| --- | --- |
| `src/config/theme.css` | Cores, fontes e raio (o único CSS que muda por cliente). Presets em `src/config/themes/`. |
| `src/index.css` | Reset, foco e movimento reduzido. |
| `src/App.css` | Layout, componentes, estados visuais e media queries. |
| `src/lib/motion-tokens.js` | Durações, distâncias, escalas, springs e variantes comuns. |
| `src/config/site.js` | Links, endereço, horários, fotos, serviços, preços e depoimentos. |
| `src/components/ui.jsx` | Botão pílula, título de seção, foto clicável, botões de loja. |
| `src/lib/overlays.js` | Contextos e comportamento de diálogo. |
| `src/components/` | Seções e componentes da página. |
| `index.html` | Metadados e carregamento inicial. |

**Padrão recomendado:** centralizar conteúdo que muda com frequência; criar tokens antes de animar componentes; manter interações complexas encapsuladas; nomear estados e variantes de modo consistente. Não colocar informações comerciais espalhadas por múltiplos arquivos sem uma fonte clara.

## 9. Roteiro para a próxima landing page

1. **Briefing:** público, oferta, ação principal, objeções, provas e material autorizado.
2. **Direção visual:** extrair 4 a 6 cores da marca/ambiente, escolher uma ou duas famílias tipográficas e definir ritmo de espaçamento.
3. **Estrutura:** escrever o H1 e organizar as seções pelo percurso de decisão do visitante; remover blocos sem função.
4. **Componentes:** definir header, CTA, cartões/fotos, prova social, contato e rodapé com estados de hover, foco e toque.
5. **Movimento:** escolher uma entrada principal, feedback das ações e no máximo alguns efeitos de rolagem; reutilizar tokens e criar saídas para elementos condicionais.
6. **Conteúdo real:** validar dados comerciais, links, fotos, textos alternativos e qualquer métrica exibida.
7. **Qualidade:** revisar mobile, teclado, movimento reduzido, desempenho, metadados, mapa/contato e build de produção.
8. **Publicação:** conectar domínio, verificar versão publicada, enviar sitemap ao Search Console e acompanhar cliques/agendamentos quando houver consentimento e medição configurados.

### Critério de pronto

- A mensagem principal e a ação aparecem claramente na primeira tela.
- Todos os botões e links levam ao destino esperado.
- Não há dado, foto, preço ou depoimento temporário apresentado como definitivo.
- A página é legível e utilizável com teclado, em celular e com movimento reduzido.
- Imagens não escondem texto nem causam saltos perceptíveis de layout.
- Metadados e informações de contato correspondem ao negócio publicado.
- `npm run build` e `npm run lint` passam; a página publicada é revisada no dispositivo real.

**Nota de manutenção:** este guia documenta a implementação encontrada no repositório. Ao alterar tokens, animações ou estrutura, atualize esta especificação no mesmo trabalho para que ela continue reutilizável.
