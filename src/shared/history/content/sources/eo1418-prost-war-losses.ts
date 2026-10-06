import { defineSource } from '../../schema'

export default defineSource({
  id: 'eo1418-prost-war-losses',
  type: 'encyclopedia',
  title: 'War Losses',
  lang: 'en',
  contributors: [
    { name: 'Antoine Prost', role: 'author' }
  ],
  container: '1914-1918-online. International Encyclopedia of the First World War',
  publisher: 'Freie Universität Berlin',
  place: 'Berlin',
  date: '2014-10-08',
  ids: { doi: '10.15463/ie1418.10271' },
  url: 'https://encyclopedia.1914-1918-online.net/article/war-losses/',
  accessed: '2026-10-06',
  license: { id: 'cc-by-nc-nd', version: '3.0' }
})
