import { defineSource } from '../../schema'

export default defineSource({
  id: 'britannica-1911-abyssinia',
  type: 'encyclopedia',
  title: 'Abyssinia',
  lang: 'en',
  contributors: [
    { name: 'Frank Richardson Cana', role: 'author' },
    { name: 'Albert Edward Wilfred Gleichen', role: 'author' }
  ],
  container: 'Encyclopædia Britannica, 11th edition',
  volume: '1',
  publisher: 'Cambridge University Press',
  place: 'Cambridge',
  date: '1911',
  url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Abyssinia',
  accessed: '2026-10-07',
  license: { id: 'public-domain' }
})
