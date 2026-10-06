import { defineSource } from '../../schema'

export default defineSource({
  id: 'lemo-chronik-1945',
  type: 'web',
  title: 'Chronik 1945',
  lang: 'de',
  contributors: [
    { name: 'Dorlis Blume', role: 'author' },
    { name: 'Manfred Wichmann', role: 'author' },
    { name: 'Irmgard Zündorf', role: 'author' }
  ],
  container: 'LeMO – Lebendiges Museum Online',
  publisher: 'Deutsches Historisches Museum',
  place: 'Berlin',
  date: '2021-07-23',
  url: 'https://www.dhm.de/lemo/jahreschronik/1945.html',
  accessed: '2026-10-06',
  license: { id: 'cc-by-nc-sa', version: '4.0' }
})
