import { definePlace } from '../../schema'

export default definePlace({
  id: 'bay-of-pigs',
  names: [
    { text: 'Bay of Pigs', lang: 'en', role: 'primary' },
    { text: 'Bahía de Cochinos', lang: 'es', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'water',
  regions: ['latin-america'],
  modernCountry: 'CU'
})
