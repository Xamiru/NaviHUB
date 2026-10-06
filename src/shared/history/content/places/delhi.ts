import { definePlace } from '../../schema'

export default definePlace({
  id: 'delhi',
  names: [
    { text: 'Delhi', lang: 'en', role: 'primary' },
    { text: 'दिल्ली', lang: 'hi', role: 'native' }
  ],
  researched: '2026-10-06',
  placeType: 'city',
  regions: ['south-asia'],
  modernCountry: 'IN'
})
