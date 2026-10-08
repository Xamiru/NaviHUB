import { defineSource } from '../../schema'

export default defineSource({
  id: 'britannica-1911-marx',
  type: 'encyclopedia',
  title: 'Marx, Heinrich Karl',
  lang: 'en',
  contributors: [
    { name: 'Eduard Bernstein', role: 'author' }
  ],
  container: 'Encyclopædia Britannica, 11th edition',
  volume: '17',
  publisher: 'Cambridge University Press',
  place: 'Cambridge',
  date: '1911',
  url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Marx,_Heinrich_Karl',
  accessed: '2026-10-07',
  license: { id: 'public-domain' }
})
