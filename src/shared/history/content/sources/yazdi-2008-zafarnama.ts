import { defineSource } from '../../schema'

export default defineSource({
  id: 'yazdi-2008-zafarnama',
  type: 'book',
  title: 'ظفرنامه',
  lang: 'fa',
  contributors: [
    { name: 'Sharaf al-Dīn ʿAlī Yazdī', role: 'author', nameNative: 'شرف‌الدین علی یزدی' }
  ],
  publisher: 'Kitābkhānah-i Mūzih va Markaz-i Asnād-i Majlis-i Shūrā-yi Islāmī',
  date: '2008',
  url: 'https://openlibrary.org/books/OL50184049M',
  accessed: '2026-10-16',
  place: 'Tihrān',
  ids: { isbn: '9789646690684', oclc: '419477173' }
})
