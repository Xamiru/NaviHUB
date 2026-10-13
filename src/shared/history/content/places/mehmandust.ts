import { definePlace } from '../../schema'

export default definePlace({
  id: 'mehmandust',
  names: [
    { text: 'Mehmandust', lang: 'en', role: 'primary' },
    { text: 'مهماندوست', lang: 'fa', role: 'native' },
    {
      text: 'Mehmāndust',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'iranica-balland-asraf-gilzay', loc: { section: 'AŠRAF ḠILZAY', para: '4' } }
      ]
    }
  ],
  researched: '2026-10-13',
  placeType: 'battlefield',
  regions: ['iran'],
  modernCountry: 'IR'
})
