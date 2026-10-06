import { definePlace } from '../../schema'

export default definePlace({
  id: 'turin',
  names: [
    { text: 'Turin', lang: 'en', role: 'primary' },
    { text: 'Torino', lang: 'it', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'IT'
})
