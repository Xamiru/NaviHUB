import { definePlace } from '../../schema'

export default definePlace({
  id: 'gaza-strip',
  names: [
    { text: 'Gaza Strip', lang: 'en', role: 'primary' },
    { text: 'قطاع غزة', lang: 'ar', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'region',
  regions: ['mena'],
  modernCountry: 'PS'
})
