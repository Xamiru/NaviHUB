import { defineSource } from '../../schema'

export default defineSource({
  id: 'britannica-1911-timur',
  type: 'encyclopedia',
  title: 'Timūr',
  lang: 'en',
  contributors: [
    { name: 'Frederic John Goldsmid', role: 'author' }
  ],
  container: 'Encyclopædia Britannica, 11th edition',
  volume: '26',
  publisher: 'Cambridge University Press',
  place: 'Cambridge',
  date: '1911',
  url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Tim%C5%ABr',
  accessed: '2026-10-16',
  license: { id: 'public-domain' }
})
