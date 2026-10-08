import { defineSource } from '../../schema'

export default defineSource({
  id: 'britannica-1911-bismarck',
  type: 'encyclopedia',
  title: 'Bismarck, Otto Eduard Leopold von',
  lang: 'en',
  contributors: [
    { name: 'James Wycliffe Headlam', role: 'author' }
  ],
  container: 'Encyclopædia Britannica, 11th edition',
  volume: '4',
  publisher: 'Cambridge University Press',
  place: 'Cambridge',
  date: '1911',
  url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Bismarck,_Otto_Eduard_Leopold_von',
  accessed: '2026-10-07',
  license: { id: 'public-domain' }
})
