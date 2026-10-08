import { defineSource } from '../../schema'

export default defineSource({
  id: 'britannica-1911-paris',
  type: 'encyclopedia',
  title: 'Paris',
  lang: 'en',
  contributors: [
    { name: 'Anthyme Saint-Paul', role: 'author' },
    { name: 'Walter A. Phillips', role: 'author' },
    { name: 'Roland Truslove', role: 'author' },
    { name: 'Henri de Blowitz', role: 'author' }
  ],
  container: 'Encyclopædia Britannica, 11th edition',
  volume: '20',
  publisher: 'Cambridge University Press',
  place: 'Cambridge',
  date: '1911',
  url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Paris',
  accessed: '2026-10-07',
  license: { id: 'public-domain' }
})
