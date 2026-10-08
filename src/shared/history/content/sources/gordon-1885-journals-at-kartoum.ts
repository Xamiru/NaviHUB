import { defineSource } from '../../schema'

export default defineSource({
  id: 'gordon-1885-journals-at-kartoum',
  type: 'book',
  title: 'The Journals of Major-Gen. C. G. Gordon, C.B., at Kartoum',
  lang: 'en',
  contributors: [
    { name: 'Charles George Gordon', role: 'author' },
    { name: 'A. Egmont Hake', role: 'editor' }
  ],
  publisher: 'Kegan Paul, Trench & Co.',
  place: 'London',
  date: '1885',
  ids: { archive: 'gutenberg 49224' },
  url: 'https://www.gutenberg.org/cache/epub/49224/pg49224.txt',
  license: { id: 'public-domain' },
  accessed: '2026-10-08'
})
