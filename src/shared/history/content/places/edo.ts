import { definePlace } from '../../schema'

export default definePlace({
  id: 'edo',
  names: [
    { text: 'Edo', lang: 'en', role: 'primary' },
    { text: '江戸', lang: 'ja', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['east-asia'],
  modernCountry: 'JP'
})
