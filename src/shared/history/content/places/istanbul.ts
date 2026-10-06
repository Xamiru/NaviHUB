import { definePlace } from '../../schema'

export default definePlace({
  id: 'istanbul',
  names: [
    { text: 'Istanbul', lang: 'en', role: 'primary' },
    { text: 'İstanbul', lang: 'tr', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['mena'],
  modernCountry: 'TR'
})
