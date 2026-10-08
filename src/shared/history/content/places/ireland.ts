import { definePlace } from '../../schema'

export default definePlace({
  id: 'ireland',
  names: [
    { text: 'Ireland', lang: 'en', role: 'primary' },
    { text: 'Éire', lang: 'ga', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'region',
  regions: ['europe'],
  modernCountry: 'IE'
})
