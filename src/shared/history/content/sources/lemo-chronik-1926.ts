import { defineSource } from '../../schema'

export default defineSource({
  id: 'lemo-chronik-1926',
  type: 'web',
  title: 'Chronik 1926',
  lang: 'de',
  contributors: [
    { name: 'Dorlis Blume', role: 'author' },
    { name: 'Manfred Wichmann', role: 'author' }
  ],
  container: 'LeMO – Lebendiges Museum Online',
  publisher: 'Deutsches Historisches Museum',
  place: 'Berlin',
  date: '2015-05-09',
  url: 'https://www.dhm.de/lemo/jahreschronik/1926.html',
  accessed: '2026-10-06',
  license: { id: 'cc-by-nc-sa', version: '4.0' }
})
