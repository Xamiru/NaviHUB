import { definePlace } from '../../schema'

export default definePlace({
  id: 'eiffel-tower',
  names: [
    { text: 'Eiffel Tower', lang: 'en', role: 'primary' },
    { text: 'Tour Eiffel', lang: 'fr', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'building',
  regions: ['europe'],
  modernCountry: 'FR'
})
