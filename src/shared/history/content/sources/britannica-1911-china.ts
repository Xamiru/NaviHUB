import { defineSource } from '../../schema'

export default defineSource({
  id: 'britannica-1911-china',
  type: 'encyclopedia',
  title: 'China',
  lang: 'en',
  contributors: [
    { name: 'Robert Kennaway Douglas', role: 'author' }
  ],
  container: 'Encyclopædia Britannica, 11th edition',
  volume: '6',
  publisher: 'Cambridge University Press',
  place: 'Cambridge',
  date: '1911',
  url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/China',
  accessed: '2026-10-08',
  license: { id: 'public-domain' }
})
