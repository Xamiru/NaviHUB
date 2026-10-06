import { defineSource } from '../../schema'

export default defineSource({
  id: 'britannica-1911-exhibition',
  type: 'encyclopedia',
  title: 'Exhibition',
  lang: 'en',
  contributors: [
    { name: 'George Collins Levey', role: 'author' }
  ],
  container: 'Encyclopædia Britannica, 11th edition',
  volume: '10',
  publisher: 'Cambridge University Press',
  place: 'Cambridge',
  date: '1911',
  url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Exhibition',
  accessed: '2026-10-06',
  license: { id: 'public-domain' }
})
