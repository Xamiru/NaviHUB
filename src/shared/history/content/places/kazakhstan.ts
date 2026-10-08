import { definePlace } from '../../schema'

export default definePlace({
  id: 'kazakhstan',
  names: [
    { text: 'Kazakhstan', lang: 'en', role: 'primary' },
    { text: 'Қазақстан', lang: 'kk', role: 'native' }
  ],
  researched: '2026-10-08',
  placeType: 'region',
  regions: ['russia-central-asia'],
  modernCountry: 'KZ'
})
