import { defineSource } from '../../schema'

export default defineSource({
  id: 'cegielski-1990-rozbiory-polski',
  type: 'book',
  title: 'Rozbiory Polski',
  lang: 'pl',
  contributors: [
    { name: 'Tadeusz Cegielski', role: 'author' }
  ],
  publisher: 'Wydawnictwa Szkolne i Pedagogiczne',
  date: '1990',
  url: 'https://openlibrary.org/books/OL1620432M',
  accessed: '2026-10-13',
  place: 'Warszawa',
  ids: { isbn: '9788302040412' }
})
