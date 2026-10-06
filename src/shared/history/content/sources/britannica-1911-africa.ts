import { defineSource } from '../../schema'

export default defineSource({
  id: 'britannica-1911-africa',
  type: 'encyclopedia',
  title: 'Africa',
  lang: 'en',
  contributors: [
    { name: 'Edward Heawood', role: 'author' },
    { name: 'Frank Richardson Cana', role: 'author' },
    { name: 'Thomas Athol Joyce', role: 'author' },
    { name: 'John Scott Keltie', role: 'author' }
  ],
  container: 'Encyclopædia Britannica, 11th edition',
  volume: '1',
  publisher: 'Cambridge University Press',
  place: 'Cambridge',
  date: '1911',
  url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Africa',
  accessed: '2026-10-06',
  license: { id: 'public-domain' }
})
