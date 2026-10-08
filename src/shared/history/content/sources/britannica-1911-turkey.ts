import { defineSource } from '../../schema'

export default defineSource({
  id: 'britannica-1911-turkey',
  type: 'encyclopedia',
  title: 'Turkey',
  lang: 'en',
  contributors: [
    { name: 'Vincent Henry Penalver Caillard', role: 'author' },
    { name: 'Elias John Wilkinson Gibb', role: 'author' }
  ],
  container: 'Encyclopædia Britannica, 11th edition',
  volume: '27',
  publisher: 'Cambridge University Press',
  place: 'Cambridge',
  date: '1911',
  url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Turkey',
  accessed: '2026-10-07',
  license: { id: 'public-domain' }
})
