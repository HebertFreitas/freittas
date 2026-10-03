/*
 * SITE: everything that changes from one landing page to the next lives here.
 * Components only read from this file (and theme.css), so screens, actions and
 * animations stay identical across projects.
 * Images go in /public: logo, /gallery/*, /team/*, /app-screens/*.
 */

export const brand = {
  name: "Freittas",
  kind: "Produtor musical", // small word under the logo (the niche)
  fullName: "Freittas Produções",
  logo: "/gallery/jean_logo.png",
  tagline: "Bora fazer barulho", // big line at the top of the footer
};

// Used by vite.config.js to fill index.html (title, meta, fonts, preload).
export const seo = {
  title: "Freittas | Produtor musical em Belo Horizonte, MG",
  description:
    "Freittas, produtor musical de Belo Horizonte (MG): beats, produção e finalização de faixas para artistas, com atendimento online.",
  ogTitle: "Freittas | Produtor musical",
  ogDescription:
    "Do beat ao lançamento: sua música com a pressão que ela merece. Atendimento online.",
  ogImage: "/gallery/jeanbanner.png",
  themeColor: "#0b0714", // keep equal to --dark in theme.css
  fontsUrl:
    "https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,500..800;1,500..700&family=Inter:wght@400;500;600;700&display=swap",
};

// Turn whole sections on or off. The menu hides the links of disabled sections.
export const sections = {
  intro: true, // numbers + "como funciona"
  music: true, // animated player with the tracks
  features: false, // bento of highlights
  team: true,
  pricing: false,
  ambient: false, // photo mosaic
  reviews: false,
  app: false, // app section with phones (only makes sense with booking.mode 'app')
  visit: false, // address, hours and map (the map is hidden when contact.mapsEmbed is empty)
  contact: true, // contact with two phones: WhatsApp chat in front, Spotify profile behind (replaces visit)
};

// What every "Agendar" button does:
//   'app'      opens the modal with the App Store / Google Play buttons (uses `apps`)
//   'whatsapp' opens contact.whatsapp
//   'link'     opens booking.url (e.g. an external booking system)
export const booking = {
  mode: "whatsapp",
  url: "",
};

// Every piece of copy shown on the page, grouped by section.
export const copy = {
  cta: "Entrar em contato",
  ctaShort: "Entrar em contato",
  hero: {
    line1: "Sua ideia vira",
    line2: "hit no volume máximo.",
    text: "Produção musical feita sob medida para artistas que querem soar grande: do beat à faixa finalizada, com a identidade que é só sua.",
    link: "Ouvir as produções",
    linkHref: "#musicas",
    slidesLabel: "Fotos do Freittas",
  },
  intro: {
    first: "Mais que um beat.",
    second: "Uma assinatura.",
    text: "Sou o Freittas, produtor musical de Belo Horizonte. Há 2 anos transformo ideias de artistas em faixas com pressão, groove e personalidade, com atendimento 100% online.",
    stepsLabel: "Como funciona",
  },
  music: {
    label: "Produções",
    first: "Aperta o play",
    second: "e sente o grave.",
    nowPlaying: "Em destaque",
    plays: "reproduções",
    play: "Tocar",
    pause: "Pausar",
    prev: "Faixa anterior",
    next: "Próxima faixa",
    listLabel: "Lista de faixas",
    explicit: "Explícita",
    explicitShort: "E",
    progressLabel: "Progresso da prévia",
    listen: "Ouvir no Spotify",
    previewNote: "Prévias de 30 segundos. A faixa completa está no Spotify.",
    visualizerLabel: "Visualizador de áudio",
    vinylLabel: "Disco girando com a capa da faixa",
    spotifyArtist: "https://open.spotify.com/artist/0JoR7BSmoGOcOtirncbaai",
  },
  features: {
    first: "O que nos torna",
    second: "diferentes",
    action: "Ver todos os serviços",
  },
  team: {
    label: "Quem produz",
    title: "Por trás do som",
    photoAlt: "Foto do produtor",
  },
  pricing: { title: "Valores" },
  ambient: { first: "Nosso", second: "espaço" },
  reviews: {
    label: "Depoimentos",
    title: "O que dizem sobre nós",
    source: "no Google",
  },
  app: {
    first: "Agende pelo",
    second: "app",
    text: "",
    screens: [],
    modalTitle: "",
    modalText: "",
    footerText: "",
  },
  contact: {
    first: "Vamos",
    second: "produzir juntos?",
    text: "Me chama no WhatsApp e conta a ideia da sua faixa. Enquanto isso, dá o play no que já saiu do estúdio.",
    whatsappTitle: "Chamar no WhatsApp",
    spotifyTitle: "Ouvir no Spotify",
    spotifyText: "12,3 mil ouvintes mensais",
    chat: {
      status: "online",
      day: "Hoje",
      time: "21:04",
      placeholder: "Mensagem",
      messages: [
        ["in", "Salve! Aqui é o Freittas 🎧"],
        [
          "out",
          "Fala, Freittas! Tenho uma letra pronta e quero um beat pesado.",
        ],
        [
          "in",
          "Bora! Me manda as referências que eu já começo o planejamento 🔥",
        ],
      ],
    },
    spotify: {
      image: "/gallery/jeanproshot02.png",
      listeners: "12,3 mil ouvintes mensais",
      follow: "Seguir",
      popular: "Populares",
    },
  },
  visit: {
    first: "Vamos",
    second: "produzir juntos",
    mapsAction: "Abrir no Google Maps",
    addressTitle: "Atendimento",
    hoursTitle: "Horário",
  },
};

