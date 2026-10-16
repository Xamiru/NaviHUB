import { defineSource } from '../../schema'

export default defineSource({
  id: 'britannica-1911-hunyadi-janos',
  type: 'encyclopedia',
  title: 'Hunyadi, János',
  lang: 'en',
  contributors: [
    { name: 'Robert Nisbet Bain', role: 'author' }
  ],
  container: 'Encyclopædia Britannica, 11th edition',
  volume: '13',
  publisher: 'Cambridge University Press',
  place: 'Cambridge',
  date: '1911',
  url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Hunyadi%2C_J%C3%A1nos',
  accessed: '2026-10-16',
  license: { id: 'public-domain' }
})
