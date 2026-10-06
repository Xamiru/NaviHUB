import { definePlace } from '../../schema'

export default definePlace({
  id: 'kyoto',
  names: [
    { text: 'Kyoto', lang: 'en', role: 'primary' },
    { text: '京都', lang: 'ja', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['east-asia'],
  modernCountry: 'JP'
})
