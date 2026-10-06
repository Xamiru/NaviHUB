import { defineSource } from '../../schema'

export default defineSource({
  id: 'eo1418-phillips-influenza-pandemic',
  type: 'encyclopedia',
  title: 'Influenza Pandemic',
  lang: 'en',
  contributors: [
    { name: 'Howard Phillips', role: 'author' }
  ],
  container: '1914-1918-online. International Encyclopedia of the First World War',
  publisher: 'Freie Universität Berlin',
  place: 'Berlin',
  date: '2014-10-08',
  ids: { doi: '10.15463/ie1418.10148' },
  url: 'https://encyclopedia.1914-1918-online.net/article/influenza-pandemic/',
  accessed: '2026-10-06',
  license: { id: 'cc-by-nc-nd', version: '3.0' }
})
