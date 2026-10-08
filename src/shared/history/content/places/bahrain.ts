import { definePlace } from '../../schema'

export default definePlace({
  id: 'bahrain',
  names: [
    { text: 'Bahrain', lang: 'en', role: 'primary' },
    { text: 'البحرين', lang: 'ar', role: 'native' },
    { text: 'بحرین', lang: 'fa', role: 'alternative' }
  ],
  researched: '2026-10-08',
  placeType: 'country',
  regions: ['mena'],
  modernCountry: 'BH'
})
