import { definePlace } from '../../schema'

export default definePlace({
  id: 'bengal',
  names: [
    { text: 'Bengal', lang: 'en', role: 'primary' },
    { text: 'বাংলা', lang: 'bn', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'region',
  regions: ['south-asia'],
  modernCountry: 'IN'
})
