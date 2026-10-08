import { defineSource } from '../../schema'

export default defineSource({
  id: 'zeng-1990-beifa-zhanzheng-shi',
  type: 'book',
  title: '北伐战争史',
  lang: 'zh',
  contributors: [
    { name: 'Zeng Xianlin', nameNative: '曾宪林', role: 'author' },
    { name: 'Zeng Chenggui', nameNative: '曾成贵', role: 'author' },
    { name: 'Jiang Xia', nameNative: '江峡', role: 'author' }
  ],
  publisher: '四川人民出版社',
  date: '1990',
  ids: { isbn: '7220011210' },
  url: 'https://ndlsearch.ndl.go.jp/books/R100000136-I1970304959852877600',
  accessed: '2026-10-08'
})
