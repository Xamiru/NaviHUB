import { defineSource } from '../../schema'

export default defineSource({
  id: 'britannica-1911-gutenberg-johann',
  type: 'encyclopedia',
  title: 'Gutenberg, Johann',
  lang: 'en',
  contributors: [
    { name: 'John Henry Hessels', role: 'author' }
  ],
  container: 'Encyclopædia Britannica, 11th edition',
  volume: '12',
  publisher: 'Cambridge University Press',
  place: 'Cambridge',
  date: '1911',
  url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Gutenberg%2C_Johann',
  accessed: '2026-10-16',
  license: { id: 'public-domain' }
})
