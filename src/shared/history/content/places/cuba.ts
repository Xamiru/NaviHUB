import { definePlace } from '../../schema'

export default definePlace({
  id: 'cuba',
  names: [
    { text: 'Cuba', lang: 'en', role: 'primary' },
    { text: 'Cuba', lang: 'es', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'country',
  regions: ['latin-america'],
  modernCountry: 'CU'
})
