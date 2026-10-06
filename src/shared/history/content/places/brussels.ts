import { definePlace } from '../../schema'

export default definePlace({
  id: 'brussels',
  names: [
    { text: 'Brussels', lang: 'en', role: 'primary' },
    { text: 'Bruxelles', lang: 'fr', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'BE'
})
