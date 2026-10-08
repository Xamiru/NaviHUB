import { definePlace } from '../../schema'

export default definePlace({
  id: 'hawaiian-islands',
  names: [
    { text: 'Hawaiian Islands', lang: 'en', role: 'primary' },
    { text: 'Hawaiʻi', lang: 'haw', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'region',
  regions: ['oceania'],
  modernCountry: 'US'
})
