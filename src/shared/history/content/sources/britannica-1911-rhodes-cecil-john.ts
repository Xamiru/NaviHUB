import { defineSource } from '../../schema'

export default defineSource({
  id: 'britannica-1911-rhodes-cecil-john',
  type: 'encyclopedia',
  title: 'Rhodes, Cecil John',
  lang: 'en',
  contributors: [
    { name: 'Flora Shaw, Lady Lugard', role: 'author' },
    { name: 'George Robert Parkin', role: 'author' }
  ],
  container: 'Encyclopædia Britannica, 11th edition',
  volume: '23',
  publisher: 'Cambridge University Press',
  place: 'Cambridge',
  date: '1911',
  url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Rhodes,_Cecil_John',
  accessed: '2026-10-07',
  license: { id: 'public-domain' }
})
