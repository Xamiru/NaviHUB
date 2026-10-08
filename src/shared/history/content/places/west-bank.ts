import { definePlace } from '../../schema'

export default definePlace({
  id: 'west-bank',
  names: [
    { text: 'West Bank', lang: 'en', role: 'primary' },
    { text: 'الضفة الغربية', lang: 'ar', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'region',
  regions: ['mena'],
  modernCountry: 'PS'
})
