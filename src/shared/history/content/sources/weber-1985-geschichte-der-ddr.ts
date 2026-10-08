import { defineSource } from '../../schema'

export default defineSource({
  id: 'weber-1985-geschichte-der-ddr',
  type: 'book',
  title: 'Geschichte der DDR',
  lang: 'de',
  contributors: [
    { name: 'Hermann Weber', role: 'author' }
  ],
  publisher: 'Deutscher Taschenbuch Verlag',
  place: 'München',
  date: '1985',
  ids: { isbn: '3423044306', oclc: '13302718' },
  url: 'https://openlibrary.org/books/OL2653779M',
  accessed: '2026-10-08'
})
