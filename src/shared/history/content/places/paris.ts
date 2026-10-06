import { definePlace } from '../../schema'

export default definePlace({
  id: 'paris',
  names: [
    { text: 'Paris', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'FR'
})
