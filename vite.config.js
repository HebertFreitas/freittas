import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { brand, seo } from './src/config/site.js'

// Fills the %SITE_*% placeholders in index.html from src/config/site.js.
const escape = (v) => String(v).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
const values = {
  TITLE: seo.title,
  DESCRIPTION: seo.description,
  OG_TITLE: seo.ogTitle,
  OG_DESCRIPTION: seo.ogDescription,
  OG_IMAGE: seo.ogImage,
  THEME_COLOR: seo.themeColor,
  FONTS_URL: seo.fontsUrl,
  LOGO: brand.logo,
}

const siteHtml = {
  name: 'site-html',
  transformIndexHtml: (html) => html.replace(/%SITE_([A-Z_]+)%/g, (m, key) => (key in values ? escape(values[key]) : m)),
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), siteHtml],
})