export const contact = {
  phoneLabel: "(31) 99858-7391",
  phoneHref: "tel:+5531998587391",
  whatsapp:
    "https://wa.me/5531998587391?text=Ol%C3%A1%2C%20Freittas!%20Vi%20o%20site%20e%20quero%20produzir%20uma%20m%C3%BAsica.",
  instagram: "https://www.instagram.com/jeanfreittas__/",
  address: ["Atendimento online", "Belo Horizonte — MG"],
  mapsEmbed: "", // empty: atendimento online, no map
  mapsLink: "",
};

export const apps = {
  ios: "",
  android: "",
};

// Leave empty to hide the hours block.
export const hours = [];

// [anchor id, label, section key]. Items whose section is disabled are hidden.
const navItems = [
  ["inicio", "Início"],
  ["experiencia", "Como funciona", "intro"],
  ["musicas", "Músicas", "music"],
  ["equipe", "Produtor", "team"],
  ["contato", "Contato", "visit"],
  ["contato", "Contato", "contact"],
];
export const nav = navItems.filter(
  ([, , section]) => !section || sections[section],
);

// width/height are the real pixel sizes, used for the lightbox aspect ratio.
// focus: CSS object-position used by the hero, so tall photos keep the face in frame.
const photo = (file, alt, width, height, focus) => ({
  src: `/gallery/${file}`,
  alt,
  width,
  height,
  focus,
});

export const photos = {
  stage: photo(
    "jeanproshot.png",
    "Freittas no palco com o microfone",
    1174,
    1340,
    "50% 12%",
  ),
  studio: photo(
    "jeanproshot02.png",
    "Freittas de boné e corrente",
    1254,
    1254,
    "50% 8%",
  ),
  mirror: photo(
    "jeanproshot03.png",
    "Freittas em foto no espelho",
    1038,
    1515,
    "50% 6%",
  ),
};

export const heroSlides = [photos.studio, photos.stage, photos.mirror];

// Numbers from the Spotify artist page (screenshot shared by the client).
export const stats = [
  { value: 6, label: "Anos produzindo" },
  {
    value: 12.3,
    decimals: 1,
    suffix: " mil",
    label: "Ouvintes mensais no Spotify",
  },
  { value: 187, suffix: " mil+", label: "Plays em Girassóis de Van Gogh" },
];

export const process = [
  [
    "Contato",
    "Você chama no WhatsApp e descreve o que precisa: estilo, referências e objetivo.",
  ],
  [
    "Planejamento",
    "Entendo o que você quer para a faixa e começo o planejamento do som.",
  ],
  [
    "Produção",
    "Começo a desenvolver: beat, arranjo e a identidade sonora da música.",
  ],
  ["Entrega", "Você recebe o resultado pronto para lançar."],
];

// The music player. preview: 30 s MP3 from Spotify; spotify: track id; plays: from the
// Spotify artist page (leave it out when unknown); cover: real album art in /public/covers.
const pv = (id) => `https://p.scdn.co/mp3-preview/${id}`;
const vanGogh = {
  src: "/covers/van-gogh.jpg",
  alt: "Capa com um personagem sobre um campo de girassóis",
};
const ouShi = {
  src: "/covers/ou-shi.jpg",
  alt: "Capa com letras rosa e textura de doces",
};
const fds = {
  src: "/covers/fds.jpg",
  alt: "Capa com um cérebro verde sobre fundo preto",
};

