import { defineSource } from '../../schema'

export default defineSource({
  id: 'britannica-1911-napoleon-iii',
  type: 'encyclopedia',
  title: 'Napoleon III.',
  lang: 'en',
  contributors: [
    { name: 'Albert Thomas', role: 'author' }
  ],
  container: 'Encyclopædia Britannica, 11th edition',
  volume: '19',
  publisher: 'Cambridge University Press',
  place: 'Cambridge',
  date: '1911',
  url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Napoleon_III.',
  accessed: '2026-10-07',
  license: { id: 'public-domain' }
})
