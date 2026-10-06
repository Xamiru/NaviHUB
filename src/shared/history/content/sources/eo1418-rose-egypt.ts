import { defineSource } from '../../schema'

export default defineSource({
  id: 'eo1418-rose-egypt',
  type: 'encyclopedia',
  title: 'Egypt',
  lang: 'en',
  contributors: [
    { name: 'Christopher S. Rose', role: 'author' }
  ],
  container: '1914-1918-online. International Encyclopedia of the First World War',
  publisher: 'Freie Universität Berlin',
  place: 'Berlin',
  date: '2024-10-15',
  ids: { doi: '10.15463/ie1418.11633' },
  url: 'https://encyclopedia.1914-1918-online.net/article/egypt/',
  accessed: '2026-10-06',
  license: { id: 'cc-by-nc-nd', version: '3.0' }
})
