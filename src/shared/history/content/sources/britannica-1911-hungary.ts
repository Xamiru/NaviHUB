import { defineSource } from '../../schema'

export default defineSource({
  id: 'britannica-1911-hungary',
  type: 'encyclopedia',
  title: 'Hungary',
  lang: 'en',
  contributors: [
    { name: 'Oscar Briliant', role: 'author' },
    { name: 'Robert N. Bain', role: 'author' },
    { name: 'Walter A. Phillips', role: 'author' },
    { name: 'Charles N. E. Eliot', role: 'author' },
    { name: 'Edward D. Butler', role: 'author' },
    { name: 'Emil Reich', role: 'author' }
  ],
  container: 'Encyclopædia Britannica, 11th edition',
  volume: '13',
  publisher: 'Cambridge University Press',
  place: 'Cambridge',
  date: '1911',
  url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Hungary',
  accessed: '2026-10-07',
  license: { id: 'public-domain' }
})
