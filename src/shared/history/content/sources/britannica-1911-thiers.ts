import { defineSource } from '../../schema'

export default defineSource({
  id: 'britannica-1911-thiers',
  type: 'encyclopedia',
  title: 'Thiers, Louis Adolphe',
  lang: 'en',
  contributors: [
    { name: 'George Saintsbury', role: 'author' }
  ],
  container: 'Encyclopædia Britannica, 11th edition',
  volume: '26',
  publisher: 'Cambridge University Press',
  place: 'Cambridge',
  date: '1911',
  url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Thiers,_Louis_Adolphe',
  accessed: '2026-10-07',
  license: { id: 'public-domain' }
})
