import { definePlace } from '../../schema'

export default definePlace({
  id: 'ghent',
  names: [
    { text: 'Ghent', lang: 'en', role: 'primary' },
    { text: 'Gent', lang: 'nl', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'BE'
})
