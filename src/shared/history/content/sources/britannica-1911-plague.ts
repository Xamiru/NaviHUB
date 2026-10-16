import { defineSource } from '../../schema'

export default defineSource({
  id: 'britannica-1911-plague',
  type: 'encyclopedia',
  title: 'Plague',
  lang: 'en',
  contributors: [
    { name: 'Arthur Shadwell', role: 'author' },
    { name: 'Harriet L. Hennessy', role: 'author' },
    { name: 'Joseph Frank Payne', role: 'author' }
  ],
  container: 'Encyclopædia Britannica, 11th edition',
  volume: '21',
  publisher: 'Cambridge University Press',
  place: 'Cambridge',
  date: '1911',
  url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Plague',
  accessed: '2026-10-16',
  license: { id: 'public-domain' }
})
