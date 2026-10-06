import { defineSource } from '../../schema'

export default defineSource({
  id: 'eo1418-suny-armenian-genocide',
  type: 'encyclopedia',
  title: 'Armenian Genocide',
  lang: 'en',
  contributors: [
    { name: 'Ronald Grigor Suny', role: 'author' }
  ],
  container: '1914-1918-online. International Encyclopedia of the First World War',
  publisher: 'Freie Universität Berlin',
  place: 'Berlin',
  date: '2015-05-26',
  ids: { doi: '10.15463/ie1418.10646' },
  url: 'https://encyclopedia.1914-1918-online.net/article/armenian-genocide/',
  accessed: '2026-10-06',
  license: { id: 'cc-by-nc-nd', version: '3.0' }
})
