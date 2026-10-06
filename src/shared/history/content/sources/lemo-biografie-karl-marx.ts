import { defineSource } from '../../schema'

export default defineSource({
  id: 'lemo-biografie-karl-marx',
  type: 'web',
  title: 'Karl Marx 1818-1883',
  lang: 'de',
  contributors: [
    { name: 'Dorlis Blume', role: 'author' },
    { name: 'Anna-Sophie Schönfelder', role: 'author' }
  ],
  container: 'LeMO – Lebendiges Museum Online',
  publisher: 'Deutsches Historisches Museum',
  place: 'Berlin',
  date: '2022-02-22',
  url: 'https://www.dhm.de/lemo/biografie/karl-marx',
  accessed: '2026-10-06',
  license: { id: 'cc-by-nc-sa', version: '4.0' }
})
