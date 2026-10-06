import { definePlace } from '../../schema'

export default definePlace({
  id: 'vienna',
  names: [
    { text: 'Vienna', lang: 'en', role: 'primary' },
    { text: 'Wien', lang: 'de', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'AT'
})
