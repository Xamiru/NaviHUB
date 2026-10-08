import { defineSource } from '../../schema'

export default defineSource({
  id: 'britannica-1911-anti-semitism',
  type: 'encyclopedia',
  title: 'Anti-Semitism',
  lang: 'en',
  contributors: [
    { name: 'Lucien Wolf', role: 'author' }
  ],
  container: 'Encyclopædia Britannica, 11th edition',
  volume: '2',
  publisher: 'Cambridge University Press',
  place: 'Cambridge',
  date: '1911',
  url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Anti-Semitism',
  accessed: '2026-10-07',
  license: { id: 'public-domain' }
})
