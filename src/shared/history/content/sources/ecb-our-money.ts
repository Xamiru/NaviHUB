import { defineSource } from '../../schema'

export default defineSource({
  id: 'ecb-our-money',
  type: 'web',
  title: 'Our money',
  lang: 'en',
  contributors: [
    { name: 'European Central Bank', role: 'institution' }
  ],
  publisher: 'European Central Bank',
  date: 'n.d.',
  url: 'https://www.ecb.europa.eu/euro/intro/html/index.en.html',
  accessed: '2026-10-12'
})
