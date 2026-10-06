import { definePlace } from '../../schema'

export default definePlace({
  id: 'samarkand',
  names: [
    { text: 'Samarkand', lang: 'en', role: 'primary' },
    { text: 'Samarqand', lang: 'uz', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['russia-central-asia'],
  modernCountry: 'UZ'
})
