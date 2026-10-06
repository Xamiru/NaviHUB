import { defineSource } from '../../schema'

export default defineSource({
  id: 'carter-mace-tomb-of-tut-ankh-amen-vol-1',
  type: 'book',
  title: 'The Tomb of Tut-Ankhamen, discovered by the late Earl of Carnarvon and Howard Carter',
  lang: 'en',
  contributors: [
    { name: 'Howard Carter', role: 'author' },
    { name: 'A. C. Mace', role: 'author' }
  ],
  volume: 'I',
  publisher: 'Cassell and Company',
  place: 'London',
  date: '1923',
  edition: 'Second impression, October 1926',
  ids: { archive: 'in.ernet.dli.2015.77344' },
  url: 'https://archive.org/details/in.ernet.dli.2015.77344',
  accessed: '2026-10-06',
  holding: 'Digital Library of India (Internet Archive)'
})
