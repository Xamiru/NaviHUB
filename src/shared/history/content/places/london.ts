import { definePlace } from '../../schema'

export default definePlace({
  id: 'london',
  names: [
    { text: 'London', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'GB'
})
