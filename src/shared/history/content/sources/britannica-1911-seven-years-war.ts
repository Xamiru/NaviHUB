import { defineSource } from '../../schema'

export default defineSource({
  id: 'britannica-1911-seven-years-war',
  type: 'encyclopedia',
  title: 'Seven Years\' War',
  lang: 'en',
  contributors: [
    { name: 'Frederic N. Maude', role: 'author' },
    { name: 'David Hannay', role: 'author' }
  ],
  publisher: 'Cambridge University Press',
  date: '1911',
  url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Seven_Years\'_War',
  accessed: '2026-10-13',
  container: 'Encyclopædia Britannica, 11th edition',
  volume: '24',
  place: 'Cambridge',
  license: { id: 'public-domain' }
})
