import { definePlace } from '../../schema'

export default definePlace({
  id: 'cairo',
  names: [
    { text: 'Cairo', lang: 'en', role: 'primary' },
    { text: 'القاهرة', lang: 'ar', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['mena'],
  modernCountry: 'EG'
})
