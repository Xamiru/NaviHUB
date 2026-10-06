import { definePlace } from '../../schema'

export default definePlace({
  id: 'suez-canal',
  names: [
    { text: 'Suez Canal', lang: 'en', role: 'primary' },
    { text: 'قناة السويس', lang: 'ar', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'water',
  regions: ['mena'],
  modernCountry: 'EG'
})
