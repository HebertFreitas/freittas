// Pre-launch check for a landing built from this template: `npm run check`.
// Fails on theme errors (contrast, *-rgb out of sync); warns on leftover template placeholders.
import { readFileSync, existsSync } from 'node:fs'
import * as site from '../src/config/site.js'

const css = readFileSync(new URL('../src/config/theme.css', import.meta.url), 'utf8')
const tokens = Object.fromEntries([...css.matchAll(/--([a-z0-9-]+):\s*([^;]+);/g)].map(([, k, v]) => [k, v.trim()]))
const errors = []
const warnings = []

const hexToRgb = (hex) => {
  const h = hex.replace('#', '')
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16))
}
const luminance = (hex) => {
  const [r, g, b] = hexToRgb(hex).map((v) => {
    const c = v / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
const contrast = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

// Each *-rgb token must match its hex twin, or transparencies drift from the palette.
for (const name of ['dark', 'neutral', 'on-dark', 'accent', 'accent-light']) {
  const hex = tokens[name]
  const channels = tokens[`${name}-rgb`]
  if (!hex || !channels) { errors.push(`theme.css: missing --${name} or --${name}-rgb`); continue }
  if (hexToRgb(hex).join(' ') !== channels.replace(/\s+/g, ' ')) {
    errors.push(`theme.css: --${name}-rgb should be "${hexToRgb(hex).join(' ')}" to match ${hex}`)
  }
}

// Text pairs actually used by the layout, checked against WCAG AA (4.5:1 for body-size text).
const pairs = [
  ['text', 'base'], ['text', 'surface'], ['muted', 'base'], ['muted', 'surface'],
  ['accent', 'base'], ['accent', 'surface'], ['accent-light', 'dark'], ['on-dark', 'dark'],
]
for (const [fg, bg] of pairs) {
  if (!tokens[fg]?.startsWith('#') || !tokens[bg]?.startsWith('#')) continue
  const ratio = contrast(tokens[fg], tokens[bg])
  if (ratio < 4.5) errors.push(`contrast --${fg} on --${bg} is ${ratio.toFixed(2)}:1 (needs 4.5:1)`)
}

if (site.seo.themeColor.toLowerCase() !== tokens.dark?.toLowerCase()) {
  warnings.push(`seo.themeColor (${site.seo.themeColor}) differs from --dark (${tokens.dark})`)
}

// Leftovers from the template that should never reach production.
const text = readFileSync(new URL('../src/config/site.js', import.meta.url), 'utf8')
const leftovers = ['Lumen', '00000-0000', 'Rua Exemplo', 'Cliente 1', 'Nome 1', 'R$ 00', 'Diferencial principal', '/gallery/foto-', '/team/pessoa-', '/app-screens/tela-', '/logo.svg']
for (const s of leftovers) if (text.includes(s)) warnings.push(`site.js still contains the placeholder "${s}"`)

if (site.booking.mode === 'link' && !site.booking.url) errors.push('booking.mode is "link" but booking.url is empty')
if (site.sections.app && site.booking.mode !== 'app') warnings.push('sections.app is on but booking.mode is not "app"')
if (site.sections.ambient && site.ambient.length !== 6) warnings.push(`ambient has ${site.ambient.length} photos; the mosaic layout expects 6`)

const files = [site.brand.logo, site.seo.ogImage, ...site.heroSlides.map((p) => p.src), ...site.ambient.map((p) => p.src), ...site.features.map((f) => f.photo.src), ...site.copy.app.screens, ...site.team.map((t) => t.photo)]
for (const f of new Set(files)) {
  if (f.startsWith('/') && !existsSync(new URL(`../public${f}`, import.meta.url))) errors.push(`missing image public${f}`)
}

for (const w of warnings) console.warn(`warning  ${w}`)
for (const e of errors) console.error(`error    ${e}`)
console.log(errors.length ? `\n${errors.length} error(s), ${warnings.length} warning(s)` : `\nTheme OK. ${warnings.length} warning(s)`)
process.exit(errors.length ? 1 : 0)
