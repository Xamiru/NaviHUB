import { definePlace } from '../../schema'

export default definePlace({
  id: 'normandy',
  names: [
    { text: 'Normandy', lang: 'en', role: 'primary' },
    { text: 'Normandie', lang: 'fr', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'region',
  regions: ['europe'],
  modernCountry: 'FR'
})
