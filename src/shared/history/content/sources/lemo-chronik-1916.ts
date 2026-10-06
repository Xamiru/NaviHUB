import { defineSource } from '../../schema'

export default defineSource({
  id: 'lemo-chronik-1916',
  type: 'web',
  title: 'Chronik 1916',
  lang: 'de',
  contributors: [
    { name: 'Dorlis Blume', role: 'author' },
    { name: 'Martin Winter', role: 'author' }
  ],
  container: 'LeMO – Lebendiges Museum Online',
  publisher: 'Deutsches Historisches Museum',
  place: 'Berlin',
  date: '2022-06-15',
  url: 'https://www.dhm.de/lemo/jahreschronik/1916.html',
  accessed: '2026-10-06',
  license: { id: 'cc-by-nc-sa', version: '4.0' }
})
