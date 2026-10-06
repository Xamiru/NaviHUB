import { defineSource } from '../../schema'

export default defineSource({
  id: 'lemo-biografie-adolf-hitler',
  type: 'web',
  title: 'Adolf Hitler 1889-1945',
  lang: 'de',
  contributors: [
    { name: 'Daniel Wosnitzka', role: 'author' }
  ],
  container: 'LeMO – Lebendiges Museum Online',
  publisher: 'Deutsches Historisches Museum',
  place: 'Berlin',
  date: '1998-10-12',
  url: 'https://www.dhm.de/lemo/biografie/adolf-hitler',
  accessed: '2026-10-06',
  license: { id: 'cc-by-nc-sa', version: '4.0' }
})
