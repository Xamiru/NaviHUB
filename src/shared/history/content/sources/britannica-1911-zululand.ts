import { defineSource } from '../../schema'

export default defineSource({
  id: 'britannica-1911-zululand',
  type: 'encyclopedia',
  title: 'Zululand',
  lang: 'en',
  contributors: [
    { name: 'Frank Richardson Cana', role: 'author' }
  ],
  container: 'Encyclopædia Britannica, 11th edition',
  volume: '28',
  publisher: 'Cambridge University Press',
  place: 'Cambridge',
  date: '1911',
  url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Zululand',
  accessed: '2026-10-08',
  license: { id: 'public-domain' }
})
