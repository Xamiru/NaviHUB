import { defineSource } from '../../schema'

export default defineSource({
  id: 'britannica-1911-hundred-years-war',
  type: 'encyclopedia',
  title: 'Hundred Years\' War',
  lang: 'en',
  contributors: [
    { name: 'Jules Viard', role: 'author' }
  ],
  container: 'Encyclopædia Britannica, 11th edition',
  volume: '13',
  publisher: 'Cambridge University Press',
  place: 'Cambridge',
  date: '1911',
  url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Hundred_Years%27_War',
  accessed: '2026-10-16',
  license: { id: 'public-domain' }
})
