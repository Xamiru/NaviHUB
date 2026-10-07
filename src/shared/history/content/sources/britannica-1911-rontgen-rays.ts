import { defineSource } from '../../schema'

export default defineSource({
  id: 'britannica-1911-rontgen-rays',
  type: 'encyclopedia',
  title: 'Röntgen Rays',
  lang: 'en',
  contributors: [
    { name: 'Joseph John Thomson', role: 'author' }
  ],
  container: 'Encyclopædia Britannica, 11th edition',
  volume: '23',
  publisher: 'Cambridge University Press',
  place: 'Cambridge',
  date: '1911',
  url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/R%C3%B6ntgen_Rays',
  accessed: '2026-10-07',
  license: { id: 'public-domain' }
})
