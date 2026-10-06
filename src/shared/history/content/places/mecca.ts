import { definePlace } from '../../schema'

export default definePlace({
  id: 'mecca',
  names: [
    { text: 'Mecca', lang: 'en', role: 'primary' },
    { text: 'مكة', lang: 'ar', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['mena'],
  modernCountry: 'SA'
})
