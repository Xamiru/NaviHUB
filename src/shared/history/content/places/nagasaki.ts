import { definePlace } from '../../schema'

export default definePlace({
  id: 'nagasaki',
  names: [
    { text: 'Nagasaki', lang: 'en', role: 'primary' },
    { text: '長崎', lang: 'ja', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['east-asia'],
  modernCountry: 'JP'
})
