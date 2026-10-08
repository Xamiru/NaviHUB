import { defineSource } from '../../schema'

export default defineSource({
  id: 'britannica-1911-italy',
  type: 'encyclopedia',
  title: 'Italy',
  lang: 'en',
  contributors: [
    { name: 'Edward Bunbury', role: 'author' },
    { name: 'Thomas Ashby', role: 'author' },
    { name: 'Robert Conway', role: 'author' },
    { name: 'John A. Symonds', role: 'author' },
    { name: 'John Rose', role: 'author' },
    { name: 'Luigi Villari & Henry Steed', role: 'author' }
  ],
  container: 'Encyclopædia Britannica, 11th edition',
  volume: '15',
  publisher: 'Cambridge University Press',
  place: 'Cambridge',
  date: '1911',
  url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Italy',
  accessed: '2026-10-07',
  license: { id: 'public-domain' }
})
