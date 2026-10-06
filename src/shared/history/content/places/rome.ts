import { definePlace } from '../../schema'

export default definePlace({
  id: 'rome',
  names: [
    { text: 'Rome', lang: 'en', role: 'primary' },
    { text: 'Roma', lang: 'it', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['europe'],
  modernCountry: 'IT'
})
