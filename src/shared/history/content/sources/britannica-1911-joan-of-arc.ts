import { defineSource } from '../../schema'

export default defineSource({
  id: 'britannica-1911-joan-of-arc',
  type: 'encyclopedia',
  title: 'Joan of Arc',
  lang: 'en',
  contributors: [
    { name: 'James Thomson Shotwell', role: 'author' },
    { name: 'Hugh Chisholm', role: 'author' }
  ],
  container: 'Encyclopædia Britannica, 11th edition',
  volume: '15',
  publisher: 'Cambridge University Press',
  place: 'Cambridge',
  date: '1911',
  url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Joan_of_Arc',
  accessed: '2026-10-16',
  license: { id: 'public-domain' }
})
