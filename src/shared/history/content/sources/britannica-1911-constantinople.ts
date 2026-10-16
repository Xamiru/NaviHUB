import { defineSource } from '../../schema'

export default defineSource({
  id: 'britannica-1911-constantinople',
  type: 'encyclopedia',
  title: 'Constantinople',
  lang: 'en',
  contributors: [
    { name: 'Alexander van Millingen', role: 'author' }
  ],
  container: 'Encyclopædia Britannica, 11th edition',
  volume: '7',
  publisher: 'Cambridge University Press',
  place: 'Cambridge',
  date: '1911',
  url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Constantinople',
  accessed: '2026-10-16',
  license: { id: 'public-domain' }
})
