import { defineSource } from '../../schema'

export default defineSource({
  id: 'eo1418-sumpf-russian-civil-war',
  type: 'encyclopedia',
  title: 'Russian Civil War',
  lang: 'en',
  contributors: [
    { name: 'Alexandre Sumpf', role: 'author' }
  ],
  container: '1914-1918-online. International Encyclopedia of the First World War',
  publisher: 'Freie Universität Berlin',
  place: 'Berlin',
  date: '2014-10-08',
  ids: { doi: '10.15463/ie1418.10171' },
  url: 'https://encyclopedia.1914-1918-online.net/article/russian-civil-war/',
  accessed: '2026-10-08',
  license: { id: 'cc-by-nc-nd', version: '3.0' }
})
