import { defineSource } from '../../schema'

export default defineSource({
  id: 'falkenhayn-1919-general-headquarters',
  type: 'book',
  title: 'General Headquarters, 1914-1916, and its Critical Decisions',
  lang: 'en',
  contributors: [
    { name: 'Erich von Falkenhayn', role: 'author' }
  ],
  publisher: 'Hutchinson',
  place: 'London',
  date: '1919',
  url: 'https://archive.org/download/generalheadquart00falk/generalheadquart00falk_djvu.txt',
  accessed: '2026-10-07',
  license: { id: 'public-domain' }
})
