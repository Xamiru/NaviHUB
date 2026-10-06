import { definePlace } from '../../schema'

export default definePlace({
  id: 'geneva',
  names: [
    { text: 'Geneva', lang: 'en', role: 'primary' },
    { text: 'Genève', lang: 'fr', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'CH'
})