export const tracks = [
  {
    title: "GIRASSÓIS DE VAN GOGH",
    artists: "The Ralph, Freittas",
    duration: "3:00",
    plays: 187038,
    cover: vanGogh,
    spotify: "0Tr8BRtxTwZ0gqtL1AYMLJ",
    preview: pv("f8fd6510126304729b96aedbdf89719ea860eff8"),
  },
  {
    title: "OU SHI!",
    artists: "Swart.og, Freittas",
    duration: "2:44",
    plays: 10846,
    cover: ouShi,
    spotify: "2HqSqwyOVMDxjaJDss1S5k",
    preview: pv("5c778c0532a2ee9c894349aa4372484cad414ad7"),
  },
  {
    title: "MEU BOLSO TA FAT",
    artists: "Swart.og, Freittas",
    duration: "2:00",
    plays: 3498,
    cover: ouShi,
    spotify: "3lgdSCARdclgnp6J9ColDy",
    preview: pv("60f944da78c4991aefd5535f106da0b5e2f3bfe7"),
  },
  {
    title: "FDS SUA GRAVADORA",
    artists: "Gomes14, Freittas",
    duration: "2:02",
    plays: 20538,
    cover: fds,
    explicit: true,
    spotify: "23FnRKMYa4qc00RPBdTdkT",
    preview: pv("ef8362301207d06add1fa2a83105897458971d34"),
  },
  {
    title: "SODA FREESTYLE",
    artists: "Gomes14, Freittas, BigShine",
    duration: "2:44",
    plays: 2700,
    cover: fds,
    explicit: true,
    spotify: "5S0IuL6ooE26A4iPiwbroS",
    preview: pv("76c016cc48fa91d56a43d28491d307ddca29a4cc"),
  },
  {
    title: "LUZ",
    artists: "Gomes14, BigShine, RIEY, w0rshey, Freittas",
    duration: "2:43",
    cover: fds,
    explicit: true,
    spotify: "0nrrs6jIihqsK9FizZ99oG",
    preview: pv("8204c3b63dfcf305509cc0008517efc6343510cc"),
  },
  {
    title: "NOITE ESTRELADA",
    artists: "The Ralph, Freittas",
    duration: "2:39",
    plays: 2702,
    cover: vanGogh,
    spotify: "4cVriUWXi1dmmH6D1R5VbD",
    preview: pv("c1e18b1ddecbc6055ddf8b1f388296287dbf93c5"),
  },
  {
    title: "WINNING ELEVEN",
    artists: "Gomes14, BigShine, Freittas",
    duration: "2:28",
    cover: fds,
    explicit: true,
    spotify: "7q6JNJEfzYNSTrQxGn8RQ6",
    preview: pv("102df13c9eb5c1b15072087ae898a865594a69bc"),
  },
  {
    title: "QUEM É ESSA TAL NV$?",
    artists: "Gomes14, BigShine, Filipin Oficial, August07, Freittas",
    duration: "3:44",
    cover: fds,
    explicit: true,
    spotify: "5GC9ScqZSefmUP3KOyEzIJ",
    preview: pv("ce67db9c56956cc814e6a9542a6f570d8ea22a7b"),
  },
  {
    title: "IMPACTO",
    artists: "Gomes14, BigShine, Freittas",
    duration: "2:30",
    cover: fds,
    explicit: true,
    spotify: "6Q4PQFzr2AAwGSlzRLsWNe",
    preview: pv("a5332d0a8e51d0fb0e4d6e5bf7e157000a338ca1"),
  },
];

// size: 'large' (2×2) or 'wide' (2×1); leave it out for a 1×1 tile.
export const features = [];

export const team = [
  {
    photo: "/gallery/jeanproshot.png",
    name: "Jean Freittas",
    role: "Produtor musical",
    text: "Cada faixa começa com uma ideia e termina com a sua assinatura no grave.",
  },
];

// featured: true highlights one row.
export const prices = [];

// The mosaic layout expects exactly 6 photos.
export const ambient = [];

export const reviews = [];

export const appPerks = [];
