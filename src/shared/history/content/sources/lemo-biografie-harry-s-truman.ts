import { defineSource } from '../../schema'

export default defineSource({
  id: 'lemo-biografie-harry-s-truman',
  type: 'web',
  title: 'Harry S. Truman 1884 - 1972',
  lang: 'de',
  contributors: [
    { name: 'Dorlis Blume', role: 'author' },
    { name: 'Irmgard Zündorf', role: 'author' }
  ],
  container: 'LeMO – Lebendiges Museum Online',
  publisher: 'Stiftung Haus der Geschichte der Bundesrepublik Deutschland',
  place: 'Bonn',
  date: '2016-04-12',
  url: 'https://www.dhm.de/lemo/biografie/harry-s-truman',
  accessed: '2026-10-06',
  license: { id: 'cc-by-nc-sa', version: '4.0' }
})
