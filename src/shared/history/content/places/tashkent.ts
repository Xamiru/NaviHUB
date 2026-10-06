import { definePlace } from '../../schema'

export default definePlace({
  id: 'tashkent',
  names: [
    { text: 'Tashkent', lang: 'en', role: 'primary' },
    { text: 'Toshkent', lang: 'uz', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['russia-central-asia'],
  modernCountry: 'UZ'
})
