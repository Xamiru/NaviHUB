import { definePlace } from '../../schema'

export default definePlace({
  id: 'the-hague',
  names: [
    { text: 'The Hague', lang: 'en', role: 'primary' },
    { text: 'Den Haag', lang: 'nl', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'NL'
})
