import { defineSource } from '../../schema'

export default defineSource({
  id: 'britannica-1911-franco-german-war',
  type: 'encyclopedia',
  title: 'Franco-German War',
  lang: 'en',
  contributors: [
    { name: 'Frederic Natusch Maude', role: 'author' },
    { name: 'Charles Francis Atkinson', role: 'author' }
  ],
  container: 'Encyclopædia Britannica, 11th edition',
  volume: '11',
  publisher: 'Cambridge University Press',
  place: 'Cambridge',
  date: '1911',
  url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Franco-German_War',
  accessed: '2026-10-07',
  license: { id: 'public-domain' }
})
