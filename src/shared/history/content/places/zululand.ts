import { definePlace } from '../../schema'

export default definePlace({
  id: 'zululand',
  names: [
    { text: 'Zululand', lang: 'en', role: 'primary' },
    { text: 'KwaZulu', lang: 'zu', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'region',
  regions: ['subsaharan-africa'],
  modernCountry: 'ZA'
})
