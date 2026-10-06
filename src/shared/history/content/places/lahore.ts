import { definePlace } from '../../schema'

export default definePlace({
  id: 'lahore',
  names: [
    { text: 'Lahore', lang: 'en', role: 'primary' },
    { text: 'لاہور', lang: 'ur', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['south-asia'],
  modernCountry: 'PK'
})
