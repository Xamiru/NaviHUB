import { defineSource } from '../../schema'

export default defineSource({
  id: 'britannica-1911-zola',
  type: 'encyclopedia',
  title: 'Zola, Émile Édouard Charles Antoine',
  lang: 'en',
  contributors: [
    { name: 'Frank Thomas Marzials', role: 'author' }
  ],
  container: 'Encyclopædia Britannica, 11th edition',
  volume: '28',
  publisher: 'Cambridge University Press',
  place: 'Cambridge',
  date: '1911',
  url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Zola,_%C3%89mile_%C3%89douard_Charles_Antoine',
  accessed: '2026-10-07',
  license: { id: 'public-domain' }
})
