import { defineSource } from '../../schema'

export default defineSource({
  id: 'britannica-1911-mongols',
  type: 'encyclopedia',
  title: 'Mongols',
  lang: 'en',
  contributors: [
    { name: 'Robert Kennaway Douglas', role: 'author' },
    { name: 'Bernhard Jülg', role: 'author' }
  ],
  container: 'Encyclopædia Britannica, 11th edition',
  volume: '18',
  publisher: 'Cambridge University Press',
  place: 'Cambridge',
  date: '1911',
  url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Mongols',
  accessed: '2026-10-16',
  license: { id: 'public-domain' }
})
