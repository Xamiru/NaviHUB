import { defineSource } from '../../schema'

export default defineSource({
  id: 'lemo-chronik-1927',
  type: 'web',
  title: 'Chronik 1927',
  lang: 'de',
  contributors: [
    { name: 'Dorlis Blume', role: 'author' },
    { name: 'Manfred Wichmann', role: 'author' }
  ],
  container: 'LeMO – Lebendiges Museum Online',
  publisher: 'Deutsches Historisches Museum',
  place: 'Berlin',
  date: '2016-05-19',
  url: 'https://www.dhm.de/lemo/jahreschronik/1927.html',
  accessed: '2026-10-06',
  license: { id: 'cc-by-nc-sa', version: '4.0' }
})
