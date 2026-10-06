import { defineSource } from '../../schema'

export default defineSource({
  id: 'lemo-chronik-1917',
  type: 'web',
  title: 'Chronik 1917',
  lang: 'de',
  contributors: [
    { name: 'Dorlis Blume', role: 'author' },
    { name: 'Martin Winter', role: 'author' }
  ],
  container: 'LeMO – Lebendiges Museum Online',
  publisher: 'Deutsches Historisches Museum',
  place: 'Berlin',
  date: '2014-08-31',
  url: 'https://www.dhm.de/lemo/jahreschronik/1917.html',
  accessed: '2026-10-06',
  license: { id: 'cc-by-nc-sa', version: '4.0' }
})
