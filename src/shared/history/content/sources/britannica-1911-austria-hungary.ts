import { defineSource } from '../../schema'

export default defineSource({
  id: 'britannica-1911-austria-hungary',
  type: 'encyclopedia',
  title: 'Austria-Hungary',
  lang: 'en',
  contributors: [
    { name: 'Oscar Briliant', role: 'author' },
    { name: 'Arthur W. Holland', role: 'author' },
    { name: 'Walter A. Phillips', role: 'author' }
  ],
  container: 'Encyclopædia Britannica, 11th edition',
  volume: '3',
  publisher: 'Cambridge University Press',
  place: 'Cambridge',
  date: '1911',
  url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Austria-Hungary',
  accessed: '2026-10-07',
  license: { id: 'public-domain' }
})
