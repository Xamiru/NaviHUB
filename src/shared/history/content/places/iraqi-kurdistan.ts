import { definePlace } from '../../schema'

export default definePlace({
  id: 'iraqi-kurdistan',
  names: [
    { text: 'Iraqi Kurdistan', lang: 'en', role: 'primary' },
    { text: 'كردستان العراق', lang: 'ar', role: 'native' }
  ],
  researched: '2026-10-10',
  placeType: 'region',
  regions: ['mena'],
  modernCountry: 'IQ'
})
