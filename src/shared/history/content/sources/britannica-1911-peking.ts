import { defineSource } from '../../schema'

export default defineSource({
  id: 'britannica-1911-peking',
  type: 'encyclopedia',
  title: 'Peking',
  lang: 'en',
  contributors: [
    { name: 'Robert Kennaway Douglas', role: 'author' }
  ],
  container: 'Encyclopædia Britannica, 11th edition',
  volume: '21',
  publisher: 'Cambridge University Press',
  place: 'Cambridge',
  date: '1911',
  url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Peking',
  accessed: '2026-10-16',
  license: { id: 'public-domain' }
})
