import { defineSource } from '../../schema'

export default defineSource({
  id: 'lemo-chronik-1919',
  type: 'web',
  title: 'Chronik 1919',
  lang: 'de',
  contributors: [
    { name: 'Dorlis Blume', role: 'author' },
    { name: 'Manfred Wichmann', role: 'author' }
  ],
  container: 'LeMO – Lebendiges Museum Online',
  publisher: 'Deutsches Historisches Museum',
  place: 'Berlin',
  date: '2025-11-24',
  url: 'https://www.dhm.de/lemo/jahreschronik/1919.html',
  accessed: '2026-10-06',
  license: { id: 'cc-by-nc-sa', version: '4.0' }
})
