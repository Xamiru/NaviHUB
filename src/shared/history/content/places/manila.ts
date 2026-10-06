import { definePlace } from '../../schema'

export default definePlace({
  id: 'manila',
  names: [
    { text: 'Manila', lang: 'en', role: 'primary' },
    { text: 'Maynila', lang: 'tl', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['southeast-asia'],
  modernCountry: 'PH'
})
