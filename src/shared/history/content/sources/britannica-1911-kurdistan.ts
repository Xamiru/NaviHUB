import { defineSource } from '../../schema'

export default defineSource({
  id: 'britannica-1911-kurdistan',
  type: 'encyclopedia',
  title: 'Kūrdistān',
  lang: 'en',
  contributors: [
    { name: 'Charles William Wilson', role: 'author' },
    { name: 'Henry Creswicke Rawlinson', role: 'author' }
  ],
  container: 'Encyclopædia Britannica, 11th edition',
  volume: '15',
  publisher: 'Cambridge University Press',
  place: 'Cambridge',
  date: '1911',
  url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/K%C5%ABrdist%C4%81n',
  accessed: '2026-10-06',
  license: { id: 'public-domain' }
})
