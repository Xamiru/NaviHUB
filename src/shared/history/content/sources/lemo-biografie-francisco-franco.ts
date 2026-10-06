import { defineSource } from '../../schema'

export default defineSource({
  id: 'lemo-biografie-francisco-franco',
  type: 'web',
  title: 'Francisco Franco 1892-1975',
  lang: 'de',
  contributors: [
    { name: 'Bernd Rother', role: 'author' },
    { name: 'Manfred Wichmann', role: 'author' }
  ],
  container: 'LeMO – Lebendiges Museum Online',
  publisher: 'Deutsches Historisches Museum',
  place: 'Berlin',
  date: '2023-02-16',
  url: 'https://www.dhm.de/lemo/biografie/francisco-franco',
  accessed: '2026-10-06',
  license: { id: 'cc-by-nc-sa', version: '4.0' }
})
