import { definePlace } from '../../schema'

export default definePlace({
  id: 'shimonoseki',
  names: [
    { text: 'Shimonoseki', lang: 'en', role: 'primary' },
    { text: '下関', lang: 'ja', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['east-asia'],
  modernCountry: 'JP'
})
