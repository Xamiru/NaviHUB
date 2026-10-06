import { definePlace } from '../../schema'

export default definePlace({
  id: 'alexandria',
  names: [
    { text: 'Alexandria', lang: 'en', role: 'primary' },
    { text: 'الإسكندرية', lang: 'ar', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['mena'],
  modernCountry: 'EG'
})
