import { defineSource } from '../../schema'

export default defineSource({
  id: 'britannica-1911-columbus-christopher',
  type: 'encyclopedia',
  title: 'Columbus, Christopher',
  lang: 'en',
  contributors: [
    { name: 'Charles Raymond Beazley', role: 'author' }
  ],
  container: 'Encyclopædia Britannica, 11th edition',
  volume: '6',
  publisher: 'Cambridge University Press',
  place: 'Cambridge',
  date: '1911',
  url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Columbus%2C_Christopher',
  accessed: '2026-10-16',
  license: { id: 'public-domain' }
})
