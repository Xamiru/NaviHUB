import { defineSource } from '../../schema'

export default defineSource({
  id: 'lemo-biografie-winston-churchill',
  type: 'web',
  title: 'Winston Churchill 1874-1965',
  lang: 'de',
  contributors: [
    { name: 'Anja Kettern', role: 'author' }
  ],
  container: 'LeMO – Lebendiges Museum Online',
  publisher: 'Deutsches Historisches Museum',
  place: 'Berlin',
  date: '2014-09-14',
  url: 'https://www.dhm.de/lemo/biografie/winston-churchill',
  accessed: '2026-10-06',
  license: { id: 'cc-by-nc-sa', version: '4.0' }
})
