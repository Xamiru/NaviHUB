import { defineSource } from '../../schema'

export default defineSource({
  id: 'tarle-1991-napoleon',
  type: 'book',
  title: 'Наполеон',
  lang: 'ru',
  contributors: [
    { name: 'E. V. Tarle', nameNative: 'Е. В. Тарле', role: 'author' }
  ],
  publisher: 'Наука',
  place: 'Москва',
  date: '1991',
  ids: { isbn: '5020090247', oclc: '27913581' },
  url: 'https://openlibrary.org/books/OL1234890M',
  accessed: '2026-10-08'
})
