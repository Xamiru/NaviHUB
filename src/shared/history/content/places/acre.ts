import { definePlace } from '../../schema'

export default definePlace({
  id: 'acre',
  names: [
    { text: 'Acre', lang: 'en', role: 'primary' },
    { text: 'עכו', lang: 'he', role: 'native' },
    { text: 'ʿAkkā', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['mena'],
  modernCountry: 'IL'
})
