import { definePlace } from '../../schema'

export default definePlace({
  id: 'havana',
  names: [
    { text: 'Havana', lang: 'en', role: 'primary' },
    { text: 'La Habana', lang: 'es', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['latin-america'],
  modernCountry: 'CU'
})
