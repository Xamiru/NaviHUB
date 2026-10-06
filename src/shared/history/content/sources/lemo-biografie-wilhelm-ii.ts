import { defineSource } from '../../schema'

export default defineSource({
  id: 'lemo-biografie-wilhelm-ii',
  type: 'web',
  title: 'Wilhelm II. 1859-1941',
  lang: 'de',
  contributors: [
    { name: 'Gabriel Eikenberg', role: 'author' },
    { name: 'Rupert Platz', role: 'author' }
  ],
  container: 'LeMO – Lebendiges Museum Online',
  publisher: 'Deutsches Historisches Museum',
  place: 'Berlin',
  date: '2021-11-11',
  url: 'https://www.dhm.de/lemo/biografie/wilhelm-ii',
  accessed: '2026-10-06',
  license: { id: 'cc-by-nc-sa', version: '4.0' }
})
