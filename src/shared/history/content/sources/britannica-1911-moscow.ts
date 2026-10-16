import { defineSource } from '../../schema'

export default defineSource({
  id: 'britannica-1911-moscow',
  type: 'encyclopedia',
  title: 'Moscow',
  lang: 'en',
  contributors: [
    { name: 'Peter Kropotkin', role: 'author' },
    { name: 'John Thomas Bealby', role: 'author' }
  ],
  container: 'Encyclopædia Britannica, 11th edition',
  volume: '18',
  publisher: 'Cambridge University Press',
  place: 'Cambridge',
  date: '1911',
  url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Moscow',
  accessed: '2026-10-16',
  license: { id: 'public-domain' }
})
